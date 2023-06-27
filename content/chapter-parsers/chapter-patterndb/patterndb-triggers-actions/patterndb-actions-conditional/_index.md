---
title: "Conditional actions"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To limit when a message is triggered, use the `condition` attribute and specify a filter expression: the action will be executed only if the condition is met. For example, the following action is executed only if the message was sent by the host called `myhost`.

```c
   <action condition="'${HOST}' == 'myhost'">
```

You can use the same operators in the condition that can be used in filters. For details, see {{% xref "/docs/chapter-routing-filters/filters/filters-comparing/_index.md" %}}.

The following action can be used to log the length of an SSH session (the time difference between a login and a logout message in the context):

```c
   <actions>
        <action>
            <message>
                <values>
                    <value name="MESSAGE">An SSH session for ${SSH_USERNAME}@1 from ${SSH_CLIENT_ADDRESS}@2 closed. Session lasted from ${DATE}@2 ${DATE} </value>
                </values>
            </message>
        </action>
    </actions>
```


## Example: Actions based on the number of messages

The following example triggers different actions based on the number of messages in the context. This way you can check if the context contains enough messages for the event to be complete, and execute a different action if it does not.

```c
   <actions>
        <action condition='"$(context-length)" >= "4"'>
            <message>
                <values>
                    <value name="PROGRAM">event</value>
                    <value name="MESSAGE">Event complete</value>
                </values>
            </message>
        </action>
        <action condition='"$(context-length)" < "4"'>
            <message>
                <values>
                    <value name="PROGRAM">error</value>
                <value name="MESSAGE">Error detected</value>
                </values>
            </message>
        </action>
    </actions>
```

