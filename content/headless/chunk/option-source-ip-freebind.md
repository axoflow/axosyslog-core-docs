---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## ip-freebind()

|          |           |
| -------- | --------- |
| Type:    | yes or no |
| Default: | no        |

*Description:* Linux-only. Enables the `IP_FREEBIND` socket option, allowing {{% param "product.abbrev" %}} to bind to a non-local IP address. Useful when the address isn't yet configured on any interface (for example, during failover scenarios) so the source can listen before the address becomes available. Has no effect on platforms that don't support `IP_FREEBIND`.
