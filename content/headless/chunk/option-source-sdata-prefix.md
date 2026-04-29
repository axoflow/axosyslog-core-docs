---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## sdata-prefix()

|           |                              |
| --------- | ---------------------------- |
| Type: | string |
| Default: | `.SDATA.` |

Available in {{% param "product.abbrev" %}} 4.1 and later.

*Description:* Adds a specific string before the names of the parsed SDATA fields to store the name-value pairs created from the SDATA fields separately. Note that unless the value of `sdata-prefix` starts with `.SDATA.`, using this option excludes the parsed fields from the [`sdata` and `rfc5424` scopes of the value pairs]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md#scope" >}}).
