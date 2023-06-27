---
title: "Fortigate parser options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `fortigate-parser()` has the following options:


{{% include-headless "chunk/option-parser-prefix-panos.md" %}}

By default, `fortigate-parser()` uses the `.fortigate.` prefix. To modify it, use the following format:

```c
   parser {
        fortigate-parser(prefix("myprefix."));
    };
```


{{% include-headless "chunk/option-parser-template.md" %}}
