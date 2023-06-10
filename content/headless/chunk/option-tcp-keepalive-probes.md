---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## tcp-keepalive-probes()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 0      |

*Description:* Specifies the number of unacknowledged probes to send before considering the connection dead. This option is equivalent to `/proc/sys/net/ipv4/tcp_keepalive_probes`. The default value is `0`, which means using the kernel default.

{{% include-headless "wnt/warning-tcp-keepalive.md" %}}

Available in {{% param "product.abbrev" %}} version 3.4 and later.

