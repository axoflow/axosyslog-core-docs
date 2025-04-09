---
title: "facility()"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

|           |                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------ |
| Synopsis: | `facility(<facility-name>)` or `facility(<facility-code>)` or `facility(<facility-name>..<facility-name>)` |

*Description:* Match messages having one of the listed facility codes.

The `facility()` filter accepts both the name and the numerical code of the facility or the importance level. Facility codes 0-23 are predefined and can be referenced by their usual name. Facility codes above 24 are not defined.

You can use the facility filter the following ways:

- Use a single facility name, for example, `facility(user)`
- Use a single facility code, for example, `facility(1)`
- Use a facility range (works only with facility names), for example, `facility(local0..local5)`

The AxoSyslog application recognizes the following facilities: (Note that some of these facilities are available only on specific platforms.)

The `facility()` filter recognizes the following syslog facilities:

{{< include-headless "chunk/table-facility-codes.md" >}}
