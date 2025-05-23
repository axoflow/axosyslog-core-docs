---
title: "Set match variables"
weight:  1100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Match macros (`$1, $2, ... $255`) are temporary variables. You can use them for general purposes when operating with list-like items. For example, the [match() filter]({{< relref "/chapter-manipulating-messages/regular-expressions/_index.md" >}}) stores capture group results in match variables when the `store-matches` flag is set, or the {{% xref "/chapter-parsers/json-parser/_index.md" %}} produces match variables if the parsed JSON data is an array.

It is possible to set match variables in a single operation with the `set-matches()` rewrite function. `set-matches()` uses {{% param "product.abbrev" %}} list expressions to set `$1, $2, ... $255`, so it can be considered as a conversion function between {{% param "product.abbrev" %}} lists and match variables.

{{% alert title="Note" color="info" %}}

To convert match variables into a {{% param "product.abbrev" %}} list, use the `$*` macro, which can be further manipulated using [list template functions]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}), or turned into a list in type-aware destinations.

{{% /alert %}} {{% alert title="Note" color="info" %}}

To reset match variables to be empty, use the `unset-matches()` rewrite rule.

{{% /alert %}}

## Declaration

```shell
rewrite <name_of_the_rule> {
    set-matches("<list-expression or list-based template function>");
};
```

## Example for the set-matches() rewrite function

In the following two examples, `$1`, `$2`, and `$3` will be set to `foo`, `bar`, and `baz`, respectively.

Using strings:

```shell
rewrite {
    set-matches("foo,bar,baz");
};
```

Using a list template function:

```shell
rewrite {
    set-matches("$(explode ':' 'foo:bar:baz')");
};
```
