---
title: "Using wildcards, special characters, and regular expressions in filters"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `host()`, `match()`, and `program()` filter functions accept regular expressions as parameters. The exact type of the regular expression to use can be specified with the `type()` option. By default, {{% param "product.abbrev" %}} uses PCRE regular expressions.

In regular expressions, the asterisk (**\***) character means 0, 1, or any number of the previous expression. For example, in the **f\*ilter** expression the asterisk means 0 or more f letters. This expression matches for the following strings: `ilter`, `filter`, `ffilter`, and so on. To achieve the wildcard functionality commonly represented by the asterisk character in other applications, use **.\*** in your expressions, for example, **f.\*ilter**.

Alternatively, if you do not need regular expressions, only wildcards, use **type(glob)** in your filter:


## Example: Filtering with widcards {#example-wildcard-filter}

The following filter matches on hostnames starting with the `myhost` string, for example, on `myhost-1`, `myhost-2`, and so on.

```c

    filter f_wildcard {host("myhost*" type(glob));};

```


For details on using regular expressions in {{% param "product.abbrev" %}}, see [Using wildcards, special characters, and regular expressions in filters](#).

To filter for special control characters like the carriage return (CR), use the **\\r** escape prefix in {{% param "product.abbrev" %}} version 3.0 and 3.1. In {{% param "product.abbrev" %}} 3.2 and later, you can also use the `\\x` escape prefix and the ASCII code of the character. For example, to filter on carriage returns, use the following filter:

```c

    filter f_carriage_return {match("\x0d" value ("MESSAGE"));};

```
