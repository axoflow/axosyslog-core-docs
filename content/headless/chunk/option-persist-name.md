---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## persist-name()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:*If you receive the following error message during {{% param "product.abbrev" %}} startup, set the `persist-name()` option of the duplicate drivers:

```c
   Error checking the uniqueness of the persist names, please override it with persist-name option. Shutting down.

```

This error happens if you use identical drivers in multiple sources, for example, if you configure two file sources to read from the same file. In this case, set the `persist-name()` of the drivers to a custom string, for example, **persist-name("example-persist-name1")**.

