---
title: "How AxoSyslog interacts with Apache Kafka"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

When stopping the {{% param "product.abbrev" %}} application, {{% param "product.abbrev" %}} will not stop until all Java threads are finished, including the threads started by the Kafka Producer. There is no way (except for the `kill -9` command) to stop {{% param "product.abbrev" %}} before the Kafka Producer stops. To change this behavior set the properties of the Kafka Producer in its properties file, and reference the file in the `properties-file` option.

The {{% param "product.abbrev" %}} `kafka` destination tries to reconnect to the brokers in a tight loop. This can look as spinning, because of a lot of similar debug messages. To decrease the amount of such messages, set a bigger timeout using the following properties:

```shell
   retry.backoff.ms=1000
    reconnect.backoff.ms=1000
```

For details on using property files, see [properties-file()]({{< relref "/chapter-destinations/configuring-destinations-kafka/reference-destination-kafka/_index.md" >}}). For details on the properties that you can set in the property file, see the [Apache Kafka documentation](http://kafka.apache.org/documentation.html#newproducerconfigs).
