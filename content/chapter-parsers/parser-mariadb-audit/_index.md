---
title: "MariaDB parser"
weight:  3300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The MariaDB parser can parse the log messages of the MariaDB Audit Plugin. The parser supports the `syslog` output typess' format. Available in version 3.37 and later.


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


The `mariadb-audit` is a reusable configuration snippet configured to parse MariaDB Audit Plugin messages. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/mariadb/audit.conf).


{{% include-headless "chunk/option-parser-prefix.md" %}}

{{% include-headless "chunk/para-macro-prefix-parser.md" %}}

By default, `mariadb-audit` uses the `.mariadb.` prefix. To modify it, use the following format:

```shell
   parser {
        mariadb-audit-parser(prefix("myprefix."));
    };
```

