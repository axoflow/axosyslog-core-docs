---
title: "Orphan disk-buffer files"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Purpose

This section describes orphan disk-buffer files used in {{% param "product.name" %}}.


## Orphan disk-buffer files

{{< include-headless "chunk/orphan-d-buf-intro.md" >}}



## Discovering the new disk-buffer files (orphan disk-buffer files)

To discover orphan disk-buffer files, get the list of disk-buffer files from the persist file, then compare the list with the contents of the disk-buffer files' saving directory.

For more information about how you can get the list of disk-buffer files from the persist file, see {{% xref "/docs/chapter-routing-filters/concepts-diskbuffer/get-information-about-disk-buffer-files/get-information-about-disk-buffer-files-getting-list/_index.md" %}}).



## Example: difference between the list of disk-buffer files from the persist file and the content of the disk-buffer files' saving directory

The following examples show the difference between the list of disk-buffer files from the persist file and the content of the disk-buffer files' saving directory.

Disk-buffer file list from persist file:

```c
   afsocket_dd_qfile(stream,10.21.10.112:514) = { "queue_file": "/opt/syslog-ng/var/syslog-ng-00001.rqf" }
```

Disk-buffer files' saving directory content:

```c
   # ls -l /opt/syslog-ng/var//var/lib/syslog-ng/*qf
    -rw------- 1 root root 2986780 Jul 31 12:30 /opt/syslog-ng/var/syslog-ng-00000.qf/var/lib/syslog-ng/syslog-ng-00000.qf
    -rw------- 1 root root 2000080 Jul 31 12:31 /opt/syslog-ng/var/syslog-ng-00000.rqf
    -rw------- 1 root root    4096 Aug  1 11:09 /opt/syslog-ng/var/syslog-ng-00001.rqf
```


The disk-buffer files `syslog-ng-00000.qf` and `syslog-ng-00000.rqf` don't exist in the persist file. These two files are the orphan disk-buffer files.

For more information about orphan disk-buffer files and how to process the messages in orphan disk-buffer files using a separate {{% param "product.abbrev" %}} instance, see {{% xref "/docs/chapter-routing-filters/concepts-diskbuffer/get-information-about-disk-buffer-files/diskb-proc-sep-sysl-inst/_index.md" %}}.
