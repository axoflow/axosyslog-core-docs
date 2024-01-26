---
title: "parser: Parse and segment structured messages"
weight:  3100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The filters and default macros of AxoSyslog work well on the headers and metainformation of the log messages, but are rather limited when processing the content of the messages. Parsers can segment the content of the messages into name-value pairs, and these names can be used as user-defined macros. Subsequent filtering or other type of processing of the message can use these custom macros to refer to parts of the message. Parsers are global objects most often used together with filters and rewrite rules.

The {{% param "product.abbrev" %}} application provides the following possibilities to parse the messages, or parts of the messages, as shown on the following list. There are several built-in parsers for application-specific logs.

Note that by default, {{% param "product.abbrev" %}} parses every message as a syslog message. To disable message parsing, use the `flags(no-parse)` option of the source. To explicitly parse a message as a syslog message, use the `syslog` parser. For details, see {{% xref "/chapter-parsers/parser-syslog/_index.md" %}}.
