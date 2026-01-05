---
title: "Options of regular expressions"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This chapter lists regular expressions supported by {{% param "product.name" %}} and their available supported `type()` and `flags()` options.

By default, {{% param "product.abbrev" %}} uses PCRE-style regular expressions. To use other expression types, add the `type()` option after the regular expression.

The {{% param "product.abbrev" %}} application supports the following regular expression `type()` options:

- [Perl Compatible Regular Expressions (`pcre`)](#reference-regexp-pcre)
- [Literal string searches (`string`)](#reference-regexp-string)
- [Glob patterns without regular expression support (`glob`)](#reference-regexp-glob)

By default, {{% param "product.abbrev" %}} uses PCRE-style regular expressions, which are supported on every platform starting with {{% param "product.abbrev" %}} version 3.1. To use other expression types, add the `type()` option after the regular expression.

## Perl Compatible Regular Expressions (pcre) {#reference-regexp-pcre}

*Description:* Uses Perl Compatible Regular Expressions (PCRE). If the `type()` parameter is not specified, {{% param "product.abbrev" %}} uses PCRE regular expressions by default.

### PCRE flags

PCRE-style regular expressions have the following `flags()` options:

- `disable-jit`: Switches off the [just-in-time compilation function for PCRE regular expressions](https://www.pcre.org/current/doc/html/pcre2jit.html).
- `dupnames`: Allows [using duplicate names for named subpatterns](https://www.pcre.org/original/doc/html/pcrepattern.html#SEC16). Configuration example:

    ```shell
    filter { match("(?<DN>foo)|(?<DN>bar)" value(MSG) flags(store-matches, dupnames)); };
    ...
    destination { file(/dev/stdout template("$DN\n")); };
    ```

{{% include-headless "chunk/regex-shared-global.md" %}}

{{% include-headless "chunk/regex-shared-ignore-case.md" %}}

- `newline`: {{< include-headless "chunk/regex-flag-newline.md" >}}

{{< include-headless "chunk/regex-shared-store-matches.md" >}}

- `unicode`: {{< include-headless "chunk/regex-flag-utf8.md" >}}
- `utf8`: An alias for the `unicode` flag.

## Literal string searches (string) {#reference-regexp-string}

*Description:* Matches the strings literally, without regular expression support. By default, only identical strings are matched. For partial matches, use the `flags("prefix")` or the `flags("substring")` flags.

### String search flags

Literal string searches have the following `flags()` options:

{{% include-headless "chunk/regex-shared-global.md" %}}

{{% include-headless "chunk/regex-shared-ignore-case.md" %}}

- `prefix`: During the matching process, patterns (also called search expressions) are matched against the input string starting from the beginning of the input string, and the input string is matched only for the maximum character length of the pattern. The initial characters of the pattern and the input string must be identical in the exact same order, and the pattern's length is definitive for the matching process (that is, if the pattern is longer than the input string, the match will fail).

{{< include-headless "chunk/regex-shared-store-matches.md" >}}

- `substring`: The given literal string will match when the pattern is found within the input. Unlike `flags("prefix")`, the pattern does not have to be identical with the given literal string.

## Glob patterns without regular expression support (glob) {#reference-regexp-glob}

*Description:* Matches the strings against a pattern containing `*` and `?` wildcards, without regular expression and character range support. The advantage of glob patterns to regular expressions is that globs can be processed much faster.

- `*`: matches an arbitrary string, including an empty string
- `?`: matches an arbitrary character
- The wildcards can match the `/` character.
- You cannot use the `*` and `?` literally in the pattern.

Glob patterns don't support any flags.
