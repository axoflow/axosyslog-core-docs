---
title: "Log paths"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Log paths determine what happens with the incoming log messages. Messages coming from the sources listed in the log statement and matching all the filters are sent to the listed destinations.

To define a log path, add a log statement to the syslog-ng configuration file using the following syntax:


## Declaration

{{% include-headless "chunk/synopsis-log-path.md" %}}


{{% alert title="Warning" color="warning" %}}
Log statements are processed in the order they appear in the configuration file, thus the order of log paths may influence what happens to a message, especially when using filters and log flags.
{{% /alert %}}

{{< include-headless "wnt/note-element-order.md" >}}

In {{% param "product.abbrev" %}} version 4.1 and later, you can add an ID or name to the log path to make the configuration file more readable. Also, {{% param "product.abbrev" %}} collects ingress and egress metrics for named log paths. For example:

```shell
log top-level {
    source(s_local);

    log inner-1 {
        filter(f_inner_1);
        destination(d_local_1);
    };

    log inner-2 {
        filter(f_inner_2);
        destination(d_local_2);
    };
};
```

## Example: A simple log statement {#log-statement-example}

{{% include-headless "chunk/log-statement.md" %}}


All matching log statements are processed by default, and the messages are sent to *every* matching destination by default. So a single log message might be sent to the same destination several times, provided the destination is listed in several log statements, and it can be also sent to several different destinations.

This default behavior can be changed using the `flags()` parameter. Flags apply to individual log paths, they are not global options. For details and examples on the available flags, see {{% xref "/chapter-routing-filters/logpath/reference-logflags/_index.md" %}}. The effect and use of the `flow-control` flag is detailed in {{% xref "/chapter-routing-filters/concepts-flow-control/_index.md" %}}.
