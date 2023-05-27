---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## keep-alive()

|          |           |
| -------- | --------- |
| Type:    | yes or no |
| Default: | yes       |

*Description:* Specifies whether connections to sources should be closed when `syslog-ng` is forced to reload its configuration (upon the receipt of a SIGHUP signal). Note that this applies to the server (source) side of the `syslog-ng` connections, client-side (destination) connections are always reopened after receiving a HUP signal unless the `keep-alive` option is enabled for the destination.

