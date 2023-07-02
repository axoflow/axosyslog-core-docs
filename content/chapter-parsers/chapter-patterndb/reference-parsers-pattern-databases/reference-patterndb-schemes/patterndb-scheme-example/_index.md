---
title: "Element: example"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Location

/[patterndb]({{< relref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-patterndb/_index.md" >}})/[ruleset]({{< relref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-ruleset/_index.md" >}})/[rules]({{< relref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-rules/_index.md" >}})/[rule]({{< relref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-rule/_index.md" >}})/[patterns]({{< relref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-patterns2/_index.md" >}})/[examples]({{< relref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-examples/_index.md" >}})/*example*



## Description

OPTIONAL — A container element for a sample log message.



## Attributes

N/A



## Children

  - *test_message*: OPTIONAL — A sample log message that should match this pattern. For example:
    
    ```shell
        <test_message program="myapplication">Content filter has been enabled</test_message>
    
    ```
    
      - *program*: The program pattern of the test message. For example:
        
        ```shell
        
            <test_message program="proftpd">ubuntu (::ffff:192.168.2.179[::ffff:192.168.2.179]) - FTP session closed.</test_message>
        
        ```

  - *test_values*: OPTIONAL — A container element to test the results of the parsers used in the pattern.
    
      - *test_value*: OPTIONAL — The expected value of the parser when matching the pattern to the test message. For example:
        
        ```shell
        
            <test_value name=".dict.ContentFilter">enabled</test_value>
        
        ```
        
          - *name*: The name of the parser to test.


## Example

```shell
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


