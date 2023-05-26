---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## drop-invalid()

|          |           |
| -------- | --------- |
| Type:    | yes or no |
| Values:  | yes|no    |
| Default: | no        |

*Description:* This option determines how the `syslog-parser()` affects messages when parsing fails.

If you set `drop-invalid()` to `yes`, `syslog-parser()` will drop the message if the parsing fails.

If you set `drop-invalid()` to `no`, the parsing error triggers `syslog-parser()` to rewrite and extend the original log message with the following additional information:

  - It prepends the following message to the contents of the `$MESSAGE` field: `Error processing log message`.
  - It sets the contents of the `$PROGRAM` field to `syslog-ng`.
  - It sets the contents of the `facility` field to `syslog`.
  - It sets the contents of the `severity` field to `error`.


{{% alert title="Note" color="info" %}}

With the `drop-invalid(no)` option `syslog-parser()` will work in the same way as the sources which receive syslog-protocol/BSD-format messages.

{{% /alert %}}


## Example: enabling the drop-invalid() option

```c
   parser p_syslog {  syslog-parser(drop-invalid(yes)); };
```

