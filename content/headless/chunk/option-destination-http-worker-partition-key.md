---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
## worker-partition-key()

|          |        |
| -------- | ------ |
| Type:    | template |
| Default: |        |

*Description:* The `worker-partition-key()` option specifies a template: messages that expand the template to the same value are mapped to the same partition. When batching is enabled and multiple workers are configured, it's important to add only those messages to a batch which generate identical URLs. To achieve this, set the `worker-partition-key()` option with a template that contains all the templates used in the `url()` option, otherwise messages will be mixed.

For example, you can partition messages based on the destination host:

```shell
worker-partition-key("$HOST")
```
