---
title: "Sending logs to Graylog"
weight:  1500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## graylog2(): Sending logs to Graylog

You can use the `graylog2()` destination and a Graylog Extended Log Format (GELF) template to send syslog messages to [Graylog](http://docs.graylog.org).

You can forward simple name-value pairs where the name starts with a dot or underscore. If names of your name-value pairs include dots other than the first character, you should use JSON formatting directly instead of the GELF template and send logs to a raw TCP port in Graylog, which can then extract fields from nested JSON. Version 3.21 and later also supports TLS-encrypted connection to the Graylog server.



## Declaration:

```c
   graylog2();
```



## Example: Using the graylog2() driver {#example-destination-graylog}

You can send syslog messages to Graylog using the **graylog2()** destination. The `graylog2()` destination uses the GELF template, the native data format of Graylog.

1.  On the Graylog side, configure a GELF TCP input. For more information, see the relevant [Graylog](http://docs.graylog.org) documentation.

2.  On the syslog-ng side, configure the name or IP address of the host running Graylog.
    
    ```c
        destination d_graylog {
          graylog2(
            host("172.16.146.142")
            transport(tcp)
          );
        };
    
    ```
    
    If you parsed your messages using syslog-ng, the template also forwards any name-value pairs where the name starts with a dot or underscore.

{{% alert title="Note" color="info" %}}

If there is a dot in a field name other than the first character, syslog-ng creates nested JSON while formatting the message. Nested JSON is not automatically parsed in GELF messages.

{{% /alert %}}



## Sending nested JSON to Graylog

While sending nested JSON inside GELF is possible, it is not convenient. If you use parsing and normalization in syslog-ng and dot notation in field names, use pure JSON instead of GELF to forward your messages.

1.  On the Graylog side, create a new raw TCP input.

2.  Still in Graylog, once the raw TCP input is ready, add a JSON extractor to it.

3.  On the syslog-ng side, use a network destination combined with a template utilizing format-json as shown in the example below:
    
    ```c
        destination d_jsontcp {
          network(
            "172.16.146.142"
            port("5555")
            transport(tcp)
            template("$(format-json --scope all-nv-pairs)\n")
          );
        };
    
    ```

