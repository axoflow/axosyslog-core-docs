---
title: "Using channels in configuration objects"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with {{% param "product.abbrev" %}} 3.4, every configuration object is a log expression. Every configuration object is essentially a configuration block, and can include multiple objects. To reference the block, only the top-level object must be referenced. That way you can use embedded log statements, junctions and in-line object definitions within source, destination, filter, rewrite and parser definitions. For example, a source can include a rewrite rule to modify the messages received by the source, and that combination can be used as a simple source in a log statement. This feature allows you to preprocess the log messages very close to the source itself.

To embed multiple objects into a configuration object, use the following syntax. Note that you must enclose the configuration block between braces instead of parenthesis.

```c
   <type-of-top-level-object> <name-of-top-level-object> {
        channel {
            <configuration-objects>
        };
    };
```


## Example: Using channels {#example-channels}

For example, to process a log file in a specific way, you can define the required processing rules (parsers and rewrite expressions) and combine them in a single object:

```c
   source s_apache {
        channel {
            source {
                file("/var/log/apache/error.log");
            };
            parser(p_apache_parser);
        };
    };
    log {
        source(s_apache); ...
    };
```

The `s_apache` source uses a file source (the error log of an Apache webserver) and references a specific parser to process the messages of the error log. The log statement references only the `s_apache` source, and any other object in the log statement can already use the results of the `p_apache_parser`parser.


{{% alert title="Note" color="info" %}}

You must start the object definition with a **channel** even if you will use a `junction`, for example:

```c
   parser demo-parser() {
        channel {
            junction {
                channel { ... };
                channel { ... };
            };
        };
    };
```

If you want to embed configuration objects into sources or destinations, always use channels, otherwise the source or destination will not behave as expected. For example, the following configuration is good:

```c
   source s_filtered_hosts {
        channel{
            source {
                pipe("/dev/pipe");
                syslog(ip(192.168.0.1) transport("tcp"));
                syslog(ip(127.0.0.1) transport("tcp"));
            };
            filter {
                netmask(10.0.0.0/16);
            };
        };
    };
```
{{% /alert %}}
