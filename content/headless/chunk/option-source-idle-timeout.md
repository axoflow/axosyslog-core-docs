---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## idle-timeout()

|                  |                    |
| ---------------- | ------------------ |
| Accepted values: | number [seconds] |
| Default:         | `0` (disabled) |

Available in {{< product >}} 4.9 and later.

If set, {{< product >}} closes the client connection if no data is received for the specified amount of time (in seconds).
