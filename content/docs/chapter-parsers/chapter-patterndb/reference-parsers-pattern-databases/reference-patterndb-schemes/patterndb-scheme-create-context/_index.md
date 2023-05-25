---
title: "Element: create-context"
weight:  2500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Location

/[patterndb]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-patterndb/_index.md" >}})/[ruleset]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-ruleset/_index.md" >}})/[actions]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-actions/_index.md" >}})/[action]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-action/_index.md" >}})/*create-context*



## Description

OPTIONAL — Creates a new correlation context from the current message and its associated context. This can be used to "split" a context.

Available in {{% param "product.abbrev" %}} version {{% conditional-text include-if="ose" %}}3.8{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}7{{% /conditional-text %}} and later.



## Attributes



## Children

  - *message*: A container element storing the message that is added to the new context when the action is executed.
    
      - {{% include-headless "chunk/option-inherit-mode.md" %}}
        
        For details on the message context, see {{% xref "/docs/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-correlation/_index.md" %}} and {{% xref "/docs/chapter-parsers/chapter-patterndb/patterndb-triggers-actions/patterndb-actions-correlation/_index.md" %}}. For details on triggering messages, see {{% xref "/docs/chapter-parsers/chapter-patterndb/patterndb-triggers-actions/_index.md" %}}


## Example

{{% include-headless "chunk/example-create-context-action.md" %}}


