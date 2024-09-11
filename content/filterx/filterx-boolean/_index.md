---
title: "Boolean operators in filterx"
linkTitle: "Boolean operators"
weight:  300
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{< include-headless "chunk/filterx-experimental-banner.md" >}}

When a log statement includes multiple filter statements, {{< product >}} sends a message to the destination only if all filters are true for the message. In other words, the filters are connected with the logical `AND` operator. In the following example, no message arrives to the destination, because the filters are exclusive (the hostname of a client cannot be `example1` and `example2` at the same time):

```shell
log {
    source(s1); source(s2);
    filterx { ${HOST} == "example1"; };
    filterx { ${HOST} == "example2"; };
    destination(d1); destination(d2); };
```

To select the messages that come from either host `example1` or `example2`, use a single filter expression:

```shell
log {
    source(s1); source(s2);
    filterx { ${HOST} == "example1" or ${HOST} == "example2"; };
    destination(d1); destination(d2); };
```

Use the `not` operator to invert boolean filters, for example, to select the messages that weren't sent by host `example1`:

```shell
filterx { not ( ${HOST} == "example1" ); };
```

{{% alert title="Note" color="info" %}}
In some cases, instead of boolean operators, you can also use the [`!=` (not equal to) comparison]({{< relref "/filterx/filterx-comparing/_index.md" >}}) or the [`!~` (doesn't contain)]({{< relref "/filterx/operator-reference.md#regexp" >}}) string operator.

When you are checking for equality (`==`), sometimes it's also important to check that the two operands have the same type. For that, you can use the [`===` (strict equality) operator]({{< relref "/filterx/filterx-comparing/_index.md#strict-equality" >}}).
{{% /alert %}}

However, to select the messages that weren't sent by host `example1` or `example2`, you have to use the `and` operator (that's how boolean logic works, see [De Morgan's laws](https://en.wikipedia.org/wiki/De_Morgan%27s_laws) for details):

```shell
filterx { not (${HOST} == "example1") and not (${HOST} == "example2"); };
```

Alternatively, you can use parentheses and the `or` operator to avoid this confusion:

```shell
filterx { not ( (${HOST} == "example1") or (${HOST} == "example2") ); };
```

The following filter statement selects the messages that contain the word `deny` and come from the host `example`.

```shell
filterx {
    ${HOST} == "example";
    ${MESSAGE} =~ "deny";
};
```

{{% alert title="Note" color="info" %}}

Filterx blocks are often used together with log path flags. For details, see {{% xref "/chapter-routing-filters/logpath/reference-logflags/_index.md" %}}.

{{% /alert %}}
