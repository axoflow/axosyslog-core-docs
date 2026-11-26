---
title: RFC5424 syslog
description: "Build an RFC5424 syslog message from FilterX data with format_syslog_5424(), and set its priority, timestamp, host, program, PID, and message ID."
weight: 600
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{< product >}} 4.21 and later.

Formats data as an [RFC5424 (IETF-syslog)]({{< relref "/chapter-concepts/concepts-message-structure/concepts-message-ietfsyslog/" >}}) syslog message.

Usage:

```shell
format_syslog_5424(
  message,
  add_octet_count=false,
  pri=<variable-or-expression>,
  timestamp=<variable-or-expression>,
  host=<variable-or-expression>,
  program=<variable-or-expression>,
  pid=<variable-or-expression>,
  msgid=<variable-or-expression>,
  sdata=<variable-or-expression>
)
```

Setting the `message` option is required. You can set the other options using any FilterX variable, function, or expression. If you specify a nonexisting variable, or if evaluating an expression fails, default values will be used.

<!-- FIXME list possible values for add_octet_count -->

<!-- FIXME are these the defaults we substitute?

format_syslog_5424(
    log.body,
    add_octet_count=`framed`,
    pri=log.attributes.priority,
    timestamp=log.time_unix_nano ? : log.observed_time_unix_nano,
    host=host_candidate.name ?? host_candidate.ip ?? host_candidate.id ?? host_candidate.last_hop_name ?? meta.connection.src_ip ?? $LOGHOST,
    program=meta.service.name,
    pid=log.attributes.proc_id,
    msgid=log.attributes.msg_id
    );
 -->

## Structured data (SDATA) in the message {#sdata}

Available in {{< product >}} 4.30 and later.

The `sdata` argument sets the structured data (SDATA) part of the message:

- If it's a string, {{< product >}} uses it as the structured data without changes. To keep the structured data of the original message, use `sdata=$SDATA`.
- If it's a dictionary, {{< product >}} formats it the same way as the [`format_sdata()` function]({{< relref "/filterx/filterx-sdata/_index.md#format-sdata" >}}). For example, `sdata={"meta@32473": {"sequenceId": 42}}` becomes `[meta@32473 sequenceId="42"]`.
- If it's not set, it's an empty string, or {{< product >}} can't evaluate it, the structured data of the message is `-`.

{{< warning >}}
In {{< product >}} 4.29 and earlier, `format_syslog_5424()` added the structured data of the processed message (the `${SDATA}` macro) to the formatted message. In version 4.30 and later, it doesn't. To keep the structured data, add the `sdata=$SDATA` argument.
{{< /warning >}}

## Example: Format an RFC5424 message {#example}

The following call formats a static message:

```shell
format_syslog_5424("My static message text", timestamp=datetime(1765146872.0), host="host-value", program="prog-value", pid="5424", msgid="1234");
```

The result is:

```shell
<13>1 2025-12-07T22:34:32.000000+00:00 host-value prog-value 5424 1234 - My static message text
```

To keep the structured data of the original message, add the `sdata=$SDATA` argument:

```shell
$MESSAGE = format_syslog_5424($MESSAGE, sdata=$SDATA);
```
