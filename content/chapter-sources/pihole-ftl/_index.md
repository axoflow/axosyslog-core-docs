---
title: Pi-hole Faster Than Light logs
linktitle: "pihole-ftl: Pi-hole FTL logs"
weight: 2600
driver: "pihole-ftl()"
short_description: "Collect Pi-hole FTL logs"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.6.0, {{% param "product_name" %}} can collect logs of the [Pi-hole](https://pi-hole.net/) FTL (Faster Than Light) application.

```shell
source s_pihole_ftl {
  pihole-ftl();
};
```

By default, the source reads the `/var/log/pihole/FTL.log` file. If the root directory of your Pi-hole installation is different, specify the directory where the FTL.log file is with the `dir()` option. You can find the root log directory by selecting **Tools > Pi-hole diagnosis** in the Pi-hole application. Otherwise, the `pihole-ftl()` source has the same parameters as the [`file()` source]({{< relref "/chapter-sources/configuring-sources-file/reference-source-file/_index.md" >}}).

The `pihole-ftl()` driver is actually a reusable configuration snippet. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/tree/master/scl/pihole).
