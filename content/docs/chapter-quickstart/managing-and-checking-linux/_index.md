---
title: "Managing and checking the syslog-ng service on Linux"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section describes how to start, stop and check the status of {{% param "product.name" %}} ({{% param "product.abbrev" %}}) service on Linux.


## Starting {{% param "product.abbrev" %}}

To start {{% param "product.abbrev" %}}, execute the following command as root. For example:

`systemctl start syslog-ng`

If the service starts successfully, no output will be displayed.

The following message indicates that {{% param "product.abbrev" %}} can not start (see [Checking {{% param "product.abbrev" %}} status](#check-syslog-ng-status)):

    Job for syslog-ng.service failed because the control process exited with error code. See `systemctl status syslog-ng.service` and `journalctl -xe` for details.

## Stopping {{% param "product.abbrev" %}}

To stop {{% param "product.abbrev" %}}

1.  Execute the following command as root.
    
    `systemctl stop syslog-ng`

2.  Check the status of {{% param "product.abbrev" %}} service (see [Checking {{% param "product.abbrev" %}} status](#check-syslog-ng-status)).

## Restarting {{% param "product.abbrev" %}}

To restart {{% param "product.abbrev" %}}, execute the following command as root.

`systemctl restart syslog-ng`

## Reloading configuration file without restarting {{% param "product.abbrev" %}}

To reload the configuration file without restarting {{% param "product.abbrev" %}}, execute the following command as root.

`systemctl reload syslog-ng`

## Checking {{% param "product.abbrev" %}} status

To check the following status-related components, observe the suggestions below.

### Checking the status of {{% param "product.abbrev" %}} service

To check the status of {{% param "product.abbrev" %}} service

1.  Execute the following command as root.

    `systemctl --no-pager status syslog-ng`

2.  Check the <span class="code">Active:</span> field, which shows the status of {{% param "product.abbrev" %}} service. The following statuses are possible:
    
    - `active (running)` - {{% param "product.abbrev" %}} service is up and running

        ```c
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

    - `inactive (dead)` - syslog-ng service is stopped

        ```c
            syslog-ng.service - System Logger Daemon
            Loaded: loaded (/lib/systemd/system/syslog-ng.service; enabled; vendor preset: enabled)
            Active: inactive (dead) since Tue 2019-06-25 09:14:16 CEST; 2min 18s ago
            Process: 6575 ExecStart=/opt/syslog-ng/sbin/syslog-ng -F --no-caps --enable-core $SYSLOGNG_OPTIONS (code=exited, status=0/SUCCESS)
            Main PID: 6575 (code=exited, status=0/SUCCESS)
            Status: "Shutting down... Tue Jun 25 09:14:16 2019"
            Jun 25 09:14:31 as-syslog-srv systemd: Stopped System Logger Daemon.
        ```

### Checking the process of {{% param "product.abbrev" %}}

To check the process of {{% param "product.abbrev" %}}, execute one of the following commands.

- `ps u `pidof syslog-ng``
    
    Expected output example:

    <span class="code">USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND</span>
    
    <span class="code">syslogng 6709 0.0 0.6 308680 13432 ? Ss 09:17 0:00 /opt/syslog-ng/libexec/syslog-ng -F --no-caps --enable-core</span>

- `ps axu | grep syslog-ng | grep -v grep`
    
    Expected output example:
    
    <span class="code">syslogng 6709 0.0 0.6 308680 13432 ? Ss 09:17 0:00 /opt/syslog-ng/libexec/syslog-ng -F --no-caps --enable-core</span>

### Checking the internal logs of {{% param "product.abbrev" %}}
    
The internal logs of {{% param "product.abbrev" %}} contains informal, warning and error messages.

By default, {{% param "product.abbrev" %}} log messages (generated on the <span class="code">internal()</span> source) are written to `/var/log/messages`.

Check the internal logs of {{% param "product.abbrev" %}} for any issue.

### <span id="stats"></span> Message processing

The {{% param "product.abbrev" %}} application collects statistics about the number of processed messages on the different sources and destinations.

{{% alert title="Note" color="info" %}}
When using `syslog-ng-ctl stats`, consider that while the output is generally consistent, there is no explicit ordering behind the command. Consequently, {{% param "product.companyabbrev" %}} does not recommend creating parsers that depend on a fix output order.

If needed, you can sort the output with an external application, for example, `| sort`.
{{% /alert %}}

#### Central statistics

To check the central statistics, execute the following command to see the number of received and queued (sent) messages by {{% param "product.abbrev" %}}.

`watch "/opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^center"`

The output will be updated in every 2 seconds. If the numbers are changing, {{% param "product.abbrev" %}} is processing the messages. Output example:

```c
    Every 2.0s: /opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^center       Tue Jun 25 10:33:25 2019
    center;;queued;a;processed;112
    center;;received;a;processed;28
```

#### Source statistics

To check the source statistics, execute the following command to see the number of received messages on the configured sources.

`watch "/opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^source"`

The output will be updated in every 2 seconds. If the numbers are changing, {{% param "product.abbrev" %}} is receiving messages on the sources. Output example:

```c
    Every 2.0s: /opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^source      Tue Jun 25 10:40:50 2019
    source;s_null;;a;processed;0
    source;s_net;;a;processed;0
    source;s_local;;a;processed;90
```

#### Destination statistics

To check the source statistics, execute the following command to see the number of received messages on the configured sources.

`watch "/opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^source"`

The output will be updated in every 2 seconds. If the numbers are changing, {{% param "product.abbrev" %}} is receiving messages on the sources. Output example:

```c
    Every 2.0s: /opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^destination      Tue Jun 25 10:41:02 2019
    destination;d_logserver2;;a;processed;90
    destination;d_messages;;a;processed;180
    destination;d_logserver;;a;processed;90
    destination;d_null;;a;processed;0
```

{{% alert title="Note" color="info" %}}
If you find error messages in the internal logs, messages are not processed by {{% param "product.abbrev" %}} or you encounter any issue, you have the following options:

- [Open a GitHub issue](https://github.com/syslog-ng/syslog-ng/issues) including the results.
- {{< param "product.contact" >}}
{{% /alert %}}
