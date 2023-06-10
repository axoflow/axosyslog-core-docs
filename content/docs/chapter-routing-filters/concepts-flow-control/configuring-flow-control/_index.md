---
title: "Configuring flow-control"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

For details on how flow-control works, see {{% xref "/docs/chapter-routing-filters/concepts-flow-control/_index.md" %}}. The summary of the main points is as follows:

  - The syslog-ng application normally reads a maximum of `log-fetch-limit()` number of messages from a source.

  - From TCP and unix-stream sources, syslog-ng reads a maximum of `log-fetch-limit()` from every connection of the source. The number of connections to the source is set using the `max-connections()` parameter.

  - Every destination has an output buffer. The size of this buffer is set automatically for log paths that use flow-control, and can be set using the `log-fifo-size()` option for other log paths.

  - Flow-control uses a control window to determine if there is free space in the output buffer for new messages. Every source has its own control window, the `log-iw-size()` option sets the size of the static control window. Optionally, you can enable a dynamic control window for the source using the `dynamic-window-size()` option.

  - When a source accepts multiple connections, the size of the control window is divided by the value of the `max-connections()` parameter and this smaller control window is applied to each connection of the source.
    
    The dynamic control window is automatically distributed among the active connections of the source.

  - If the control window is full, syslog-ng stops reading messages from the source until some messages are successfully sent to the destination.

  - If the output buffer becomes full, and neither disk-buffering nor flow-control is used, messages may be lost.

{{% alert title="Warning" color="warning" %}}

If you modify the `max-connections()` or the `log-fetch-limit()` parameter, do not forget to adjust the `log-iw-size()` and `dynamic-window-size()` parameters accordingly.

{{% /alert %}}


## Example: Sizing parameters for flow-control

Suppose that syslog-ng has a source that must accept up to 300 parallel connections. Such situation can arise when a network source receives connections from many clients, or if many applications log to the same socket.

Set the `max-connections()` parameter of the source to `300`. However, the `log-fetch-limit()` (default value: 10) parameter applies to every connection of the source individually, while the `log-iw-size()` (default value: 1000) parameter applies to the source. In a worst-case scenario, the destination does not accept any messages, while all 300 connections send at least `log-fetch-limit()` number of messages to the source during every poll loop. Therefore, the control window must accommodate at least `max-connections()`\*`log-fetch-limit()` messages to be able to read every incoming message of a poll loop. In the current example this means that `log-iw-size()` should be greater than `300\*10=3000`. If the control window is smaller than this value, the control window might fill up with messages from the first connections — causing syslog-ng to read only one message of the last connections in every poll loop.

The output buffer of the destination must accommodate at least `log-iw-size()` messages, but use a greater value: in the current example `3000\*10=30000` messages. That way all incoming messages of ten poll loops fit in the output buffer. If the output buffer is full, syslog-ng does not read any messages from the source until some messages are successfully sent to the destination.

```c
   source s_localhost {
        network(
            ip(127.0.0.1)
            port(1999)
            max-connections(300)
        );
    };
    destination d_tcp {
        network("10.1.2.3"
            port(1999)
            localport(999)
            log-fifo-size(30000)
        );
    };
    log {
        source(s_localhost);
        destination(d_tcp);
        flags(flow-control);
    };
```

If other sources send messages to this destination, then the output buffer must be further increased. For example, if a network host with maximum `100` connections also logs into the destination, then increase the `log-fifo-size()` by `10000`.

```c
   source s_localhost {
        network(
            ip(127.0.0.1)
            port(1999)
            max-connections(300)
        );
    };
    source s_tcp {
        network(
            ip(192.168.1.5)
            port(1999)
            max-connections(100)
        );
    };
    destination d_tcp {
        network("10.1.2.3"
            port(1999)
            localport(999)
            log-fifo-size(40000)
        );
    };
    log {
        source(s_localhost);
        destination(d_tcp);
        flags(flow-control);
    };
```

