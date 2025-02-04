---
title: "The MSG message part"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section describes the `MSG` message part of a syslog message, according to the [legacy-syslog or BSD-syslog protocol](https://datatracker.ietf.org/doc/rfc3164/).

For further details about the `HEADER` and `PRI` message parts of a syslog message, see the following sections:

- [HEADER]({{< relref "/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/concepts-message-bsdsyslog-header/_index.md" >}})
- [PRI]({{< relref "/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/concepts-message-bsdsyslog-pri/_index.md" >}})

## The MSG message part

The `MSG` part contains the name of the program or process that generated the message, and the text of the message itself. The `MSG` part is usually in the following format: `program[pid]: message text`.
