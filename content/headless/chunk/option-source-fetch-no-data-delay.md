---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## fetch-no-data-delay()

|          |                              |
| -------- | ---------------------------- |
| Type:    | nonnegative float (seconds)  |
| Default: | value of `time-reopen()`     |

*Description:* For threaded-fetcher sources, sets how long {{% param "product.abbrev" %}} waits before the next fetch attempt when the previous attempt returned no data. Smaller values reduce latency but increase CPU usage. Larger values reduce load at the cost of higher latency.
