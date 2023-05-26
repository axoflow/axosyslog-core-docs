---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## prefix()

|           |          |
| --------- | -------- |
| Synopsis: | prefix() |

*Description:* Insert a prefix before the name part of the parsed name-value pairs to help further processing. For example:

  - To insert the `my-parsed-data.` prefix, use the `prefix(my-parsed-data.)` option.

  - To refer to a particular data that has a prefix, use the prefix in the name of the macro, for example, `${my-parsed-data.name}`.

  - If you forward the parsed messages using the IETF-syslog protocol, you can insert all the parsed data into the SDATA part of the message using the `prefix(.SDATA.my-parsed-data.)` option.

{{% include-headless "chunk/p-parser-prefix.md" %}}

