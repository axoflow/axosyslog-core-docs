---
title: "network: Sending messages to a remote log server using the RFC3164 protocol (network() driver)"
weight:  3500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The network() destination driver can send syslog messages conforming to RFC3164 from the network using the TCP, TLS, and UDP networking protocols.

You can use the RLTP protocol as well. For details about the RLTP protocol, see <span></span>.

{{% include-headless "chunk/topic-network-driver-protocols.md" %}}


## Declaration:

```c
   network("<destination-address>" [options]);
```

The `network()` destination has a single required parameter that specifies the destination host address where messages should be sent. If name resolution is configured, you can use the hostname of the target server. By default, {{% param "product.abbrev" %}} sends messages using the TCP protocol to port 514.


## Example: Using the network() driver {#example-destination-network}

TCP destination that sends messages to `10.1.2.3`, port `1999`:

```c
   destination d_tcp { network("10.1.2.3" port(1999)); };
```

If name resolution is configured, you can use the hostname of the target server as well.

```c
   destination d_tcp { network("target_host" port(1999)); };
```

TCP destination that sends messages to the `::1` IPv6 address, port `2222`.

```c
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

```c
   destination d_tcp { network("10.1.2.3" port(1999) flags(syslog-protocol) ); };
```


