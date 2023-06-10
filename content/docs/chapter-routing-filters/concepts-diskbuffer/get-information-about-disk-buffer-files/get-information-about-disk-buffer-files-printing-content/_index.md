---
title: "Printing the content of disk-buffer files"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Purpose

This section describes printing the content of the disk-buffer files used in {{% param "product.name" %}}({{% param "product.abbrev" %}}).


## Command syntax

The command syntax for printing the content of the disk-buffer files used in {{% param "product.abbrev" %}} looks like the following:

```c
   /opt/syslog-ng/bin/dqtooldqtool cat DISK-BUFFER_FILE
```



## Short example output for printed content


## Example: short output that shows the printed content of the disk-buffer files used in {{% param "product.abbrev" %}}

The following short output example shows the printed content of the disk-buffer files used in {{% param "product.abbrev" %}}:

```c
   /opt/syslog-ng/bin/dqtooldqtool cat /opt/syslog-ng/var/syslog-ng-00000.rqf
    
    Reliable disk-buffer state loaded; filename='/opt/syslog-ng/var/syslog-ng-00000.rqf', queue_length='2952', size='-437712'
    Jul 31 12:33:48.226 10.21.10.10 <382019-07-31T12:33:36 localhost prg00000[1234]: seq: 0000000838, thread: 0000, runid: 1564569216, stamp: 2019-07-31T12:33:36 PADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADD
    ...
```


