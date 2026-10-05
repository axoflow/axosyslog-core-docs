---
title: "Parse dates and timestamps with FilterX"
linkTitle: "Date"
description: "Parse date strings into datetime values with the strptime() FilterX function, and set the timestamp of the message with set_timestamp()."
weight: 550
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

To parse a date or a timestamp in FilterX, use the [`strptime`]({{< relref "/filterx/function-reference.md#strptime" >}}) function. It creates a `datetime` value from a string, using one or more format strings. It's the FilterX equivalent of the [`date-parser()`]({{< relref "/chapter-parsers/date-parser/_index.md" >}}).

To use the parsed value as the timestamp of the message, pass it to the [`set_timestamp`]({{< relref "/filterx/function-reference.md#set-timestamp" >}}) function.

For example, if the message contains key=value pairs like `ts=2024-04-10T08:09:10+0200 user=alice`, the following FilterX block parses the `ts` field, and sets it as the timestamp of the message:

```shell
filterx {
    fields = parse_kv(${MESSAGE}, value_separator="=", pair_separator=" ");
    ts = strptime(fields.ts, "%Y-%m-%dT%H:%M:%S%z", "%d/%b/%Y:%H:%M:%S%z");
    isset(ts);
    set_timestamp(ts);
};
```

- `strptime` tries the format strings in order. In this example, it accepts both `2024-04-10T08:09:10+0200` and `10/Apr/2024:08:09:10+0200`. For the list of format codes, see [`strptime`]({{< relref "/filterx/function-reference.md#strptime" >}}).
- If none of the formats match, `strptime` returns null. The [`isset`]({{< relref "/filterx/function-reference.md#isset" >}}) statement then makes the FilterX block false, so {{< product >}} doesn't send messages with an unparsable date.
- By default, `set_timestamp` sets the timestamp of the message (`stamp`). To set the time when {{< product >}} received the message instead, use `set_timestamp(ts, stamp="recvd")`.

After the block, the date macros of the message, like `${ISODATE}`, use the parsed timestamp.

If the timezone of your dates is missing or wrong, see {{% xref "/filterx/filterx-timezone/_index.md" %}}.

To format a `datetime` value as a string, use the [`strftime`]({{< relref "/filterx/function-reference.md#strftime" >}}) or the [`format_isodate`]({{< relref "/filterx/function-reference.md#format-isodate" >}}) function.

{{% alert title="Note" color="info" %}}
To replace an existing [`date-parser()`]({{< relref "/chapter-parsers/date-parser/_index.md" >}}) with FilterX, see {{% xref "/filterx/update-filters.md" %}}.
{{% /alert %}}
