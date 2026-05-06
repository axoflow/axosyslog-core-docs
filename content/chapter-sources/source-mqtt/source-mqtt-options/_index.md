---
title: "Options of the mqtt() source"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `mqtt()` source has the following options.

Required options: `address()` and `topic()`.


## address() {#option-mqtt-address}

{{% include-headless "chunk/option-mqtt-address.md" %}}


{{% include-headless "chunk/option-source-chain-hostnames.md" %}}

{{% include-headless "chunk/option-mqtt-cleansession.md" %}}

{{% include-headless "chunk/option-mqtt-client-id.md" %}}

{{% include-headless "chunk/option-source-default-facility.md" %}}

{{% include-headless "chunk/option-source-default-level-journal.md" %}}

{{% include-headless "chunk/option-source-default-priority.md" %}}

{{% include-headless "chunk/option-source-default-severity.md" %}}

{{% include-headless "chunk/option-source-dns-cache.md" %}}

{{% include-headless "chunk/option-source-fetch-no-data-delay.md" %}}

{{% include-headless "chunk/option-source-flags.md" %}}

{{% include-headless "chunk/option-source-format.md" %}}

{{% include-headless "chunk/option-destination-hook.md" %}}

{{% include-headless "chunk/option-source-host-override.md" %}}

{{% include-headless "chunk/option-mqtt-http-proxy.md" %}}

{{% include-headless "chunk/option-source-internal.md" %}}


<span id="option-mqtt-keep-alive"></span>

{{% include-headless "chunk/option-destination-keep-alive-mqtt.md" %}}

{{% include-headless "chunk/option-source-keep-hostname.md" %}}

{{% include-headless "chunk/option-source-keep-timestamp.md" %}}

{{% include-headless "chunk/option-source-log-iw-size.md" %}}

{{% include-headless "chunk/option-source-log-prefix.md" %}}

{{% include-headless "chunk/option-source-long-hostnames.md" %}}

{{% include-headless "chunk/option-source-normalize-hostnames.md" %}}


{{% include-headless "chunk/option-mqtt-password.md" %}}

{{% include-headless "chunk/option-persist-name.md" %}}

{{% include-headless "chunk/option-source-program-override.md" %}}

<!-- cfg-helper exposes read-old-records() and sdata-prefix() for mqtt(), but
     they have no mqtt-specific effect (live MQTT subscription has no historical
     replay, and MQTT messages don't carry RFC 5424 structured data).
     Keep these markers so the next docs-vs-cfg-helper diff doesn't flag them.
{{% include-headless "chunk/option-source-read-old-records.md" %}}
{{% include-headless "chunk/option-source-sdata-prefix.md" %}}
-->

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


{{% include-headless "chunk/option-source-tags.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

{{% include-headless "chunk/option-source-time-zone.md" %}}

{{% include-headless "chunk/option-tls.md" %}}

{{% include-headless "chunk/option-tls-mqtt.md" %}}



## topic() {#option-mqtt-topic}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* Required option. Specifies the MQTT topic to subscribe to.

{{% include-headless "chunk/option-source-use-dns.md" %}}

{{% include-headless "chunk/option-source-use-fqdn.md" %}}

{{% include-headless "chunk/option-source-use-syslogng-pid.md" %}}

{{% include-headless "chunk/option-mqtt-username.md" %}}
