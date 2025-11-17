---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## keep-alive()

|          |           |
| -------- | --------- |
| Type:    | `yes` or `no` |
| Default: | `yes`       |

Available in {{< product >}} 4.20 and later.

*Description:* Client connections can be kept alive during reload, avoiding unnecessary retry backoffs and other error messages on the client side.
