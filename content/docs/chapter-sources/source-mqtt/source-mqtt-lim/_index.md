---
title: "Limitations to using the mqtt() destination"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Using the `mqtt()` source of {{% param "product.abbrev" %}} has the following limitations:

  - You can only use the `mqtt()` source with {{% param "product.abbrev" %}} version 3.35 or higher.

  - You cannot use the `mqtt()` source without installing the the `eclipse-paho-mqtt-c` library.

  - {{% include-headless "chunk/eclipse-paho-mqtt-c.md" %}}

  - The current implementation of the `mqtt()` source supports versions 3.1 and 3.1.1 of the MQTT protocol
