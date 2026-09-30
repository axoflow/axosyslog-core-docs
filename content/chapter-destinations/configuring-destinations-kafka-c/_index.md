---
title: "kafka-c(): Publish messages to Apache Kafka (C implementation)"
weight:  2500
driver: "kafka-c()"
short_description: "Publish messages to Apache Kafka (C implementation)"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{% param "product.name" %}} can directly publish log messages to the [Apache Kafka](http://kafka.apache.org) message bus, where subscribers can access them.

The `kafka-c()` destination uses the [librdkafka](https://github.com/confluentinc/librdkafka) client library, which scales well, uses memory efficiently, and needs no Java runtime. It replaces the earlier Java implementation, which {{% param "product.name" %}} has removed. If you're migrating a configuration written for the Java implementation, see {{% xref "/chapter-destinations/configuring-destinations-kafka-c/destination-kafka-c-from-java/_index.md" %}}.

You can also configure this destination under the name `kafka()`, which is an SCL alias for `kafka-c()`. For details, see [kafka: Publish messages to Apache Kafka]({{< relref "/chapter-destinations/configuring-destinations-kafka/_index.md" >}}).

<span id="how-it-works"></span>

![How the C implementation of the kafka destination works with {{% param "product.abbrev" %}}](fig-kafka-c-implementation.png)

## Prerequisites

- {{% param "product.abbrev" %}} version 3.21 or later.
- {{< include-headless "chunk/prereq-package.md" "axosyslog-mod-rdkafka" "axosyslog-kafka" >}}
