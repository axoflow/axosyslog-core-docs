---
title: "Collecting debugging information with strace, truss, or tusc"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To properly troubleshoot certain situations, it can be useful to trace which system calls {{% param "product.abbrev" %}} performs. How this is performed depends on the platform running {{% param "product.abbrev" %}}. In general, note the following points:

  - When {{% param "product.abbrev" %}} is started, a supervisor process might stay in the foreground, while the actual `syslog-ng` daemon goes to the background. Always trace the background process.

  - Apart from the system calls, the time between two system calls can be important as well. Make sure that your tracing tool records the time information as well. For details on how to do that, refer to the manual page of your specific tool (for example, `strace` on Linux, or `truss` on Solaris and BSD).

  - Run your tracing tool in verbose mode, and if possible, set it to print long output strings, so the messages are not truncated.

  - When using `strace`, also record the output of `lsof` to see which files are accessed.

The following are examples for tracing system calls of `syslog-ng` on some platforms. The output is saved into the `/tmp/syslog-ng-trace.txt` file, sufficed with the PID of the related `syslog-ng` process. The path of the `syslog-ng` binary may be different for your installation, as distribution-specific packages may use different paths.

  - *Linux*: ` strace -o /tmp/trace.txt -s256 -ff -ttT /opt/syslog-ng/sbin/syslog-ng -f /opt/syslog-ng/etc/syslog-ng.conf -Fdv`

  - *HP-UX*: `tusc -f -o /tmp/syslog-ng-trace.txt -T /opt/syslog-ng/sbin/syslog-ng`

  - *IBM AIX and Solaris*: `truss -f -o /tmp/syslog-ng-trace.txt -r all -w all -u libc:: /opt/syslog-ng/sbin/syslog-ng -d -d -d`

{{% alert title="Note" color="info" %}}

To execute these commands on an already running {{% param "product.abbrev" %}} process, use the `-p <pid_of_syslog-ng>` parameter.

{{% /alert %}}
