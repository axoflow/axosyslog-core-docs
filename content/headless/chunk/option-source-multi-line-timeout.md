---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## multi-line-timeout()

|          |                              |
| -------- | ---------------------------- |
| Type:    | nonnegative integer (seconds) |
| Default: | 0 (off)                       |

*Description:* When using a multi-line mode (such as `regexp` or `indented`), sets the maximum time {{% param "product.abbrev" %}} waits for the next line of a multi-line message before flushing the partial message it has buffered. `0` disables the timeout. Set this option to avoid stuck partial messages when a producer pauses between lines.
