---
title: "Structured data (SDATA) parser"
weight: 1850
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{% param "product.abbrev" %}} 4.1 and later.

The `sdata-parser()` allows you to parse an RFC5424-style structured data string. You can use it to parse this relatively complex format separately, for example, to process malformatted messages. You can use the optional `prefix` option to add a specific string before the names of the parsed name-value pairs.

## Declaration

```shell
   parser parser_name {
        sdata-parser(
            format("<string-or-template-to-parse>")
            prefix("<prefix-for-parsed-name-value-pairs>")
        );
    };
```

{{% include-headless "chunk/option-parser-prefix.md" %}}
