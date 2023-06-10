---
title: "nodejs: Receiving JSON messages from nodejs applications"
weight:  1900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Using the `nodejs()` driver, {{% param "product.abbrev" %}} can receive application logs directly from nodejs applications that use the widespread [Winston](https://github.com/winstonjs/winston) logging API. The {{% param "product.abbrev" %}} application automatically adds the `.nodejs.winston.` prefix to the name of the fields the extracted from the message.

To use the `nodejs()` driver, the `scl.conf` file must be included in your {{% param "product.abbrev" %}} configuration:

```c
   @include "scl.conf"
```

The `nodejs()` driver is actually a reusable configuration snippet configured to receive log messages using the `network()` driver, and process its JSON contents. For details on using or writing such configuration snippets, see {{% xref "/docs/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of the nodejs configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/nodejs/plugin.conf).


## Example: Using the nodejs() driver {#example-source-nodejs}

The following example uses the default settings of the driver, listening for messages on port 9003 of every IP address of the {{% param "product.abbrev" %}} host.

```c
   @include "scl.conf"
    source apps { nodejs(); };
```

The following example listens only on IP address `192.168.1.1`, port `9999`.

```c
   @include "scl.conf"
    source apps {
        nodejs(
            localip(192.168.1.1)
            port(9999)
        )
    };
```


{{% alert title="Note" color="info" %}}

For details on the parameters of the `nodejs()` driver, see {{% xref "/docs/chapter-sources/configuring-source-nodejs/reference-source-nodejs/_index.md" %}}.

{{% /alert %}}
