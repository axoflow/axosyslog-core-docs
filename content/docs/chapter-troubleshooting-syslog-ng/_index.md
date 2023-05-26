---
title: "Troubleshooting syslog-ng"
weight:  4100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This chapter provides tips and guidelines about troubleshooting problems related to syslog-ng.

  - As a general rule, first try to log the messages to a local file. Once this is working, you know that syslog-ng is running correctly and receiving messages, and you can proceed to forwarding the messages to the server.

  - Always check the configuration files for any syntax errors on both the client and the server using the `syslog-ng --syntax-only` command.

  - If the {{% param "product.abbrev" %}} server does not receive the messages, verify that the IP addresses and ports are correct in your sources and destinations. Also, check that the client and the server uses the same protocol (a common error is to send logs on UDP, but configure the server to receive logs on TCP).
    
    If the problem persists, use `tcpdump` or a similar packet sniffer tool on the client to verify that the messages are sent correctly, and on the server to verify that it receives the messages.

  - To find message-routing problems, run {{% param "product.abbrev" %}} with the following command `syslog-ng -Fevd`. That way {{% param "product.abbrev" %}} will run in the foreground, and display debug messages about the messages that are processed.

  - If syslog-ng is closing the connections for no apparent reason, be sure to check the log messages of syslog-ng. You may also want to run syslog-ng with the `--verbose` or `--debug` command-line options for more-detailed log messages. You can enable these messages without restarting syslog-ng using the `syslog-ng-ctl verbose --set=on` command. For details, see the syslog-ng-ctl man page at <span class="mcFormatColor" style="color: #04aada;">The syslog-ng control tool manual page</span>.

  - Build up encrypted connections step-by-step. First create a working, unencrypted (for example, TCP) connection, then add TLS encryption, and finally, client authentication if needed.

  - If you use the same driver and options in the destination of your {{% param "product.abbrev" %}} client and the source of your {{% param "product.abbrev" %}} server, everything should work as expected. Unfortunately, there are some other combinations, that may seem to work, but result in losing parts of the messages. For details on the working combinations, see {{% xref "/docs/chapter-concepts/concepts-things-to-consider/_index.md" %}}.

  - In case you experience a problem that is not covered in this guide, send it to our [mailing list](https://lists.balabit.hu/mailman/listinfo/syslog-ng/).
    
    To report bugs found in {{% param "product.abbrev" %}}, [visit our GitHub issues page](https://github.com/syslog-ng/syslog-ng/issues/).
    
    Precompiled binary packages are available for free from various third-parties. See [the list of precompiled {{% param "product.abbrev" %}} binary packages](https://www.syslog-ng.com/products/open-source-log-management/3rd-party-binaries.aspx).
