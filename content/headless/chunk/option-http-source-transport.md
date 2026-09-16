---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## transport() {#transport}

|          |                |
| -------- | -------------- |
| Type:    | `tcp` or `tls` |
| Default: | `tcp`          |

*Description:* Sets whether the source accepts plain HTTP (`tcp`) or HTTPS (`tls`) connections. Setting `transport(tls)` requires a [`tls()`](#tls) block, and changes the default port to 443.
