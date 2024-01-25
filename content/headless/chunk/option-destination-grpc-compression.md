---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## compression()

|          |                            |
| -------- | -------------------------- |
| Type:    | boolean |
| Default: | `no` |

Available in {{% param "product_name" %}} version 4.5.0 and later.

*Description:* Enables compression in gRPC requests. Although gRPC supports various compression methods, currently only deflate is supported (which is basically the same as gzip).
