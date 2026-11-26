---
title: "splunk-s2s: Send data to Splunk indexers"
linktitle: Splunk S2S
weight:  5750
driver: "network(transport(splunk-s2s))"
short_description: "Send data to Splunk indexers over the Splunk-to-Splunk (S2S) protocol"
description: "Send data to Splunk indexers over the Splunk-to-Splunk (S2S) protocol, the protocol of Splunk forwarders, using the network() destination."
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The `splunk-s2s` transport of the [`network()` destination]({{< relref "/chapter-destinations/configuring-destinations-network/_index.md" >}}) sends data to Splunk indexers over the Splunk-to-Splunk (S2S) protocol, the same way as a Splunk forwarder does. You can use it to replace a Splunk forwarder, without reconfiguring the receiving port of your indexers.

To send data to Splunk over HTTP, use the [`splunk-hec-event()` destination]({{< relref "/chapter-destinations/syslog-ng-with-splunk/_index.md" >}}) instead. To receive data from Splunk forwarders, see {{% xref "/chapter-sources/splunk-s2s/_index.md" %}}.

## Prerequisites

- {{% param "product.name" %}} version 4.30 or later.
- {{< include-headless "chunk/prereq-package.md" "axosyslog-mod-splunk-s2s" "axosyslog-splunk-s2s" >}}
- A Splunk indexer that receives data on a port, usually port 9997. For details, see [Enable a receiver](https://docs.splunk.com/Documentation/Splunk/latest/Forwarding/Enableareceiver) in the Splunk documentation.

## Example: Sending data to a Splunk indexer

The following destination sends the messages to a Splunk indexer. The rewrite rule sets the Splunk index and sourcetype of the events:

```shell
destination d_splunk_indexer {
  network(
    "splunk-indexer.example.com"
    port(9997)
    transport("splunk-s2s")
    template("$MSG")
  );
};

rewrite r_splunk_metadata {
  set("network" value(".splunk.index"));
  set("syslog" value(".splunk.sourcetype"));
};

log {
  source(s_network);
  rewrite(r_splunk_metadata);
  destination(d_splunk_indexer);
};
```

Use the `template()` option to set the raw event that the indexer receives. The default template of the `network()` destination adds a syslog header to the message.

## How splunk-s2s sends the events {#processing}

{{% param "product.name" %}} sends every log message as a separate event. The raw event is the message formatted with the `template()` of the destination. The timestamp of the event is the timestamp of the message.

{{% param "product.name" %}} takes the metadata of the event from the following name-value pairs:

| Splunk metadata | Name-value pair         | Default if not set |
| --------------- | ----------------------- | ------------------ |
| `index`         | `${.splunk.index}`      | `main`             |
| `source`        | `${.splunk.source}`     | `axosyslog`        |
| `sourcetype`    | `${.splunk.sourcetype}` | `axosyslog`        |
| `host`          | `${.splunk.host}`       | The `${HOST}` macro, or the hostname of the {{% param "product.name" %}} host if `${HOST}` is empty |

The [`splunk-s2s` source]({{< relref "/chapter-sources/splunk-s2s/_index.md" >}}) sets the same name-value pairs, so events that {{% param "product.name" %}} receives from a Splunk forwarder keep their metadata.

### Acknowledgements

{{% param "product.name" %}} requests indexer acknowledgement. It considers an event delivered only when the indexer acknowledges it. If the connection breaks, {{% param "product.name" %}} resends the events that the indexer hasn't acknowledged yet. To keep these events if {{% param "product.name" %}} restarts, use a [disk-buffer]({{< relref "/chapter-routing-filters/concepts-diskbuffer/_index.md" >}}).

## Options of the splunk-s2s transport {#options}

The `splunk-s2s` transport doesn't have options of its own. The [options of the `network()` destination]({{< relref "/chapter-destinations/configuring-destinations-network/reference-destination-network-chapter/_index.md" >}}) apply, for example:

- `port()`: The default port of the `splunk-s2s` transport is 9997.
- `template()`: The raw event. Use `template("$MSG")` to send only the message part.
- `tls()`: To send the data over TLS, configure TLS on the receiving port of the indexer as well. {{% param "product.name" %}} starts the TLS handshake with the first byte of the connection.
