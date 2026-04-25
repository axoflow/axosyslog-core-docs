---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

<!-- vale ai-tells.OverusedVocabulary = NO -->
## dynamic-window-realloc-ticks()
<!-- vale ai-tells.OverusedVocabulary = YES -->

|          |                    |
| -------- | ------------------ |
| Type:    | nonnegative number |
| Default: | 10                 |

*Description:* When `dynamic-window-size()` is enabled, controls how many statistics ticks must pass before {{% param "product.abbrev" %}} reallocates the dynamic window across active connections. Larger values dampen reallocation churn under bursty traffic; smaller values let the window adapt more aggressively to per-connection load. For background, see {{% xref "/chapter-routing-filters/concepts-flow-control/_index.md" %}}.
