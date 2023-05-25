---
title: "Flow control in syslog-ng OSE and the Kafka client"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

A {{% param "product.abbrev" %}} destination recognizes a message as sent when the message has been sent to the Kafka client, not when the Kafka server confirms its delivery.

If the Kafka client collects too many unsent messages, it will not accept any more messages from {{% param "product.abbrev" %}}. The {{% param "product.abbrev" %}} application detects this and stops sending messages to the Kafka client. Also, {{% param "product.abbrev" %}}'s flow control starts functioning in the direction of the sources (for example, {{% param "product.abbrev" %}} will not read from the sources in that specific logpath).

You can specify a "high water mark" limit for the Kafka client in the `properties-file()`.

For more information about how the C implementation of the `kafka()` destination works with {{% param "product.abbrev" %}}, click [here]({{< relref "/docs/chapter-destinations/configuring-destinations-kafka-c/_index.md#how-it-works" >}}).
