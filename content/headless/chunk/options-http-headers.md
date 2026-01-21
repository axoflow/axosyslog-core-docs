---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## headers()

|          |             |
| -------- | ----------- |
| Type:    | string list |
| Default: | see description |

*Description:* Custom HTTP headers to include in the request, for example, `headers("HEADER1: header1", "HEADER2: header2")`. If not set, only the default headers are included, but no custom headers.

The following headers are included by default:

- X-Syslog-Host: `<host>`
- X-Syslog-Program: `<program>`
- X-Syslog-Facility: `<facility>`
- X-Syslog-Level: `<loglevel/priority>`

Starting with {{< product >}} 4.18, you can use templates in the headers. Note that when using batching in the destination adn templates in `headers()`, the value of the template is calculated from the first message of the batch. Make sure to set the [`worker-partition-key()`](#worker-partition-key) option properly to group similar messages.

If you want to use literal dollar signs (`$`) in `headers()`, escape them like `$$`.
