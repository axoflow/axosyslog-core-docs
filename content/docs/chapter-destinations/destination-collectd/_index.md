---
title: "collectd: sending metrics to collectd"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `collectd()` destination uses the [unixsock plugin of the collectd application](https://collectd.org/documentation/manpages/collectd-unixsock.5.shtml) to send log messages to the [collectd system statistics collection daemon](https://collectd.org). You must install and configure collectd separately before using this destination.

Available in {{% param "product.abbrev" %}} version {{% conditional-text include-if="ose" %}}3.20{{% /conditional-text %}} and later.


## Declaration:

```c

    collectd();

```

```c

    destination d_collectd {
      collectd(
        socket("<path-to-collectd-socket>"),
        host("${HOST}"),
        plugin("${PROGRAM}"),
        type("<type-of-the-collected-metric>"),
        values("<metric-sent-to-collectd>"),
      );
    };

```



## Example: Using the collectd() driver {#example-destination-collectd}

The following example uses the name of the application sending the log message as the plugin name, and the value of the ${SEQNUM} macro as the value of the metric sent to collectd.

```c

    destination d_collectd {
      collectd(
        socket("/var/run/collectd-unixsock"),
        host("${HOST}"),
        plugin("${PROGRAM}"),
        type("gauge"),
        type_instance("seqnum"),
        values("${SEQNUM}"),
      );
    };

```


To use the `collectd()` driver, the `scl.conf` file must be included in your {{% param "product.abbrev" %}} configuration:

```c

    @include "scl.conf"

```

The `collectd()` driver is actually a reusable configuration snippet configured to send log messages using the `unix-stream()` driver. For details on using or writing such configuration snippets, see {{% xref "/docs/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/collectd/plugin.conf).
