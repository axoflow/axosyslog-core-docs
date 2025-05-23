---
title: "kafka: Publish messages to Apache Kafka (Java implementation)"
weight:  2300
driver: "kafka()"
short_description: "Publish messages to Apache Kafka (Java implementation)"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with version 3.7, {{% param "product.abbrev" %}} can directly publish log messages to the [Apache Kafka](http://kafka.apache.org) message bus, where subscribers can access them.

  - Since {{% param "product.abbrev" %}} uses the official Java Kafka producer, the `kafka` destination has significant memory usage.


## Declaration:

```shell
   @include "scl.conf"
    
    kafka(
        client-lib-dir("/opt/syslog-ng/lib/syslog-ng/java-modules/:<path-to-preinstalled-kafka-libraries>")
        kafka-bootstrap-servers("1.2.3.4:9092,192.168.0.2:9092")
        topic("${HOST}")
    
    );
```



## Example: Sending log data to Apache Kafka {#example-destination-kafka}

The following example defines a `kafka` destination, using only the required parameters.

```shell
   @include "scl.conf"
    
    destination d_kafka {
      kafka(
        client-lib-dir("/opt/syslog-ng/lib/syslog-ng/java-modules/KafkaDestination.jar:/usr/share/kafka/lib/")
        kafka-bootstrap-servers("1.2.3.4:9092,192.168.0.2:9092")
        topic("${HOST}")
      );
    };
```


  - To install the software required for the `kafka` destination, see {{% xref "/chapter-destinations/configuring-destinations-kafka/destination-kafka-prerequisites/_index.md" %}}.

  - For details on how the `kafka` destination works, see {{% xref "/chapter-destinations/configuring-destinations-kafka/destination-kafka-interaction/_index.md" %}}.

  - For the list of options, see {{% xref "/chapter-destinations/configuring-destinations-kafka/reference-destination-kafka/_index.md" %}}.

The `kafka()` driver is actually a reusable configuration snippet configured to receive log messages using the Java language-binding of {{% param "product.abbrev" %}}. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of the kafka configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/main/scl/kafka/kafka.conf).

{{< include-headless "wnt/note-jvm-reload.md" >}}
