---
title: "Options of linux-audit-parser() parsers"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `linux-audit-parser()` has the following options. Because `linux-audit-parser()` is a specialized key-value parser, it accepts the same key-value options as {{% xref "/chapter-parsers/key-value-parser/kv-parser-options/_index.md" %}}.

{{% include-headless "chunk/option-parser-allow-pair-separator-in-value.md" %}}

{{% include-headless "chunk/kv-parser-extract-stray-words-into.md" %}}

{{< include-headless "chunk/option-source-internal.md" >}}

{{% include-headless "chunk/kv-parser-pair-separator.md" %}}

{{% include-headless "chunk/option-parser-prefix.md" %}}

By default, `linux-audit-parser()` uses the `.auditd.` prefix. To modify it, use the following format:

```shell
   parser {
        linux-audit-parser(prefix("myprefix."));
    };
```

{{% include-headless "chunk/option-parser-template.md" %}}

{{% include-headless "chunk/option-parser-value-separator.md" %}}
