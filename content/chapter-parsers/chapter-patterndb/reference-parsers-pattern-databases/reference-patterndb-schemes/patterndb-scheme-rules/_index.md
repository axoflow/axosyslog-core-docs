---
title: "Element: rules"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Location

/[patterndb]({{< relref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-patterndb/_index.md" >}})/[ruleset]({{< relref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-ruleset/_index.md" >}})/*rules*



## Description

A container element for the rules of the ruleset.



## Attributes

N/A



## Children

  - *rule*


## Example

```c
   <rules>
        <rule provider='me' id='182437592347598' class='system'>
            <patterns>
                <pattern>Accepted @QSTRING:SSH.AUTH_METHOD: @ for@QSTRING:SSH_USERNAME: @from\ @QSTRING:SSH_CLIENT_ADDRESS: @port @NUMBER:SSH_PORT_NUMBER:@ ssh2</pattern>
            </patterns>
        </rule>
    </rules>
```


