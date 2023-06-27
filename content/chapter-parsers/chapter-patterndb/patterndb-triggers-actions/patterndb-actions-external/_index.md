---
title: "External actions"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To perform an external action when a message is triggered, for example, to send the message in an email, you have to route the generated messages to an external application using the `program()` destination.


## Example: Sending triggered messages to external applications {#example-trigger-email}

The following sample configuration selects the triggered messages and sends them to an external script.

1.  Set a field in the triggered message that is easy to identify and filter. For example:
    
    ```c
        <values>
            <value name="MESSAGE">A log message from ${HOST} matched rule number $.classifier.rule_id</value>
            <value name="TRIGGER">yes</value>
        </values>
    
    ```

2.  Create a destination that will process the triggered messages.
    
    ```c
        destination d_triggers {
            program("/bin/myscript"; );
        };
    ```

3.  Create a filter that selects the triggered messages from the internal source.
    
    ```c
        filter f_triggers {
            match("yes" value ("TRIGGER") type(string));
        };
    ```

4.  Create a logpath that selects the triggered messages from the internal source and sends them to the script:
    
    ```c
        log { source(s_local); filter(f_triggers); destination(d_triggers); };
    ```

5.  Create a script that will actually process the generated messages, for example:
    
    ```c
        #!/usr/bin/perl
        while (<>) {
            # body of the script to send emails, snmp traps, and so on
        }
    
    ```

