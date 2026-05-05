---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
- `--control=<socket>` or `-c`

    Specify the socket to use to access {{% param "product.abbrev" %}}. Only needed when using a non-standard socket.

- `--reset=<socket>` or `-r`

    Reset all statistics to zero, except for the `queued` and the `memory_usage` counters. (The `queued` counters show the number of messages in the message queue of the destination driver, waiting to be sent to the destination. The `memory_usage` counters show the amount of memory used by the messages in the different queue types (in bytes). This includes every queue used by the object, including memory buffers (log-fifo) and disk-based buffers (both reliable and non-reliable))

- `--remove-orphans`

    Safely removes all counters that are not referenced by any `syslog-ng stat` producer objects.

    The flag can be used to prune dynamic and static counters manually. This is useful, for example, when a templated file destination produces a lot of stats. We recommend using `syslog-ng-ctl stats --remove-orphans` during each configuration reload, but only after the values of those metrics have been scraped by all scrapers.

    ```shell
    dst.file;#anon-destination0#0;/tmp/2021-08-16.log;o;processed;253592
    dst.file;#anon-destination0#0;/tmp/2021-08-17.log;o;processed;156
    dst.file;#anon-destination0#0;/tmp/2021-08-18.log;a;processed;961
    ```

- `--with-legacy-metrics`

    Display legacy metrics in Prometheus-compatible format.

    {{% alert title="Note" color="info" %}}
The [`stats(lifetime())` global option]({{< relref "/chapter-global-options/reference-options/_index.md#global-option-stats-lifetime" >}}) can be used to do the same automatically and periodically, but `stats(lifetime())` removes only dynamic counters that have a timestamp field set.
    {{% /alert %}}
