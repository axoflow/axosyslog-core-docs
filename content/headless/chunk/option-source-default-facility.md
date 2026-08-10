---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## default-facility()

|          |                 |
| -------- | --------------- |
| Type:    | facility string |
| Default: | user            |

*Description:* This parameter assigns a facility value to the messages received from the source if the message does not specify one. The default is `user` (`kern` for [kernel sources]({{< relref "/chapter-sources/configuring-sources-file/kernel-messages/_index.md" >}})).

