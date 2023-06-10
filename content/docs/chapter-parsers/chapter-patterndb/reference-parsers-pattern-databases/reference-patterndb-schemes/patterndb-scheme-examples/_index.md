---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
# Element: examples


## Location

/[patterndb]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-patterndb/_index.md" >}})/[ruleset]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-ruleset/_index.md" >}})/[rules]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-rules/_index.md" >}})/[rule]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-rule/_index.md" >}})/[patterns]({{< relref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-patterns2/_index.md" >}})/*examples*



## Description

OPTIONAL — A container element for sample log messages that should be recognized by the pattern. These messages can be used also to test the patterns and the parsers.



## Attributes

N/A



## Children

  - *example*


## Example

```c
   <examples>
        <example>
            <test_message>Accepted password for sampleuser from 10.50.0.247 port 42156 ssh2</test_message>
            <test_values>
                <test_value name="SSH.AUTH_METHOD">password</test_value>
                <test_value name="SSH_USERNAME">sampleuser</test_value>
                <test_value name="SSH_CLIENT_ADDRESS">10.50.0.247</test_value>
                <test_value name="SSH_PORT_NUMBER">42156</test_value>
            </test_values>
        </example>
    </examples>
```


