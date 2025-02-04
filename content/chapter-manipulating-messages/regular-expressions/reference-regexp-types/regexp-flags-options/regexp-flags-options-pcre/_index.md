---
title: "Perl Compatible Regular Expressions (PCRE)"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with {{% param "product.abbrev" %}} version 3.1, PCRE expressions are supported on every platform. If the `type()` parameter is not specified, {{% param "product.abbrev" %}} uses PCRE regular expressions by default.

The following example shows the structure of PCRE-style regular expressions in use.


## Example: Using PCRE regular expressions {#example-regexp-pcre}

```shell
   rewrite r_rewrite_subst {
        subst("a*", "?", value("MESSAGE") flags("utf8" "global"));  
    };
```


PCRE-style regular expressions have the following `flags()` options:


## disable-jit

Switches off the [just-in-time compilation function for PCRE regular expressions](https://www.pcre.org/current/doc/html/pcre2jit.html).



## dupnames

Allows [using duplicate names for named subpatterns](https://www.pcre.org/original/doc/html/pcrepattern.html#SEC16).

Configuration example:

```shell
   filter { match("(?<DN>foo)|(?<DN>bar)" value(MSG) flags(store-matches, dupnames)); };
    ...
    destination { file(/dev/stdout template("$DN\n")); };
```


{{% include-headless "chunk/regex-shared-global.md" %}}

{{% include-headless "chunk/regex-shared-ignore-case.md" %}}

## newline

{{< include-headless "chunk/regex-flag-newline.md" >}}

{{< include-headless "chunk/regex-shared-store-matches.md" >}}

## unicode

{{< include-headless "chunk/regex-flag-utf8.md" >}}

## utf8

An alias for the `unicode` flag.
