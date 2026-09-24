---
title: "nodejs: Receive JSON messages from nodejs applications"
weight:  1900
driver: "nodejs()"
short_description: "Receive JSON messages from nodejs applications"
aliases:
- /chapter-sources/configuring-source-nodejs/reference-source-nodejs/
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Using the `nodejs()` driver, {{% param "product.abbrev" %}} can receive application logs directly from nodejs applications that use the widespread [Winston](https://github.com/winstonjs/winston) logging API. The {{% param "product.abbrev" %}} application automatically adds the `.nodejs.winston.` prefix to the name of the fields the extracted from the message.

## Prerequisites

{{< include-headless "chunk/prereq-package-scl.md" >}}

{{< include-headless "chunk/scl-config-snippet.md" "nodejs()" "scl/nodejs/plugin.conf" >}}

## Configuration

The following example uses the default settings of the driver, listening for messages on port 9003 of every IP address of the {{% param "product.abbrev" %}} host.

```shell
@include "scl.conf"
source apps { nodejs(); };
```

The following example listens only on IP address `192.168.1.1`, port `9999`.

```shell
   @include "scl.conf"
    source apps {
        nodejs(
            localip(192.168.1.1)
            port(9999)
        )
    };
```

## Options

The `nodejs()` driver has the following options.

{{< include-headless "chunk/option-hook-commands.md" >}}

{{% include-headless "chunk/option-source-ip.md" %}}

## port() or localport()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 9003   |

*Description:* The port number to bind to.


