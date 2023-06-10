---
title: "Prerequisites"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To send messages from {{% param "product.abbrev" %}} to HDFS, complete the following steps.


## Steps:

1.  {{% include-headless "chunk/para-java-requirements.md" %}}

2.  Download the Hadoop Distributed File System (HDFS) libraries (version 2.x) from <http://hadoop.apache.org/releases.html>.

3.  Extract the HDFS libraries into a temporary directory, then collect the various `.jar` files into a single directory (for example, `/opt/hadoop/lib/`) where {{% param "product.abbrev" %}} can access them. You must specify this directory in the {{% param "product.abbrev" %}} configuration file. The files are located in the various `lib` directories under the `share/` directory of the Hadoop release package. (For example, in Hadoop 2.7, required files are `common/hadoop-common-2.7.0.jar`, `common/libs/\*.jar`, `hdfs/hadoop-hdfs-2.7.0.jar`, `hdfs/lib/\*`, but this may change between Hadoop releases, so it is easier to copy every `.jar` file into a single directory.

