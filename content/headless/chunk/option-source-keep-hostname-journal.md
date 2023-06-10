---
---
<!-- DISCLAIMER: This file is based on the `syslog-ng` Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## keep-hostname()

|          |           |
| -------- | --------- |
| Type:    | yes or no |
| Default: | no        |

*Description:* Enable or disable hostname rewriting.

  - If enabled (`keep-hostname(yes)`), {{% param "product.abbrev" %}} will retain the hostname information read from the systemd journal messages.

  - If disabled (`keep-hostname(no)`), {{% param "product.abbrev" %}} will use the hostname that has been set up for the operating system instance that `syslog-ng` is running on. To query or set this value, use the `hostnamectl` command.

This option can be specified globally, and per-source as well. The local setting of the source overrides the global option if available.

