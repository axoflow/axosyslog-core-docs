---
title: "Getting the status information of disk-buffer files"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section describes how to get status information of the disk-buffer files used in {{% param "product.name" %}}.

## Command syntax

The basic command syntax for getting the status information of the disk-buffer files used in {{% param "product.abbrev" %}} looks like the following:

```shell
/opt/syslog-ng/bin/dqtool info <DISK-BUFFER_FILE>
```

## Example commands and outputs

{{< include-headless "chunk/dqtool-info-example.md" >}}

## List disk-buffer state in the default directory

You can use the following one-liner command to get the state of all disk-buffer files that are stored in the default directory:

```shell
for qfile in /opt/syslog-ng/var/*.?(r)qf ; do /opt/syslog-ng/bin/dqtool info $qfile 2>&1 ; done
```
