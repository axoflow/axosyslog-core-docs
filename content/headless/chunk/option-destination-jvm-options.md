---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## jvm-options()

|          |      |
| -------- | ---- |
| Type:    | list |
| Default: | N/A  |

*Description:* Specify the Java Virtual Machine (JVM) settings of your Java destination from the {{% param "product.abbrev" %}} configuration file.

For example:

```c
   jvm-options("-Xss1M -XX:+TraceClassLoading")
```

You can set this option only as a [global option]({{< relref "/docs/chapter-global-options/_index.md" >}}), by adding it to the `options` statement of the `syslog-ng` configuration file.

