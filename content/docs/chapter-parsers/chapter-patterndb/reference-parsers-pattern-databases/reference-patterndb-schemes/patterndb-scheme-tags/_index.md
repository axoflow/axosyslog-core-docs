---
title: "Element: tags"
weight:  2700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Location

/[patterndb]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-patterndb/_index.md" >}})/[ruleset]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-ruleset/_index.md" >}})/*tags*



## Description

OPTIONAL — An element containing custom keywords (tags) about the messages matching the patterns. The tags can be used to label specific events (for example, user logons). It is also possible to filter on these tags later (for details, see {{% xref "/docs/chapter-routing-filters/filters/tagging-messages/_index.md" %}}). Starting with {{% param "product.name" %}} 3.2, the list of tags assigned to a message can be referenced with the `${TAGS}` macro.



## Attributes

N/A



## Children

  - *tag*: OPTIONAL — A keyword or tags applied to messages matching the rule.


## Example

```c

    <tags><tag>UserLogin</tag></tags>

```


