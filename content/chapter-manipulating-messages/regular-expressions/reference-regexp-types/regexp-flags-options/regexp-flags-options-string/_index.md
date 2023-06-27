---
title: "Literal string searches"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Literal string searches have the following `flags()` options:

{{% include-headless "chunk/regex-shared-global.md" %}}

{{% include-headless "chunk/regex-shared-ignore-case.md" %}}


## prefix

During the matching process, patterns (also called search expressions) are matched against the input string starting from the beginning of the input string, and the input string is matched only for the maximum character length of the pattern. The initial characters of the pattern and the input string must be identical in the exact same order, and the pattern's length is definitive for the matching process (that is, if the pattern is longer than the input string, the match will fail).


<span id="example-regexp-pcre"></span>

## Example: matching / non-matching patterns for the input string 'exam' {#example-regexp-pcre}

For the input string `'exam'`,

  - the following patterns will match:
    
      - `'ex'` (the pattern contains the initial characters of the input string in the exact same order)
      - `'exam'` (the pattern is an exact match for the input string)

  - the following patterns will not match:
    
      - `'example'` (the pattern is longer than the input string)
      - `'hexameter'` (the pattern's initial characters do not match the input string's characters in the exact same order, and the pattern is longer than the input string)



{{< include-headless "chunk/regex-shared-store-matches.md" >}}


## substring

The given literal string will match when the pattern is found within the input. Unlike `flags("prefix")`, the pattern does not have to be identical with the given literal string.

