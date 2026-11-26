---
title: "Destination failover"
weight:  600
description: "Use flags(destination-failover) to send messages to a backup destination while the primary is unreachable, and back when it recovers."
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The `destination-failover` flag of a log statement sends messages over an ordered list of destinations. While the first destination is unreachable, {{% param "product.name" %}} sends the messages to the next one. When the first destination becomes available again, {{% param "product.name" %}} sends the new messages to it again. The messages that already went to the next destination stay there.

The [`failover()` option of network destinations]({{< relref "/chapter-destinations/concepts-failover/_index.md" >}}) switches between the servers of a single destination. The alternatives of `flags(destination-failover)` can be any destinations, with different drivers and options. For example, you can send the messages to a local file while a remote server is unreachable.

## Prerequisites

- {{% param "product.name" %}} version 4.30 or later.

{{% alert title="Note" color="info" %}}
`flags(destination-failover)` is experimental. Its behavior can change in later releases.
{{% /alert %}}

## Configure destination failover {#configure}

1. Create an embedded log statement that contains the alternative destinations in their order of preference.
1. Add `flags(destination-failover)` to this log statement. The flag also covers the log statements that are nested in the alternatives.
1. Separate the alternatives in one of the following ways:

    - Put every destination into its own embedded log statement with `flags(final)`:

        ```shell
        log {
            source(s_network);
            log {
                log { destination(d_primary); flags(final); };
                log { destination(d_secondary); flags(final); };
                flags(destination-failover);
            };
        };
        ```

    - Use an `if {} else {}` statement, which implies `flags(final)`. You can add `elif` branches for more alternatives:

        ```shell
        log {
            source(s_network);
            log {
                if {
                    destination(d_primary);
                } else {
                    destination(d_secondary);
                };
                flags(destination-failover);
            };
        };
        ```

    Without `flags(final)`, every alternative receives every message, the same way as in any other [junction]({{< relref "/chapter-routing-filters/logpath/junctions/_index.md" >}}).

## Example: Fail over from a remote server to a local file {#example}

The following configuration receives messages on port 514, and sends them to a remote server. While the server is unreachable, {{% param "product.name" %}} writes the messages into a local file. The file is the last alternative, so it never rejects messages.

```shell
source s_network {
    network(port(514) transport("tcp"));
};

destination d_remote {
    network("logs.example.com" port(514) transport("tcp"));
};

destination d_local_backup {
    file("/var/log/backup/${HOST}.log" create-dirs(yes));
};

log {
    source(s_network);
    log {
        if {
            destination(d_remote);
        } else {
            destination(d_local_backup);
        };
        flags(destination-failover);
    };
};
```

## How destination failover works {#how-it-works}

- {{% param "product.name" %}} tries the alternatives in the order they appear in the configuration. A [`fallback`]({{< relref "/chapter-routing-filters/logpath/reference-logflags/_index.md#fallback" >}}) log statement inside the flagged log statement is the last alternative.
- An unreachable destination rejects the new messages, so {{% param "product.name" %}} tries the next alternative. Every rejected message increases the `syslogng_output_events_total{result="rejected"}` counter of the destination.
- The last alternative never rejects messages. If every destination is unreachable, the last alternative keeps the messages in its queue, the same way as without the flag. It sends them when it becomes available.
- The messages that a destination has already accepted stay in its queue (or [disk-buffer]({{< relref "/chapter-routing-filters/concepts-diskbuffer/_index.md" >}})) while it is unreachable. The destination sends them when it becomes available again. Only the new messages go to the next alternative.
- A destination reference, like `destination(d_primary)`, is a single unit. If the referenced destination drops a message, for example, with a `filterx` block, {{% param "product.name" %}} sends the message to the next alternative.

### When a destination is unreachable {#unreachable}

The following destinations report that they are unreachable:

- Network and socket destinations, for example, `network()`, `syslog()`, `tcp()`, `udp()`, `unix-stream()`, and `unix-dgram()`: while they can't connect to the server or the socket. They try to reconnect after every [`time-reopen()`]({{< relref "/chapter-global-options/reference-options/_index.md#time-reopen" >}}) period, also while they don't receive messages.
- Threaded destinations, for example, `http()` and `python()`: while none of their workers can send messages. A worker becomes unreachable when a connection or a send fails. It stays unreachable until it delivers a batch again. It also becomes reachable when it has no more messages to retry. If the destination uses the `worker-partition-key()` option, the worker that the partition key selects must be reachable.
- `file()` destinations: while they can't open the file. If the filename contains macros, {{% param "product.name" %}} checks each file.

Other destinations, for example, `program()` and `usertty()`, never reject messages, so they never trigger the failover.

{{% alert title="Note" color="info" %}}
A UDP destination can send messages without a connection to the server, so it rarely becomes unreachable, even if the server is down. Use TCP for the destinations that you want to fail over from.
{{% /alert %}}
