---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## store-matches

Stores the matches of the regular expression into the `$0, ... $255` variables. The `$0` stores the entire match, `$1` is the first group of the match (parentheses), and so on. Named matches (also called named subpatterns), for example, `(?\<name\>...)`, are stored as well. Matches from the last filter expression can be referenced in regular expressions.


{{% alert title="Note" color="info" %}}

To convert match variables into a {{% param "product.abbrev" %}} list, use the `$\*` macro, which can be further manipulated using [List manipulation]({{< relref "/docs/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}), or turned into a list in type-aware destinations.

{{% /alert %}}
