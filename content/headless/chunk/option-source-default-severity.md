---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## default-severity()

|          |                 |
| -------- | --------------- |
| Type:    | severity string |
| Default: | `notice`        |

*Description:* Assigns a default severity to messages received from this source when the message doesn't specify one. Accepts the standard syslog severity keywords (for example, `emerg`, `alert`, `crit`, `err`, `warning`, `notice`, `info`, `debug`). Combined with [`default-facility()`](#default-facility) to compute the message priority.
