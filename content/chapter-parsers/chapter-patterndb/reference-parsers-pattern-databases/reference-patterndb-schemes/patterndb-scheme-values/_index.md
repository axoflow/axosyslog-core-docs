---
title: "Element: values"
weight:  1500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Location

/[patterndb]({{< relref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-patterndb/_index.md" >}})/[ruleset]({{< relref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-ruleset/_index.md" >}})/[rules]({{< relref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-rules/_index.md" >}})/[rule]({{< relref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-rule/_index.md" >}})/[patterns]({{< relref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-patterns2/_index.md" >}})/*values*



## Description

OPTIONAL — Name-value pairs that are assigned to messages matching the patterns, for example, the representation of the event in the message according to the Common Event Format (CEF) or Common Event Exchange (CEE). The names can be used as macros to reference the assigned values.



## Attributes

N/A



## Children

  - *value*: OPTIONAL — Contains the value of the name-value pair that is assigned to the message.
    
    The <value> element of name-value pairs can include template functions. For details, see {{% xref "/chapter-manipulating-messages/customizing-message-format/template-functions/_index.md" %}}, for examples, see [if]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}).
    
    When used together with message correlation, the <value> element of name-value pairs can include references to the values of earlier messages from the same context. For details, see {{% xref "/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-correlation/_index.md" %}}.

  - *name*: The name of the name-value pair. It can also be used as a macro to reference the assigned value.


## Example

```c
   <values>
        <value name=".classifier.outcome">/Success</value>
    </values>
```


