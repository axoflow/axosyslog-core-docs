---
title: "BSD-syslog or legacy-syslog messages"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{< include-headless "banner-new-to-axosyslog.md" >}}

This section describes the format of a syslog message, according to the [legacy-syslog or BSD-syslog protocol](https://datatracker.ietf.org/doc/rfc3164/). A syslog message consists of the following parts:

- [`PRI`]({{< relref "/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/concepts-message-bsdsyslog-pri/_index.md" >}})
- [`HEADER`]({{< relref "/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/concepts-message-bsdsyslog-header/_index.md" >}})
- [`MSG`]({{< relref "/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/concepts-message-bsdsyslog-msg/_index.md" >}})

The total message cannot be longer than 1024 bytes.

The following is a sample syslog message

```shell
<133>Feb 25 14:09:07 webserver syslogd: restart
```

The message corresponds to the following format:

```shell
<priority>timestamp hostname application: message
```

The different parts of the message are explained in the following sections.

{{% alert title="Note" color="info" %}}

The {{% param "product.name" %}} application supports longer messages as well. For details, see the `log-msg-size()` option in {{% xref "/chapter-global-options/reference-options/_index.md" %}}. However, it is not recommended to enable messages larger than the packet size when using UDP destinations.

{{% /alert %}}
