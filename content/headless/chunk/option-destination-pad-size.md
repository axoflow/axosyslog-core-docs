---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## pad-size()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 0      |

*Description:* If set, {{% param "product.abbrev" %}} will pad output messages to the specified size (in bytes). Some operating systems (such as HP-UX) pad all messages to block boundary. This option can be used to specify the block size. (HP-UX uses 2048 bytes).

{{% alert title="Warning" color="warning" %}}

Hazard of data loss\! If the size of the incoming message is larger than the previously set `pad-size()` value, `syslog-ng` will truncate the message to the specified size. Therefore, all message content above that size will be lost.

{{% /alert %}}

