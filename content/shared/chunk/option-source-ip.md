---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## ip() or localip()

|          |         |
| -------- | ------- |
| Type:    | string  |
| Default: | 0.0.0.0 |

*Description:* The IP address to bind to. By default, {{% productparam "abbrev" %}} listens on every available interface. Note that this is not the address where messages are accepted from.

If you specify a multicast bind address and use the **udp** transport, {{% productparam "abbrev" %}} automatically joins the necessary multicast group. TCP does not support multicasting.

