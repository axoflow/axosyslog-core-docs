---
title: "Junctions and channels"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Junctions make it possible to send the messages to different channels, process the messages differently on each channel, and then join every channel together again. You can define any number of channels in a junction: every channel receives a copy of every message that reaches the junction. Every channel can process the messages differently, and at the end of the junction, the processed messages of every channel return to the junction again, where further processing is possible.

A junction includes one or more channels. A channel usually includes at least one filter, though that is not enforced. Otherwise, channels are identical to log statements, and can include any kind of objects, for example, parsers, rewrite rules, destinations, and so on. (For details on using channels, as well as on using channels outside junctions, see {{% xref "/docs/chapter-configuration-file/embedded-objects/_index.md" %}}.)

{{% alert title="Note" color="info" %}}

Certain parsers can also act as filters:

  - The JSON parser automatically discards messages that are not valid JSON messages.

  - The `csv-parser()` discards invalid messages if the `flags(drop-invalid)` option is set.

{{% /alert %}}

You can also use log-path flags in the channels of the junction. Within the junction, a message is processed by every channel, in the order the channels appear in the configuration file. Typically if your channels have filters, you also set the `flags(final)` option for the channel. However, note that the log-path flags of the channel apply only within the junction, for example, if you set the `final` flag for a channel, then the subsequent channels of the junction will not receive the message, but this does not affect any other log path or junction of the configuration. The only exception is the `flow-control` flag: if you enable flow-control in a junction, it affects the entire log path. For details on log-path flags, see {{% xref "/docs/chapter-routing-filters/logpath/reference-logflags/_index.md" %}}.

```c
   junction {
        channel { <other-syslog-ng-objects> <log-path-flags>};
        channel { <other-syslog-ng-objects> <log-path-flags>};
        ...
    };
```


{{% include-headless "chunk/example-junctions-syslog-parser.md" %}}


{{% alert title="Note" color="info" %}}

Junctions differ from embedded log statements, because embedded log statements are like branches: they split the flow of messages into separate paths, and the different paths do not meet again. Messages processed on different embedded log statements cannot be combined together for further processing. However, junctions split the messages to channels, then combine the channels together.

{{% /alert %}}

An alternative, more straightforward way to implement conditional evaluation is to configure conditional expressions using `if {}`, `elif {}`, and `else {}` blocks. For details, see {{% xref "/docs/chapter-routing-filters/logpath/concepts-if-else-conditional-expressions/_index.md" %}}.
