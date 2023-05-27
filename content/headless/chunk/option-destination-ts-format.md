
---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## ts-format()

|          |                            |
| -------- | -------------------------- |
| Type:    | rfc3164, bsd, rfc3339, iso |
| Default: | rfc3164                    |

*Description:* Override the global timestamp format (set in the global `ts-format()` parameter) for the specific destination. For details, see [ts-format()]({{< relref "/docs/chapter-global-options/reference-options/_index.md" >}}).

{{< include-headless "wnt/note-ts-format-network.md" >}}

