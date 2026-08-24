---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## condition()

|          |                   |
| -------- | ----------------- |
| Type:    | filter expression |
| Default: | N/A               |

*Description:* Applies the rewrite rule only to the messages that match the specified filter expression. Messages that don't match the filter pass through the rule unmodified, and continue to the next element of the log path. You can use any filter expression here, and you can reference an existing filter with the `filter()` function. For details, see {{% xref "/chapter-manipulating-messages/modifying-messages/conditional-rewrite/_index.md" %}}.
