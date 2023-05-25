---
title: "Prerequisites"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To publish messages from {{% param "product.abbrev" %}} to Apache Kafka, complete the following steps.


## Steps:

1.  {{% include-headless "chunk/para-java-requirements.md" %}}

2.  Download the latest stable binary release of the Apache Kafka libraries (version 0.9 or newer) from <http://kafka.apache.org/downloads.html>.

3.  Extract the Apache Kafka libraries into a single directory. If needed, collect the various `.jar` files into a single directory (for example, `/opt/kafka/lib/`) where {{% param "product.abbrev" %}} can access them. You must specify this directory in the {{% param "product.abbrev" %}} configuration file.

4.  Check if the following files in the Kafka libraries have the same version number: `slf4j-api-\<version-number\>.jar`, `slf4j-log4j12-\<version-number\>.jar`. If the version number of these files is different, complete the following steps:
    
    1.  Delete one of the files (for example, `slf4j-log4j12-\<version-number\>.jar`).
    
    2.  Download a version that matches the version number of the other file (for example, 1.7.6) from the [official SLF4J distribution](http://www.slf4j.org/download.html).
    
    3.  Copy the downloaded file into the directory of your Kafka library files (for example, `/opt/kafka/lib/`).

