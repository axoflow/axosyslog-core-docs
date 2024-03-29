---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
When using the `json-parser()`, {{% param "product.abbrev" %}} converts all elements of the JSON object to name-value pairs. Any type information originally present in the incoming JSON object is retained, and automatically propagated to other {{% param "product.abbrev" %}} components (for example, a destination) if they support types.
   - Elements without a type are treated as strings.
   - JSON lists (arrays) are converted to {{% param "product.abbrev" %}} lists, so you can manipulate them using the [`$(list-*)` template functions]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md#template-function-list" >}}).