---
title: "hdfs: Store messages on the Hadoop Distributed File System (HDFS)"
weight:  1700
driver: "hdfs()"
short_description: "Store messages on the Hadoop Distributed File System (HDFS)"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with version 3.7, {{% param "product.abbrev" %}} can send plain-text log files to the [Hadoop Distributed File System (HDFS)](http://hadoop.apache.org/), allowing you to store your log data on a distributed, scalable file system. This is especially useful if you have huge amounts of log messages that would be difficult to store otherwise, or if you want to process your messages using Hadoop tools (for example, Apache Pig).

Note the following limitations when using the {{% param "product.abbrev" %}} `hdfs` destination:

  - Since {{% param "product.abbrev" %}} uses the official Java HDFS client, the `hdfs` destination has significant memory usage (about 400MB).

  - {{< include-headless "chunk/para-hdfs-flush.md" >}}


## Declaration:

```shell
   @include "scl.conf"
    
    hdfs(
        client-lib-dir("/opt/syslog-ng/lib/syslog-ng/java-modules/:<path-to-preinstalled-hadoop-libraries>")
        hdfs-uri("hdfs://NameNode:8020")
        hdfs-file("<path-to-logfile>")
    );
```



## Example: Storing logfiles on HDFS {#example-destination-hdfs}

The following example defines an `hdfs` destination using only the required parameters.

```shell
   @include "scl.conf"
    
    destination d_hdfs {
        hdfs(
            client-lib-dir("/opt/syslog-ng/lib/syslog-ng/java-modules/:/opt/hadoop/libs")
            hdfs-uri("hdfs://10.140.32.80:8020")
            hdfs-file("/user/log/logfile.txt")
        );
    };
```


  - To install the software required for the `hdfs` destination, see {{% xref "/chapter-destinations/configuring-destinations-hdfs/destination-hdfs-prerequisites/_index.md" %}}.

  - For details on how the `hdfs` destination works, see {{% xref "/chapter-destinations/configuring-destinations-hdfs/destination-hdfs-interaction/_index.md" %}}.

  - For details on using MapR-FS, see {{% xref "/chapter-destinations/configuring-destinations-hdfs/destination-hdfs-maprfs/_index.md" %}}.

  - For details on using Kerberos authentication, see {{% xref "/chapter-destinations/configuring-destinations-hdfs/destination-hdfs-kerberos-authentication/_index.md" %}}.

  - For the list of options, see {{% xref "/chapter-destinations/configuring-destinations-hdfs/reference-destination-hdfs/_index.md" %}}.

The `hdfs()` driver is actually a reusable configuration snippet configured to receive log messages using the Java language-binding of {{% param "product.abbrev" %}}. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of the hdfs configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/master/scl/hdfs/plugin.conf).

{{< include-headless "wnt/note-jvm-reload.md" >}}
