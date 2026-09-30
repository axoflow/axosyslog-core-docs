---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## max-request-size() {#max-request-size}

|          |        |
| -------- | ------ |
| Type:    | number [bytes] |
| Default: | The value of [`log-msg-size()`](#log-msg-size) multiplied by 1000 |

*Description:* The maximum size of a single HTTP request, in bytes. {{% param "product.abbrev" %}} rejects larger requests with `413 Payload Too Large` and logs an error.

For compressed requests, this limit applies to the decompressed body as well.
