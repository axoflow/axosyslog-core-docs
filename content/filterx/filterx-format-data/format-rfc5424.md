---
title: RFC5424 syslog
---

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
  msgid=<variable-or-expression>
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

If you want to include SDATA in the message, set the [`SDATA` macro]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md#macro-sdata" >}}).

For example:

```shell
format_syslog_5424("My static message text", timestamp=datetime(1765146872.0), host="host-value", program="prog-value", pid="5424", msgid="1234");
```

Becomes:

```shell
<13>1 2025-12-07T22:34:32.000000+00:00 host-value prog-value 5424 1234 - My static message text
```
