---
title: "mbox: Convert local email messages to log messages"
weight:  1390
driver: "mbox()"
short_description: Convert local email messages to log messages
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Using the `mbox()` driver, {{% param "product.abbrev" %}} can read email messages from local mbox files, and convert them to multiline log messages.

## Prerequisites

{{< include-headless "chunk/prereq-package-scl.md" >}}

{{< include-headless "chunk/scl-config-snippet.md" "mbox()" "scl/mbox/mbox.conf" >}}

## Configuration

This driver has only one required option, the filename of the mbox file. The following example reads the emails of the root user on the {{% param "product.abbrev" %}} host.

```shell
@include "scl.conf"
source root-mbox {
    mbox("/var/spool/mail/root");
};
```
