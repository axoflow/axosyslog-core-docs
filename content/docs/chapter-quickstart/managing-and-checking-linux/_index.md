---
title: "Managing and checking syslog-ng OSE service on Linux"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section describes how to start, stop and check the status of {{% productparam "name" %}} ({{% productparam "abbrev" %}}) service on Linux.


## Starting {{% productparam "abbrev" %}}

To start {{% productparam "abbrev" %}}, execute the following command as root.


## Example: starting {{% productparam "abbrev" %}}

**`systemctl start syslog-ng`**


If the service starts successfully, no output will be displayed.

The following message indicates that {{% productparam "abbrev" %}} can not start (see [Checking {{% productparam "abbrev" %}} status](#check-syslog-ng-status)):

`Job for syslog-ng.service failed because the control process exited with error code. See **systemctl status syslog-ng.service** and **journalctl -xe** for details.`



## Stopping {{% productparam "abbrev" %}}

To stop {{% productparam "abbrev" %}}

1.  Execute the following command as root.
    
    
    ## Example: command for stopping {{% productparam "abbrev" %}}
    
    **`systemctl stop syslog-ng`**
    

2.  Check the status of {{% productparam "abbrev" %}} service (see [Checking {{% productparam "abbrev" %}} status](#check-syslog-ng-status)).



## Restarting {{% productparam "abbrev" %}}

To restart {{% productparam "abbrev" %}}, execute the following command as root.


## Example: command for restarting {{% productparam "abbrev" %}}

**`systemctl restart syslog-ng`**




## Reloading configuration file without restarting {{% productparam "abbrev" %}}

To reload the configuration file without restarting {{% productparam "abbrev" %}}, execute the following command as root.


## Example: command for reloading the configuration file without restarting {{% productparam "abbrev" %}}

**`systemctl reload syslog-ng`**




## Checking {{% productparam "abbrev" %}} status

To check the following status-related components, observe the suggestions below.

  - **Checking the status of {{% productparam "abbrev" %}} service**
    
    To check the status of {{% productparam "abbrev" %}} service
    
    1.  Execute the following command as root.
        
        
        ## Example: command for checking the status of {{% productparam "abbrev" %}} service
        
        **`systemctl --no-pager status syslog-ng`**
        
    
    2.  Check the <span class="code">Active:</span> field, which shows the status of {{% productparam "abbrev" %}} service. The following statuses are possible:
        
          - **active (running)** - {{% productparam "abbrev" %}} service is up and running
            
            
            ## Example: {{% productparam "abbrev" %}} service active
            
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
            
        
          - **inactive (dead)** - syslog-ng service is stopped
            
            
            ## Example: {{% productparam "abbrev" %}} status inactive
            
            ```c
            
                syslog-ng.service - System Logger Daemon
                Loaded: loaded (/lib/systemd/system/syslog-ng.service; enabled; vendor preset: enabled)
                Active: inactive (dead) since Tue 2019-06-25 09:14:16 CEST; 2min 18s ago
                Process: 6575 ExecStart=/opt/syslog-ng/sbin/syslog-ng -F --no-caps --enable-core $SYSLOGNG_OPTIONS (code=exited, status=0/SUCCESS)
                Main PID: 6575 (code=exited, status=0/SUCCESS)
                Status: "Shutting down... Tue Jun 25 09:14:16 2019"
                Jun 25 09:14:31 as-syslog-srv systemd: Stopped System Logger Daemon.
            
            ```
            

  - **Checking the process of {{% productparam "abbrev" %}}**
    
    To check the process of {{% productparam "abbrev" %}}, execute one of the following commands.
    
      - 
        
        
        ## Example: command ps u `pidof syslog-ng`
        
        **`ps u `pidof syslog-ng``**
        
        
        Expected output example:
        
        <span class="code">USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND</span>
        
        <span class="code">syslogng 6709 0.0 0.6 308680 13432 ? Ss 09:17 0:00 /opt/syslog-ng/libexec/syslog-ng -F --no-caps --enable-core</span>
    
      - 
        
        
        ## Example: command ps axu | grep syslog-ng | grep -v grep
        
        **`ps axu | grep syslog-ng | grep -v grep`**
        
        
        Expected output example:
        
        <span class="code">syslogng 6709 0.0 0.6 308680 13432 ? Ss 09:17 0:00 /opt/syslog-ng/libexec/syslog-ng -F --no-caps --enable-core</span>

  - **Checking the internal logs of {{% productparam "abbrev" %}}**
    
    The internal logs of {{% productparam "abbrev" %}} contains informal, warning and error messages.
    
    By default, {{% productparam "abbrev" %}} log messages (generated on the <span class="code">internal()</span> source) are written to **`/var/log/messages`**.
    
    Check the internal logs of {{% productparam "abbrev" %}} for any issue.

  - <span id="stats"></span>**Message processing**
    
    The {{% productparam "abbrev" %}} application collects statistics about the number of processed messages on the different sources and destinations.
    
    {{% alert title="Note" color="info" %}}
    
    When using `syslog-ng-ctl stats`, consider that while the output is generally consistent, there is no explicit ordering behind the command. Consequently, {{% productparam "companyabbrev" %}} does not recommend creating parsers that depend on a fix output order.
    
    If needed, you can sort the output with an external application, for example, `| sort`.
    
    {{% /alert %}}
    
      - **Central statistics**
        
        To check the central statistics, execute the following command to see the number of received and queued (sent) messages by {{% productparam "abbrev" %}}.
        
        
        ## Example: command for checking central statistics
        
        **`watch "/opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^center"`**
        
        
        The output will be updated in every 2 seconds.
        
        If the numbers are changing, {{% productparam "abbrev" %}} is processing the messages.
        
        
        ## Example: output example
        
        ```c
        
            Every 2.0s: /opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^center       Tue Jun 25 10:33:25 2019
            center;;queued;a;processed;112
            center;;received;a;processed;28
        
        ```
        
    
      - **Source statistics**
        
        To check the source statistics, execute the following command to see the number of received messages on the configured sources.
        
        
        ## Example: command for checking central statistics
        
        **`watch "/opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^source"`**
        
        
        The output will be updated in every 2 seconds.
        
        If the numbers are changing, {{% productparam "abbrev" %}} is receiving messages on the sources.
        
        
        ## Example: output example
        
        ```c
        
            Every 2.0s: /opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^source      Tue Jun 25 10:40:50 2019
            source;s_null;;a;processed;0
            source;s_net;;a;processed;0
            source;s_local;;a;processed;90
        
        ```
        
    
      - **Destination statistics**
        
        To check the source statistics, execute the following command to see the number of received messages on the configured sources.
        
        
        ## Example: command for checking destination statistics
        
        **`watch "/opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^source"`**
        
        
        The output will be updated in every 2 seconds.
        
        If the numbers are changing, {{% productparam "abbrev" %}} is receiving messages on the sources.
        
        
        ## Example: output example
        
        ```c
        
            Every 2.0s: /opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^destination      Tue Jun 25 10:41:02 2019
            destination;d_logserver2;;a;processed;90
            destination;d_messages;;a;processed;180
            destination;d_logserver;;a;processed;90
            destination;d_null;;a;processed;0
        
        ```
        


{{% alert title="Note" color="info" %}}

If you find error messages in the internal logs, messages are not processed by {{% productparam "abbrev" %}} or you encounter any issue, you have the following options:

  - Search for the error or issue in our [knowledge base](https://support.oneidentity.com/syslog-ng-premium-edition/kb).
  - Check the [following knowledge base articles](https://support.oneidentity.com/syslog-ng-premium-edition/kb?k=troubleshooting&r=Topic%3ATroubleshooting) for further troubleshooting.
  - [Open a support service request](https://support.oneidentity.com/) including the results.

{{% /alert %}}
