---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## bcc()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | n/a    |

*Description:* The BCC recipient of the email (contents of the BCC field). You can specify the email address, or the name and the email address. Set the `bcc` option multiple times to send the email to multiple recipients. For example: `bcc("admin@example.com")` or `bcc("Admin" "admin@example.com")` or `\>bcc("Admin" "admin@example.com") bcc("Admin2" "admin2@example.com")`

{{% include-headless "chunk/para-can-contain-macros.md" %}}

