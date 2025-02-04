---
title: "Kafka destination options"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `kafka` destination of {{% param "product.abbrev" %}} can directly publish log messages to the [Apache Kafka](http://kafka.apache.org) message bus, where subscribers can access them. The `kafka` destination has the following options.


## Required options:

The following options are required: `kafka-bootstrap-servers()`, `topic()`. Note that to use `kafka`, you must add the following lines to the beginning of your {{% param "product.abbrev" %}} configuration:

```shell
   @include "scl.conf"
```



{{% include-headless "chunk/option-destination-java-class-path.md" %}}

For the `kafka` destination, include the path to the directory where you copied the required libraries (see {{% xref "/chapter-destinations/configuring-destinations-kafka/destination-kafka-prerequisites/_index.md" %}}), for example, `client-lib-dir("/opt/syslog-ng/lib/syslog-ng/java-modules/KafkaDestination.jar:/usr/share/kafka/lib/*.jar")`.



## kafka-bootstrap-servers() {#kafka-option-kafka-bootstrap-servers}

|          |                   |
| -------- | ----------------- |
| Type:    | list of hostnames |
| Default: |                   |

*Description:* Specifies the hostname or IP address of the Kafka server. When specifying an IP address, IPv4 (for example, `192.168.0.1`) or IPv6 (for example, `[::1]`) can be used as well. Use a colon (`:`) after the address to specify the port number of the server. When specifying multiple addresses, use a comma to separate the addresses, for example, `kafka-bootstrap-servers("127.0.0.1:2525,remote-server-hostname:6464")`


{{< include-headless "chunk/option-destination-frac-digits.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-destination-jvm-options.md" %}}

{{< include-headless "chunk/option-destination-on-error.md" >}}


## key() {#kafka-option-key}

|          |          |
| -------- | -------- |
| Type:    | template |
| Default: | N/A      |

*Description:* The key of the partition under which the message is published. You can use templates to change the topic dynamically based on the source or the content of the message, for example, `key("${PROGRAM}")`.


{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}


## properties-file() {#kafka-option-properties-file}

|          |                        |
| -------- | ---------------------- |
| Type:    | string (absolute path) |
| Default: | N/A                    |

*Description:* The absolute path and filename of the Kafka properties file to load. For example, `properties-file("/opt/syslog-ng/etc/kafka_dest.properties")`. The {{% param "product.abbrev" %}} application reads this file and passes the properties to the Kafka Producer. If a property is defined both in the {{% param "product.abbrev" %}} configuration file (`syslog-ng.conf`) and in the properties file, then {{% param "product.abbrev" %}} uses the definition from the {{% param "product.abbrev" %}} configuration file.

The {{% param "product.abbrev" %}} `kafka` destination supports all properties of the official Kafka producer. For details, see the [Apache Kafka documentation](http://kafka.apache.org/documentation.html#newproducerconfigs).

The `kafka-bootstrap-servers` option is translated to the `bootstrap.servers` property.

For example, the following properties file defines the acknowledgment method and compression:

```shell
   acks=all
    compression.type=snappy
```



{{% include-headless "chunk/option-destination-retries.md" %}}



{{% include-headless "chunk/kafka-kafka-c-sync-send.md" %}}



## template() {#kafka-option-template}

|          |                               |
| -------- | ----------------------------- |
| Type:    | template or template function |
| Default: | `$ISODATE $HOST $MSGHDR$MSG\\n` |

*Description:* The message as published to Apache Kafka. You can use templates and template functions (for example, `format-json()`) to format the message, for example, `template("$(format-json --scope rfc5424 --exclude DATE --key ISODATE)")`.

For details on formatting messages in JSON format, see [format-json]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}).


{{% include-headless "chunk/option-destination-throttle.md" %}}


## topic() {#kafka-option-kafka-topic}

|          |          |
| -------- | -------- |
| Type:    | template |
| Default: | N/A      |

*Description:* The Kafka topic under which the message is published. You can use templates to change the topic dynamically based on the source or the content of the message, for example, `topic("${HOST}")`.


{{% include-headless "chunk/option-destination-timezone.md" %}}

{{< include-headless "chunk/option-destination-ts-format.md" >}}
