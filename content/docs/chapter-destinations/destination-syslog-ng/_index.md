---
title: "syslog-ng(): Forward logs to another syslog-ng node"
weight:  6700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `syslog-ng()` destination driver forwards log messages to another syslog-ng node in EWMM format.

{{% include-headless "chunk/ewmm-intro.md" %}}

The `syslog-ng()` destination driver is available in version 3.16 and later. The node that receives this message must use the [default-network-drivers() source]({{< relref "/docs/chapter-sources/source-default-network-drivers/_index.md" >}}) to properly handle the messages.

{{% include-headless "chunk/example-ewmm-message-format.md" %}}


## Declaration:

```c
   destination d_ewmm {
        syslog-ng(server("192.168.1.1"));
    };
```

Note in this driver you have to set the address of the destination server using the `server()` parameter (in some other destinations, this parameter does not have an explicit name).



## syslog-ng() destination options {#reference-destination-syslog-ng}

The `syslog-ng()` destination is a special version of the `network()` destination driver: by default, it sends EWMM-formatted log messages to the TCP514 port of the server.

{{% include-headless "chunk/option-destination-tls-ca-dir.md" %}}

{{% include-headless "chunk/option-destination-tls-ca-file.md" %}}

{{% include-headless "chunk/option-destination-diskbuffer.md" %}}

{{% include-headless "chunk/option-destination-failover.md" %}}

{{% include-headless "chunk/example-failover-server-syslog.md" %}}

{{% include-headless "chunk/option-destination-flags.md" %}}

{{% include-headless "chunk/option-destination-flush-lines.md" %}}

{{% include-headless "chunk/option-destination-frac-digits.md" %}}

{{% include-headless "chunk/option-source-ip-protocol.md" %}}

{{% include-headless "chunk/option-ip-tos.md" %}}

{{% include-headless "chunk/option-ip-ttl.md" %}}

{{% include-headless "chunk/option-destination-keep-alive.md" %}}

{{% include-headless "chunk/option-destination-localip.md" %}}

{{% include-headless "chunk/option-destination-localport.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{% include-headless "chunk/option-destination-mark-freq.md" %}}

{{% include-headless "chunk/option-destination-mark-mode.md" %}}

{{% include-headless "chunk/option-destination-syslog-port.md" %}}



## server()

|          |                        |
| -------- | ---------------------- |
| Type:    | hostname or IP address |
| Default: | 127.0.0.1              |

*Description:* The hostname or IP address of the syslog-ng server.


{{% include-headless "chunk/option-so-broadcast.md" %}}

{{% include-headless "chunk/option-source-so-keepalive.md" %}}

{{% include-headless "chunk/option-destination-so-rcvbuf..md" %}}

{{% include-headless "chunk/option-so-sndbuf.md" %}}

{{% include-headless "chunk/option-destination-suppress.md" %}}

{{% include-headless "chunk/option-tcp-keepalive-intvl.md" %}}

{{% include-headless "chunk/option-tcp-keepalive-probes.md" %}}

{{% include-headless "chunk/option-tcp-keepalive-time.md" %}}

{{% include-headless "chunk/option-destination-template.md" %}}

{{% include-headless "chunk/option-destination-template-escape.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-destination-timezone.md" %}}

{{% include-headless "chunk/option-tls.md" %}}

{{% include-headless "chunk/option-destination-transport.md" %}}

{{% include-headless "chunk/option-destination-ts-format.md" %}}
