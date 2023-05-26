---
title: "Statistics of syslog-ng"
weight:  3700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.abbrev" %}} application collects various statistics and measures different metrics about the messages it receives and delivers. These metrics are collected into different counters, depending on the configuration of {{% param "product.abbrev" %}}. The [`stats-level()` global option]({{< relref "/docs/chapter-global-options/reference-options/_index.md" >}}) determines exactly which statistics {{% param "product.abbrev" %}} collects. You can access these statistics and metrics using the following methods.


## Recommended: Structured, selective methods:

  - Using the `monitoring()` source.

  - Using the [`syslog-ng-ctl`]({{< relref "/docs/chapter-quickstart/managing-and-checking-linux/_index.md#stats" >}}) query command.
    
    For further information about using `syslog-ng-ctl` commands, see <span class="mcFormatColor" style="color: #04aada;">The `syslog-ng` manual pages</span>.



## Legacy: Unstructured, bulk methods:

  - Using the [`internal()` source]({{< relref "/docs/chapter-log-statistics/log-statistics-internal-source/_index.md" >}}).

  - Using the [`syslog-ng-ctl stats`]({{< relref "/docs/chapter-quickstart/managing-and-checking-linux/_index.md#stats" >}}) command.
    
    For further information about using `syslog-ng-ctl` commands, see <span class="mcFormatColor" style="color: #04aada;">The `syslog-ng` manual pages</span>.

  - Use the `socat` application: `echo STATS | socat -vv UNIX-CONNECT:/opt/syslog-ng/var/run/syslog-ng.ctl -`

  - If you have an OpenBSD-style `netcat` application installed, use the `echo STATS | nc -U /opt/syslog-ng/var/run/syslog-ng.ctl` command. Note that the `netcat` included in most Linux distributions is a GNU-style version that is not suitable to query the statistics of syslog-ng.

