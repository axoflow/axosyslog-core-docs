---
title: "kafka-c(): Publishing messages to Apache Kafka using the librdkafka client (C implementation)"
weight:  2500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with version {{% conditional-text include-if="pe" %}}5.4{{% /conditional-text %}}{{% conditional-text include-if="ose" %}}3.21{{% /conditional-text %}}, {{% productparam "name" %}} ({{% productparam "abbrev" %}}) can directly publish log messages to the [Apache Kafka](http://kafka.apache.org) message bus, where subscribers can access them.

As of {{% productparam "abbrev" %}} version {{% conditional-text include-if="ose" %}}3.21{{% /conditional-text %}}, the new C implementation of the `kafka` destination is available. The new implementation uses the librdkafka client and has several advantages, such as scalability, more efficient memory usage and simpler setup. The options of this implementation are compatible with those of the old Java implementation.

<span id="how-it-works"></span>


## How the C implementation of the kafka destination works with {{% productparam "abbrev" %}}

![](../Images/Figures/fig-kafka-c-implementation.png)

