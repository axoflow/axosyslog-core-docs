---
title: qBittorrent logs
linktitle: "qbittorrent: qBittorrent logs"
weight: 3450
driver: "qbittorrent()"
short_description: "Collect qBittorrent logs"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.6.0, {{% param "product_name" %}} can collect logs of the [qBittorrent](https://www.qbittorrent.org/) application.

```shell
source s_qbittorrent {
  qbittorrent(
    dir("/path/to/qbittorrent-root-log-dir")
  );
};
```

To configure the source, you only have to specify the root log directory of qBittorrent in the `dir()` parameter. You can find the root log directory by selecting **Tools > Preferences > Behavior > Log file > Save path** in the qBittorrent application. Otherwise, the `qbittorrent()` source has the same parameters as the [`file()` source]({{< relref "/chapter-sources/configuring-sources-file/reference-source-file/_index.md" >}}).

The `qbittorrent()` driver is actually a reusable configuration snippet. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/tree/master/scl/qbittorrent).
