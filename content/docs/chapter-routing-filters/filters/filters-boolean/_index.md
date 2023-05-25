---
title: "Combining filters with boolean operators"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

When a log statement includes multiple filter statements, syslog-ng sends a message to the destination only if all filters are true for the message. In other words, the filters are connected with the logical `AND` operator. In the following example, no message arrives to the destination, because the filters are exclusive (the hostname of a client cannot be `example1` and `example2` at the same time):

```c

    filter demo_filter1 { host("example1"); };
    filter demo_filter2 { host("example2"); };
    log {
        source(s1); source(s2);
        filter(demo_filter1); filter(demo_filter2);
        destination(d1); destination(d2); };

```

To select the messages that come from either host `example1` or `example2`, use a single filter expression:

```c

    filter demo_filter { host("example1") or host("example2"); };
    log {
        source(s1); source(s2);
        filter(demo_filter);
        destination(d1); destination(d2); };

```

Use the **not** operator to invert filters, for example, to select the messages that were not sent by host `example1`:

```c

    filter demo_filter { not host("example1"); };

```

However, to select the messages that were not sent by host `example1` or `example2`, you have to use the **and** operator (that's how boolean logic works):

```c

    filter demo_filter { not host("example1") and not host("example2"); };

```

Alternatively, you can use parentheses to avoid this confusion:

```c

    filter demo_filter { not (host("example1") or host("example2")); };

```

For a complete description on filter functions, see {{% xref "/docs/chapter-routing-filters/filters/reference-filters/_index.md" %}}.

The following filter statement selects the messages that contain the word `deny` and come from the host `example`.

```c

    filter demo_filter { host("example") and match("deny" value("MESSAGE")); };

```

The `value()` parameter of the `match` function limits the scope of the function to the text part of the message (that is, the part returned by the `${MESSAGE}` macro), or optionally to the content of any other macro. The `template()` parameter of the `match` function can be used to run a filter against a combination of macros. For details on using the `match()` filter function, see {{% xref "/docs/chapter-routing-filters/filters/reference-filters/filter-match/_index.md" %}}.

{{% alert title="Note" color="info" %}}

Filters are often used together with log path flags. For details, see {{% xref "/docs/chapter-routing-filters/logpath/reference-logflags/_index.md" %}}.

{{% /alert %}}
