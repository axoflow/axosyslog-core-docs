---
title: "Troubleshooting"
weight:  4500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This chapter provides tips and guidelines about troubleshooting problems related to `syslog-ng`.

- As a general rule, first try to log the messages to a local file. Once this is working, you know that {{% param "product.abbrev" %}} is running correctly and receiving messages, and you can proceed to forwarding the messages to the server.
- Always check the configuration files for any syntax errors on both the client and the server using the `syslog-ng --syntax-only` command.
- If the {{% param "product.abbrev" %}} server does not receive the messages, verify that the IP addresses and ports are correct in your sources and destinations. Also, check that the client and the server uses the same protocol (a common error is to send logs on UDP, but configure the server to receive logs on TCP).

    If the problem persists, use `tcpdump` or a similar packet sniffer tool on the client to verify that the messages are sent correctly, and on the server to verify that it receives the messages.

- To find message-routing problems, run {{% param "product.abbrev" %}} with the following command `syslog-ng -Fevd`. That way {{% param "product.abbrev" %}} will run in the foreground, and display debug messages about the messages that are processed.
- If {{% param "product.abbrev" %}} is closing the connections for no apparent reason, be sure to check the log messages of `syslog-ng`. You may also want to run `syslog-ng` with the `--verbose` or `--debug` command-line options for more-detailed log messages. You can enable these messages without restarting `syslog-ng` using the `syslog-ng-ctl verbose --set=on` command. For details, see the {{% xref "/app-man-syslog-ng/syslog-ng.conf.5/_index.md" %}}.
- Build up encrypted connections step-by-step. First create a working, unencrypted (for example, TCP) connection, then add TLS encryption, and finally, client authentication if needed.
- If you use the same driver and options in the destination of your {{% param "product.abbrev" %}} client and the source of your {{% param "product.abbrev" %}} server, everything should work as expected. Unfortunately, there are some other combinations, that may seem to work, but result in losing parts of the messages. For details on the working combinations, see {{% xref "/chapter-concepts/concepts-things-to-consider/_index.md" %}}.
- If you're using {{% xref "/filterx/_index.md" %}}, see [Troubleshooting FilterX]({{< relref "/filterx/filterx-troubleshooting/_index.md" >}}) for specific tips.

## Support

{{< include-headless "chunk/support.md" >}}
