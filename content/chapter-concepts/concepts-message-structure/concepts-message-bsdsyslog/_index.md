---
title: "BSD-syslog or legacy-syslog messages"
weight:  100
aliases:
- /chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/concepts-message-bsdsyslog-header/
- /chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/concepts-message-bsdsyslog-msg/
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{< include-headless "banner-new-to-axosyslog.md" >}}

This section describes the format of a syslog message, according to the [legacy-syslog or BSD-syslog protocol](https://datatracker.ietf.org/doc/rfc3164/). A syslog message consists of the following parts (the examples are taken from the sample message below):

| Part | Example |
| ---- | ------- |
| [`PRI`]({{< relref "/chapter-concepts/concepts-message-structure/concepts-message-pri/_index.md" >}}) | `<34>` |
| [`HEADER`](#the-header-message-part) | `Oct 11 22:14:15 mymachine` |
| [`MSG`](#the-msg-message-part) | `su: 'su root' failed for lonvick on /dev/pts/8` |

The total message cannot be longer than 1024 bytes.

The following is a sample syslog message

```shell
<34>Oct 11 22:14:15 mymachine su: 'su root' failed for lonvick on /dev/pts/8
```

The message corresponds to the following format:

```shell
<priority>timestamp hostname application: message
```

The different parts of the message are explained in the following sections.

{{% alert title="Note" color="info" %}}

RFC 3164 is lenient about what a message must contain: senders may omit the `PRI` (and sometimes the `HEADER`), and receivers still accept such messages. When a message has no `PRI`, {{% param "product.abbrev" %}} assigns a default facility and severity (`user.notice`, PRI `13`) — see [The PRI message part]({{< relref "/chapter-concepts/concepts-message-structure/concepts-message-pri/_index.md" >}}).

{{% /alert %}}

{{% alert title="Note" color="info" %}}

The {{% param "product.name" %}} application supports longer messages as well. For details, see the `log-msg-size()` option in {{% xref "/chapter-global-options/reference-options/_index.md" %}}. However, it is not recommended to enable messages larger than the packet size when using UDP destinations.

{{% /alert %}}

## The HEADER message part

The `HEADER` message part contains a timestamp and the hostname (without the domain name) or the IP address of the device. The timestamp field is the local time in the *Mmm dd hh:mm:ss* format, where:

  - *Mmm* is the English abbreviation of the month: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec.

  - *dd* is the day of the month on two digits. If the day of the month is less than 10, the first digit is replaced with a space. (for example, *Aug 7*.)

  - *hh:mm:ss* is the local time. The hour (hh) is represented in a 24-hour format. Valid entries are between 00 and 23, inclusive. The minute (mm) and second (ss) entries are between 00 and 59 inclusive.

{{% alert title="Note" color="info" %}}

The {{% param "product.name" %}} application supports other timestamp formats as well, like ISO, or the PIX extended format. For details, see the `ts-format()` option in {{% xref "/chapter-global-options/reference-options/_index.md" %}}.

{{% /alert %}}

## The MSG message part

The `MSG` part contains the name of the program or process that generated the message, and the text of the message itself. The `MSG` part is usually in the following format: `program[pid]: message text`.
