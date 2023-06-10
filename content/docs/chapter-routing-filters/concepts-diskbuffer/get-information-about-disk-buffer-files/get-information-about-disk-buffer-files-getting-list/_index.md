---
title: "Getting the list of disk-buffer files"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Purpose

This section describes getting the list of disk-buffer files used in {{% param "product.name" %}}({{% param "product.abbrev" %}}).

The {{% param "product.abbrev" %}} application stores information (namely, the `IP:PORT` or `DNS:PORT` of the destinations, and the name of the disk-buffer file) about disk-buffer files in its persist file.


## Example: command for listing the disk-buffer files in use

The following command will list the disk-buffer files in use:

```c
   /opt/syslog-ng/bin/persist-tool dump /opt/syslog-ng/var/syslog-ng.persist/var/lib/syslog-ng/syslog-ng.persist | awk -F '["=]' '/(qfile\(|\.queue)/ { gsub(/[ \t]+/, "", $5); gsub(/^[0-9A-Fa-f]{8}/, "", $5); "echo "$5"|xxd -r -p"|& getline QUEUE; printf("%s ==> %s\n",$1,QUEUE)}'
```

The example output will look like the following:

```c
   afsocket_dd_qfile(stream,10.21.10.20:601)  ==> /opt/syslog-ng/var/syslog-ng-00000.rqf
```

{{< include-headless "chunk/disk-buffer-7lts-output-note.md" >}}

