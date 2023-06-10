---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## send-time-zone()

|                  |                                              |
| ---------------- | -------------------------------------------- |
| Accepted values: | name of the timezone, or the timezone offset |
| Default:         | local timezone                               |

*Description:* Specifies the time zone associated with the messages sent by `syslog-ng`, if not specified otherwise in the message or in the destination driver. For details, see {{% xref "/docs/chapter-concepts/timezone-handling/_index.md" %}}.

{{% include-headless "chunk/para-timezone-format.md" %}}

