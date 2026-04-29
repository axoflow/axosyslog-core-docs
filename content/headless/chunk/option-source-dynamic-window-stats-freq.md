---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

<!-- vale ai-tells.OverusedVocabulary = NO -->
## dynamic-window-stats-freq()
<!-- vale ai-tells.OverusedVocabulary = YES -->

|          |                             |
| -------- | --------------------------- |
| Type:    | nonnegative float (seconds) |
| Default: | 0.0 (off)                   |

*Description:* When `dynamic-window-size()` is set to a non-zero value, sets how often {{% param "product.abbrev" %}} samples per-connection throughput statistics that drive window reallocation. `0` turns off sampling. The interval is stored internally in milliseconds, so fractional seconds are honored.
