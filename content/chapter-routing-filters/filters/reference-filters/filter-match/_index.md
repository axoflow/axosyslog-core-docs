---
title: "match()"
weight:  1100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

|           |                                                                                 |
| --------- | ------------------------------------------------------------------------------- |
| Synopsis: | match(regexp) | match(regexp value("MACRO")) | match(regexp template("MACROS")) |

*Description:* Match a regular expression to the headers and the message itself (that is, the values returned by the `MSGHDR` and `MSG` macros). Note that in AxoSyslog version 2.1 and earlier, the `match()` filter was applied only to the text of the message, excluding the headers. This functionality has been moved to the `message()` filter.

To limit the scope of the match to a specific part of the message (identified with a macro), use the `match(regexp value("MACRO"))` syntax. Do not include the $ sign in the parameter of the `value()` option.

The `value()` parameter accepts both built-in macros and user-defined ones created with a parser or using a pattern database. For details on macros and parsers, see {{% xref "/chapter-manipulating-messages/customizing-message-format/configuring-macros/_index.md" %}}, {{% xref "/chapter-parsers/csv-parser/_index.md" %}}, and {{% xref "/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-filters/_index.md" %}}.

Starting with version 3.22, the `match()` filter can work on templates as well. This means that you can a match against an expression combined of macros, instead of a single macro. Note that when using a template, you must reference macros with the $ sign (unlike when using the `value()` parameter). For example:

```shell
   match("^my-regular-expression" template("${HOST}|${PROGRAM}${PID}|${MESSAGE}"));
```

Using a template with a single macro is equivalent with using the `value()` parameter. For example, the following two lines are equivalent:

```shell
   match("^my-regular-expression" value("MESSAGE"));
    match("^my-regular-expression" template("${MESSAGE}"));
```
