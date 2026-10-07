---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
## worker-partition-key()

|          |        |
| -------- | ------ |
| Type:    | template |
| Default: |        |

*Description:* The `worker-partition-key()` option specifies a template: messages that expand the template to the same value are mapped to the same partition. When batching is enabled (`batch-lines()` or `batch-bytes()`) and the `url()`, `headers()`, or `body-prefix()` options contain message-dependent templates, `worker-partition-key()` is required: without it, the destination fails to start with an error. Set it to a template that contains all the message-dependent templates used in these options. {{< product >}} flushes the batch whenever the partition key changes, so every batch contains messages with identical URL, headers, and body prefix.

Templates that resolve to the same value for every message (for example, ones that contain only literals or `$(url-encode literal)`) don't require `worker-partition-key()`.

For example, you can partition messages based on the destination host:

```shell
worker-partition-key("$HOST")
```
