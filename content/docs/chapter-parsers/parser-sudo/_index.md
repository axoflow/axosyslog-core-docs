---
title: "Sudo parser"
weight:  3100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The sudo parser can parse the log messages of the sudo command. Available in version {{% conditional-text include-if="pe" %}}7.0.9{{% /conditional-text %}}{{% conditional-text include-if="ose" %}}3.16{{% /conditional-text %}} and later.


## Declaration:

```c

    @version: {{% productparam "configversion" %}}
    @include "scl.conf"
    log {
        source { system(); };
        parser { sudo-parser(); };
        destination { ... };
    };

```


The `sudo-parser()` is actually a reusable configuration snippet configured to parse sudo messages. For details on using or writing such configuration snippets, see {{% xref "/docs/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/sudo/sudo.conf).


{{% include-headless "chunk/option-parser-prefix.md" %}}

{{% include-headless "chunk/para-macro-prefix-parser.md" %}}

By default, `sudo-parser()` uses the `.sudo.` prefix. To modify it, use the following format:

```c

    parser { 
        sudo-parser(prefix("myprefix.")); 
    };

```

