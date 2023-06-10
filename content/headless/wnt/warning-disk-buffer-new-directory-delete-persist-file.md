---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{< alert title="Warning" color="warning" >}}

When creating a new `dir()` option for a disk buffer, or modifying an existing one, make sure you delete the persist file.

{{% param "product.abbrev" %}} creates disk-buffer files based on the path recorded in the persist file. Therefore, if the persist file is not deleted after modifying the `dir()` option, then following a restart, {{% param "product.abbrev" %}} will look for or create disk-buffer files in their old location. To ensure that {{% param "product.abbrev" %}} uses the new `dir()` setting, the persist file must not contain any information about the destinations which the disk-buffer file in question belongs to.

{{< /alert >}}
