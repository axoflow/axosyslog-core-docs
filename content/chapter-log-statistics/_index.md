---
title: "Statistics and metrics of AxoSyslog"
weight:  3700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.abbrev" %}} application collects various statistics and metrics about its performance and status for observability and monitoring. Which metrics and statistics are collected depends on the configuration of {{% param "product.abbrev" %}} and the value of the [`stats(level())` global option]({{< relref "/chapter-global-options/reference-options/_index.md#global-option-stats-level" >}}).

## Metrics and statistics

- {{< include-headless "chunk/metrics-intro.md" >}}
- Statistics are a legacy way to access the status of {{% param "product.abbrev" %}}. Metrics are newer and in active development. Many metrics aren't available as legacy statistics. You can access legacy statistics using the following methods.

    - The [`syslog-ng-ctl query`]({{< relref "/app-man-syslog-ng/syslog-ng-ctl.1.md#syslog-ng-ctl-query" >}}) command gives structured access to the selected legacy statistics..
    - The [`syslog-ng-ctl stats`]({{< relref "/app-man-syslog-ng/syslog-ng-ctl.1.md#syslog-ng-ctl-stats" >}}) command lists all the available legacy statistics in bulk.
    - Using the [`internal()` source]({{< relref "/chapter-log-statistics/log-statistics-internal-source/_index.md" >}}). We recommend using either of the previous two methods instead.

    For details about the available counters and the output format, see {{% xref "/chapter-log-statistics/log-statistics-description/_index.md" %}}.
