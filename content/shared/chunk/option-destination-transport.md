---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## transport()

|          |                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------- |
| Type:    | {{% conditional-text include-if="pe" %}}rltp, {{% /conditional-text %}}udp, tcp, or tls |
| Default: | tcp                                                                                                                 |

*Description:* Specifies the protocol used to send messages to the destination server.

If you use the `udp` transport, {{% productparam "abbrev" %}} automatically sends multicast packets if a multicast destination address is specified. The `tcp` transport does not support multicasting.

