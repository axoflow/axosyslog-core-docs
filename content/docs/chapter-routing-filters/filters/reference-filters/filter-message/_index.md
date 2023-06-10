---
title: "message()"
weight:  1300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

|           |                 |
| --------- | --------------- |
| Synopsis: | message(regexp) |

*Description:* Match a regular expression to the text of the log message, excluding the headers (that is, the value returned by the `MSG` macros). Note that in {{% productparam "syslog-ng" %}} version 2.1 and earlier, this functionality was performed by the `match()` filter.
