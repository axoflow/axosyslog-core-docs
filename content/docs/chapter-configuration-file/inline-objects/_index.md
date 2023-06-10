---
title: "Defining configuration objects inline"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with {{% productparam "abbrev" %}} {{% conditional-text include-if="ose" %}}3.4{{% /conditional-text %}}, you can define configuration objects inline, where they are actually used, without having to define them in a separate placement. This is useful if you need an object only once, for example, a filter or a rewrite rule. Every object can be defined inline: sources, destinations, filters, parsers, rewrite rules, and so on.

To define an object inline, use braces instead of parentheses. That is, instead of `\<object-type\> (\<object-id\>);`, you use **\<object-type\> {\<object-definition\>};**


## Example: Using inline definitions

The following two configuration examples are equivalent. The first one uses traditional statements, while the second uses inline definitions.

```c

    source s_local {
        system();
        internal();
    };
    destination d_local {
        file("/var/log/messages");
    };
    log {
        source(s_local);
        destination(d_local);
    };

```

```c

    log {
        source {
            system();
            internal();
        };
        destination {
            file("/var/log/messages");
        };
    };

```

