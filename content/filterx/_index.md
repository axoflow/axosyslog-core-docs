---
title: FilterX
description: "What FilterX is, when to use it instead of classic filters, parsers, and rewrite rules, a minimal example, and a map of the FilterX pages."
weight: 2400
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

FilterX is the {{< product >}} language to filter, parse, and rewrite log messages. It replaces [filters]({{< relref "/chapter-routing-filters/filters/_index.md" >}}), [parsers]({{< relref "/chapter-parsers/_index.md" >}}), and [rewrite rules]({{< relref "/chapter-manipulating-messages/modifying-messages/_index.md" >}}) with a single language that has typed variables, and handles nested data structures like JSON.

A FilterX block is a list of statements. A message passes the block only if every statement is true for the message. For example, you can select messages from a specific host, parse the message into fields, then change or delete some of the fields.

To try FilterX in a few minutes, see {{% xref "/filterx/filterx-getting-started/_index.md" %}}.

## FilterX or classic filters, parsers, and rewrite rules? {#filterx-or-classic}

Use FilterX for new configurations, and when you process structured data like JSON, key=value pairs, or OpenTelemetry records. FilterX is faster than the classic blocks, and handles multi-level, typed objects.

You don't have to migrate existing configurations: the classic blocks keep working. You can use FilterX and classic blocks in the same log path, for example, a parser before a FilterX block. To convert existing filters and rewrite rules, see {{% xref "/filterx/update-filters.md" %}}.

## Define a filterx block

You can define `filterx` blocks inline in your log statements. (If you want to reuse `filterx` blocks, {{% xref "/filterx/reuse-filterx-block.md" %}}.)

For example, the following FilterX statement selects the messages that contain the word `deny` and come from the host `example`.

```shell
log {
    source(s1);
    filterx {
        ${HOST} == "example";
        ${MESSAGE} =~ "deny";
    };
    destination(d1);
};
```

You can use `filterx` blocks together with other blocks in a log path, for example, use a parser before/after the `filterx` block if needed.

<!-- FIXME what is mutable/immutable writable/read-only > devs to write a draft  -->

## What's in this section

- {{% xref "/filterx/filterx-language/_index.md" %}}: statements, variables, types, and scope.
- {{% xref "/filterx/filterx-examples/_index.md" %}}: common tasks and a FilterX iptables parser.
- Comparing, boolean, conditional, and string search pages: how to write conditions.
- {{% xref "/filterx/filterx-parsing/_index.md" %}} and {{% xref "/filterx/filterx-format-data/_index.md" %}}: parse and format CSV, key=value, JSON, XML, CEF, LEEF, and other formats.
- {{% xref "/filterx/operator-reference.md" %}} and {{% xref "/filterx/function-reference.md" %}}: the complete A–Z references.

## Operators and functions

FilterX has the following types of operators:

- Comparison: `==`, `===`, `<`, and others.
- Boolean: `and`, `or`, `not`.
- Regular expression match: `=~`, `!~`.
- Arithmetic and string: `+`, `+=`, `..` (slicing).
- Null handling: `??`, `=??`.

For the complete list, see {{% xref "/filterx/operator-reference.md" %}}.

FilterX has built-in functions to parse, format, and convert data. Other functions handle strings, dates, timezones, hashes, and metrics. For the complete list, see {{% xref "/filterx/function-reference.md" %}}.

## Next steps

- {{% xref "/filterx/filterx-getting-started/_index.md" %}}
- {{% xref "/filterx/filterx-language/_index.md" %}}
- {{% xref "/filterx/function-reference.md" %}}
- {{% xref "/filterx/operator-reference.md" %}}
- {{% xref "/filterx/update-filters.md" %}}
