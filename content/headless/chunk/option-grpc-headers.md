---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## headers()

|          |             |
| -------- | ----------- |
| Type:    | arrow list |
| Default: | empty       |

Available in {{< product >}} 4.8 and later.

*Description:* Adds custom gRPC headers to each RPC call. Version 4.8 supported only static header names and values. For example:

```shell
headers(
    "organization" => "Axoflow"
    "stream-name" => "axo-stream"
  )
```

Starting with version 4.9, you can use templates and macros in the header values.

```shell
headers(
    "organization" => "Axoflow"
    "stream-name" => "${HOST}"
  )
```
