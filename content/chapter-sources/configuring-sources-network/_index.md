---
title: "network: Collect messages using the RFC3164 protocol (network() driver)"
weight:  1700
driver: "network()"
short_description: "Collect messages using the RFC3164 protocol"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The network() source driver can receive syslog messages conforming to RFC3164 from the network using the TCP, TLS, and UDP networking protocols.

{{% include-headless "chunk/topic-network-driver-protocols.md" %}}


## Declaration:

```shell
   network([options]);
```


By default, the `network()` driver binds to `0.0.0.0`, meaning that it listens on every available IPV4 interface on the TCP/514 port. To limit accepted connections to only one interface, use the `localip()` parameter. To listen on IPv6 addresses, use the `ip-protocol(6)` option.


## Example: Using the network() driver {#example-source-network}

Using only the default settings: listen on every available IPV4 interface on the TCP/514 port.

```shell
   source s_network {
        network();
    };
```

UDP source listening on `192.168.1.1` (the default port for UDP is 514):

```shell
   source s_network {
        network(
            ip("192.168.1.1")
            transport("udp")
        );
    };
```

TCP source listening on the IPv6 localhost, port 2222:

```shell
   source s_network6 {
        network(
            ip("::1")
            transport("tcp")
            port(2222)
            ip-protocol(6)
        );
    };
```

A TCP source listening on a TLS-encrypted channel.

```shell
   source s_network {
        network(
            transport("tls")
            port(2222)
            tls(peer-verify("required-trusted")
                key-file("/opt/syslog-ng/etc/syslog-ng/syslog-ng.key")
                cert-file("/opt/syslog-ng/etc/syslog-ng/syslog-ng.crt")
            );
        );
    };
```

A TCP source listening for messages using the IETF-syslog message format. Note that for transferring IETF-syslog messages, generally you are recommended to use the `syslog()` driver on both the client and the server, as it uses both the IETF-syslog message format and the protocol. For details, see {{% xref "/chapter-sources/source-syslog/_index.md" %}}.

```shell
   source s_tcp_syslog {
        network(
            ip("127.0.0.1")
            flags(syslog-protocol)
        );
    };
```


For details on the options of the `network()` source, see {{% xref "/chapter-sources/configuring-sources-network/reference-source-network/_index.md" %}}.
