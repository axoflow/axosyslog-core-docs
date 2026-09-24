---
title: "Options of the kafka() destination's C implementation"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The C implementation of the `kafka()` destination of {{% param "product.abbrev" %}} can directly publish log messages to the [Apache Kafka](http://kafka.apache.org) message bus, where subscribers can access them. The C implementation of the `kafka()` destination has the following options.


## Required options:

The following options are required: `bootstrap-servers()`, `topic()`.


{{% include-headless "chunk/option-destination-threaded-batching.md" %}}

{{< include-headless "wnt/n-options-only-effective-for-sync-send(yes).md" >}}

{{% alert title="Note" color="info" %}}

If you set `sync-send()` to `"yes"`, the number you specify for `batch-lines()` affects how many messages {{% param "product.abbrev" %}} packs into once transaction.

{{% /alert %}}

{{% alert title="Note" color="info" %}}

When setting `batch-timeout()`, consider the value of the `transaction.timeout.ms` Kafka property. If in case of timeout (that is, if {{% param "product.abbrev" %}} does not receive `batch-lines()` amount of messages) the value of `batch-timeout()` exceeds the value of `transaction.timeout.ms`, {{% param "product.abbrev" %}} will not send out messages in time.

For more information about the default values of the `transaction.timeout.ms` Kafka property, see [the librdkafka documentation](https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md).

{{% /alert %}}



## bootstrap-servers() {#kafka-option-kafka-bootstrap-servers}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* Specifies the hostname or IP address of the Kafka server. When specifying an IP address, IPv4 (for example, `192.168.0.1`) or IPv6 (for example, `[::1]`) can be used as well. Use a colon (`:`) after the address to specify the port number of the server. When specifying multiple addresses, use a comma to separate the addresses, for example, `bootstrap-servers("127.0.0.1:2525,remote-server-hostname:6464")`



## config()

*Description:* Sets the properties of the underlying librdkafka client. For example:

```shell
   config(
      "acks" => "all"
      "compression.type" => "snappy"
   )
```

The `bootstrap-servers()` option is translated to the `bootstrap.servers` property.

The {{% param "product.abbrev" %}} `kafka` destination supports all properties of the official Kafka producer. For details, see [the librdkafka documentation](https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md).

The syntax of the config() option is the following:

```shell
   config( 
     “key1” => “value1” 
     “key2” => “value2” 
    )
```


{{< include-headless "chunk/option-destination-diskbuffer.md" >}}


{{< include-headless "chunk/option-destination-frac-digits.md" >}}

## fallback-topic() {#kafka-option-fallback-topic}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The topic to publish the message to if the name resolved from the [`topic()`](#kafka-option-kafka-topic) template isn't a valid Kafka topic name. Set this option whenever you use a template in `topic()`.


## flush-timeout-on-reload() {#kafka-option-flush-timeout-on-reload}

|          |                 |
| -------- | --------------- |
| Type:    | integer in msec |
| Default: | 1000            |

*Description:* When AxoSyslog reloads, the Kafka client will also reload. The `flush-timeout-on-reload()` option specifies the number of milliseconds AxoSyslog waits for the Kafka client to send the unsent messages. The unsent messages will be retained in `syslog-ng`'s own queue and AxoSyslog will continue sending them after reload. This works without disk-buffering, too.



## flush-timeout-on-shutdown() {#kafka-option-flush-timeout-on-shutdown}

|          |                 |
| -------- | --------------- |
| Type:    | integer in msec |
| Default: | 60000           |

*Description:* When AxoSyslog shuts down, the Kafka client will also shut down. The `flush-timeout-on-shutdown()` option specifies the number of milliseconds AxoSyslog waits for the Kafka client to send the unsent messages. Any messages not sent after the specified time will be lost. To avoid losing messages, we recommend you use the disk-buffer option.


{{< include-headless "chunk/option-hook-commands.md" >}}


## key() {#kafka-option-key}

|          |              |
| -------- | ------------ |
| Type:    | template     |
| Default: | empty string |

*Description:* The key of the partition under which the message is published. You can use templates to change the topic dynamically based on the source or the content of the message, for example, `key("${PROGRAM}")`.


{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}


{{% include-headless "chunk/option-destination-local-timezone.md" %}}

## message() {#kafka-option-message}

|          |                               |
| -------- | ----------------------------- |
| Type:    | template or template function |
| Default: | `$ISODATE $HOST $MSGHDR$MSG`  |

*Description:* The message as published to Apache Kafka. You can use templates and template functions (for example, `format-json()`) to format the message, for example, `message("$(format-json --scope rfc5424 --exclude DATE --key ISODATE)")`.

For details on formatting messages in JSON format, see [format-json]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md#template-function-format-json" >}}).

{{% alert title="Note" color="info" %}}
In the Java implementation of the `kafka()` destination, this option was called `template()`. The C implementation doesn't accept `template()`.
{{% /alert %}}

{{< include-headless "chunk/option-destination-on-error.md" >}}

{{% include-headless "chunk/option-persist-name.md" %}}


## poll-timeout() {#kafka-option-poll-timeout}

|          |                 |
| -------- | --------------- |
| Type:    | integer in msec |
| Default: | 1000            |

*Description:* Specifies the frequency your AxoSyslog queries the Kafka client about the amount of messages sent since the last `poll-timeout ()`. In case of multithreading, the first AxoSyslog worker is responsible for `poll-timeout()`.



{{% include-headless "chunk/option-destination-retries.md" %}}

{{% include-headless "chunk/option-destination-send-timezone.md" %}}


{{% include-headless "chunk/kafka-kafka-c-sync-send.md" %}}

{{< include-headless "wnt/n-sync-send(yes)-limit-ose-pe.md" >}}


{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-destination-timezone.md" %}}


## topic() {#kafka-option-kafka-topic}

|          |                               |
| -------- | ----------------------------- |
| Type:    | template or template function |
| Default: | N/A                           |

*Description:* The Kafka topic under which the message is published. You can use templates to set the topic dynamically based on the source or the content of the message, for example, `topic("${PROGRAM}")`. If the resolved topic name is invalid, {{% param "product.abbrev" %}} uses the topic set in the [`fallback-topic()`](#kafka-option-fallback-topic) option.


{{< include-headless "chunk/option-destination-ts-format.md" >}}


{{< include-headless "chunk/option-destination-threaded-workers.md" >}} 

{{% alert title="Note" color="info" %}}

The workers are only responsible for formatting the messages that need to be delivered to the Kafka clients. Configure this option only if your Kafka clients have many threads and they do not receive enough messages.

{{% /alert %}}

{{% alert title="Note" color="info" %}}

Kafka clients have their own threadpool, entirely independent from any AxoSyslog settings. The `workers()` option has no effect on this threadpool.

{{% /alert %}}
