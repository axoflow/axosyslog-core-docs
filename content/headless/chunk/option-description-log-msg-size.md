---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
*Description:* Maximum length of an incoming message in bytes. This length includes the entire message (the data structure and individual fields). The maximal value that can be set is 268435456 bytes (256 MiB).

For messages using the IETF-syslog message format (RFC5424), the maximal size of the value of an SDATA field is 64 KiB.

{{% alert title="Note" color="info" %}}

In most cases, `log-msg-size()` does not need to be set higher than 10 MiB.

{{% /alert %}}

For details on how encoding affects the size of the message, see [Message size and encoding]({{< relref "/docs/chapter-concepts/concepts-message-representation/_index.md" >}}).

You can use human-readable units when setting configuration options. For details, see{{% xref "/docs/chapter-configuration-file/configuration-syntax-notes/_index.md" %}}.
