---
title: "Storing messages with MapR-FS"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.abbrev" %}} application is also compatible with MapR File System (MapR-FS). MapR-FS provides better performance, reliability, efficiency, maintainability, and ease of use compared to the default Hadoop Distributed Files System (HDFS). To use MapR-FS with {{% param "product.abbrev" %}}, complete the following steps:

1.  Install MapR libraries. Instead of the official Apache HDFS libraries, MapR uses different libraries. The supported version is MapR 4.x.
    
    1.  Download the libraries from the Maven Repository and Artifacts for MapR or get it from an already existing MapR installation.
    
    2.  Install MapR. If you do not know how to install MapR, follow the instructions on the MapR website.

2.  In a default MapR installation, the required libraries are installed in the following path: `/opt/mapr/lib`.
    
    Enter the path where MapR was installed in the `class-path` option of the `hdfs` destination, for example:
    
    ```c
    
        class-path("/opt/mapr/lib/")
    
    ```
    
    If the libraries were downloaded from the Maven Repository, the following additional libraries will be requiered. Note that the version numbers in the filenames can be different in the various Hadoop releases:`commons-collections-3.2.1.jar`, `commons-logging-1.1.3.jar`, `hadoop-auth-2.5.1.jar`, `log4j-1.2.15.jar`, `slf4j-api-1.7.5.jar`, `commons-configuration-1.6.jar`, `guava-13.0.1.jar`, `hadoop-common-2.5.1.jar`, `maprfs-4.0.2-mapr.jar`, `slf4j-log4j12-1.7.5.jar`, `commons-lang-2.5.jar`, `hadoop-0.20.2-dev-core.jar`, `json-20080701.jar`, `protobuf-java-2.5.0.jar`, `zookeeper-3.4.5-mapr-1406.jar`.

3.  Configure the `hdfs` destination in {{% param "product.abbrev" %}}.
    
    
    ## Example: Storing logfiles with MapR-FS {#example-destination-hdfs-mapr}
    
    The following example defines an `hdfs` destination for MapR-FS using only the required parameters.
    
    ```c
    
        @include "scl.conf"
        
        destination d_mapr {
            hdfs(
                client-lib-dir("/opt/syslog-ng/lib/syslog-ng/java-modules/:/opt/mapr/lib/")
                hdfs-uri("maprfs://10.140.32.80")
                hdfs-file("/user/log/logfile.txt")
            );
        };
    
    ```
    
