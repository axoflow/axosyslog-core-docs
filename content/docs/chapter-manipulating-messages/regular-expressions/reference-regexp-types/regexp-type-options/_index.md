---
title: "The type() options of regular expressions"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

By default, {{% param "product.abbrev" %}} uses PCRE-style regular expressions, which are supported on every platform starting with {{% param "product.abbrev" %}} version 3.1. To use other expression types, add the **type()** option after the regular expression.

The {{% param "product.abbrev" %}} application supports the following `type()` options:


## Perl Compatible Regular Expressions (pcre) {#reference-regexp-pcre}

*Description:* Uses Perl Compatible Regular Expressions (PCRE).{{% conditional-text include-if="pe" %}} Starting with {{% param "product.abbrev" %}} version 3.1, PCRE expressions are supported on every platform.{{% /conditional-text %}} If the `type()` parameter is not specified, {{% param "product.abbrev" %}} uses PCRE regular expressions by default.

For more information about the `flags()` options of PCRE regular expressions, see {{% xref "/docs/chapter-manipulating-messages/regular-expressions/reference-regexp-types/regexp-flags-options/_index.md" %}}.



## Literal string searches (string) {#reference-regexp-string}

*Description:* Matches the strings literally, without regular expression support. By default, only identical strings are matched. For partial matches, use the **flags("prefix")** or the **flags("substring")** flags.

For more information about the `flags()` options of literal string searches, see {{% xref "/docs/chapter-manipulating-messages/regular-expressions/reference-regexp-types/regexp-flags-options/_index.md" %}}.



## Glob patterns without regular expression support (glob) {#reference-regexp-glob}

*Description:* Matches the strings against a pattern containing `\*` and `?` wildcards, without regular expression and character range support. The advantage of glob patterns to regular expressions is that globs can be processed much faster.

  - `\*`: matches an arbitrary string, including an empty string

  - `?`: matches an arbitrary character

  - The wildcards can match the `/` character.

  - You cannot use the `\*` and `?` literally in the pattern.

