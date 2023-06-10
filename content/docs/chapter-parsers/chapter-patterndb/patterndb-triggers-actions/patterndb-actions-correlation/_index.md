---
title: "Actions and message correlation"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Certain features of generating messages can be used only if message correlation is used as well. For details on correlating messages, see {{% xref "/docs/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-correlation/_index.md" %}}.

  - The {{% param "product.abbrev" %}} application automatically fills the fields for the generated message based on the scope of the context, for example, the HOST and PROGRAM fields if the `context-scope` is `program`.

  - When used together with message correlation, you can also refer to fields and values of earlier messages of the context by adding the `@\<distance-of-referenced-message-from-the-current\>` suffix to the macro. For details, see {{% xref "/docs/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-correlation/referencing-previous-messages/_index.md" %}}.
    
    
    {{% include-headless "chunk/example-patterndb-referencing-earlier-values.md" %}}
    

  - You can use the name-value pairs of other messages of the context. If you set the `inherit-properties` attribute of the generated message to `context`, {{% param "product.abbrev" %}} collects every name-value pair from each message stored in the context, and includes them in the generated message. This means that you can refer to a name-value pair without having to know which message of the context included it. If a name-value pair appears in multiple messages of the context, the value in the latest message will be used. To refer to an earlier value, use the `@\<distance-of-referenced-message-from-the-current\>` suffix format.
    
    ```c
        <action>
            <message inherit-properties='context'>
    
    ```
    
    
    <span id="patterndb-inherit-properties"></span>
    
    ## Example: Using the inherit-properties option {#patterndb-inherit-properties}
    
    For example, if `inherit-properties` is set to `context`, and you have a rule that collects SSH login and logout messages to the same context, you can use the following value to generate a message collecting the most important information form both messages, including the beginning and end date.
    
    ```c
        <value name="MESSAGE">An SSH session for ${SSH_USERNAME} from ${SSH_CLIENT_ADDRESS} closed. Session lasted from ${DATE}@2 to $DATE pid: $PID.</value>
    
    ```
    
    The following is a detailed rule for this purpose.
    
    ```c
        <patterndb version='4' pub_date='2015-04-13'>
            <ruleset name='sshd' id='12345678'>
                <pattern>sshd</pattern>
                    <rules>
                        <!-- The pattern database rule for the first log message -->
                        <rule provider='me' id='12347598' class='system'
                            context-id="ssh-login-logout" context-timeout="86400"
                            context-scope="process">
                        <!-- Note the context-id that groups together the
                        relevant messages, and the context-timeout value that
                        determines how long a new message can be added to the
                        context  -->
                            <patterns>
                                <pattern>Accepted @ESTRING:SSH.AUTH_METHOD: @for @ESTRING:SSH_USERNAME: @from @ESTRING:SSH_CLIENT_ADDRESS: @port @ESTRING:: @@ANYSTRING:SSH_SERVICE@</pattern>
                                <!-- This is the actual pattern used to identify
                                the log message. The segments between the @
                                characters are parsers that recognize the variable
                                parts of the message - they can also be used as
                                macros.  -->
                            </patterns>
                        </rule>
                        <!-- The pattern database rule for the fourth log message -->
                        <rule provider='me' id='12347599' class='system' context-id="ssh-login-logout" context-scope="process">
                            <patterns>
                                 <pattern>pam_unix(sshd:session): session closed for user @ANYSTRING:SSH_USERNAME@</pattern>
                            </patterns>
                            <actions>
                                <action>
                                    <message inherit-properties='context'>
                                        <values>
                                            <value name="MESSAGE">An SSH session for ${SSH_USERNAME} from ${SSH_CLIENT_ADDRESS} closed. Session lasted from ${DATE}@2 to $DATE pid: $PID.</value>
                                            <value name="TRIGGER">yes</value>
                                            <!-- This is the new log message
                                            that is generated when the logout
                                            message is received. The macros ending
                                            with @2 reference values of the
                                            previous message from the context. -->
                                        </values>
                                    </message>
                                </action>
                            </actions>
                        </rule>
                    </rules>
            </ruleset>
        </patterndb>
    
    ```
    

  - It is possible to generate a message when the `context-timeout` of the original message expires and no new message is added to the context during this time. To accomplish this, include the `trigger="timeout"` attribute in the action element:
    
    ```c
        <action trigger="timeout">
    
    ```
    
    
    ## Example: Sending alert when a client disappears {#patterndb-timeout-action}
    
    The following example shows how to combine various features of {{% param "product.abbrev" %}} to send an email alert if a client stops sending messages.
    
      - Configure your clients to send MARK messages periodically. It is enough to configure MARK messages for the destination that forwards your log messages to your {{% param "product.abbrev" %}} server (`mark-mode(periodical)`).
    
      - On your {{% param "product.abbrev" %}} server, create a pattern database rule that matches on the incoming MARK messages. In the rule, set the `context-scope` attribute to `host`, and the `context-timeout` attribute to a value that is higher than the `mark-freq` value set on your clients (by default, `mark-freq` is 1200 seconds, so set `context-timeout` at least to 1500 seconds, but you might want to use a higher value, depending on your environment).
    
      - Add an action to this rule that sends you an email alert if the `context-timeout` expires, and the server does not receive a new MARK message (`\<action trigger="timeout"\>`).
    
      - On your {{% param "product.abbrev" %}} server, use the pattern database in the log path that handles incoming log messages.
    
