---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
## worker-partition-autoscaling()

|          |        |
| -------- | ------ |
| Type:    | `yes`, `no` |
| Default: | `no` |

Available in version 4.21 and later.

When using `worker-partition-key()` to categorize messages into different batches, the messages are hashed into workers by default. This prevents distributing across workers based on load.

Setting `worker-partition-autoscaling(yes)` uses a 1-minute statistic to distribute high-traffic partitions among multiple workers, allowing each worker to maximize its batch size. When using `worker-partition-autoscaling(yes)`, set the number of [`workers()`](#workers) to higher than the expected number of partitions.

<!-- FIXME What is worker-partition-autoscaling-wfo ? -->
