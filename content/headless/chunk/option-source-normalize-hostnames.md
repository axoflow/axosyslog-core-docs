---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## normalize-hostnames()

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | **yes** | **no** |
| Default:         | **no**           |

*Description:* If enabled (**normalize-hostnames(yes)**), {{% param "product.abbrev" %}} converts the hostnames to lowercase.

{{% alert title="Note" color="info" %}}

This setting applies only to hostnames resolved from DNS. It has no effect if the `keep-hostname()` option is enabled, and the message contains a hostname.

{{% /alert %}}

