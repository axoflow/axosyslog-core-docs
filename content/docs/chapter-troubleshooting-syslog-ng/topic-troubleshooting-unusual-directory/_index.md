---
title: "iv class=section name=troubleshooting-unusual-directory>"
weight:  1500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

# No local logs after specifying an unusual storage directory

{{% include-headless "chunk/para-selinux.md" %}}

When you choose to save logs of a central {{% param "product.abbrev" %}} server to a directory other than the `/var/log` directory, logs will not start appearing on the newly configured directory. For details on how to fix this issue, see sectionUsing a different storage directoryin the blog post titled [Using syslog-ng with SELinux in enforcing mode](https://syslog-ng.com/blog/using-syslog-ng-with-selinux-in-enforcing-mode/).

