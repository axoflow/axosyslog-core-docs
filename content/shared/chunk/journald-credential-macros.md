---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
| Journald field               | syslog-ng predefined macro                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| MESSAGE                      | $MESSAGE                                                                                                           |
| _HOSTNAME                   | $HOST                                                                                                              |
| _PID                        | $PID                                                                                                               |
| _COMM or SYSLOG_IDENTIFIER | $PROGRAM If both _COMM and SYSLOG_IDENTIFIER exists, {{% productparam "abbrev" %}} uses SYSLOG_IDENTIFIER |
| SYSLOG_FACILITY             | $FACILITY_NUM                                                                                                     |
| PRIORITY                     | $LEVEL_NUM                                                                                                        |

Predefined macros
