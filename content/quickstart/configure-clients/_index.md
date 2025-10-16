---
title: "Configuring AxoSyslog on client hosts"
weight:  100
aliases:
- /chapter-quickstart/configure-clients/
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Purpose:

To configure AxoSyslog on a client host, complete the following steps.



## Steps:

1.  Install the AxoSyslog application on the host. For details installing AxoSyslog on specific operating systems, see {{% xref "/install/_index.md" %}}.

2.  Configure the local sources to collect the log messages of the host. Starting with version 3.2, {{% param "product.abbrev" %}} automatically collects the log messages that use the native system logging method of the platform, for example, messages from `/dev/log` on Linux, or `/dev/klog` on FreeBSD. For a complete list of messages that are collected automatically, see {{% xref "/chapter-sources/source-system/_index.md" %}}.
    
    {{% include-headless "chunk/para-config-file-location.md" %}}
    
    Add sources to collect the messages from your log files. File sources look like this:
    
    ```shell
        source s_myfilesource {
            file("/var/log/myapplication.log" follow-freq(1));
        };
    ```
    
    Name every source uniquely. For details on configuring file sources, see {{% xref "/chapter-sources/configuring-sources-file/_index.md" %}}.
    
    {{% alert title="Note" color="info" %}}
Many applications send log messages to logfiles by default (for example, the Roundcube webmail client, or the ProFTPD FTP server), but can be configured to send them to syslog instead. If possible, it is recommended to reconfigure the application that way.
    {{% /alert %}} {{% alert title="Note" color="info" %}}
The default configuration file of {{% param "product.abbrev" %}} collects platform-specific log messages and the internal log messages of {{% param "product.abbrev" %}}.
    
```shell
    source s_local {
        system();
        internal();
    };
```
    {{% /alert %}}

3.  Create a network destination that points directly to the AxoSyslog server, or to a local relay. The network destination greatly depends on the protocol that your log server or relay accepts messages. Many systems still use the legacy BSD-syslog protocol (RFC3162) over the unreliable UDP transport:
    
    ```shell
        destination d_network { network("10.1.2.3" transport("udp")); };
    ```
    
    However, if possible, use the much more reliable IETF-syslog protocol over TCP transport:
    
    ```shell
        destination d_network {
            syslog("10.1.2.3" transport("tcp"));
        };
    ```

4.  Create a log statement connecting the local sources to the AxoSyslog server or relay. For example:
    
    ```shell
        log {
            source(s_local); destination(d_network);
        };
    ```

5.  If the logs will also be stored locally on the host, create local file destinations.
    
    {{< alert title="Note" color="info" >}}
The default configuration of {{% param "product.abbrev" %}} places the collected messages into the `/var/log/messages` file:
    
```shell
    destination d_local {
        file("/var/log/messages");
    };
```
    {{< /alert >}}

6.  Create a log statement connecting the local sources to the file destination.
    
    {{% alert title="Note" color="info" %}}
The default configuration of {{% param "product.abbrev" %}} has only one log statement:
    
```shell
    log {
        source(s_local); destination(d_local);
    };
```
    {{% /alert %}}

7.  Set filters, macros and other features and options (for example, TLS encryption) as necessary.
    
    
## Example: The default configuration file of {{% param "product.abbrev" %}} {#example-defaultconfig}

The following is the default configuration file of {{% param "product.abbrev" %}}. It collects local log messages and the log messages of {{% param "product.abbrev" %}} and saves them in the `/var/log/messages` file.

```shell
    @version: {{% param "product.configversion" %}}
    @include "scl.conf"
    source s_local {
        system(); internal();
    };
    destination d_local {
        file("/var/log/messages");
    };
    log {
        source(s_local); destination(d_local);
    };
```

## Example: A simple configuration for clients {#example-clientconfig}

The following is a simple configuration file that collects local log messages and forwards them to a logserver using the IETF-syslog protocol.

```shell
    @version: {{% param "product.configversion" %}}
    @include "scl.conf"
    source s_local {
        system(); internal();
    };
    destination d_syslog_tcp {
        syslog("192.168.1.1" transport("tcp") port(2010));
    };
    log {
        source(s_local);destination(d_syslog_tcp);
    };
```
