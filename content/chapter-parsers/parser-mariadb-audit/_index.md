---
title: "MariaDB parser"
weight: 1300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The MariaDB parser can parse the log messages of the MariaDB Audit Plugin. The parser supports the `syslog` output typess' format.

## Prerequisites

- {{% param "product.name" %}} version 3.37 or later.
- {{< include-headless "chunk/prereq-package-scl.md" >}}

    {{< include-headless "chunk/scl-config-snippet.md" "mariadb-audit-parser()" "scl/mariadb/audit.conf" >}}

## Declaration:

```shell
   @version: {{% param "product.configversion" %}}
    @include "scl.conf"
    log {
        source { system(); };
        parser { mariadb-audit-parser(); };
        destination { ... };
    };
```

{{% include-headless "chunk/option-parser-prefix.md" %}}

By default, `mariadb-audit` uses the `.mariadb.` prefix. To modify it, use the following format:

```shell
   parser {
        mariadb-audit-parser(prefix("myprefix."));
    };
```

{{% include-headless "chunk/option-parser-template.md" %}}
