---
title: Jellyfin logs
linktitle: "Jellyfin logs"
weight: 1280
driver: "jellyfin()"
short_description: "Collect Jellyfin logs"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

You can use the `jellyfin()` source to read [Jellyfin](https://jellyfin.org/) logs from its log file output.

## Prerequisites

- {{% param "product.name" %}} version 4.7.0 or later.
- {{< include-headless "chunk/prereq-package-scl.md" >}}

    {{< include-headless "chunk/scl-config-snippet.md" "jellyfin()" "scl/jellyfin/jellyfin.conf" >}}

## Configuration

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
