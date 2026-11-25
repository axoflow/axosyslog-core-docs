---
title: "lumberjack: Receive logs from Beats and Logstash"
linktitle: Lumberjack (Beats)
weight:  1380
driver: "network(transport(lumberjack()))"
short_description: "Receive events from Filebeat, other Beats, and Logstash over the Lumberjack protocol"
description: "Receive events from Filebeat, other Beats, and Logstash over the Lumberjack protocol using the network() source."
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Lumberjack is the protocol that [Filebeat](https://www.elastic.co/beats/filebeat), the other Beats, and Logstash use to send events to Logstash. The `lumberjack()` transport of the [`network()` source]({{< relref "/chapter-sources/configuring-sources-network/_index.md" >}}) receives these events. Point the Logstash output of your Beats at {{% param "product.name" %}} to process and route the events before you forward them to their final destination.

{{% param "product.name" %}} accepts version 1 and version 2 of the protocol, and compressed frames.

## Prerequisites

- {{% param "product.name" %}} version 4.30 or later. The `lumberjack()` transport is part of the core package.

## Example: Receiving events from Filebeat

The following source listens for Lumberjack connections on port 5044, the default port of the Beats protocol, over TLS:

```shell
source s_beats {
  network(
    port(5044)
    transport(lumberjack(max-window-size(2048)))
    tls(
      key-file("/etc/syslog-ng/beats.key")
      cert-file("/etc/syslog-ng/beats.crt")
      peer-verify(optional-untrusted)
    )
  );
};

log {
  source(s_beats);
  destination(d_buffered);
  flags(flow-control);
};
```

Configure the Logstash output of your Filebeat to point at this address, for example:

```yaml
output.logstash:
  hosts: ["<IP-of-AxoSyslog>:5044"]
  ssl.enabled: true
  ssl.certificate_authorities: ["/etc/filebeat/ca.crt"]
  bulk_max_size: 2048
```

To receive the events without TLS, omit the `tls()` option from the source, and the `ssl.*` options from the Filebeat configuration.

## How lumberjack() processes the events {#processing}

- Every event becomes a separate log message.
- {{% param "product.name" %}} doesn't parse the event as a syslog message. The `${MESSAGE}` macro contains the event as JSON, exactly as the sender sent it.
- Version 1 of the protocol sends the events as key-value pairs. {{% param "product.name" %}} converts them into a JSON object.
- The `${.lumberjack.version}` name-value pair contains the version of the protocol that the event arrived in (`1` or `2`).
- The `${HOST}` macro contains the address or the hostname of the sender, depending on the [`use-dns()`]({{< relref "/chapter-sources/configuring-sources-network/reference-source-network/_index.md#source-option-use-dns" >}}) option.
- The timestamps of the message are the time when {{% param "product.name" %}} received it.

To access the fields of the event, parse `${MESSAGE}` with the [`json-parser()`]({{< relref "/chapter-parsers/json-parser/_index.md" >}}) or in [FilterX]({{< relref "/filterx/_index.md" >}}). The following example uses the [`=??` operator]({{< relref "/filterx/operator-reference.md#assign-non-null" >}}), so `${HOST}` and `${MESSAGE}` keep their original values if the event doesn't have the `host.name` or `message` field:

```shell
log {
  source(s_beats);
  filterx {
    event = json($MESSAGE);
    $HOST =?? event.host.name;
    $MESSAGE =?? event.message;
  };
  destination(d_buffered);
  flags(flow-control);
};
```

### Acknowledgements and flow control

The sender sends the events in windows. It considers the events of a window delivered only when {{% param "product.name" %}} acknowledges the window. {{% param "product.name" %}} acknowledges a window when it has processed the last event of the window:

- With [flow control]({{< relref "/chapter-routing-filters/concepts-flow-control/_index.md" >}}) (`flags(flow-control)`) and a [disk-buffer]({{< relref "/chapter-routing-filters/concepts-diskbuffer/_index.md" >}}) in the destination, the acknowledgement means that the events are stored. If {{% param "product.name" %}} stops before it stores the events, the sender resends them.
- Without flow control, the acknowledgement means only that {{% param "product.name" %}} has received the events. Logstash works the same way.

While a window waits for its acknowledgement, {{% param "product.name" %}} sends keepalive messages to the sender (see [`keepalive-interval()`](#keepalive-interval)), so that the sender doesn't time out.

## Options of the lumberjack() transport {#options}

You can use the following options in the `lumberjack()` transport, for example, `transport(lumberjack(max-window-size(2048) window-timeout(60)))`. Without options, you can also use the `transport(lumberjack)` form.

In addition, the following [options of the `network()` source]({{< relref "/chapter-sources/configuring-sources-network/reference-source-network/_index.md" >}}) apply:

- `port()`: The default port of the `lumberjack()` transport is 5044.
- `tls()`: {{% param "product.name" %}} starts the TLS handshake with the first byte of the connection, as the protocol requires.
- `log-msg-size()`: The maximal size of a single event. {{% param "product.name" %}} drops larger events, logs a warning, and increases the `syslogng_lumberjack_frames_dropped_total` counter.
- `idle-timeout()`: How long {{% param "product.name" %}} waits for the next window of the sender.

### keepalive-interval() {#keepalive-interval}

|          |                  |
| -------- | ---------------- |
| Type:    | number (seconds) |
| Default: | `5`              |

*Description:* How often {{% param "product.name" %}} sends a keepalive message to the sender while a window waits for its acknowledgement, for example, because of flow control. Set it to `0` to disable keepalives.

### max-inflated-size() {#max-inflated-size}

|          |                         |
| -------- | ----------------------- |
| Type:    | number (bytes)          |
| Default: | `67108864` (64 MiB)     |

*Description:* The maximal size of a compressed frame after decompression. {{% param "product.name" %}} closes the connection if a compressed frame inflates to a larger size. This protects {{% param "product.name" %}} from compression bombs. Set it to `0` to disable the limit.

### max-window-size() {#max-window-size}

|          |          |
| -------- | -------- |
| Type:    | number   |
| Default: | `10000`  |

*Description:* The largest window that {{% param "product.name" %}} accepts. A window is the number of events that the sender sends before it waits for an acknowledgement. If the sender announces a larger window, {{% param "product.name" %}} closes the connection. Set it to `0` to accept windows of any size.

{{< warning >}}
Set this option to at least the batch size of the sender, for example, the `bulk_max_size` option of Filebeat. The sender cannot learn the limit of {{% param "product.name" %}}. If its windows are larger, it reconnects and resends the same window indefinitely. In this case, {{% param "product.name" %}} logs an error message that includes the window size of the sender.
{{< /warning >}}

### window-timeout() {#window-timeout}

|          |                  |
| -------- | ---------------- |
| Type:    | number (seconds) |
| Default: | `30`             |

*Description:* How long a window can stall before all of its events arrive. If the sender stops sending in the middle of a window for longer than this, {{% param "product.name" %}} closes the connection. Set it to `0` to disable the timeout.

## Metrics of the lumberjack() transport {#metrics}

The `lumberjack()` transport has the following metrics, available at `stats(level(1))` and above:

`syslogng_lumberjack_frames_total`
: The number of events received, by protocol version (`version` label: `1` or `2`).

`syslogng_lumberjack_acknowledgements_total`
: The number of acknowledgements sent to the senders.

`syslogng_lumberjack_frames_dropped_total`
: The number of events dropped because they were larger than `log-msg-size()` (`reason="too_large"`).

`syslogng_lumberjack_protocol_errors_total`
: The number of connections closed because of a protocol error. The `reason` label shows the type of the error:

    - `version`: unknown protocol version
    - `frame_type`: unknown or unexpected frame type
    - `window_size`: the window is larger than `max-window-size()`
    - `length`: invalid frame length
    - `compression`: invalid compressed data
    - `inflated_size`: the decompressed frame is larger than `max-inflated-size()`
