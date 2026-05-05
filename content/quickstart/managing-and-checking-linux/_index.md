---
title: "Managing and checking the syslog-ng service on Linux"
weight:  700
aliases:
- /chapter-quickstart/managing-and-checking-linux/
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{< include-headless "banner-new-to-axosyslog.md" >}}

This section describes how to start, stop and check the status of {{% param "product.name" %}} service on Linux.

## Starting {{% param "product.abbrev" %}}

To start {{% param "product.abbrev" %}}, execute the following command as root. For example:

`systemctl start syslog-ng`

If the service starts successfully, no output will be displayed.

The following message indicates that {{% param "product.abbrev" %}} can not start (see [Checking {{% param "product.abbrev" %}} status](#check-syslog-ng-status)):

```shell
Job for syslog-ng.service failed because the control process exited with error code. See `systemctl status syslog-ng.service` and `journalctl -xe` for details.
```

## Stop {{% param "product.abbrev" %}}

To stop {{% param "product.abbrev" %}}

1. Execute the following command as root.

    `systemctl stop syslog-ng`

1. Check the status of {{% param "product.abbrev" %}} service (see [Checking {{% param "product.abbrev" %}} status](#check-syslog-ng-status)).

## Restart {{% param "product.abbrev" %}}

To restart {{% param "product.abbrev" %}}, execute the following command as root.

`systemctl restart syslog-ng`

## Reload configuration file without restarting {{% param "product.abbrev" %}}

To reload the configuration file without restarting {{% param "product.abbrev" %}}, execute the following command as root.

`systemctl reload syslog-ng`

## Check {{% param "product.abbrev" %}} status

To check the following status-related components, observe the suggestions below.

### Check the status of {{% param "product.abbrev" %}} service

To check the status of {{% param "product.abbrev" %}} service

1.  Execute the following command as root.

    `systemctl --no-pager status syslog-ng`

2.  Check the `Active:` field, which shows the status of {{% param "product.abbrev" %}} service. The following statuses are possible:
    
    - `active (running)` - `syslog-ng` service is up and running

        ```shell
            syslog-ng.service - System Logger Daemon
            Loaded: loaded (/lib/systemd/system/syslog-ng.service; enabled; vendor preset: enabled)
            Active: active (running) since Tue 2019-06-25 08:58:09 CEST; 5s ago
            Main PID: 6575 (syslog-ng)
            Tasks: 3
            Memory: 13.3M
            CPU: 268ms
            CGroup: /system.slice/syslog-ng.service
            6575 /opt/syslog-ng/libexec/syslog-ng -F --no-caps --enable-core
        ```

    - `inactive (dead)` - `syslog-ng` service is stopped

        ```shell
            syslog-ng.service - System Logger Daemon
            Loaded: loaded (/lib/systemd/system/syslog-ng.service; enabled; vendor preset: enabled)
            Active: inactive (dead) since Tue 2019-06-25 09:14:16 CEST; 2min 18s ago
            Process: 6575 ExecStart=/opt/syslog-ng/sbin/syslog-ng -F --no-caps --enable-core $SYSLOGNG_OPTIONS (code=exited, status=0/SUCCESS)
            Main PID: 6575 (code=exited, status=0/SUCCESS)
            Status: "Shutting down... Tue Jun 25 09:14:16 2019"
            Jun 25 09:14:31 as-syslog-srv systemd: Stopped System Logger Daemon.
        ```

### Check the process of {{% param "product.abbrev" %}}

To check the process of {{% param "product.abbrev" %}}, execute one of the following commands.

- `ps u <pid of syslog-ng>`

    Expected output example:

    ```shell
    USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND
    syslogng 6709 0.0 0.6 308680 13432 ? Ss 09:17 0:00 /opt/syslog-ng/libexec/syslog-ng -F --no-caps --enable-core
    ```

- `ps axu | grep syslog-ng | grep -v grep`

    Expected output example:

    ```shell
    syslogng 6709 0.0 0.6 308680 13432 ? Ss 09:17 0:00 /opt/syslog-ng/libexec/syslog-ng -F --no-caps --enable-core
    ```

### Check the internal logs of {{% param "product.abbrev" %}}

The internal logs of {{% param "product.abbrev" %}} contains informal, warning and error messages.

By default, {{% param "product.abbrev" %}} log messages (generated on the `internal()` source) are written to `/var/log/messages`.

Check the internal logs of {{% param "product.abbrev" %}} for any issue.

{{% alert title="Note" color="info" %}}
If you find error messages in the internal logs, messages aren't processed by {{% param "product.abbrev" %}}, or you encounter any issue, you have the following options:

- [Open a GitHub issue](https://github.com/axoflow/axosyslog/issues) including the results.
- {{% param "product.contact" %}}
{{% /alert %}}

### Monitor {{% param "product.abbrev" %}} {#stats}

To monitor the performance and status of {{% param "product.abbrev" %}} for observability and monitoring, see {{% xref "/chapter-log-statistics/_index.md" %}}.
