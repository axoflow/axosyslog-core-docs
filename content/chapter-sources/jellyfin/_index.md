---
title: Jellyfin logs
linktitle: "Jellifin logs"
weight: 1280
driver: "jellyfin()"
short_description: "Collect Jellyfin logs"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.7.0, you can use the `jellyfin()` source to read [Jellyfin](https://jellyfin.org/) logs from its log file output.

Example minimal configuration:

```shell
source s_jellyfin {
    jellyfin(
    base-dir("/path/to/my/jellyfin/root/log/dir")
    filename-pattern("log_*.log")
    );
};
```

For more details about Jellyfin logging, see:

- https://jellyfin.org/docs/general/administration/configuration/#main-configuration
- https://jellyfin.org/docs/general/administration/configuration/#log-directory

As the `jellyfin()` source is based on the [`wildcard-file()` source]({{< relref "/chapter-sources/configuring-sources-wildcard-file/_index.md" >}}), you can use the [`wildcard-file()` source options]({{< relref "/chapter-sources/configuring-sources-wildcard-file/reference-source-wildcard-file/_index.md" >}}).

This driver is actually a reusable configuration snippet. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/jellyfin/jellyfin.conf).
