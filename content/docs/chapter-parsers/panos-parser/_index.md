---
title: "panos-parser(): parsing PAN-OS log messages"
weight:  2900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The [PAN-OS](https://docs.paloaltonetworks.com/pan-os.html) (a short version of Palo Alto Networks Operating System) parser can parse log messages originating from [Palo Alto Networks](https://www.paloaltonetworks.com/) devices. Even though these messages completely comply to the RFC standards, their `MESSAGE` part is not a plain text. Instead, the `MESSAGE` part contains a data structure that requires additional parsing.

The `panos-parser()` of {{% param "product.name" %}} ({{% param "product.abbrev" %}}) solves this problem, and can separate PAN-OS log messages to name-value pairs.

For details on using value-pairs in {{% param "product.abbrev" %}}, see {{% xref "/docs/chapter-concepts/concepts-value-pairs/_index.md" %}}.


## Prerequisites

  - Version 3.29 of {{% param "product.abbrev" %}} or later.
    
    {{% alert title="Note" color="info" %}}
Most Linux distributions feature {{% param "product.abbrev" %}} versions earlier than version 3.29. For up-to-date binaries, visit [the syslog-ng third-party binaries page](https://github.com/syslog-ng/syslog-ng/#installation-from-binaries).
    {{% /alert %}}

  - PAN-OS log messages from Palo Alto Networks devices.



## Limitations

The `panos-parser()` only works on {{% param "product.abbrev" %}} version 3.29 or later.



## Configuration

You can include the `panos-parser()` in your {{% param "product.abbrev" %}} configuration like this:

```c
   parser p_parser{
        panos-parser();
    };
```

To use this parser, the `scl.conf` file must be included in your {{% param "product.abbrev" %}} configuration:

```c
   @include "scl.conf"
```

The `panos-parser()` is a reusable configuration snippet configured to parse Palo Alto Networks PAN-OS log messages. For details on using or writing such configuration snippets, see {{% xref "/docs/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/paloalto/panos.conf).

