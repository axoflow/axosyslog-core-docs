---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
## flags()

|          |                                                      |
| -------- | ---------------------------------------------------- |
| Type:    | `seqnum`, `no-seqnum`, `seqnum-all`, `no-seqnum-all` |
| Default: | `seqnum`                                             |

*Description:* Flags influence the behavior of the destination driver.

- `seqnum`: Assign a sequence number to the messages sent to this destination, and make it available in the `$SEQNUM` macro. By default, only locally generated messages (for example, the messages of the `internal()` source) are numbered. This flag is enabled by default, you can disable it with `no-seqnum`.
- `seqnum-all`: Assign a sequence number to every message, not only to the locally generated ones. Enabling `seqnum-all` automatically enables `seqnum` as well. You can disable it with `no-seqnum-all`.
