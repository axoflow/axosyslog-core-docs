---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## body()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | n/a    |

*Description:* The BODY field of the email. You can also use macros in the string. Use **\\n** to start a new line. For example:

```c
   body("{{% param "product.abbrev" %}} received the following alert from $HOST:\n$MSG")

```

