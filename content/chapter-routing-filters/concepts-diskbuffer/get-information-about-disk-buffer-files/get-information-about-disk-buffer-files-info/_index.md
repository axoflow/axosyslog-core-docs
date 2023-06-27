---
title: "Information about disk-buffer files"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section describes information about disk-buffer files used in {{% param "product.name" %}}.

The following list contains information about how disk-buffer files are used in {{% param "product.abbrev" %}}:

  - You can configure `disk-buffer()` for a remote destination in the `destination()` statement.
    
    For more information about an example of configuring `disk-buffer()` for a remote destination in the `destination()` statement, see [disk-buffer()]({{< relref "/chapter-destinations/configuring-destinations-elasticsearch-http/reference-destination-elasticsearch-http/_index.md#elasticsearch-http-options-disk-buffer" >}}).

  - By default, {{% param "product.abbrev" %}} creates disk-buffer files under `/opt/syslog-ng/var` directory, unless `dir()` option is set in `disk-buffer()`.

  - The filenames are generated automatically by {{% param "product.abbrev" %}} with the extensions `.qf` for a normal disk-buffer and `.rqf` for a reliable disk-buffer.

  - The disk-buffer file stores processed log messages in the format in which they would have been sent out to the destination, but doesn't store information about the destination.
