---
title: "Before you begin"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


This section describes the prerequisites and restrictions for using the `kafka-c()` destination, and important information about the declaration of the destination.


## Prerequisites and restrictions

- The `kafka-c()` destination uses the [librdkafka client library](https://github.com/confluentinc/librdkafka).
- If you used the Java implementation before, see {{% xref "/chapter-destinations/configuring-destinations-kafka-c/destination-kafka-c-from-java/_index.md" %}}.
- The {{% param "product.abbrev" %}} `kafka-c()` destination supports all properties of the official Kafka producer. For details, see [the librdkafka documentation](https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md).
- For the list of options, see {{% xref "/chapter-destinations/configuring-destinations-kafka-c/reference-destination-kafka-c/_index.md" %}}.

## Declaration:

```shell
kafka-c(
    bootstrap-servers("1.2.3.4:9092,192.168.0.2:9092")
    topic("MYTOPIC")
);
```



## Example: Sending log data to Apache Kafka {#example-destination-kafka}

The following example defines a `kafka-c` destination, using only the required options.

```shell
destination d_kafka {
  kafka-c(
    bootstrap-servers("1.2.3.4:9092,192.168.0.2:9092")
    topic("MYTOPIC")
  );
};
```

You can also use the `kafka()` name, which is an SCL alias for `kafka-c()`. In that case, your configuration must contain `@include "scl.conf"`. For details, see [kafka: Publish messages to Apache Kafka]({{< relref "/chapter-destinations/configuring-destinations-kafka/_index.md" >}}).

