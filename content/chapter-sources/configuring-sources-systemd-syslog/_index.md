---
title: "systemd-syslog: Collecting systemd messages using a socket"
weight:  4500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

On platforms running systemd, the `systemd-syslog()` driver reads the log messages of systemd using the `/run/systemd/journal/syslog` socket. Note the following points about this driver:

  - If possible, use the more reliable [systemd-journal()]({{< relref "/chapter-sources/configuring-sources-journal/_index.md" >}}) driver instead.

  - The socket activation of systemd is buggy, causing some log messages to get lost during system startup.

  - If {{% param "product.abbrev" %}} is running in a jail or a Linux Container (LXC), it will not read from the `/dev/kmsg` or `/proc/kmsg` files.


## Declaration:

```shell
   systemd-syslog();
```



## Example: Using the systemd-syslog() driver

```shell
   @version: {{% param "product.techversion" %}}
    
    source s_systemdd {
        systemd-syslog();
    };
    
    destination d_network {
        syslog("server.host");
    };
    
    log {
        source(s_systemdd);
        destination(d_network);
    };
```

