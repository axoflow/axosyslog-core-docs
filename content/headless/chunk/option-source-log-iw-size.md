---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## log-iw-size()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 100    |

*Description:* The size of the initial window, this value is used during flow-control. Its value cannot be lower than 100, unless the `dynamic-window-size()` option is enabled. For details on flow-control, see {{% xref "/chapter-routing-filters/concepts-flow-control/_index.md" %}}.

