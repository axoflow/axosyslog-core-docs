---
title: "kafka: Publishing messages to Apache Kafka (Java implementation)"
weight:  2300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with version {{% conditional-text include-if="pe" %}}5.4{{% /conditional-text %}}{{% conditional-text include-if="ose" %}}3.7{{% /conditional-text %}}, {{% productparam "abbrev" %}} can directly publish log messages to the [Apache Kafka](http://kafka.apache.org) message bus, where subscribers can access them.

  - Since {{% productparam "abbrev" %}} uses the official Java Kafka producer, the `kafka` destination has significant memory usage.


## Declaration:

```c

    @include "scl.conf"
    
    kafka(
        client-lib-dir("/opt/syslog-ng/lib/syslog-ng/java-modules/:<path-to-preinstalled-kafka-libraries>")
        kafka-bootstrap-servers("1.2.3.4:9092,192.168.0.2:9092")
        topic("${HOST}")
    
    );

```



## Example: Sending log data to Apache Kafka {#example-destination-kafka}

The following example defines a `kafka` destination, using only the required parameters.

```c

    @include "scl.conf"
    
    destination d_kafka {
      kafka(
        client-lib-dir("/opt/syslog-ng/lib/syslog-ng/java-modules/KafkaDestination.jar:/usr/share/kafka/lib/")
        kafka-bootstrap-servers("1.2.3.4:9092,192.168.0.2:9092")
        topic("${HOST}")
      );
    };

```


  - To install the software required for the `kafka` destination, see {{% xref "/docs/chapter-destinations/configuring-destinations-kafka/destination-kafka-prerequisites/_index.md" %}}.

  - For details on how the `kafka` destination works, see {{% xref "/docs/chapter-destinations/configuring-destinations-kafka/destination-kafka-interaction/_index.md" %}}.

  - For the list of options, see {{% xref "/docs/chapter-destinations/configuring-destinations-kafka/reference-destination-kafka/_index.md" %}}.

The `kafka()` driver is actually a reusable configuration snippet configured to receive log messages using the Java language-binding of {{% productparam "abbrev" %}}. For details on using or writing such configuration snippets, see {{% xref "/docs/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of the kafka configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/kafka/plugin.conf). For details on extending {{% productparam "abbrev" %}} in Java, see the [Getting started with syslog-ng development](https://syslog-ng.gitbooks.io/getting-started/content/chapters/chapter_5/section_2.html) guide.

{{% include-headless "wnt/note-jvm-reload.md" %}}
