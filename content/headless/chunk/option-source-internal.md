---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## internal()

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | `yes`, `no` |
| Default:         | `no`           |

*Description:* Marks this pipeline element as internal. Elements marked as `internal()` are treated as an implementation detail, so for example statistics of the given pipe are available only on higher stats level. This option is mainly useful for developers or when writing SCL blocks and integrations.
