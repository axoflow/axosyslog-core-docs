---
title: "Setting match variables with the set-matches() rewrite rule"
weight:  1100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Match macros (**$1, $2, ... $255**) are temporary variables. You can use them for general purposes when operating with list-like items. For example, the [match() filter]({{< relref "/docs/chapter-manipulating-messages/regular-expressions/_index.md" >}}) stores capture group results in match variables when the `store-matches` flag is set, or the {{% xref "/docs/chapter-parsers/json-parser/_index.md" %}} produces match variables if the parsed JSON data is an array.

It is possible to set match variables in a single operation with the `set-matches()` rewrite function. `set-matches()` uses {{% productparam "abbrev" %}} list expressions to set **$1, $2, ... $255**, so it can be considered as a conversion function between {{% productparam "abbrev" %}} lists and match variables.

{{% alert title="Note" color="info" %}}

To convert match variables into a {{% productparam "abbrev" %}} list, use the `$\*` macro, which can be further manipulated using [list template functions]({{< relref "/docs/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}), or turned into a list in type-aware destinations.

{{% /alert %}} {{% alert title="Note" color="info" %}}

To reset match variables to be empty, use the `unset-matches()` rewrite rule.

{{% /alert %}}


## Declaration

```c

    rewrite <name_of_the_rule> {
        set-matches("<list-expression or list-based template function>");
    };

```



## Example usage for the set-matches() rewrite function

In the following two examples, **$1**, **$2**, and **$3** will be set to **foo**, **bar**, and **baz**, respectively.

**Example using string:**

```c

    rewrite {
        set-matches("foo,bar,baz");
    };

```

**Example using a list template function:**

```c

    rewrite {
        set-matches("$(explode ':' 'foo:bar:baz')");
    };

```

