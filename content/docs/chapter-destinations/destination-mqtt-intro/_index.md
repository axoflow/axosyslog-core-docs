---
title: "mqtt() destination: sending messages from a local network to an MQTT broker"
weight:  3300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

From version 3.33, you can use the `mqtt()` destination to publish messages to MQTT brokers.

The <span>mqtt()</span> destination builds on the [MQTT protocol](https://www.hivemq.com/mqtt-protocol/), and uses its "[client](https://www.hivemq.com/blog/seven-best-mqtt-client-tools/)" and "[broker](https://www.hivemq.com/hivemq/mqtt-broker/)" entities.

{{% alert title="Note" color="info" %}}

The rest of this chapter and its sections build on your familiarity with the MQTT protocol, the concept of client and broker entities, and how these entities function within an MQTT system.

{{% /alert %}}


## Declaration:

```c
   destination d_mqtt { 
      mqtt(
        topic("<topic-name>"), 
        address("tcp://localhost:<port-number>"),   
        fallback_topic("<fallback-topic-name>")
      ); 
    }

```



## Example: Using the mqtt() destination in your configuration {#example-destination-mqtt}

The following example illustrates a `mqtt()` destination configured to fetch messages from the `localhost:4444` address, and send them to the broker running on `localhost:4445`, using the `mqtt test/test` topic.

```c
   @version: 3.32
    @include "scl.conf"
    
      source s_net { 
        network(port(4444)
      ); 
    };
    
      destination d_mqtt { 
        mqtt(topic("test/test"), address("tcp://localhost:4445"), fallback_topic("test/test")
      ); 
    };
                    
    log { 
      source(s_net); 
      destination( d_mqtt); 
    };
```

