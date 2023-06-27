---
title: "Options of regular expressions"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This chapter lists regular expressions supported by {{% param "product.name" %}} and their available supported `type()` and `flags()` options.

By default, {{% param "product.abbrev" %}} uses PCRE-style regular expressions. To use other expression types, add the `type()` option after the regular expression.

The {{% param "product.abbrev" %}} application supports the following regular expression `type()` options:

  - [Perl Compatible Regular Expressions (pcre)]({{< relref "/chapter-manipulating-messages/regular-expressions/reference-regexp-types/regexp-type-options/_index.md" >}})

  - [Literal string searches (string)]({{< relref "/chapter-manipulating-messages/regular-expressions/reference-regexp-types/regexp-type-options/_index.md" >}})

  - [Glob patterns without regular expression support (glob)]({{< relref "/chapter-manipulating-messages/regular-expressions/reference-regexp-types/regexp-type-options/_index.md" >}})
