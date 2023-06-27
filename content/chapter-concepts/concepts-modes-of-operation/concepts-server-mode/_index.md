---
title: "Server mode"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

![Processing logs in server mode](/images/figures/fig-server_mode01.png)

In server mode, {{% param "product.ose" %}} acts as a central log-collecting server. It receives messages from {{% param "product.ose" %}} clients and relays over the network, and stores them locally in files, or passes them to other applications, for example, log analyzers.

