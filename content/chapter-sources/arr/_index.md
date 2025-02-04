---
title: Arr logs
linktitle: "*arr() logs"
weight: 100
driver: "lidarr(), prowlarr(), radarr(), readarr(), sonarr(), whisparr()"
short_description: "Collect Pi-hole FTL logs"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.7.0, {{% param "product_name" %}} can collect logs of the [Lidarr, Prowlarr, Radarr, Readarr, and Sonarr](https://github.com/Servarr/Wiki) (often referred to as "*Arr" or "*Arrs") applications.

Use the new `*arr()` sources to read various *arr logs:

- `lidarr()`
- `prowlarr()`
- `radarr()`
- `readarr()`
- `sonarr()`
- `whisparr()`

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

This driver is actually a reusable configuration snippet. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/master/scl/arr/arr.conf).
