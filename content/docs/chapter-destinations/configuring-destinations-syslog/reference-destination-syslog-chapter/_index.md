---
title: "syslog() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `syslog()` driver sends messages to a remote host (for example, a `syslog-ng` server or relay) on the local intranet or internet using the RFC5424 syslog protocol developed by IETF (for details about the protocol, see {{% xref "/docs/chapter-concepts/concepts-message-structure/concepts-message-ietfsyslog/_index.md" %}}). The protocol supports sending messages using the UDP, TCP, or the encrypted TLS networking protocols.

These destinations have the following options:

{{% include-headless "chunk/option-destination-tls-ca-dir.md" %}}

{{% include-headless "chunk/option-destination-tls-ca-file.md" %}}

{{% include-headless "chunk/destination-syslog-options.md" %}}
