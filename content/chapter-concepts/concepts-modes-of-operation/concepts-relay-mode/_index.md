---
title: "Relay mode"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

![Processing logs in relay mode](/images/figures/fig-relay_mode01.png)

In relay mode, {{% param "product.abbrev" %}} receives logs through the network from {{% param "product.abbrev" %}} clients and forwards them to the central {{% param "product.abbrev" %}} server using a network connection. Relays also log the messages from the relay host into a local file, or forward these messages to the central {{% param "product.abbrev" %}} server.

{{% include-headless "chunk/relay-mode-uses.md" %}}
