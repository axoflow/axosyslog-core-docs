---
title: "in-list()"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

|           |                                                                 |
| --------- | --------------------------------------------------------------- |
| Synopsis: | in-list("\</path/to/file.list\>", value("\<field-to-filter\>")) |

*Description:* Matches the value of the specified field to a list stored in a file, allowing you to do simple, file-based black- and whitelisting. The file must be a plain-text file, containing one entry per line. The {{% param "product.abbrev" %}} application loads the entire file, and compares the value of the specified field (for example, ${PROGRAM}) to entries in the file. When you use the `in-list()` filter, note the following points:

  - Comparing the values is case-sensitive.

  - Only exact matches are supported, partial and substring matches are not.

  - If you modify the list file, reload the configuration of {{% param "product.abbrev" %}} for the changes to take effect.

Available in {{% param "product.abbrev" %}} {{% conditional-text include-if="ose" %}}3.5{{% /conditional-text %}} and later.


## Example: Selecting messages using the in-list() filter {#example-whitelist-filter}

Create a text file that contains the programs (as in the ${PROGRAM} field of their log messages) you want to select. For example, you want to forward only the logs of a few applications from a host: kernel, sshd, and sudo. Create the `/etc/syslog-ng/programlist.list` file with the following contents:

```c
   kernel
    sshd
    sudo

```

The following filter selects only the messages of the listed applications:

```c
   filter f_whitelist { in-list("/etc/syslog-ng/programlist.list", value("PROGRAM")); };

```

Create the appropriate sources and destinations for your environment, then create a log path that uses the previous filter to select only the log messages of the applications you need:

```c
   log {
        source(s_all);
        filter(f_whitelist);
        destination(d_logserver); };

```

To create a blacklist filter, simply negate the `in-list()` filter:

```c
   filter f_blacklist { not in-list("/etc/syslog-ng/programlist.list", value("PROGRAM")); };

```

