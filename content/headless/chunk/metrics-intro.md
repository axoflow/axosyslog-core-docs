---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
{{% param "product.abbrev" %}} provides detailed metrics about its performance and status for observability and monitoring. We recommend using Prometheus to scrape these metrics, see {{% xref "/chapter-log-statistics/prometheus-exporter/_index.md" %}} for details. To display the current metrics locally in Prometheus-compatible format, run:

```shell
syslog-ng-ctl stats prometheus
```

Note that which metrics are shown depends on the current value of the [`stats(level())` global option]({{< relref "/chapter-global-options/reference-options/_index.md#global-option-stats-level" >}}) (you can list the available metrics by running `syslog-ng --metrics-registry`). For details on what the metrics mean, see {{% xref "/chapter-log-statistics/metrics-reference/_index.md" %}}.
