---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## time-zone()

|          |                                              |
| -------- | -------------------------------------------- |
| Type:    | name of the timezone, or the timezone offset |
| Default: | unspecified                                  |

*Description:* Convert timestamps to the timezone specified by this option. If this option is not set, then the original timezone information in the message is used. Converting the timezone changes the values of all date-related macros derived from the timestamp, for example, `HOUR`. For the complete list of such macros, see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/date-macros/_index.md" %}}.

{{% include-headless "chunk/para-timezone-format.md" %}}

