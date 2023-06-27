---
title: "Element: rule"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Location

/[patterndb]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-patterndb/_index.md" >}})/[ruleset]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-ruleset/_index.md" >}})/[rules]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-rules/_index.md" >}})/*rule*



## Description

An element containing message patterns and how a message that matches these patterns is classified.

{{% alert title="Note" color="info" %}}

If the following characters appear in the message, they must be escaped in the rule as follows:

  - `@`: Use @@, for example, `user@@example.com`

  - *<*: Use `\&lt;`

  - *>*: Use `\&gt;`

  - &: Use `\&amp;`

{{% /alert %}}

The *<rules>* element may contain any number of *<rule>* elements.



## Attributes {#element-patterndb-rule-attributes}

  - *provider*: The provider of the rule. This is used to distinguish between who supplied the rule, that is, if it has been created by {{% param "product.companyabbrev" %}}, or added to the XML by a local user.

  - *id*: The globally unique ID of the rule.

  - *class*: The class of the rule — this class is assigned to the messages matching a pattern of this rule.



## Children

  - *patterns*


## Example

```c
   <rule provider='example' id='f57196aa-75fd-11dd-9bba-001e6806451b' class='violation'>
```

The following example specifies attributes for correlating messages as well. For details on correlating messages, see {{% xref "/docs/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-correlation/_index.md" %}}.

```c
   <rule provider='example' id='f57196aa-75fd-11dd-9bba-001e6806451b' class='violation' context-id='same-session' context-scope='process' context-timeout='360'>
```


