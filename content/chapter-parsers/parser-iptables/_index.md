---
title: "iptables parser"
weight: 900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The iptables parser can parse the log messages of the iptables command. Available in version 3.16 and later.


## Declaration:

```shell
   @version: {{% param "product.configversion" %}}
    @include "scl.conf"
    log {
        source { system(); };
        parser { iptables-parser(); };
        destination { ... };
    };
```


The `iptables-parser()` is actually a reusable configuration snippet configured to parse iptables messages. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/iptables/iptables.conf).


{{% include-headless "chunk/option-parser-prefix.md" %}}

{{% include-headless "chunk/para-macro-prefix-parser.md" %}}

By default, `iptables-parser()` uses the `.iptables.` prefix. To modify it, use the following format:

```shell
   parser { 
        iptables-parser(prefix("myprefix.")); 
    };
```

