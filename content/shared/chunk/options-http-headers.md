---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## headers()

|          |             |
| -------- | ----------- |
| Type:    | string list |
| Default: | empty       |

*Description:* Custom HTTP headers to include in the request, for example, `headers("HEADER1: header1", "HEADER2: header2")`. If not set, only the default headers are included, but no custom headers.

The following headers are included by default:

  - X-Syslog-Host: \<host\>

  - X-Syslog-Program: \<program\>

  - X-Syslog-Facility: \<facility\>

  - X-Syslog-Level: \<loglevel/priority\>

