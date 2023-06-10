---
title: "The configuration syntax in detail"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Every syslog-ng configuration file must begin with a line containing the version information of syslog-ng. For syslog-ng version {{% param "product.version" %}}, this line looks like:

```c
   @version: {{% param "product.techversion" %}}

```

Versioning the configuration file was introduced in syslog-ng 3.0. If the configuration file does not contain the version information, syslog-ng assumes that the file is for syslog-ng version 2.x. In this case it interprets the configuration and sends warnings about the parts of the configuration that should be updated. Version 3.0 and later will correctly operate with configuration files of version 2.x, but the default values of certain parameters have changed since 3.0.


## Example: A simple configuration file

The following is a very simple configuration file for syslog-ng: it collects the internal messages of syslog-ng and the messages from `/dev/log` into the `/var/log/messages_syslog-ng.log` file.

```c
   @version: {{% param "product.techversion" %}}
    source s_local {
        unix-dgram("/dev/log"); internal();
    };
    destination d_file {
        file("/var/log/messages_syslog-ng.log");
    };
    log {
        source(s_local); destination(d_file);
    };

```


As a syslog-ng user described on a [mailing list](https://lists.gt.net/gentoo/user/209108):

> Alan McKinnon
> 
> *The syslog-ng's config file format was written by programmers for programmers to be understood by programmers. That may not have been the stated intent, but it is how things turned out. The syntax is exactly that of C, all the way down to braces and statement terminators.*

{{% include-headless "chunk/global-objects-syntax.md" %}} {{% alert title="Note" color="info" %}}

Before activating a new configuration, check that your configuration file is syntactically correct using the **syslog-ng --syntax-only** command.

To activate the configuration, reload the configuration of syslog-ng using the **/etc/init.d/syslog-ng reload** command.

{{% /alert %}}
