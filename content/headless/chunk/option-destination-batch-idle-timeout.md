---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## batch-idle-timeout()

|          |                      |
| -------- | -------------------- |
| Type:    | time in milliseconds |
| Default: | `0` (disabled)       |

Available in {{% param "product.abbrev" %}} 4.24 and later.

*Description:*  `batch-idle-timeout()` measures the elapsed time since the last message was added to the batch ([`batch-timeout()`](#batch-timeout) defines the maximum time used to collect a batch, starting from the first message). If either `batch-idle-timeout()` or `batch-timeout()` expires, {{% param "product.abbrev" %}} closes and sends the batch.
