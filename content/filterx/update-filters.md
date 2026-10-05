---
title: "Update to FilterX"
weight:  1000
---

The following sections show you how you can change your existing filters, parsers, and rewrite rules to FilterX statements. Note that:

- Many examples in the FilterX documentation were adapted from the existing filter, parser, and rewrite examples to show how you can achieve the same functionality with FilterX.
- Don't worry if you can't update something to FilterX. While you can't use other blocks within a FilterX block, you can use both in a log statement, for example, you can use a FilterX block, then a parser if needed.
- There is no push to use FilterX. You can keep using the traditional blocks if they satisfy your requirements.

## Update filters to FilterX

This section shows you how to update your existing `filter` expressions to `filterx`.

You can replace most [filter functions]({{< relref "/chapter-routing-filters/filters/_index.md" >}}) with a simple value comparison of the appropriate macro, for example:

- `facility(user)` with `${FACILITY} == "user"`
- `host("example-host")` with `${HOST} == "example-host"`
- [`inlist()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-inlist/_index.md" >}}) with the [`in` list membership operator]({{< relref "/filterx/operator-reference.md#list-membership-operator" >}})
- `level(warning)` with `${LEVEL} == "warning"`

    If you want to check for a range of levels, use numerical comparison with the `${LEVEL_NUM}` macro instead. For a list of numerical level values, see {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md#macro-level-num" %}}.

- `message("example")` with `${MESSAGE} =~ "example"` (see the [equal tilde operator]({{< relref "/filterx/operator-reference.md#regexp" >}}) for details)
- [`netmask()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-netmask/_index.md" >}}) and [`netmask6()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-netmask6/_index.md" >}}) with `subnet` and a list membership check, for example, `netmask(192.168.5.0/255.255.255.0)` becomes `${SOURCEIP} in subnet("192.168.5.0/255.255.255.0");`. For details, see {{% xref "/filterx/filterx-subnet/_index.md" %}}.
- `program(nginx)` with `${PROGRAM} == "nginx"`
- `source(my-source)` with `${SOURCE} == "my-source"`

You can [compare values]({{< relref "/filterx/filterx-comparing/_index.md" >}}) and use [boolean operators]({{< relref "/filterx/filterx-boolean/_index.md" >}}) similarly to filters.

Since all FilterX statements must match a message to pass the FilterX block, you can often replace complex boolean filter expressions with multiple, simple FilterX statements. For example, consider the following filter statement:

```shell
filter { host("example1") and program("nginx"); };
```

The following is the same FilterX statement:

```shell
filterx { ${HOST} == "example1" and ${PROGRAM} == "nginx"; };
```

which is equivalent to:

```shell
filterx {
    ${HOST} == "example1";
    ${PROGRAM} == "nginx";
};
```

The following filter functions have no equivalents in FilterX yet:

- The [`filter()` filter function]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-filter/_index.md" >}}). You can't call a FilterX block from another FilterX block, but you can [access name-value pairs and pass variables]({{< relref "/filterx/filterx-language/_index.md#scoping" >}}) from multiple FilterX blocks.
- [`rate-limit()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-rate-limit/_index.md" >}})
- [`tags()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-tags/_index.md" >}})

## Update rewrite rules

This section shows you how to update your existing `rewrite` expressions to `filterx`.

You can replace most [rewrite rules]({{< relref "/chapter-manipulating-messages/modifying-messages/_index.md" >}}) with FilterX functions and value assignments, for example:

- `rewrite{subst()}` with the [`regexp_subst` FilterX function]({{< relref "/filterx/function-reference.md#regexp-subst" >}})
- `rewrite{set()}` with [value assignments]({{< relref "/filterx/filterx-language/_index.md#assign-values" >}})
- `rewrite{unset()}` with the [`unset` FilterX function]({{< relref "/filterx/function-reference.md#unset" >}})
- `rewrite{rename()}` with assigning a value to the new field, then using the [`unset`]({{< relref "/filterx/function-reference.md#unset" >}}) function on the old field
- [Timezone manipulation]({{< relref "/chapter-manipulating-messages/modifying-messages/rewrite-timezone/_index.md" >}}) with the similar [FilterX functions]({{< relref "/filterx/filterx-timezone/_index.md" >}}).
- `set-pri()`, `set-severity()`, and `set-facility()` with the [`set_pri` FilterX function]({{< relref "/filterx/function-reference.md#set-pri" >}})
- Setting multiple fields at once with the [`set_fields` FilterX function]({{< relref "/filterx/function-reference.md#set-fields" >}})
- Conditional rewrites with value comparisons in the FilterX block. For an example, see {{% xref "/filterx/filterx-examples/_index.md" %}}.

The following rewrite rules have no equivalents in FilterX yet:

- [`credit-card-mask()` and `credit-card-hash()`]({{< relref "/chapter-manipulating-messages/modifying-messages/anonymizing-credit-card-numbers/_index.md" >}}). You can mask the numbers with the [`regexp_subst` FilterX function]({{< relref "/filterx/function-reference.md#regexp-subst" >}}) instead.
- [`set-tag()` and `clear-tag()`]({{< relref "/chapter-routing-filters/filters/tagging-messages/_index.md" >}})
- `set-matches()`

## Update parsers

This section shows you how to update your existing `parser` expressions to `filterx`.

You can replace most [parsers]({{< relref "/chapter-parsers/_index.md" >}}) with FilterX functions. These functions return the parsed data, which you can assign to a variable or a name-value pair. For example, you can replace:

- [`csv-parser()`]({{< relref "/chapter-parsers/csv-parser/_index.md" >}}) with the [`parse_csv`]({{< relref "/filterx/filterx-parsing/csv/_index.md" >}}) FilterX function
- [`date-parser()`]({{< relref "/chapter-parsers/date-parser/_index.md" >}}) with the [`strptime`]({{< relref "/filterx/function-reference.md#strptime" >}}) FilterX function. To set the timestamp of the message, use [`set_timestamp`]({{< relref "/filterx/function-reference.md#set-timestamp" >}}) on the result.
- [`json-parser()`]({{< relref "/chapter-parsers/json-parser/_index.md" >}}) with the [`json`]({{< relref "/filterx/function-reference.md#json" >}}) FilterX function
- [`kv-parser()`]({{< relref "/chapter-parsers/key-value-parser/_index.md" >}}) with the [`parse_kv`]({{< relref "/filterx/filterx-parsing/key-value-parser/_index.md" >}}) FilterX function
- [`metrics-probe()`]({{< relref "/chapter-parsers/metrics-probe/_index.md" >}}) with the [`update_metric`]({{< relref "/filterx/filterx-metrics/_index.md" >}}) FilterX function
- [`regexp-parser()`]({{< relref "/chapter-parsers/parser-regexp/_index.md" >}}) with the [`regexp_search`]({{< relref "/filterx/function-reference.md#regexp-search" >}}) FilterX function
- [`windows-eventlog-xml-parser()`]({{< relref "/chapter-parsers/windows-eventlog-xml-parser/_index.md" >}}) with the [`parse_windows_eventlog_xml`]({{< relref "/filterx/filterx-parsing/windows-eventlog/_index.md" >}}) FilterX function
- [`xml-parser()`]({{< relref "/chapter-parsers/xml-parser/_index.md" >}}) with the [`parse_xml`]({{< relref "/filterx/filterx-parsing/xml/_index.md" >}}) FilterX function

To parse CEF and LEEF messages, use the [`parse_cef`]({{< relref "/filterx/filterx-parsing/cef/_index.md" >}}) and [`parse_leef`]({{< relref "/filterx/filterx-parsing/leef/_index.md" >}}) FilterX functions. These formats have no classic parsers.

The following parsers have no equivalents in FilterX yet. You can still use them in the same log path as your FilterX blocks.

- [`db-parser()`]({{< relref "/chapter-parsers/chapter-patterndb/_index.md" >}}) (pattern databases)
- [`grouping-by()`]({{< relref "/chapter-correlating-log-messages/grouping-by-parser/_index.md" >}}) and other correlation parsers
- Application-specific parsers, like the Cisco, FortiGate, or iptables parsers
