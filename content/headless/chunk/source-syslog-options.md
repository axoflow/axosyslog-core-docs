---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{< include-headless "chunk/option-source-check-hostname.md" >}}

{{% include-headless "chunk/option-source-dynamic-window-size.md" %}}

{{% include-headless "chunk/option-source-ebpf.md" %}}

{{% include-headless "chunk/option-source-encoding.md" %}}


{{< include-headless "chunk/option-source-flags.md" >}}

- *threaded*: The `threaded` flag enables multithreading for the source. For details on multithreading, see {{% xref "/chapter-multithreading/_index.md" %}}.
    
    {{% alert title="Note" color="info" %}}
The `syslog` source uses multiple threads only if the source uses the `tls` or `tcp` transport protocols.
    {{% /alert %}}


{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-source-host-override.md" %}}


## interface()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | None   |

*Description:* Bind to the specified interface instead of an IP address. Available in 3.19 and later.


{{% include-headless "chunk/option-source-ip.md" %}}

{{% include-headless "chunk/option-source-ip-protocol.md" %}}

{{% include-headless "chunk/option-ip-tos.md" %}}

{{% include-headless "chunk/option-ip-ttl.md" %}}

{{% include-headless "chunk/option-source-keep-alive.md" %}}

{{< include-headless "chunk/option-source-keep-hostname.md" >}}

{{< include-headless "chunk/option-source-keep-timestamp.md" >}}

{{% include-headless "chunk/option-source-listen-backlog.md" %}}

{{% include-headless "chunk/option-source-log-fetch-limit.md" %}}


{{% include-headless "chunk/option-source-log-iw-size.md" %}}

If the `max-connections()` option is set, the `log-iw-size()` will be divided by the number of connections, otherwise `log-iw-size()` is divided by 10 (the default value of the `max-connections()` option). The resulting number is the initial window size of each connection. For optimal performance when receiving messages from {{% param "product.abbrev" %}} clients, make sure that the window size is larger than the `flush-lines()` option set in the destination of your clients.


### Example: Initial window size of a connection

If `log-iw-size(1000)` and `max-connections(10)`, then each connection will have an initial window size of 100.



{{< include-headless "chunk/option-source-log-msg-size.md" >}}

{{% include-headless "chunk/option-source-max-connections.md" %}}

{{% include-headless "chunk/option-source-pad-size.md" %}}

{{% include-headless "chunk/option-source-port.md" %}}

{{% include-headless "chunk/option-source-program-override.md" %}}

{{% include-headless "chunk/option-so-broadcast.md" %}}

{{% include-headless "chunk/option-source-so-keepalive.md" %}}

{{< include-headless "chunk/option-source-so-rcvbuf.md" >}}

{{% include-headless "chunk/option-source-so-reuseport.md" %}}

{{% include-headless "chunk/option-so-sndbuf.md" %}}

{{% include-headless "chunk/option-source-tags.md" %}}

{{< include-headless "chunk/option-tcp-keepalive-intvl.md" >}}

{{< include-headless "chunk/option-tcp-keepalive-probes.md" >}}

{{< include-headless "chunk/option-tcp-keepalive-time.md" >}}

{{% include-headless "chunk/option-source-time-zone.md" %}}


{{< include-headless "chunk/option-source-transport.md" >}}

{{< include-headless "wnt/warning-udp-recvbuf.md" >}}


{{% include-headless "chunk/option-source-trim-large-messages.md" %}}

{{% include-headless "chunk/option-tls.md" %}}

{{< include-headless "chunk/option-source-use-dns.md" >}}

{{< include-headless "chunk/option-source-use-fqdn.md" >}}
