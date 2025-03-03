---
---
{{< include-headless "tagline.md" >}}
{{< product >}} is a drop-in replacement for `syslog-ng`, created by the original creators of `syslog-ng`. (It started as a fork, branched after syslog-ng&trade; v4.7.1).

## AxoSyslog, the drop-in `syslog-ng` replacement

AxoSyslog provides the:

- same binaries (for example, `/usr/sbin/syslog-ng`),
- same configuration files (`/etc/syslog-ng/syslog-ng.conf`), certificates, etc.,
- same configuration syntax, and the
- same license and development practices.

If you’re already using `syslog-ng`, you can [upgrade your existing `syslog-ng` deployments to {{< product >}}]({{< relref "/install/upgrade-syslog-ng/_index.md" >}}) in a matter of minutes.

## More than just a replacement

{{< product >}} also provides:

- detailed metrics about what your pipeline is doing,
- the [FilterX data processing engine]({{< relref "/filterx/_index.md" >}}),
- enhanced container and Kubernetes support, including [Helm charts]({{< relref "/install/helm/_index.md" >}}),
- eBPF integration for efficient kernel-level data collection with minimal overhead,
- destinations for [ClickHouse]({{< relref "/chapter-destinations/clickhouse/_index.md" >}}), [Microsoft Sentinel, Azure Monitor]({{< relref "/chapter-destinations/azure-monitor/_index.md" >}}), [Google Pub/Sub]({{< relref "/chapter-destinations/google-pubsub-grpc/_index.md" >}}), and many more modern services,
- [regular releases](https://github.com/axoflow/axosyslog/releases) with new features, and
- responsive and helpful [community and professional support for {{< product >}} and `syslog-ng`]({{< relref "/support/_index.md" >}}).
