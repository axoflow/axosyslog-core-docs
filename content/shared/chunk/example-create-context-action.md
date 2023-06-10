---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
The following example creates a new context whenever the rule matches. The new context receives **1000** as ID, and **program** as scope, and the content set in the `\<message\>` element of the `\<create-context\>` element.

```c

    <rule provider='test' id='12' class='violation'>
      <patterns>
        <pattern>simple-message-with-action-to-create-context</pattern>
      </patterns>
      <actions>
        <action trigger='match'>
          <create-context context-id='1000' context-timeout='60' context-scope='program'>
            <message inherit-properties='context'>
              <values>
                <value name='MESSAGE'>context message</value>
              </values>
            </message>
          </create-context>
        </action>
      </actions>
    </rule>

```
