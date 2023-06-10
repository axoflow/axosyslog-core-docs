---
title: "filter()"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

|           |                    |
| --------- | ------------------ |
| Synopsis: | filter(filtername) |

*Description:* Call another filter rule and evaluate its value. For example:

```c

    filter demo_filter { host("example") and match("deny" value("MESSAGE")) };
    filter inverted_demo_filter { not filter(demo_filter) }

```
