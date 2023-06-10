---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Example: Generating messages for pattern database matches

When inserted in a pattern database rule, the following example generates a message when a message matching the rule is received.

```c

    <actions>
        <action>
            <message>
                <values>
                    <value name="MESSAGE">A log message from ${HOST} matched rule number $.classifier.rule_id</value>
                </values>
            </message>
        </action>
    </actions>

```


To inherit the properties and values of the triggering message, set the `inherit-properties` attribute of the `\<message\>` element to TRUE. That way the triggering log message is cloned, including name-value pairs and tags. If you set any values for the message in the `\<action\>` element, they will override the values of the original message.


## Example: Generating messages with inherited values

The following action generates a message that is identical to the original message, but its $PROGRAM field is set to `overriding-original-program-name`

```c

    <actions>
        <action>
            <message inherit-properties='TRUE'>
                <values>
                    <value name="PROGRAM">overriding-original-program-name</value>
                </values>
            </message>
        </action>
    </actions>

```

