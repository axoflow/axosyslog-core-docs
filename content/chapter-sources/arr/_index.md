---
title: Arr logs
linktitle: "*arr() logs"
weight: 100
driver: "lidarr(), prowlarr(), radarr(), readarr(), sonarr(), whisparr()"
short_description: "Collect Pi-hole FTL logs"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{% param "product_name" %}} can collect logs of the [Lidarr, Prowlarr, Radarr, Readarr, and Sonarr](https://github.com/Servarr/Wiki) (often referred to as "*Arr" or "*Arrs") applications.

Use the new `*arr()` sources to read various *arr logs:

- `lidarr()`
- `prowlarr()`
- `radarr()`
- `readarr()`
- `sonarr()`
- `whisparr()`

## Prerequisites

- {{% param "product.name" %}} version 4.7.0 or later.
- {{< include-headless "chunk/prereq-package-scl.md" >}}

    {{< include-headless "chunk/scl-config-snippet.md" "radarr()" "scl/arr/arr.conf" >}}

## Configuration

Example minimal config:

```shell
source s_radarr {
    radarr(
    dir("/path/to/my/radarr/log/dir")
    );
};
```

The logging module is stored in the `<prefix><module>` name-value pair, for example: `.radarr.module` => `ImportListSyncService`.

You can modify the prefix with the `prefix()` option.
