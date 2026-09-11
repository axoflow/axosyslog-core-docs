---
title: "Sudo parser"
weight: 1900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The sudo parser can parse the log messages of the sudo command.

## Prerequisites

- {{% param "product.name" %}} version 4.16 or later.
- {{< include-headless "chunk/prereq-package-scl.md" >}}

    {{< include-headless "chunk/scl-config-snippet.md" "sudo-parser()" "scl/sudo/sudo.conf" >}}

## Declaration:

```shell
   @version: {{% param "product.configversion" %}}
    @include "scl.conf"
    log {
        source { system(); };
        parser { sudo-parser(); };
        destination { ... };
    };
```

{{% include-headless "chunk/option-parser-prefix.md" %}}

By default, `sudo-parser()` uses the `.sudo.` prefix. To modify it, use the following format:

```shell
   parser { 
        sudo-parser(prefix("myprefix.")); 
    };
```
