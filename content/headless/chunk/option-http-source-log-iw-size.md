---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## log-iw-size() {#log-iw-size}

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | The value of [`max-connections()`](#max-connections) multiplied by [`min-iw-size-per-reader()`]({{< relref "/chapter-global-options/reference-options/_index.md#global-option-min-iw-size-per-reader" >}}) |

*Description:* The size of the source window, that is, the maximum number of in-flight messages the source permits before flow control is enforced. This applies only when `flags(flow-control)` is set. For details, see {{% xref "/chapter-routing-filters/concepts-flow-control/_index.md" %}}.
