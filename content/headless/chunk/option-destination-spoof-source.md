---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## spoof-source()

|          |           |
| -------- | --------- |
| Type:    | yes or no |
| Default: | no        |

*Description:* Enables source address spoofing. This means that the host running `syslog-ng` generates UDP packets with the source IP address matching the original sender of the message. It is useful when you want to perform some kind of preprocessing using `syslog-ng` then forward messages to your central log management solution with the source address of the original sender. This option only works for UDP destinations though the original message can be received by TCP as well. This option is only available if `syslog-ng` was compiled using the `--enable-spoof-source` configuration option.

The maximum size of spoofed datagrams in udp() destinations is set to 1024 bytes by default. To change the maximum size, use the `spoof-source-max-msglen()` option.

{{% alert title="Note" color="info" %}}

Anything above the size of the maximum transmission unit (MTU), which is 1500 bytes by default, is not recommended because of fragmentation.

The maximum datagram in IP protocols (both IPv4 and IPv6) is 65535 bytes including the IP and UDP headers. The minimum size of the IPv4 header is 20 bytes, the IPv6 is 40 bytes, and the UDP is 8 bytes.

{{% /alert %}}

{{% alert title="Warning" color="warning" %}}

To use spoofing on Microsoft Windows platforms, you must also set the `spoof-interface()` option as well.

{{% /alert %}}

