---
title: "syslog-ng(): Forward logs to another syslog-ng node"
weight:  6700
driver: "syslog-ng()"
short_description: "Forward logs to another syslog-ng node"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `syslog-ng()` destination driver forwards log messages to another {{% param "product.abbrev" %}} node in EWMM format.

> Note: For similar functionality using the OpenTelemetry protocol, see {{% xref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" %}}.

{{% include-headless "chunk/ewmm-intro.md" %}}

The `syslog-ng()` destination driver is available in version 3.16 and later. The node that receives this message must use the [default-network-drivers() source]({{< relref "/chapter-sources/source-default-network-drivers/_index.md" >}}) to properly handle the messages.

{{% include-headless "chunk/example-ewmm-message-format.md" %}}


## Declaration:

```shell
   destination d_ewmm {
        syslog-ng(server("192.168.1.1"));
    };
```

Note in this driver you have to set the address of the destination server using the `server()` parameter (in some other destinations, this parameter does not have an explicit name).

## `syslog-ng()` destination options {#reference-destination-syslog-ng}

The `syslog-ng()` destination is a special version of the `network()` destination driver: by default, it sends EWMM-formatted log messages to the TCP514 port of the server. In addition to the options listed here, you can use the [options of the `network()` destination]({{< relref "/chapter-destinations/configuring-destinations-network/reference-destination-network-chapter/_index.md" >}}) as well. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/master/scl/ewmm/ewmm.conf).

{{% include-headless "chunk/option-destination-tls-ca-dir.md" %}}

{{< include-headless "chunk/option-destination-tls-ca-file.md" >}}

{{< include-headless "chunk/option-destination-diskbuffer.md" >}}

{{< include-headless "chunk/option-destination-failover.md" >}}

{{% include-headless "chunk/example-failover-server-syslog.md" %}}

{{% include-headless "chunk/option-destination-flags.md" %}}

{{% include-headless "chunk/option-destination-flush-lines.md" %}}

## frac-digits()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | `3`    |

*Description:* For details, see [`frac-digits()`]({{< relref "/chapter-destinations/configuring-destinations-network/reference-destination-network-chapter/_index.md" >}}#frac-digits) of the `network()` destination. The `syslog-ng()` destination changes the default value of the underlying `network()` destination from `0` to `3`, so that the EWMM-formatted messages carry millisecond-precision timestamps.

{{% include-headless "chunk/option-source-ip-protocol.md" %}}

{{% include-headless "chunk/option-ip-tos.md" %}}

{{% include-headless "chunk/option-ip-ttl.md" %}}

{{% include-headless "chunk/option-destination-keep-alive.md" %}}

{{% include-headless "chunk/option-destination-localip.md" %}}

{{% include-headless "chunk/option-destination-localport.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{% include-headless "chunk/option-destination-mark-freq.md" %}}

{{< include-headless "chunk/option-destination-mark-mode.md" >}}

## port() or destport()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | `514`  |

*Description:* For details, see [`port()`]({{< relref "/chapter-destinations/configuring-destinations-network/reference-destination-network-chapter/_index.md" >}}#port-or-destport) of the `network()` destination. The `syslog-ng()` destination changes the default value of the underlying `network()` destination from `601` to `514`.



## server()

|          |                        |
| -------- | ---------------------- |
| Type:    | hostname or IP address |
| Default: | 127.0.0.1              |

*Description:* The hostname or IP address of the AxoSyslog server.


{{% include-headless "chunk/option-so-broadcast.md" %}}

{{% include-headless "chunk/option-source-so-keepalive.md" %}}

{{% include-headless "chunk/option-destination-so-rcvbuf..md" %}}

{{% include-headless "chunk/option-so-sndbuf.md" %}}

{{% include-headless "chunk/option-destination-suppress.md" %}}

{{< include-headless "chunk/option-tcp-keepalive-intvl.md" >}}

{{< include-headless "chunk/option-tcp-keepalive-probes.md" >}}

{{< include-headless "chunk/option-tcp-keepalive-time.md" >}}

{{% include-headless "chunk/option-destination-template.md" %}}

{{% include-headless "chunk/option-destination-template-escape.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-destination-timezone.md" %}}

{{% include-headless "chunk/option-tls.md" %}}

{{% include-headless "chunk/option-destination-transport.md" %}}

{{< include-headless "chunk/option-destination-ts-format.md" >}}
