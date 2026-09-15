---
title: "The dqtool tool manual page"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

<span id="dqtool.1"></span>

## Name

`dqtool` — Display the contents of a disk-buffer file created with {{% param "product.abbrev" %}}.

## Synopsis

`dqtool [command] [options]`

## Description

{{% alert title="Note" color="info" %}}

The `dqtool` application is distributed with the {{% param "product.abbrev" %}} system logging application, and is usually part of the {{% param "product.abbrev" %}} package.

{{% /alert %}}



The `dqtool` application is a utility that can be used to display and format the messages stored in a disk-buffer file.

## The cat command

`cat [options] [file]`

Use the `cat` command to display the log messages stored in the disk-buffer (also called disk-queue) file, and also information from the header of the disk queue file. The messages are printed to the standard output (`stdout`), so it is possible to use `grep` and other tools to find particular log messages, for example, `dqtool cat /var/log/messages.lgs |grep 192.168.1.1`.

The `cat` command has the following options:

- `--debug` or `-d`

    Print diagnostic and debugging messages to `stderr`.

- `--help` or `-h`

    Display a brief help message.

- `--template=<template>` or `-t`

    Format the messages using the specified template.

- `--verbose` or `-v`

    Print verbose messages to `stderr`.

- `--version` or `-V`

    Display version information.

## Example: The cat command

```shell
./dqtool cat ../var/syslog-ng-00000.qf
```

The output looks like:

```shell
Disk-buffer state loaded;
filename='../var/syslog-ng-00000.qf', qout_length='65', qbacklog_length='0', qoverflow_length='9205', qdisk_length='0'
Mar  3 10:52:05 tristram localprg[1234]: seq: 0000011630, runid: 1267609923, stamp: 2010-03-03T10:52:05 PADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADD
Mar  3 10:52:05 tristram localprg[1234]: seq: 0000011631, runid: 1267609923, stamp: 2010-03-03T10:52:05 PADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADD
```

<span id="dqtool-relocate"></span>

## The info command

`info [DISK-BUFFER_FILE]`

Shows status information about the specified disk-buffer file. For example:

{{< include-headless "chunk/dqtool-info-example.md" >}}

## The relocate command

`relocate [options] [files]`

Use the `relocate` command to move or rename disk-buffer (also called disk-queue) files. Note that this option modifies the persist file. Stop {{% param "product.abbrev" %}} before using this command.

The `relocate` command has the following options:

- `--all` or `-a`

    Relocate every disk-buffer file that is listed in the {{% param "product.abbrev" %}} persist file.

- `--new_path` or `-n`

    The directory where you want to move the disk-bufffer files. For example: `/var/disk-buffers`

- `--persist` or `-p`

    The path to the {{% param "product.abbrev" %}} persist file. The `relocate` command automatically updates the entries of the disk-buffer files in the persist file.

## Examples

Relocate a single queue file:

```shell
bin/dqtool relocate --new_path /tmp/dq --persist var/syslog-ng.persist /tmp/syslog-ng-00000.rqf
```

Relocate multiple queue files:

```shell
bin/dqtool relocate --new_path /tmp/dq --persist var/syslog-ng.persist /tmp/syslog-ng-00000.rqf /tmp/syslog-ng-00001.rqf
```

Relocate every queue file:

```shell
bin/dqtool relocate --new_path /tmp/dq --persist var/syslog-ng.persist --all
```

## The assign command

`assign [options] [file]`

Use the `assign` command to assign an existing disk-buffer file to a destination, by adding it to the {{% param "product.abbrev" %}} persist file under a specific persist name. This is useful when the persist file has no entry for the disk-buffer file, and you want to attach the file to a destination manually. Note that this command modifies the persist file. Stop {{% param "product.abbrev" %}} before using it.

If the disk-buffer file is specified by filename only, `dqtool` appends it to the current working directory. You must know the persist name that your destination uses.

The `assign` command has the following options:

- `--example` or `-e`

    Print usage examples and exit.

- `--persist=<persist-file>` or `-p`

    The path to the {{% param "product.abbrev" %}} persist file to update.

- `--persist_name=<persist-name>` or `-n`

    The persist name to assign the disk-buffer file to. If the persist file already contains an entry with this name, `dqtool` overwrites it and prints the previous value.

### Example: The assign command

```shell
bin/dqtool assign -p var/syslog-ng.persist \
                  -n "afsocket_dd_qfile(stream,localhost:15554)" \
                  /tmp/syslog-ng-dq/syslog-ng-00000.rqf
```

## The truncate command

`truncate [options] [files]`

Use the `truncate` command to reclaim the unused space of abandoned disk-buffer files.

{{< warning >}}
Truncating a disk-buffer file that {{% param "product.abbrev" %}} is actively using can result in data loss. Stop {{% param "product.abbrev" %}}, or make sure that the files are no longer in use, before you run this command.
{{< /warning >}}

The `truncate` command has the following options:

- `--force` or `-f`

    Perform the truncation. Without this option, `dqtool` only prints a warning and exits without modifying any file.

### Example: The truncate command

```shell
bin/dqtool truncate --force /tmp/syslog-ng-00000.rqf
```

The output looks like:

```shell
Disk-buffer /tmp/syslog-ng-00000.rqf has been truncated, reclaimed space: 1.453125 GiB
```

<span id="idm45327922098864"></span>

## Files

`/opt/syslog-ng/bin/dqtool`

## See also

[syslog-ng.conf.5](https://axoflow.com/docs/axosyslog-core/app-man-syslog-ng/syslog-ng.conf.5/)

[syslog-ng.8](https://axoflow.com/docs/axosyslog-core/app-man-syslog-ng/syslog-ng.8/)

{{< include-headless "chunk/manpage-more-info.md" >}}
