---
title: "amqp() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `amqp()` driver publishes messages using the AMQP (Advanced Message Queuing Protocol).

The `amqp()` destination has the following options:


## auth-method() {#auth-method}

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | plain | external |
| Default:         | plain            |

*Description:* The `amqp()` driver supports the following types of authentication:

  - plain: Authentication happens using username and password. This is the default.

  - external: Authentication happens using an out-of-band mechanism, for example, x509 certificate peer verification, client IP address range, or similar. For more information, see the [RabbitMQ documentation](https://www.rabbitmq.com/access-control.html).


{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

{{% include-headless "chunk/option-destination-threaded-batching.md" %}}


## body() {#amqp-option-body}

|          |              |
| -------- | ------------ |
| Type:    | string       |
| Default: | empty string |

*Description:* The body of the AMQP message. You can also use macros and templates.



## ca-file() {#amqp-option-ca-file}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* Name of a file, that contains the trusted CA certificate in PEM format. For example: `ca-file("/home/certs/syslog-ng/tls/cacert.pem")`. The {{% param "product.abbrev" %}} application uses this CA certificate to validate the certificate of the peer.

{{% include-headless "chunk/topic-tls-block-amqp.md" %}}



{{% include-headless "chunk/option-destination-tls-cert-file.md" %}}

{{% include-headless "chunk/topic-tls-block-amqp.md" %}}


{{< include-headless "chunk/option-destination-diskbuffer.md" >}}


## exchange() {#amqp-option-exchange}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | syslog |

*Description:* The name of the AMQP exchange where {{% param "product.abbrev" %}} sends the message. Exchanges take a message and route it into zero or more queues.



## exchange-declare() {#amqp-option-exchange-declare}

|          |        |
| -------- | ------ |
| Type:    | yes|no |
| Default: | no     |

*Description:* By default, {{% param "product.abbrev" %}} does not create non-existing exchanges. Use the `exchange-declare(yes)` option to automatically create exchanges.



## exchange-type() {#amqp-option-exchange-type}

|          |                             |
| -------- | --------------------------- |
| Type:    | direct|fanout|topic|headers |
| Default: | fanout                      |

*Description:* The type of the AMQP exchange.



## frame-size() {#amqp-option-frame-size}

|          |         |
| -------- | ------- |
| Type:    | integer |
| Default: |         |

*Description:* Sets maximal frame size (the frame-max option described in the [AMQP Reference Guide](https://www.rabbitmq.com/amqp-0-9-1-reference.html).



## heartbeat() {#amqp-option-heartbeat}

|          |                    |
| -------- | ------------------ |
| Type:    | number [seconds] |
| Default: | 0 (disabled)       |

*Description:* If enabled, the {{% param "product.abbrev" %}} amqp destination sends heartbeat messages to the server periodically. During negotiation, both the amqp server and the client provide a heartbeat parameter, and the smaller is chosen for heartbeat interval. For example:

```shell
   destination { amqp(
        vhost("/")
        exchange("logs")
        body("hello world")
        heartbeat(10)
        username(guest) password(guest)
        );
    };
```

Available in {{% param "product.abbrev" %}} version 3.21 and later.


{{< include-headless "chunk/option-destination-hook.md" >}}


## host() {#amqp-option-host}

|          |                        |
| -------- | ---------------------- |
| Type:    | hostname or IP address |
| Default: | 127.0.0.1              |

*Description:* The hostname or IP address of the AMQP server.


{{% include-headless "chunk/option-destination-tls-key-file.md" %}}


## max-channel() {#amqp-option-max-channel}

|          |         |
| -------- | ------- |
| Type:    | integer |
| Default: |         |

*Description:* Sets maximal number of channels (the channel-max option described in the [AMQP Reference Guide](https://www.rabbitmq.com/amqp-0-9-1-reference.html).


{{% include-headless "chunk/topic-tls-block-amqp.md" %}}


## password() {#amqp-option-password}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | n/a    |

*Description:* The password used to authenticate on the AMQP server.


{{< include-headless "chunk/option-peer-verify-simple.md" >}}

{{% include-headless "chunk/topic-tls-block-amqp.md" %}}


## persistent() {#amqp-option-persistent}

|          |        |
| -------- | ------ |
| Type:    | yes|no |
| Default: | yes    |

*Description:* If this option is enabled, the AMQP server or broker will store the messages on its hard disk. That way, the messages will be retained if the AMQP server is restarted, if the message queue is set to be durable on the AMQP server.



## port() {#amqp-option-port}

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 5672   |

*Description:* The port number of the AMQP server.


{{% include-headless "chunk/option-destination-retries.md" %}}


## routing-key() {#amqp-option-routing-key}

|          |              |
| -------- | ------------ |
| Type:    | string       |
| Default: | empty string |

*Description:* Specifies a routing key for the exchange. The routing key selects certain messages published to an exchange to be routed to the bound queue. In other words, the routing key acts like a filter. The routing key can include macros and templates.


{{% include-headless "chunk/option-source-time-reopen.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}


## username() {#amqp-option-username}

|          |              |
| -------- | ------------ |
| Type:    | string       |
| Default: | empty string |

*Description:* The username used to authenticate on the AMQP server.


{{< include-headless "chunk/destination-option-value-pairs-content.md" >}}


## vhost() {#amqp-option-vhost}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | /      |

*Description:* The name of the AMQP virtual host to send the messages to.

