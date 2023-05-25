---
title: "Getting the status information of disk-buffer files"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Purpose

This section describes getting the status information of the disk-buffer files used in {{% param "product.name" %}} ({{% param "product.abbrev" %}}).


## Command syntax

The basic command syntax for getting the status information of the disk-buffer files used in {{% param "product.abbrev" %}} looks like the following:

```c

    /opt/syslog-ng/bin/dqtooldqtoolinfo DISK-BUFFER_FILE

```



## Example commands

The following example commands describe how you can get the status information of two different types of disk-buffer files (namely, empty normal disk-buffer files, and non-empty reliable disk-buffer queue files).


## Example commands for empty, normal disk-buffer files, and non-empty, reliable disk-buffer queue files

  - Empty, normal disk-buffer file
    
    ```c
    
        /opt/syslog-ng/bin/dqtooldqtool info /opt/syslog-ng/var/syslog-ng-00000.qf/var/lib/syslog-ng/syslog-ng-00000.qfDisk-buffer state loaded; filename='/opt/syslog-ng/var/syslog-ng-00000.qf/var/lib/syslog-ng/syslog-ng-00000.qf', number_of_messages='0'
    
    ```

  - Non-empty, reliable disk-buffer queue file
    
    ```c
    
        /opt/syslog-ng/bin/dqtooldqtool info /opt/syslog-ng/var/syslog-ng-00000.rqfReliable disk-buffer state loaded; filename='/opt/syslog-ng/var/syslog-ng-00000.rqf', number_of_messages='10'
    
    ```




## One-liner command to get the state of disk-buffer files in the default directory

You can use the following one-liner command to get the state of disk-buffer files in the default directory:

```c

    for qfile in /opt/syslog-ng/var/*.?(r)qf ; do /opt/syslog-ng/bin/dqtooldqtool info $qfile 2>&1 ; done

```

