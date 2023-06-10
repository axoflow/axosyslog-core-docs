---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## tcp-keepalive-intvl()

|          |                    |
| -------- | ------------------ |
| Type:    | number [seconds] |
| Default: | 0                  |

*Description:* Specifies the interval (number of seconds) between subsequential keepalive probes, regardless of the traffic exchanged in the connection. This option is equivalent to `/proc/sys/net/ipv4/tcp_keepalive_intvl`. The default value is `0`, which means using the kernel default.

{{% include-headless "wnt/warning-tcp-keepalive.md" %}}

Available in {{% productparam "abbrev" %}} version {{% conditional-text include-if="ose" %}}3.4{{% /conditional-text %}} and later.

