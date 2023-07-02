---
title: "Configuring AxoSyslog on server hosts"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Purpose:

To configure AxoSyslog on a server host, complete the following steps.



## Steps:

1.  Install the AxoSyslog application on the host. For details installing AxoSyslog on specific operating systems, see {{% xref "/chapter-install/_index.md" %}}.

2.  Starting with version 3.2, {{% param "product.abbrev" %}} automatically collects the log messages that use the native system logging method of the platform, for example, messages from `/dev/log` on Linux, or `/dev/klog` on FreeBSD. For a complete list of messages that are collected automatically, see {{% xref "/chapter-sources/source-system/_index.md" %}}.

3.  {{< include-headless "chunk/para-config-file-location.md" >}}
    
    Configure the network sources that collect the log messages sent by the clients and relays. How the network sources should be configured depends also on the capabilities of your client hosts: many older networking devices support only the legacy BSD-syslog protocol (RFC3164) using UDP transport:
    
    ```shell
        source s_network {
            syslog(ip(10.1.2.3) transport("udp"));
        };
    ```
    
    However, if possible, use the much more reliable TCP transport:
    
    ```shell
        source s_network {
            syslog(ip(10.1.2.3) transport("tcp"));
        };
    ```
    
    For other options, see {{% xref "/chapter-sources/source-syslog/_index.md" %}} and {{% xref "/chapter-sources/configuring-sources-tcpudp/_index.md" %}}.
    
    {{% alert title="Note" color="info" %}}
Starting with {{% param "product.abbrev" %}} version 3.2, the `syslog()` source driver can handle both BSD-syslog (RFC 3164) and IETF-syslog (RFC 5424-26) messages.
    {{% /alert %}}

4.  Create local destinations that will store the log messages, for example, file- or program destinations. The default configuration of {{% param "product.abbrev" %}} places the collected messages into the `/var/log/messages` file:
    
    ```shell
        destination d_local {
            file("/var/log/messages");
        };
    ```
    
    If you want to create separate logfiles for every client host, use the `${HOST}` macro when specifying the filename, for example:
    
    ```shell
        destination d_local {
            file("/var/log/messages_${HOST}");
        };
    ```
    
    For details on further macros and how to use them, see {{% xref "/chapter-manipulating-messages/_index.md" %}}.

5.  Create a log statement connecting the sources to the local destinations.
    
    ```shell
        log {
            source(s_local); source(s_network); destination(d_local);
        };
    ```

6.  Set filters, options (for example, TLS encryption) and other advanced features as necessary.
    
    {{< include-headless "wnt/note-relaying-hostname.md" >}}
    
    
    ## Example: A simple configuration for servers {#example-serverconfig}
    
    The following is a simple configuration file for {{% param "product.name" %}} that collects incoming log messages and stores them in a text file.
    
    ```shell
        @version: {{% param "product.techversion" %}}
        @include "scl.conf"
        options {
            time-reap(30);
            mark-freq(10);
            keep-hostname(yes);
        };
        source s_local {
            system(); internal();
        };
        source s_network {
            syslog(transport(tcp));
        };
        destination d_logs {
            file(
                "/var/log/syslog-ng/logs.txt"
                owner("root")
                group("root")
                perm(0777)
                );
            };
        log {
            source(s_local); source(s_network); destination(d_logs);
        };
    ```
    

