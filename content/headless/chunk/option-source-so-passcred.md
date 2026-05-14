---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## so-passcred() {#so-passcred}

|          |           |
| -------- | --------- |
| Type:    | yes or no |
| Default: | yes       |

*Description:* Enables the `SO_PASSCRED` socket option on UNIX domain sockets, which causes {{% param "product.abbrev" %}} to receive UNIX credentials (PID, UID, GID) of the sender process for each datagram. The credentials populate the `${.unix.pid}`, `${.unix.uid}`, and `${.unix.gid}` name-value pairs. On BSD systems, this option is also accessible under the legacy alias `local-creds()`.
