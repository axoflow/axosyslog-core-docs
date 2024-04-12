---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## channel-args()

|          |                 |
| -------- | --------------- |
| Type:    | See description |
| Default: | - |

*Description:* The `channel-args()` option is available in gRPC-based drivers. It accepts name-value pairs and sets channel arguments defined in the [GRPC Core library documentation](https://grpc.github.io/grpc/core/group__grpc__arg__keys.html). For example:

```shell
    channel-args(
        "grpc.loadreporting" => 1
        "grpc.minimal_stack" => 0
    )
```
