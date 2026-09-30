---
title: "network: Send messages to a remote log server using the RFC3164 protocol (network() driver)"
weight:  3500
driver: "network()"
short_description: "Send messages to a remote log server using the RFC3164 protocol"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The network() destination driver can send syslog messages conforming to RFC3164 from the network using the TCP, TLS, and UDP networking protocols.

{{% include-headless "chunk/topic-network-driver-protocols.md" %}}


## Declaration:

```shell
   network("<destination-address>" [options]);
```

The `network()` destination has a single required parameter that specifies the destination host address where messages should be sent. If name resolution is configured, you can use the hostname of the target server. By default, {{% param "product.abbrev" %}} sends messages using the TCP protocol to port 514.


## Example: Using the network() driver {#example-destination-network}

TCP destination that sends messages to `10.1.2.3`, port `1999`:

```shell
   destination d_tcp { network("10.1.2.3" port(1999)); };
```

If name resolution is configured, you can use the hostname of the target server as well.

```shell
   destination d_tcp { network("target_host" port(1999)); };
```

TCP destination that sends messages to the `::1` IPv6 address, port `2222`.

```shell
   destination d_tcp6 {
        network(
            "::1"
            port(2222)
            transport(tcp)
            ip-protocol(6)
            );
    };
```

To send messages using the IETF-syslog message format without using the IETF-syslog protocol, enable the `syslog-protocol` flag. (For details on how to use the IETF-syslog protocol, see {{% xref "/chapter-destinations/configuring-destinations-syslog/reference-destination-syslog-chapter/_index.md" %}}.)

```shell
   destination d_tcp { network("10.1.2.3" port(1999) flags(syslog-protocol) ); };
```

## Batching writes with flush-lines() {#write-coalescing}

Available in {{% param "product.name" %}} 4.26 and later.

When a `network()` or `tcp()` destination uses a TCP or TLS transport, {{% param "product.abbrev" %}} writes several messages to the transport with a single operation instead of one per message. It accumulates up to [`flush-lines()`]({{< relref "/chapter-global-options/reference-options/_index.md#global-option-flush-lines" >}}) formatted messages and sends them together: over TCP as one `writev()` system call, and over TLS as few `SSL_write()` calls as fit into a TLS record. Fewer system calls per message reduces overhead and can increase throughput. As with `flush-lines()` on any destination, larger batches trade a small amount of latency for that throughput, because a message can wait for the batch to fill (or for the queue to empty) before it is sent.

This applies only to the stream-based transports. UDP destinations are unaffected, because each datagram already carries exactly one message, and the `syslog()` destination is unaffected as well, because it frames every message individually.

### Controlling the behavior with the configuration version {#write-coalescing-version}

The global default of `flush-lines()` is `100`, so batching is enabled by default once your configuration declares `@version: 4.26` (or later). Configurations that declare an older version keep the previous one-write-per-message behavior, so that upgrading {{% param "product.abbrev" %}} does not silently change how an existing configuration sends messages.

If your configuration declares a version older than `4.26` and does not set `flush-lines()` on the destination, {{% param "product.abbrev" %}} logs a warning once and keeps the pre-4.26 behavior. To adopt batching and stop the warning, either raise the configuration version to `4.26` or set `flush-lines()` explicitly on the destination. Setting `flush-lines()` explicitly always takes effect, regardless of the configuration version.

To keep (or restore) one write per message, set `flush-lines(1)`:

```shell
   destination d_tcp { network("10.1.2.3" port(1999) flush-lines(1)); };
```

