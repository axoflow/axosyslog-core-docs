---
title: "Options of rate-limit() filter"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The rate-limit() filter has the following options.

## key()

|          |              |
| -------- | ------------ |
| Type:    | template     |
| Default: | empty string |

*Description:* The resolved template, that will be used to create unique rate-limit token buckets. In {{% param "product.abbrev" %}} version 4.4 and earlier, the name of this option was `template()`.

## rate()

|            |        |
| ---------- | ------ |
| Type:      | number |
| Default:   | N/A    |
| Mandatory: | yes    |

*Description:* The number of messages for each unique macro resolution, that will be let through (matched) by the filter each second.
