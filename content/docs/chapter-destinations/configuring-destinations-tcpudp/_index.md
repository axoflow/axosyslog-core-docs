---
title: "tcp, tcp6, udp, udp6: Sending messages to a remote log server using the legacy BSD-syslog protocol (tcp(), udp() drivers)"
weight:  6900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{< include-headless "wnt/note-use-network-driver.md" >}}

To convert your existing `tcp()`, `tcp6()`, `udp()`, `udp6()` source drivers to use the `network()` driver, see {{% xref "/docs/chapter-destinations/configuring-destinations-tcpudp/reference-destination-tcpudp/destination-tcpudp-to-network/_index.md" %}}.

The `tcp()`, `tcp6()`, `udp()`, and `udp6()` drivers send messages to another host (for example, an AxoSyslog server or relay) on the local intranet or internet using the UDP or TCP protocol. The `tcp6()` and `udp6()` drivers use the IPv6 network protocol.
