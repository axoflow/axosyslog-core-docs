---
title: "Before you begin"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


This section describes the prerequisites and restrictions for using the `kafka` destination in the new C implementation, and important information about the declaration of the destination.


## Prerequisites and restrictions

  - Since the new C implementation uses the [librdkafka client library](https://docs.confluent.io/2.0.0/clients/librdkafka/index.html), the `kafka` destination has less memory usage than the previous Java implementation (which uses the official Java Kafka producer).

  - If you used the Java implementation before, see {{% xref "/docs/chapter-destinations/configuring-destinations-kafka-c/destination-kafka-c-from-java/_index.md" %}}.

  - The {{% productparam "abbrev" %}} `kafka` destination supports all properties of the official Kafka producer. For details, see [the librdkafka documentation](https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md).

  - For the list of options, see {{% xref "/docs/chapter-destinations/configuring-destinations-kafka-c/reference-destination-kafka-c/_index.md" %}}.




## Declaration:

```c

    @define kafka-implementation kafka-c
    
    kafka(
        bootstrap-servers("1.2.3.4:9092,192.168.0.2:9092")
        topic("{MYTOPIC}")
    
    );

```



## Example: Sending log data to Apache Kafka {#example-destination-kafka}

The following example defines a `kafka` destination in the new C implementation, using only the required parameters.

```c

``` 

@define kafka-implementation kafka-c 
@include "scl.conf"

destination d_kafka {
  kafka(
    bootstrap-servers("1.2.3.4:9092,192.168.0.2:9092")
    topic("{MYTOPIC}")
  );
};
```

```

