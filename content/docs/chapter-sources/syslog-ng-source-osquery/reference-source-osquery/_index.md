---
title: "osquery() source options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `osquery()` driver has the following options.


## file() {#osquery-file}

|          |                                       |
| -------- | ------------------------------------- |
| Type:    | path                                  |
| Default: | /var/log/osquery/osqueryd.results.log |

*Description:* The log file of `osquery` that stores the results of periodic queries. The {{% param "product.abbrev" %}} application reads the messages from this file.


{{% include-headless "chunk/option-destination-hook.md" %}}


{{% include-headless "chunk/option-parser-prefix.md" %}}


## Default value:

`.osquery.` option.


