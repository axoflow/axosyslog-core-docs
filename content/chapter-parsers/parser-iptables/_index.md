---
title: "iptables parser"
weight: 900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The iptables parser can parse the log messages of the iptables command.

FilterX has no iptables parser, but you can reimplement this one in a FilterX block. For details, see [Create an iptables parser]({{< relref "/filterx/_index.md#create-an-iptables-parser" >}}).

## Prerequisites

- {{% param "product.name" %}} version 3.16 or later.
- {{< include-headless "chunk/prereq-package-scl.md" >}}

    {{< include-headless "chunk/scl-config-snippet.md" "iptables-parser()" "scl/iptables/iptables.conf" >}}

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

{{% include-headless "chunk/option-parser-prefix.md" %}}

By default, `iptables-parser()` uses the `.iptables.` prefix. To modify it, use the following format:

```shell
   parser { 
        iptables-parser(prefix("myprefix.")); 
    };
```
