---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## log-iw-size()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 100    |

*Description:* Specifies the source window size - the maximum number of in-flight messages permitted by the source before flow control is enforced. This only applies when `flow-control` is enabled.

{{< include-headless "wnt/warning-log-iw-size-restart.md" >}}

Note that when using `disk-buffer()`, the messages stored on disk are not included in the window size calculation. For details about the effects of this parameter, see {{% xref "/chapter-routing-filters/concepts-flow-control/_index.md" %}}.
