---
title: "tcp, tcp6, udp, udp6: Collecting messages from remote hosts using the BSD syslog protocol— OBSOLETE"
weight:  4700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{< include-headless "wnt/note-use-network-driver.md" >}}

The `tcp()`, `tcp6()`, `udp()`, `udp6()` drivers can receive syslog messages conforming to RFC3164 from the network using the TCP and UDP networking protocols. The `tcp6()` and `udp6()` drivers use the IPv6 network protocol, while `tcp()` and `udp()` use IPv4.

To convert your existing `tcp()`, `tcp6()`, `udp()`, `udp6()` source drivers to use the `network()` driver, see {{% xref "/docs/chapter-sources/configuring-sources-tcpudp/reference-source-tcpudp/source-tcpudp-to-network/_index.md" %}}.
