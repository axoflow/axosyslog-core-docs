---
title: "kafka: Publish messages to Apache Kafka"
weight:  2300
driver: "kafka()"
short_description: "Publish messages to Apache Kafka"
aliases:
- /chapter-destinations/configuring-destinations-kafka/destination-kafka-prerequisites/
- /chapter-destinations/configuring-destinations-kafka/destination-kafka-interaction/
- /chapter-destinations/configuring-destinations-kafka/reference-destination-kafka/
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `kafka()` destination publishes log messages to the [Apache Kafka](http://kafka.apache.org) message bus, where subscribers can access them.

`kafka()` is a configuration snippet of the {{% param "product.name" %}} Configuration Library (SCL) that calls the [`kafka-c()`]({{< relref "/chapter-destinations/configuring-destinations-kafka-c/_index.md" >}}) destination and passes on every option unchanged. The two names behave identically, use whichever you prefer. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/main/scl/kafka/kafka.conf).

{{% alert title="Note" color="info" %}}
Earlier versions of syslog-ng had a separate Java implementation of the `kafka()` destination that used the official Java Kafka producer. {{% param "product.name" %}} has removed that implementation: `kafka()` now always uses the C implementation, which builds on the [librdkafka](https://github.com/confluentinc/librdkafka) client library, scales better, and uses much less memory.

The Java implementation used different option names. If you're migrating such a configuration, see {{% xref "/chapter-destinations/configuring-destinations-kafka-c/destination-kafka-c-from-java/_index.md" %}}.
{{% /alert %}}

## Prerequisites

- {{< include-headless "chunk/prereq-package-scl.md" >}}
- {{< include-headless "chunk/prereq-package.md" "axosyslog-mod-rdkafka" "axosyslog-kafka" >}}

## Declaration:

```shell
@include "scl.conf"

kafka(
    bootstrap-servers("1.2.3.4:9092,192.168.0.2:9092")
    topic("${HOST}")
);
```

## Example: Sending log data to Apache Kafka {#example-destination-kafka}

The following example defines a `kafka` destination, using only the required options.

```shell
@include "scl.conf"

destination d_kafka {
  kafka(
    bootstrap-servers("1.2.3.4:9092,192.168.0.2:9092")
    topic("${HOST}")
  );
};
```

## Options

The `kafka()` destination accepts the options of the `kafka-c()` destination. For the list of options, see [Options of the kafka() destination's C implementation]({{< relref "/chapter-destinations/configuring-destinations-kafka-c/reference-destination-kafka-c/_index.md" >}}).
