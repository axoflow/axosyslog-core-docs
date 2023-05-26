---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
In {{% param "product.abbrev" %}} version 3.23 and later, you can specify a comma-separated list of formats to parse multiple date formats with a single parser. For example:

```c
   date-parser(format(
        "%FT%T.%f",
        "%F %T,%f",
        "%F %T"
    ));
```
