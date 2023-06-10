---
title: "iv class=section name=troubleshooting-unusual-port-number>"
weight:  1700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

# No logs after specifying an unusual port number

{{% include-headless "chunk/para-selinux.md" %}}

By default, SELinux only allows connections to the default syslog ports. When you have to use any other port for some reason, sending logs to that port will not work. For details on how to fix this issue, see sectionUsing a different portin the blog post titled [Using syslog-ng with SELinux in enforcing mode](https://syslog-ng.com/blog/using-syslog-ng-with-selinux-in-enforcing-mode/).

