---
title: "Configuring syslog-ng on relay hosts"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To configure syslog-ng on a relay host, complete the following steps:


1.  Install the syslog-ng application on the host. For details on installing syslog-ng on specific operating systems, see {{% xref "/docs/chapter-install/_index.md" %}}.

2.  Configure the network sources that collect the log messages sent by the clients.

3.  Create a network destination that points to the syslog-ng server.

4.  Create a log statement connecting the network sources to the syslog-ng server.

5.  Configure the local sources that collect the log messages of the relay host.

6.  Create a log statement connecting the local sources to the syslog-ng server.

7.  Enable the `keep-hostname()` and disable the `chain-hostnames()` options. (For details on how these options work, see [Global options]({{< relref "/docs/chapter-global-options/reference-options/_index.md" >}}).)
    
    {{% alert title="Note" color="info" %}}
    
    It is recommended to use these options on your {{% productparam "abbrev" %}} server as well.
    
    {{% /alert %}}

8.  Set filters and options (for example, TLS encryption) as necessary.
    
    {{% include-headless "wnt/note-relaying-hostname.md" %}}
    
    
    ## Example: A simple configuration for relays {#example-relayconfig}
    
    The following is a simple configuration file that collects local and incoming log messages and forwards them to a logserver using the IETF-syslog protocol.
    
    ```c
    
        @version: {{% productparam "techversion" %}}
        @include "scl.conf"
        options {
            time-reap(30);
            mark-freq(10);
            keep-hostname(yes);
            chain-hostnames(no);
        };
        source s_local {
            system(); internal();
        };
        source s_network {
            syslog(transport(tcp));
        };
        destination d_syslog_tcp {
            syslog("192.168.1.5" transport("tcp") port(2010));
        };
        log {
            source(s_local); source(s_network);
            destination(d_syslog_tcp);
        };
    
    ```
    

