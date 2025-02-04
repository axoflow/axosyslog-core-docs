---
title: "Options of the mqtt() source"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `mqtt()` source has the following options.

Required options: `address()`, `fallback-topic()`, and `topic()`.


## address() {#option-mqtt-address}

{{% include-headless "chunk/option-mqtt-address.md" %}}


{{% include-headless "chunk/option-mqtt-client-id.md" %}}

{{% include-headless "chunk/option-mqtt-cleansession.md" %}}

{{% include-headless "chunk/option-mqtt-http-proxy.md" %}}


<span id="option-mqtt-keep-alive"></span>

{{% include-headless "chunk/option-destination-keep-alive-mqtt.md" %}}


{{% include-headless "chunk/option-mqtt-password.md" %}}

{{% include-headless "chunk/option-persist-name.md" %}}


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



{{% include-headless "chunk/option-tls.md" %}}

{{% include-headless "chunk/option-tls-mqtt.md" %}}



## topic() {#option-mqtt-topic}

|          |                    |
| -------- | ------------------ |
| Type:    | string or template |
| Default: | N/A                |

*Description:* Required option. Specifies the MQTT topic.

{{% include-headless "chunk/option-mqtt-username.md" %}}
