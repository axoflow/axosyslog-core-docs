---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## response-action()

|          |                            |
| -------- | -------------------------- |
| Type:    | arrow list |
| Default: | Depends on the driver |

Available in {{% param "product_name" %}} version 4.11.0 and later.

*Description:* Fine-tunes how {{< product >}} behaves in case of different gRPC results. You can assign specific actions to the different gRPC results, for example:

```shell
response-action(
  not-found => disconnect
  unavailable => drop
)
```

The following gRPC results are supported:

- `aborted`
- `already-exists`
- `cancelled`
- `data-loss`
- `deadline-exceeded`
- `failed-precondition`
- `internal`
- `invalid-argument`
- `not-found`
- `ok`
- `out-of-range`
- `permission-denied`
- `resource-exhausted`
- `unauthenticated`
- `unavailable`
- `unknown`
- `unimplemented`

The following actions are available:

- `disconnect`
- `drop`
- `retry`
- `success`
