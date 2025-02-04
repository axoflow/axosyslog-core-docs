---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## concurrent-requests()

|          |                 |
| -------- | --------------- |
| Type:    | integer |
| Default: | 2 |

*Description:* Configures the maximal number of in-flight gRPC requests per worker. Setting this value in the range of 10s or 100s is recommended when there are a high number of clients sending simultaneously. Ideally, `workers() * concurrent-requests()` should be greater than or equal to the number of clients, but this can increase the memory usage.
