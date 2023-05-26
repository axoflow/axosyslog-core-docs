---
title: "mbox: Converting local email messages to log messages"
weight:  2100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Using the `mbox()` driver, {{% param "product.abbrev" %}} can read email messages from local mbox files, and convert them to multiline log messages.

This driver has only one required option, the filename of the mbox file. To use the `mbox()` driver, the `scl.conf` file must be included in your {{% param "product.abbrev" %}} configuration:

```c
   @include "scl.conf"

```

The `mbox()` driver is actually a reusable configuration snippet configured to read log messages using the `file()` driver. For details on using or writing such configuration snippets, see {{% xref "/docs/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of the configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/mbox/mbox.conf).


## Example: Using the mbox() driver {#example-source-mbox}

The following example reads the emails of the root user on the {{% param "product.abbrev" %}} host.

```c
   @include "scl.conf"
    source root-mbox {
        mbox("/var/spool/mail/root");
    };
```

