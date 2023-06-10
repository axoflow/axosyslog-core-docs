---
title: "Element: patterns"
weight:  1100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Location

/[patterndb]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-patterndb/_index.md" >}})/[ruleset]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-ruleset/_index.md" >}})/[rules]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-rules/_index.md" >}})/[rule]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-rule/_index.md" >}})/*patterns*



## Description

An element containing the patterns of the rule. If a *\<patterns\>* element contains multiple *\<pattern\>* elements, the class of the *\<rule\>* is assigned to every syslog message matching any of the patterns.



## Attributes

N/A



## Children

  - *pattern*: A pattern describing a log message. This element is also called `message pattern`. For example:
    
    ```c
        <pattern>+ ??? root-</pattern>
    
    ```
    
    {{% alert title="Note" color="info" %}}
Support for XML entities is limited, you can use only the following entities: **\&amp; \&lt; \&gt; \&quot; \&apos;**. User-defined entities are not supported.
    {{% /alert %}}

  - *description*: OPTIONAL — A description of the pattern or the log message matching the pattern.

  - *urls*

  - *values*

  - *examples*


## Example

```c
   <patterns>
        <pattern>Accepted @QSTRING:SSH.AUTH_METHOD: @ for@QSTRING:SSH_USERNAME: @from\ @QSTRING:SSH_CLIENT_ADDRESS: @port @NUMBER:SSH_PORT_NUMBER:@ ssh2</pattern>
    </patterns>

```


