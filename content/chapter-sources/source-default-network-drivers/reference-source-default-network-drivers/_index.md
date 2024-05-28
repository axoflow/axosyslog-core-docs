---
title: "default-network-drivers() source options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `systemd-journal()` driver has the following options.

{{% include-headless "chunk/option-destination-tls-ca-dir.md" %}}

{{< include-headless "chunk/option-destination-tls-ca-file.md" >}}

{{< include-headless "chunk/option-source-flags.md" >}}

{{< include-headless "chunk/option-source-log-iw-size.md" >}}

{{< include-headless "chunk/option-source-log-msg-size.md" >}}

{{% include-headless "chunk/option-source-max-connections.md" %}}

Note that the total number of connections the `default-network-drivers()` source can use is 3\*`max-connections()`, because this value applies to the `network(tcp)`, `syslog(tcp)`, and `syslog(tls)` connections individually.



## rfc5424-tcp-port()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 601    |

*Description:* The TCP port number where the `default-network-drivers()` source receives RFC5424-formatted (IETF-syslog) messages.



## rfc5424-tls-port()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 6514   |

*Description:* The TCP port number where the `default-network-drivers()` source receives RFC5424-formatted (IETF-syslog), TLS-encrypted messages.

{{% alert title="Warning" color="warning" %}}

To receive messages using a TLS-encrypted connection, you must set the `tls(key-file() cert-file())` options of the `default-network-drivers()` source. For example:

```shell
   source s_network {
        default-network-drivers(
            tls(
                key-file("/path/to/ssl-private-key")
                cert-file("/path/to/ssl-cert")
            )
        );
    };
```
{{% /alert %}}

## tcp-port()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 514    |

*Description:* The TCP port number where the `default-network-drivers()` source receives RFC3164-formatted (BSD-syslog) messages.


{{% include-headless "chunk/option-tls.md" %}}


## udp-port()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 514    |

*Description:* The UDP port number where the `default-network-drivers()` source receives RFC3164-formatted (BSD-syslog) messages.

