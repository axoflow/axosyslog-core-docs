---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## log-iw-size()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 100    |

*Description:* The number of messages a given source can accept before they are forwarded to the destination. This value is used during flow-control.
If a `max-connections()` setting is in effect (for example in case of TCP sources), the `log-iw-size()` value means the total window size, and it's divided proportionally between the connections.
Its value cannot be lower than 100, unless the `dynamic-window-size()` option is enabled, which increases the effective windows size dynamically.
For details about the effects of this parameter, see {{% xref "/chapter-routing-filters/concepts-flow-control/_index.md" %}}.

