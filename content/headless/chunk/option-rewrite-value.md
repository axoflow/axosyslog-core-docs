---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## value()

|          |                        |
| -------- | ---------------------- |
| Type:    | name of a message field |
| Default: | `MESSAGE`              |

*Description:* Selects the field of the message that the rewrite rule modifies. If you don't set it, the rule operates on the `MESSAGE` field.

Write the name of the field without the `$` prefix, for example, `value("HOST")`, not `value("$HOST")`. The `$` prefix is only needed in templates, and {{% param "product.abbrev" %}} logs a warning if you use it here. You cannot set a hard macro in the `value()` option, {{% param "product.abbrev" %}} rejects the configuration with an error.
