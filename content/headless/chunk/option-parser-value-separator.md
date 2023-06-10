---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## value-separator()

|           |                                            |
| --------- | ------------------------------------------ |
| Synopsis: | value-separator("<separator-character>") |

*Description:* Specifies the character that separates the keys from the values. Default value: `=`.

For example, to parse `key:value` pairs, use `kv-parser(value-separator(":"));`.

