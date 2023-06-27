---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
The {{% param "product.abbrev" %}} application can separate parts of log messages (that is, the contents of the ${MESSAGE} macro) at delimiter characters or strings to named fields (columns). One way to achieve this is to use a csv (comma-separated-values) parser (for other methods and possibilities, see the other sections of {{% xref "/chapter-parsers/_index.md" %}}. The parsed fields act as user-defined macros that can be referenced in message templates, file- and tablenames, and so on.

Parsers are similar to filters: they must be defined in the {{% param "product.abbrev" %}} configuration file and used in the log statement. You can also define the parser inline in the log path.

{{< include-headless "wnt/note-element-order.md" >}}

To create a `csv-parser()`, you have to define the columns of the message, the separator characters or strings (also called delimiters, for example, semicolon or tabulator), and optionally the characters that are used to escape the delimiter characters (`quote-pairs()`).


## Declaration:

```c
   parser <parser_name> {
        csv-parser(
            columns(column1, column2, ...)
            delimiters(chars("<delimiter_characters>"), strings("<delimiter_strings>"))
        );
    };
```


Column names work like macros.

{{% include-headless "chunk/p-parser-prefix.md" %}}
