---
title: "Options of apache-accesslog-parser() parsers"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `apache-accesslog-parser()` has the following options.


{{% include-headless "chunk/option-parser-prefix.md" %}}

By default, `apache-accesslog-parser()` uses the `.apache.` prefix. To modify it, use the following format:

```shell
   parser {
        apache-accesslog-parser(prefix("apache."));
    };
```


{{% include-headless "chunk/option-parser-template.md" %}}
