---
title: "Update filters to filterx"
weight:  1000
---

The following sections show you how you can change your existing filters and rewrite rules to filterx statements. Note that:

- Many examples in the filterx documentation were adapted from the existing filter, parser, and rewrite examples to show how you can achieve the same functionality with fiterx.
- Don't worry if you can't update something to filterx. While you can't use other blocks within a filterx block, you can use both in a log statement, for example, you can use a filterx block, then a parser if needed.
- There is no push to use filterx. You can keep using the traditional blocks if they satisfy your requirements.

## Update filters to filterx

This section shows you how to update your existing `filter` expressions to `filterx`.

You can replace most [filter functions]({{< relref "/chapter-routing-filters/filters/_index.md" >}}) with a simple value comparison with the appropriate macro, for example:

- `facility(user)` with `${FACILITY} == "user"`
- `host("example-host")` with `${HOST} == "example-host"`
- `level(warning)` with `${LEVEL} == "warning"`

    If you want to check for a range of levels, use numerical comparison with the `${LEVEL_NUM}` macro instead. For a list of numerical level values, see {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md#macro-level-num" %}}.

- `message("example")` with `${MESSAGE} =~ "example"` (see the [equal tilde operator]({{< relref "/filterx/operator-reference.md#regexp" >}}) for details)
- `program(nginx)` with `${PROGRAM} == "nginx"`
- `source(my-source)` with `${SOURCE} == "my-source"`

You can [compare values]({{< relref "/filterx/filterx-comparing/_index.md" >}}) and use [boolean operators]({{< relref "/filterx/filterx-boolean/_index.md" >}}) similarly to filters.

Since all filterx statements must match a message to pass the filterx block, often you can change complex boolean filter expressions into multiple, more simple filterx statements. For example, consider the following filter statement:

```shell
filter demo_filter { host("example1") and program("nginx"); };
```

The following is the same filterx statement:

```shell
filterx demo_filterx { ${HOST} == "example1" and ${PROGRAM} == "nginx"; };
```

which is equivalent with:

```shell
filterx demo_filterx {
    ${HOST} == "example1";
    ${PROGRAM} == "nginx";
};
```

```shell
filter demo_filter { not host("example1") and not host("example2"); };
```

The following filter functions have no equivalents in filterx yet:

- The `[filter()` filter function]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-filter/_index.md" >}}). You can't call a filterx block from another filterx block, but you can [access name-value pairs and pass variables](#scoping) from multiple filterx blocks.
- [`netmask()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-netmask/_index.md" >}}) and [`netmask6()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-netmask6/_index.md" >}})
- [`inlist()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-inlist/_index.md" >}})
- [`rate-limit()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-rate-limit/_index.md" >}})
- [`tags()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-tags/_index.md" >}})

## Update rewrite rules

This section shows you how to update your existing `rewrite` expressions to `filterx`.

You can replace most [rewrite rules]({{< relref "/chapter-manipulating-messages/modifying-messages/_index.md" >}}) with filterx functions and value assignments, for example:

- `rewrite{subst()}` with the [`regexp_subst` filterx function]({{< relref "/filterx/function-reference.md#regexp-subst" >}})
- `rewrite{set()}` with [value assignments]({{< relref "/filterx/_index.md#assign-values" >}})
- `rewrite{unset()}` with the [`unset` filterx function]({{< relref "/filterx/function-reference.md#unset" >}})
- `rewrite{rename()}` with the assigning a value to the new field then using [`unset`]({{< relref "/filterx/function-reference.md#unset" >}}) on the old field


<!-- 
set-severity(), set-facility() set-pri() rewrite functions > no equivalent

Setting match variables with the set-matches() rewrite rule
    > I don't even get what this does

Setting multiple message fields to specific values
    > no equivalent

map-value-pairs: Rename value-pairs to normalize logs
    > Does the simple rename cover that, or no equivalent?

Conditional rewrites
    > see use cases

Rewrite the timezone of a message
    > ?

Anonymizing credit card numbers
    > no equivalent, but can be replicated using some regexp_subst expressions, see the scl for details tmp/axosyslog/scl/rewrite/cc-mask.conf

add/delete tags: do we need here a round-trip here like this, or is it working without that?: 
    temp-tags = json-array($TAGS);
    temp-tags += "new-tag";
    $TAGS = format_csv(temp-tags);

    - How can you delete an element with a specific value from a list (not by index)
        like this in python:
            thislist = ["apple", "banana", "cherry"]
            thislist.remove("banana")
 -->

<!-- FIXME group-by like contexts and similar don't work yet -->
