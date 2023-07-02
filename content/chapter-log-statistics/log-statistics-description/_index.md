---
title: "Metrics and counters"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

You can list all active metrics on your {{% param "product.abbrev" %}} host using the following command (this lists the metrics, without their current values): `syslog-ng-ctl query list "*"`

To list the metrics and their values, use the following command: `syslog-ng-ctl query get "*"`

The displayed metrics have the following structure.

The type of the object (for example, `dst.file`, `tag`, `src.facility`)

The ID of the object used in the `syslog-ng.conf` configuration file, for example, `d_internal` or `source.src_tcp`. The `#0` part means that this is the first destination in the destination group.

The instance ID (destination) of the object, for example, the filename of a file destination, or the name of the application for a program source or destination.

The status of the object. One of the following:

  - `a` - active. At the time of quering the statistics, the source or the destination was still alive (it continuously received statistical data).

  - `d` - dynamic. Such objects may not be continuously available, for example, like statistics based on the sender's hostname. These counters only appear above a certain value of `stats-level()` global option:
    
      - `host`: source host, from `stats-level(2)`
    
      - `program`: program, from `stats-level(3)`
    
      - `sender`: sender host, from `stats-level(3)`
    
    
    ## Example: Dynamic counters
    
    The following example contains 6 different dynamic values: a sender, a host, and four different programs.
    
    ```shell
        src.sender;;localhost;d;processed;4
        src.sender;;localhost;d;stamp;1509121934
        src.program;;P-18069;d;processed;1
        src.program;;P-18069;d;stamp;1509121933
        src.program;;P-21491;d;processed;1
        src.program;;P-21491;d;stamp;1509121934
        src.program;;P-9774;d;processed;1
        src.program;;P-9774;d;stamp;1509121919
        src.program;;P-14737;d;processed;1
        src.program;;P-14737;d;stamp;1509121931
        src.host;;localhost;d;processed;4
        src.host;;localhost;d;stamp;1509121934
    
    ```
    
    
    To avoid performance issues or even overloading {{% param "product.abbrev" %}}, you might want to limit the number of registered dynamic counters in the message statistics. To do this, configure the [stats-max-dynamics()]({{< relref "/chapter-global-options/reference-options/_index.md" >}}) global option.

  - `o` - This object was once active, but stopped receiving messages. (For example, a dynamic object may disappear and become orphan.)
    
    {{% alert title="Note" color="info" %}}
The {{% param "product.abbrev" %}} application stores the statistics of the objects when {{% param "product.abbrev" %}} is reloaded. However, if the configuration of {{% param "product.abbrev" %}} was changed since the last reload, the statistics of orphaned objects are deleted.
    {{% /alert %}}

The `connections` statistics counter displays the number of connections tracked by {{% param "product.abbrev" %}} for the selected source driver.


## Example: sample configuration and statistics output

The following configuration will display the following `syslog-ng-ctl` statistics output:

Configuration:

```shell
   source s_network { 
      tcp( 
        port(8001)  
      ); 
    };
```

Statistics output:

```shell
   src.tcp;s_network#0;tcp,127.0.0.5;a;processed;1
    src.tcp;s_network#0;tcp,127.0.0.1;a;processed;3
    src.tcp;s_network;afsocket_sd.(stream,AF_INET(0.0.0.0:8001));a;connections;2
```


The type of the statistics:

`batch_size_avg`: When batching is enabled, then this shows the current average batch size of the given source or destination.

{{% alert title="Note" color="info" %}}

In version 7.0.27, {{% param "product.abbrev" %}} only supports the `batch_size_avg` for the `http()` destination.

{{% /alert %}}

`batch_size_max`: When batching is enabled, the value of `batch_size_max` shows the current largest batch size of the given source or destination.

{{% alert title="Note" color="info" %}}

In version 7.0.27, {{% param "product.abbrev" %}} only supports the `batch_size_max` for the `http()` destination.

{{% /alert %}}

`discarded`: The number of messages discarded by the given parser. These are messages that the parser could not parsed, and are therefore not processed. For example:

```shell
   parser;demo_parser;;a;discarded;20
```

`dropped`: The number of dropped messages — {{% param "product.abbrev" %}} could not send the messages to the destination and the output buffer got full, so messages were dropped by the destination driver, or {{% param "product.abbrev" %}} dropped the message for some other reason (for example, a parsing error).

`eps_last_1h`: The EPS value of the past 1 hour.

`eps_last_24h`: The EPS value of the past 24 hours.

`eps_since_start`: The EPS value since the current {{% param "product.abbrev" %}} start.

{{% alert title="Note" color="info" %}}

When using the `eps_last_1h`, the `eps_last_24h`, and the `eps_since_start` statistics, consider the following:

  - EPS stands for "event per second", and in our case, a message received or sent counts as a single event.

  - The `eps_last_1h`, the `eps_last_24h`, and the `eps_since_start` values are only approximate values.

  - The `eps_last_1h`, the `eps_last_24h`, and the `eps_since_start` values are automatically updated every `60` seconds.

{{% /alert %}}

`matched`: The number of messages that are accepted by a given filter. Available for filters and similar objects (for example, a conditional rewrite rule). For example, if a filter matches a specific hostname, then the `matched` counter contains the number of messages that reached the filter from this hosts.

```shell
   filter;demo_filter;;a;matched;28
```

`memory_usage`: The memory used by the messages in the different queue types (in bytes). This includes every queue used by the object, including memory buffers (log-fifo) and disk-based buffers (both reliable and non-reliable). For example:

```shell
   dst.network;d_net#0;tcp,127.0.0.1:9999;a;memory_usage;0
```

{{% alert title="Note" color="info" %}}
The memory usage (size) of queues is not equal to the memory usage (size) of the log messages in {{% param "product.abbrev" %}}. A log message can be in multiple queues, thus its size is added to multiple queue sizes. To check the size of all log messages, use `global.msg_allocated_bytes.value` metric.
{{% /alert %}}

`msg_size_max`: The current largest message size of the given source or destination.

`msg_size_avg`: The current average message size of the given source or destination.

{{% alert title="Note" color="info" %}}
When using the `msg_size_avg` and `msg_size_max` statistics, consider that message sizes are calculated as follows:

  - on the source side: the length of the incoming raw message

  - on the destination side: the length of the outgoing formatted message
{{% /alert %}}

`not_matched`: The number of messages that are filtered out by a given filter. Available for filters and similar objects (for example, a conditional rewrite rule). For example, if a filter matches a specific hostname, then the `not_matched` counter contains the number of messages that reached the filter from other hosts, and so the filter discarded them.

{{% alert title="Note" color="info" %}}
Since the `not_matched` metric applies to filters, and filters are expected to discard messages that do not match the filter condition, `not_matched` messages are not included in the `dropped` metric of other objects.

```shell
   filter;demo_filter;;a;not_matched;0

```
{{% /alert %}}

`processed`: The number of messages that successfully reached their destination driver.

{{% alert title="Note" color="info" %}}
Consider that a message that has successfully reached its destination driver does not necessarily mean that the destination driver successfully delivered the messages as well. For example, a message can be written to disk or sent to a remote server after reaching the destination driver.
{{% /alert %}}

`queued`: The number of messages passed to the message queue of the destination driver, waiting to be sent to the destination.

`stamp`: The UNIX timestamp of the last message sent to the destination.

`suppressed`: The number of suppressed messages (if the `suppress()` feature is enabled).

`written`: The number of messages successfully delivered to the destination. This value is calculated from other counters: `written = processed - queued - dropped`. That is, the number of messages {{% param "product.abbrev" %}} passed to the destination driver (processed) minus the number of messages that are still in the output queue of the destination driver (queued) and the number of messages dropped because of an error (dropped, for example, because {{% param "product.abbrev" %}} could not deliver the message to the destination and exceeded the number of retries).

{{% include-headless "chunk/para-metrics-calculated-reset.md" %}}

{{% alert title="Note" color="info" %}}
Consider that for {{% param "product.abbrev" %}} version 3.36, the following statistics counters are only supported for the `http()` destination, or the `http()` destination and all `network()` sources and destinations, and all `file()` sources and destinations, respectively:

  - `msg_size_max`

  - `msg_size_avg`

  - `batch_size_max`

  - `batch_size_avg`

  - `eps_last_1h`

  - `eps_last_24h`

  - `eps_since_start`
{{% /alert %}}

The number of such messages.


## Availability of statistics

Certain statistics are available only if the [`stats-level()` global option]({{< relref "/chapter-global-options/reference-options/_index.md" >}}) is set to a higher value.

{{% include-headless "chunk/option-stats-level-description.md" %}}

When receiving messages with non-standard facility values (that is, higher than 23), these messages will be listed as `other` facility instead of their facility number.

## Aggregated statistics

Aggregated statistics are available for different sources and destinations from different levels and upwards:

<table>
<colgroup>
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
</colgroup>
<thead>
<tr class="header">
<th><p> </p></th>
<th><p><code> msg_size_avg</code></p></th>
<th><p><code> msg_size_max</code></p></th>
<th><p><code> batch_size_avg</code></p></th>
<th><p><code> batch_size_max</code></p></th>
<th><p><code> eps_last_1h</code></p></th>
<th><p><code> eps_last_1h</code></p></th>
<th><p><code> eps_last_1h</code></p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><code> network()</code> source and destination</p></td>
<td><p>from level 1</p></td>
<td><p>from level 1</p></td>
<td><p>counter N/A</p></td>
<td><p>counter N/A</p></td>
<td><p>from level 1</p></td>
<td><p>from level 1</p></td>
<td><p>from level 1</p></td>
</tr>
<tr class="even">
<td><p><code>file()</code> source and destination</p></td>
<td><p>from level 1</p></td>
<td><p>from level 1</p></td>
<td><p>counter N/A</p></td>
<td><p>counter N/A</p></td>
<td><p>from level 1</p></td>
<td><p>from level 1</p></td>
<td><p>from level 1</p></td>
</tr>
<tr class="odd">
<td><p><code>http()</code> destination</p></td>
<td><p>from level 0</p>
<p> </p></td>
<td><p>from level 0</p></td>
<td><p>from level 0</p></td>
<td><p>from level 0</p></td>
<td><p>from level 0</p></td>
<td><p>from level 0</p></td>
<td><p>from level 0</p></td>
</tr>
</tbody>
</table>

