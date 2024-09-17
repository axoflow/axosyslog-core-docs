---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## log-msg-size()

|          |                                                                                 |
| -------- | ------------------------------------------------------------------------------- |
| Type:    | number (bytes)                                                                  |
| Default: | Use the global `log-msg-size()` option, which defaults to `65536` (64 KiB). |

{{< include-headless "chunk/option-description-log-msg-size.md" >}}

Uses the value of the [global option]({{< relref "/chapter-global-options/reference-options/_index.md#global-option-log-msg-size" >}}) if not specified.
