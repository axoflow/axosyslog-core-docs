---
title: "Using filters"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Filters perform log routing: a message passes the filter if the filter expression is true for the particular message. If a log statement includes filters, the messages are sent to the destinations only if they pass all filters of the log path. For example, a filter can select only the messages originating from a particular host. Complex filters can be created using filter functions and logical boolean expressions.

To define a filter, add a filter statement to the `syslog-ng.conf` configuration file using the following syntax:

```shell
   filter <identifier> { <filter_type>("<filter_expression>"); };
```

Then use the filter in a log path, for example:

```shell
   log {
        source(s1);
        filter(<identifier>);
        destination(d1); };
```

You can also define the filter inline. For details, see {{% xref "/chapter-configuration-file/inline-objects/_index.md" %}}.


## Example: A simple filter statement

The following filter statement selects the messages that contain the word `deny` and come from the host `example`.

```shell
   filter demo_filter { host("example") and match("deny" value("MESSAGE"))
    };
    log {
        source(s1);
        filter(demo_filter);
        destination(d1);
    };
```

The following example does the same, but defines the filter inline.

```shell
   log {
        source(s1);
        filter { host("example") and match("deny" value("MESSAGE")) };
        destination(d1);
    };
```

