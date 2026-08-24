---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
## flush-on-worker-key-change()

|          |               |
| -------- | ------------- |
| Type:    | `yes` or `no` |
| Default: | `no`          |

*Description:* If set to `yes`, {{% param "product.abbrev" %}} closes and sends the current batch whenever the value of the [`worker-partition-key()`](#worker-partition-key) template changes, instead of mixing messages that belong to different partitions into the same batch. This option has no effect unless you also set `worker-partition-key()`.
