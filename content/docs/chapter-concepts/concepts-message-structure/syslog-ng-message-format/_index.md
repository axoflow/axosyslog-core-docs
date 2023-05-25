---
title: "Enterprise-wide message model (EWMM)"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The following section describes the structure of log messages using the Enterprise-wide message model or EWMM message format.

{{% include-headless "chunk/ewmm-intro.md" %}}

{{% include-headless "chunk/example-ewmm-message-format.md" %}}

The message has the following parts:

  - The header of the complies with the [RFC5424 message format]({{< relref "/docs/chapter-concepts/concepts-message-structure/concepts-message-ietfsyslog/_index.md" >}}), where the PROGRAM field is set to `@syslog-ng`, and the SDATA field is empty.

  - The MESSAGE part is in JSON format, and contains the actual message, as well as any name-value pairs that {{% param "product.abbrev" %}} has attached to or extracted from the message. The `${._TAGS}` field contains the identifier of the syslog-ng source that has originally received the message on the first syslog-ng node.

To send a message in EWMM format, you can use the [syslog-ng() destination driver]({{< relref "/docs/chapter-destinations/destination-syslog-ng/_index.md" >}}), or the [format-ewmm() template function]({{< relref "/docs/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md#template-function-format-ewmm" >}}).

To receive a message in EWMM format, you can use the [default-destination-drivers() source driver]({{< relref "/docs/chapter-sources/source-default-network-drivers/_index.md" >}}), or the [ewmm-parser() parser]({{< relref "/docs/chapter-parsers/parser-ewmm/_index.md" >}}).
