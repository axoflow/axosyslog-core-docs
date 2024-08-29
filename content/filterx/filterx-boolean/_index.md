---
title: "Boolean operators in filterx"
linkTitle: "Boolean operators"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

When a log statement includes multiple filter statements, {{< product >}} sends a message to the destination only if all filters are true for the message. In other words, the filters are connected with the logical `AND` operator. In the following example, no message arrives to the destination, because the filters are exclusive (the hostname of a client cannot be `example1` and `example2` at the same time):

```shell
filterx demo_filter1 { $HOST == "example1"; };
filterx demo_filter2 { $HOST == "example2"; };
log {
    source(s1); source(s2);
    filterx(demo_filter1);
    filterx(demo_filter2);
    destination(d1); destination(d2); };
```

To select the messages that come from either host `example1` or `example2`, use a single filter expression:

```shell
filterx demo_filter { $HOST == "example1" or $HOST == "example2"; };
log {
    source(s1); source(s2);
    filterx(demo_filter);
    destination(d1); destination(d2); };
```

Use the `not` operator to invert filters, for example, to select the messages that weren't sent by host `example1`:

```shell
filterx demo_filter { not ( $HOST == "example1" ); };
```

However, to select the messages that weren't sent by host `example1` or `example2`, you have to use the `and` operator (that's how boolean logic works):

```shell
filterx demo_filter { not $HOST == "example1" and not $HOST == "example2"; };
```

Alternatively, you can use parentheses and the `or` operator to avoid this confusion:

```shell
filterx demo_filter { not ( ($HOST == "example1") or ($HOST == "example2") ); };
```

The following filter statement selects the messages that contain the word `deny` and come from the host `example`.

```shell
filterx demo_filterx {
    $HOST == "example";
    $MESSAGE =~ "deny";
};
```

{{% alert title="Note" color="info" %}}

Filterx blocks are often used together with log path flags. For details, see {{% xref "/chapter-routing-filters/logpath/reference-logflags/_index.md" %}}.

{{% /alert %}}
