---
title: Collecting logs from chroot
weight: 600
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Purpose:

To collect logs from a chroot using a syslog-ng client running on the host, complete the following steps:

![](../Images/Figures/fig-chroot01.png)



## Steps:

1.  Create a `/dev` directory within the chroot. The applications running in the chroot send their log messages here.

2.  Create a local source in the configuration file of the syslog-ng application running outside the chroot. This source should point to the `/dev/log` file within the chroot (for example, to the `/chroot/dev/log` directory).

3.  Include the source in a log statement.
    
    {{% alert title="Note" color="info" %}}
You need to set up timezone information within your chroot as well. This usually means creating a symlink to `/etc/localtime`.
    {{% /alert %}}

