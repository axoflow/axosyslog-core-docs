---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{% alert title="Warning" color="warning" %}}

When creating several thousands separate log files, {{% param "product.name" %}} ({{% param "product.abbrev" %}}) might not be able to open the required number of files. This might happen for example, when using the `${HOST}` macro in the filename while receiving messages from a large number of hosts. To overcome this problem, adjust the `--fd-limit` command-line parameter of {{% param "product.abbrev" %}} or the global `ulimit` parameter of your host. For setting the `--fd-limit` command-line parameter of{{% param "product.abbrev" %}} see the <span class="mcFormatColor" style="color: #04aada;">The `syslog-ng` manual page</span>. For setting the `ulimit` parameter of the host, see the documentation of your operating system.

{{% /alert %}}
