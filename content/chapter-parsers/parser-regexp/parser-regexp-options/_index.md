---
title: "Options of Regular expression parsers"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The Regular expression parser has the following options.

## flags()

|            |                                 |
| ---------- | ------------------------------- |
| Synopsis:  | flags("ignore-case" "unicode") |
| Mandatory: | no                             |

*Description:* The flags to apply for the parser. The available flags depend on the [`type()`](#type) of the regular expression. For details, see {{% xref "/chapter-manipulating-messages/regular-expressions/reference-regexp-types/_index.md" %}}.

## patterns()

|            |                                 |
| ---------- | ------------------------------- |
| Synopsis:  | patterns("pattern1" "pattern2") |
| Mandatory: | yes                             |

*Description:* The regular expression patterns that you want to find a match. `regexp-parser()` supports multiple patterns, and stops the processing at the first successful match.

{{% include-headless "chunk/option-parser-prefix.md" %}}

{{% include-headless "chunk/no-default-prefix.md" %}}

```shell
   parser p_regexp{
        regexp-parser(
            patterns( ... )
            prefix("myprefix.")
        );
    };
```

{{% include-headless "chunk/option-parser-template.md" %}}

## type()

|            |                                 |
| ---------- | ------------------------------- |
| Synopsis:  | `pcre`, `string`, `glob` |
| Mandatory: | no, defaults to `pcre`          |

*Description:* Sets how the `patterns()` expressions are interpreted: as Perl Compatible Regular Expressions (`pcre`, used by default), literal string searches (`string`), or glob patterns without regular expression support (`glob`).
