---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## log-prefix() (DEPRECATED)

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* A string added to the beginning of every log message. It can be used to add an arbitrary string to any log source, though it is most commonly used for adding `kernel:` to the kernel messages on Linux.

{{% alert title="Note" color="info" %}}

This option is deprecated. Use **program-override** instead.

{{% /alert %}}

