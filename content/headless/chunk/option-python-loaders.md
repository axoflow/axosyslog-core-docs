---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## loaders()

|          |                        |
| -------- | ---------------------- |
| Type:    | list of python modules |
| Default: | empty list             |

*Description:* The {{% param "product.abbrev" %}} application imports Python modules specified in this option, before importing the code of the Python class. This option has effect only when the Python class is provided in an external Python file. This option has no effect when the Python class is provided within the {{% param "product.abbrev" %}} configuration file (in a `python{}` block). You can use the `loaders()` option to modify the import mechanism that imports Python class. For example, that way you can use [hy](https://github.com/hylang/hy) in your Python class.

```c
   python(class(usermodule.HyParser) loaders(hy))

```

