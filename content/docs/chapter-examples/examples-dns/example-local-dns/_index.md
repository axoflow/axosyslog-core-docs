---
title: Resolving hostnames locally
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Purpose:

Resolving hostnames locally enables you to display hostnames in the log files for frequently used hosts, without having to rely on a DNS server. The known IP address - hostname pairs are stored locally in a file. In the log messages, `syslog-ng` will replace the IP addresses of known hosts with their hostnames. To configure local name resolution, complete the following steps:



## Steps:

1.  Add the hostnames and the respective IP addresses to the file used for local name resolution. On Linux and UNIX systems, this is the `/etc/hosts` file. Consult the documentation of your operating system for details.

2.  Instruct `syslog-ng` to resolve hostnames locally. Set the `use-dns()` option to `persist_only`.

3.  Set the `dns-cache-hosts()` option to point to the file storing the hostnames.
    
    ```c
        options {
            use-dns(persist_only);
            dns-cache-hosts(/etc/hosts);
        };
    ```

