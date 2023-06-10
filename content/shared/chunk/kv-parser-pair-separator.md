---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## pair-separator()

|           |                                        |
| --------- | -------------------------------------- |
| Synopsis: | pair-separator("\<separator-string\>") |

*Description:* Specifies the character or string that separates the key-value pairs from each other. Default value: **,** .

For example, to parse `key1=value1;key2=value2` pairs, use **kv-parser(pair-separator(";"));** .

