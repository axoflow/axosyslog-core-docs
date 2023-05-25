---
title: "The structure of a log message"
weight:  1500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The following sections describe the structure of log messages. Currently there are two standard syslog message formats:

  - The old standard described in RFC 3164 (also called the BSD-syslog or the legacy-syslog protocol): see {{% xref "/docs/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/_index.md" %}}

  - The new standard described in RFC 5424 (also called the IETF-syslog protocol): see {{% xref "/docs/chapter-concepts/concepts-message-structure/concepts-message-ietfsyslog/_index.md" %}}

  - The Enterprise-wide message model or EWMM allows you to deliver structured messages between syslog-ng nodes: see {{% xref "/docs/chapter-concepts/concepts-message-structure/syslog-ng-message-format/_index.md" %}}

  - How messages are represented in {{% param "product.abbrev" %}}: see {{% xref "/docs/chapter-concepts/concepts-message-representation/_index.md" %}}.
