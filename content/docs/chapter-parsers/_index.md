---
title: "parser: Parse and segment structured messages"
weight:  3100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The filters and default macros of syslog-ng work well on the headers and metainformation of the log messages, but are rather limited when processing the content of the messages. Parsers can segment the content of the messages into name-value pairs, and these names can be used as user-defined macros. Subsequent filtering or other type of processing of the message can use these custom macros to refer to parts of the message. Parsers are global objects most often used together with filters and rewrite rules.

The {{% param "product.abbrev" %}} application provides the following possibilities to parse the messages, or parts of the messages:

  - By default, {{% param "product.abbrev" %}} parses every message as a syslog message. To disable message parsing, use the `flags(no-parse)` option of the source. To explicitly parse a message as a syslog message, use the `syslog` parser. For details, see {{% xref "/docs/chapter-parsers/parser-syslog/_index.md" %}}.

  - To segment a message into columns using a CSV-parser, see {{% xref "/docs/chapter-parsers/csv-parser/_index.md" %}}.

  - To segment a message consisting of whitespace or comma-separated `key=value` pairs (for example, Postfix log messages), see {{% xref "/docs/chapter-parsers/key-value-parser/_index.md" %}}.

  - To parse JSON-formatted messages, see {{% xref "/docs/chapter-parsers/json-parser/_index.md" %}}.

  - To parse XML-formatted messages, see {{% xref "/docs/chapter-parsers/xml-parser/_index.md" %}}.

  - To identify and parse the messages using a pattern database, see {{% xref "/docs/chapter-parsers/chapter-patterndb/_index.md" %}}.

  - To parse a specially-formatted date or timestamp, see {{% xref "/docs/chapter-parsers/date-parser/_index.md" %}}.

  - To write a custom parser in Python or Hy, see {{% xref "/docs/chapter-parsers/python-parser/_index.md" %}}.

  - To parse the tags sent by another syslog-ng host. For details, see {{% xref "/docs/chapter-parsers/parser-tags/_index.md" %}}.

The {{% param "product.abbrev" %}} application provides built-in parsers for the following application logs:

  - Apache HTTP server access logs. For details, see {{% xref "/docs/chapter-parsers/apache-access-log-parser/_index.md" %}}.

  - Cisco devices. For details, see {{% xref "/docs/chapter-parsers/cisco-parser/_index.md" %}}.

  - Messages formatted using the enterprise-wide message model (EWMM) of {{% param "product.abbrev" %}}. For details, see {{% xref "/docs/chapter-parsers/parser-ewmm/_index.md" %}}.

  - Iptables logs. For details, see {{% xref "/docs/chapter-parsers/parser-iptables/_index.md" %}}.

  - Linux Audit (`auditd`) logs. For details, see {{% xref "/docs/chapter-parsers/linux-audit-parser/_index.md" %}}.

  - Netskope log messages. For details, see {{% xref "/docs/chapter-parsers/parser-netskope/_index.md" %}}.

  - [osquery](https://osquery.io) result logs. For details, see {{% xref "/docs/chapter-sources/syslog-ng-source-osquery/_index.md" %}}.

  - SNMP traps of the [Net-SNMP](http://www.net-snmp.org)'s `snmptrapd` application. For details, see {{% xref "/docs/chapter-sources/syslog-ng-source-snmptrap/_index.md" %}}.

  - sudo logs. For details, see {{% xref "/docs/chapter-parsers/parser-sudo/_index.md" %}}.

  - Websense Content Gateway (Raytheon|Websense, now Forcepoint) log messages. For details, see {{% xref "/docs/chapter-parsers/parser-websense/_index.md" %}}.
