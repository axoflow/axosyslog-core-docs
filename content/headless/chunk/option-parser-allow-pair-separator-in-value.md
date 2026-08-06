---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## allow-pair-separator-in-value()

|                  |             |
| ---------------- | ----------- |
| Accepted values: | `yes`, `no` |
| Default:         | `yes`       |

*Description:* Permits the pair separator character inside the value of a key-value pair, so that `key1=value with spaces, key2=other value` parses into two pairs even though the value of `key1` contains spaces.

{{% param "product.abbrev" %}} always parses key-value pairs this way, so setting this option has no effect. {{% param "product.abbrev" %}} only accepts it so that older configurations remain valid.
