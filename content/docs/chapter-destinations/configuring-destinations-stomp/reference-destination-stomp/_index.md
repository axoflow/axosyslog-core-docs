---
title: "stomp() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `stomp()` driver publishes messages using the Simple (or Streaming) Text Oriented Message Protocol (STOMP).

The `stomp()` destination has the following options:

## ack() {#stomp-option-ack}

|          |        |
| -------- | ------ |
| Type:    | yes|no |
| Default: | no     |

*Description:* Request the STOMP server to acknowledge the receipt of the messages. If you enable this option, then after sending a message, {{% param "product.abbrev" %}} waits until the server confirms that it has received the message. This delay can seriously limit the performance of {{% param "product.abbrev" %}} if the message rate is high, and the server cannot acknowledge the messages fast enough.

## body() {#stomp-option-body}

|          |              |
| -------- | ------------ |
| Type:    | string       |
| Default: | empty string |

*Description:* The body of the STOMP message. You can also use macros and templates.

## destination() {#stomp-option-destination}

|          |               |
| -------- | ------------- |
| Type:    | string        |
| Default: | /topic/syslog |

*Description:* The name of the destination (message queue) on the STOMP server. It can include macros and templates.

{{% include-headless "chunk/option-destination-diskbuffer.md" %}}

{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

{{% include-headless "chunk/option-destination-batch-lines.md" %}}

{{% include-headless "chunk/option-destination-batch-timeout.md" %}}

{{% include-headless "chunk/option-destination-hook.md" %}}

## host() {#stomp-option-host}

|          |                        |
| -------- | ---------------------- |
| Type:    | hostname or IP address |
| Default: | 127.0.0.1              |

*Description:* The hostname or IP address of the STOMP server.

## password() {#stomp-option-password}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | n/a    |

*Description:* The password used to authenticate on the STOMP server.

## persistent() {#stomp-option-persistent}

|          |        |
| -------- | ------ |
| Type:    | yes|no |
| Default: | yes    |

*Description:* If this option is enabled, the STOMP server or broker will store the messages on its hard disk. That way, the messages will be retained if the STOMP server is restarted, if the message queue is set to be durable on the STOMP server.

## port() {#stomp-option-port}

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 61613  |

*Description:* The port number of the STOMP server.

{{% include-headless "chunk/option-destination-retries.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

## username() {#stomp-option-username}

|          |              |
| -------- | ------------ |
| Type:    | string       |
| Default: | empty string |

*Description:* The username used to authenticate on the STOMP server.

{{% include-headless "chunk/destination-option-value-pairs.md" %}}
