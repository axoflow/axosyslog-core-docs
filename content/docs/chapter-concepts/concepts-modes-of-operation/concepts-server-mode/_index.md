---
title: "Server mode"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

![](../Images/Figures/fig-server_mode01.png)

In server mode, syslog-ng acts as a central log-collecting server. It receives messages from syslog-ng clients and relays over the network, and stores them locally in files, or passes them to other applications, for example, log analyzers.

Running {{% productparam "name" %}} in server mode requires a license file. The license determines how many individual hosts can connect to the server. For details on how {{% productparam "abbrev" %}} calculates the number of hosts, see {{% xref "/docs/chapter-concepts/concepts-licensing/_index.md" %}}.
