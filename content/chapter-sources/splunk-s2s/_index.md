---
title: "splunk-s2s: Receive data from Splunk forwarders"
linktitle: Splunk S2S
weight:  3620
driver: "network(transport(splunk-s2s))"
short_description: "Receive data from Splunk Universal and Heavy Forwarders over the Splunk-to-Splunk (S2S) protocol"
description: "Receive data from Splunk Universal and Heavy Forwarders over the Splunk-to-Splunk (S2S) protocol using the network() source."
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The `splunk-s2s` transport of the [`network()` source]({{< relref "/chapter-sources/configuring-sources-network/_index.md" >}}) acts as a Splunk indexer. Your Splunk forwarders can send their data to {{% param "product.name" %}} over the Splunk-to-Splunk (S2S) protocol. Then you can process and route the data before you forward it.

To send data to a Splunk indexer over S2S, see {{% xref "/chapter-destinations/splunk-s2s/_index.md" %}}.

{{% param "product.name" %}} can receive data from Splunk clients in two ways:

- The `splunk-s2s` transport receives data from Splunk Universal and Heavy Forwarders over the S2S protocol.
- The [`splunk-hec()` source]({{< relref "/chapter-sources/splunk-hec/_index.md" >}}) receives data from clients that send it over HTTP to the HTTP Event Collector (HEC), for example, from Splunk Connect for Syslog (SC4S).

## Prerequisites

- {{% param "product.name" %}} version 4.30 or later.
- {{< include-headless "chunk/prereq-package.md" "axosyslog-mod-splunk-s2s" "axosyslog-splunk-s2s" >}}
- Disable compression on the forwarders. {{% param "product.name" %}} doesn't support compressed S2S streams.

## Example: Receiving data from a Splunk forwarder

The following source listens for S2S connections on port 9997, the default receiving port of Splunk indexers:

```shell
source s_splunk_forwarders {
  network(
    port(9997)
    transport("splunk-s2s")
    flags(no-parse)
  );
};

destination d_splunk_events {
  file("/var/log/splunk-events.log" template("${.splunk.sourcetype} ${HOST} ${MESSAGE}\n"));
};

log {
  source(s_splunk_forwarders);
  destination(d_splunk_events);
};
```

Use the `flags(no-parse)` option: the events of the forwarders aren't syslog messages, and the syslog parser would modify them.

On the forwarder, add {{% param "product.name" %}} as a receiver in the `outputs.conf` file, and disable compression, for example:

```ini
[tcpout]
defaultGroup = axosyslog

[tcpout:axosyslog]
server = <IP-of-AxoSyslog>:9997
compressed = false
```

To receive the data over TLS, add a [`tls()` option]({{< relref "/chapter-encrypted-transport-tls/tlsoptions/_index.md" >}}) to the source, and configure TLS on the forwarder.

## How splunk-s2s processes the events {#processing}

- If the forwarder sends separate events, every event becomes a separate log message. Heavy Forwarders usually send their data this way.
- If the forwarder sends raw chunks of data, {{% param "product.name" %}} splits the chunks into lines, and every line becomes a separate log message. Universal Forwarders usually send the content of the monitored files this way. {{% param "product.name" %}} doesn't merge multi-line events.
- The `${MESSAGE}` macro contains the raw event or line, without a syslog header.
- The timestamp of the message is the time of the event, if the forwarder sends it. Otherwise, it's the time when {{% param "product.name" %}} received the event.

{{% param "product.name" %}} sets the following name-value pairs from the metadata of the event, if the forwarder sends them:

| Name-value pair         | Splunk metadata |
| ----------------------- | --------------- |
| `${.splunk.index}`      | `index`         |
| `${.splunk.source}`     | `source`        |
| `${.splunk.sourcetype}` | `sourcetype`    |
| `${.splunk.host}`       | `host`          |

{{% param "product.name" %}} also sets the `${HOST}` macro to the `host` value of the event.

### Acknowledgements to the forwarders {#acknowledgements}

If the forwarder uses indexer acknowledgement (`useACK = true` in `outputs.conf`), {{% param "product.name" %}} acknowledges every event when it receives the event.

{{< warning >}}
The acknowledgement doesn't mean that {{% param "product.name" %}} has stored the event. After the acknowledgement, the forwarder doesn't resend the event. If {{% param "product.name" %}} stops before it stores the event, the event is lost, also when you use flow control or a disk-buffer.
{{< /warning >}}

## Options of the splunk-s2s transport {#options}

The `splunk-s2s` transport doesn't have options of its own. The [options of the `network()` source]({{< relref "/chapter-sources/configuring-sources-network/reference-source-network/_index.md" >}}) apply, for example:

- [`flags()`]({{< relref "/chapter-sources/configuring-sources-network/reference-source-network/_index.md#flags" >}}): Use `flags(no-parse)`.
- [`log-msg-size()`]({{< relref "/chapter-sources/configuring-sources-network/reference-source-network/_index.md#log-msg-size" >}}): The maximal size of a single event. If an event is larger, {{% param "product.name" %}} logs an error and closes the connection. To accept the event and truncate it to `log-msg-size()` instead, set [`trim-large-messages(yes)`]({{< relref "/chapter-sources/configuring-sources-network/reference-source-network/_index.md#trim-large-messages" >}}).
- `port()`: The default port of the `splunk-s2s` transport is 9997.
- `tls()`: {{% param "product.name" %}} starts the TLS handshake with the first byte of the connection.

## Troubleshooting splunk-s2s connections {#troubleshooting}

If the forwarder can't send data to {{% param "product.name" %}}, check the internal log of {{% param "product.name" %}} for the following error messages.

The forwarder compresses the data. To fix it, set `compressed = false` in the `outputs.conf` file of the forwarder. The error message is one of the following:

- `splunk-s2s: the forwarder requested stream compression, which is not supported, set compressed=false in its outputs.conf`
- `splunk-s2s: the forwarder speaks the legacy compressed protocol, which is not supported, set compressed=false in its outputs.conf`
- `splunk-s2s: the forwarder compresses the stream, which is not supported, set compressed=false in its outputs.conf`
- `splunk-s2s: the forwarder switched to stream compression, which is not supported, set compressed=false in its outputs.conf`

Other error messages:

- `splunk-s2s: invalid greeting, the peer is probably not a Splunk forwarder`: The client doesn't use the S2S protocol. For example, it sends syslog messages or HEC requests to this port.
- `splunk-s2s: incoming event larger than log-msg-size()`: Increase the `log-msg-size()` of the source, or set `trim-large-messages(yes)`.
- `splunk-s2s: incoming packet larger than the receive buffer, increase log-msg-size()`: A single packet of the forwarder is larger than the receive buffer of {{% param "product.name" %}}. Increase the `log-msg-size()` of the source.
