---
title: "Options of the mqtt() destination"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `mqtt()` destination has the following options.

Required options: `address()`, `fallback-topic()`, and `topic()`.


## address() {#option-mqtt-address}

{{% include-headless "chunk/option-mqtt-address.md" %}}

Supported protocol types: `TCP`, `WS`, `SSL` and`WSS`.


{{% include-headless "chunk/option-mqtt-client-id.md" %}}

{{% include-headless "chunk/option-mqtt-cleansession.md" %}}


## fallback-topic() {#option-mqtt-fallback-topic}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* Required option when using templates in the `topic()` option.

If the resolved `topic()` template is not a valid topic, {{% param "product.abbrev" %}} will use the `fallback-topic()` option to send messages.

{{% alert title="Note" color="info" %}}

If instead of strings, you use actual templates (that is, a macro like `${MESSAGE}`, or a template function like `$(format-json)`) in the `topic()` option, configuring the `fallback-topic()` option is required.

{{% /alert %}} {{% alert title="Note" color="info" %}}

Occasionally, the reason why {{% param "product.abbrev" %}} cannot post messages to the configured `topic()` is that the topic contains invalid characters that originate from templates.

{{% /alert %}}


{{% include-headless "chunk/option-mqtt-http-proxy.md" %}}


<span id="option-mqtt-keep-alive"></span>

{{% include-headless "chunk/option-destination-keep-alive-mqtt.md" %}}


{{% include-headless "chunk/option-mqtt-password.md" %}}


## qos() {#option-mqtt-qos}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Type:</td>
<td>number</td>
</tr>
<tr class="even">
<td>Default:</td>
<td>`0`</td>
</tr>
<tr class="odd">
<td><p>Possible values:</p></td>
<td><p>`0` - at most once (the fastest option)</p>
<p>`1` - at least once (a much slower option than `0`)</p>
<p>`2` - exactly once (the slowest option)</p></td>
</tr>
</tbody>
</table>

*Description:* The [Quality of Service (QoS) level](https://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels/) in MQTT messaging is an agreement between sender and receiver on the guarantee of delivering a message.



<span id="option-mqtt-template"></span>

{{% include-headless "chunk/option-destination-mqtt-template.md" %}}



{{% include-headless "chunk/option-tls.md" %}}

{{% include-headless "chunk/option-tls-mqtt.md" %}}



## topic() {#option-mqtt-topic}

|          |                    |
| -------- | ------------------ |
| Type:    | string or template |
| Default: | N/A                |

*Description:* Required option. Specifies the MQTT topic.

{{% alert title="Note" color="info" %}}

The current implementation of the `mqtt()` destination does not support using the following characters for topic names:

  - `$`

  - `+`

  - `#`

{{% /alert %}}


{{% include-headless "chunk/option-mqtt-username.md" %}}
