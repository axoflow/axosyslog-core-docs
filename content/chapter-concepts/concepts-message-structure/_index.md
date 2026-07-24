---
title: "The structure of a log message"
weight:  1500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The following sections describe the structure of log messages. Currently there are two standard syslog message formats:

  - The old standard described in RFC 3164 (also called the BSD-syslog or the legacy-syslog protocol): see {{% xref "/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/_index.md" %}}

  - The new standard described in RFC 5424 (also called the IETF-syslog protocol): see {{% xref "/chapter-concepts/concepts-message-structure/concepts-message-ietfsyslog/_index.md" %}}

  - The Enterprise-wide message model or EWMM allows you to deliver structured messages between {{% param "product.abbrev" %}} nodes: see {{% xref "/chapter-concepts/concepts-message-structure/syslog-ng-message-format/_index.md" %}}

  - How messages are represented in {{% param "product.abbrev" %}}: see {{% xref "/chapter-concepts/concepts-message-representation/_index.md" %}}.

## Example messages on the wire

The same event in each format, to illustrate how the standards differ:

BSD-syslog (RFC 3164) — the `<PRI>` is followed directly by a legacy `Mmm dd hh:mm:ss` timestamp, the host, and the message:

```shell
<34>Oct 11 22:14:15 mymachine su: 'su root' failed for lonvick on /dev/pts/8
```

IETF-syslog (RFC 5424) — the `<PRI>` is followed by a version digit and an ISO 8601 timestamp, then the structured header fields:

```shell
<34>1 2026-10-11T22:14:15+00:00 mymachine su - - - 'su root' failed for lonvick on /dev/pts/8
```

EWMM — an RFC 5424 frame with `@syslog-ng` as the program and the message carried as JSON:

```shell
<34>1 2026-10-11T22:14:15+00:00 mymachine @syslog-ng - - - {"PROGRAM":"su","MESSAGE":"'su root' failed for lonvick on /dev/pts/8","HOST":"mymachine","._TAGS":[".source.s_network"]}
```
