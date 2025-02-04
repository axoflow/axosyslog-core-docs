---
title: "mqtt: receiving messages from an MQTT broker"
weight:  1500
driver: "mqtt()"
short_description: "Fetch messages from MQTT brokers"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

From {{% param "product.abbrev" %}} version 3.35, you can use the `mqtt()` source to fetch messages from MQTT brokers.

The `mqtt()` source builds on the [MQTT protocol](https://www.hivemq.com/mqtt/mqtt-protocol/), and uses its [client](https://www.hivemq.com/blog/seven-best-mqtt-client-tools/) and [broker](https://www.hivemq.com/hivemq/mqtt-broker/) entities.

{{% alert title="Note" color="info" %}}

The rest of this chapter and its sections build on your familiarity with the MQTT protocol, the concept of client and broker entities, and how these entities function within an MQTT system.

{{% /alert %}}


## Declaration:

```shell
   source s_mqtt{
        mqtt(
            address("tcp://<hostname>:<port-number>")
            topic("<topic-name>")
        );
    };
```

Starting with {{% param "product.abbrev" %}} version 4.7, `mqtt()` source automatically sets the `${MQTT_TOPIC}` name-value pair for the messages it receives. This is useful when the name of the topic contains MQTT wildcards (`$`, `+`, `#`). For example:

```shell
log {
    source { mqtt(topic("#")); };
    destination { stdout(template("${MQTT_TOPIC} - ${MESSAGE}\n")); };
};
```

## Example: Using the mqtt() source in your configuration

The following example illustrates an `mqtt()` source configured to fetch messages from the MQTT broker running on `localhost:4444` using the `test/test topic`, and send them to the `localhost:4445` address.

```shell
    @version: current
    @include "scl.conf"
    source s_mqtt {
        mqtt(
            address("tcp://localhost:4444")
            topic("test/test")
        );
    };
    destination d_network {
        network(
            "localhost"
            port(4445)
        );
    };
    log {
        source(s_mqtt);
        destination(d_network);;
    };
```

