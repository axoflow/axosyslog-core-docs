---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## hdfs-append-enabled()

|          |              |
| -------- | ------------ |
| Type:    | true | false |
| Default: | false        |



*Description:* When `hdfs-append-enabled` is set to **true**, {{% param "product.abbrev" %}} will append new data to the end of an already existing HDFS file. Note that in this case, archiving is automatically disabled, and {{% param "product.abbrev" %}} will ignore the `hdfs-archive-dir` option.

When `hdfs-append-enabled` is set to **false**, the {{% param "product.abbrev" %}} application always creates a new file if the previous has been closed. In that case, appending data to existing files is not supported.

When you choose to write data into an existing file, {{% param "product.abbrev" %}} does not extend the filename with a UUID suffix because there is no need to open a new file (a new unique ID would mean opening a new file and writing data into that).


{{% alert title="Warning" color="warning" %}}

Before enabling the `hdfs-append-enabled` option, ensure that your HDFS server supports the `append` operation and that it is enabled. Otherwise {{% param "product.abbrev" %}} will not be able to append data into an existing file, resulting in an error log.

{{% /alert %}}
