---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
If you want to use the Java-based modules of {{% productparam "abbrev" %}} (for example, the Elasticsearch, HDFS, or Kafka destinations), you must compile {{% productparam "abbrev" %}} with Java support.

  - Download and install the Java Runtime Environment (JRE), 1.7 (or newer). {{% conditional-text include-if="pe" %}}The Java-based modules of {{% productparam "abbrev" %}} are tested and supported when using the Oracle implementation of Java. Other implementations are untested and unsupported, they may or may not work as expected.{{% /conditional-text %}}{{% conditional-text include-if="ose" %}}You can use OpenJDK or Oracle JDK, other implementations are not tested.{{% /conditional-text %}}

  - Install [gradle](https://gradle.org/install) version 2.2.1 or newer.

  - Set **LD_LIBRARY_PATH** to include the `libjvm.so` file, for example:`LD_LIBRARY_PATH=/usr/lib/jvm/java-7-openjdk-amd64/jre/lib/amd64/server:$LD_LIBRARY_PATH`
    
    Note that many platforms have a simplified links for Java libraries. Use the simplified path if available. If you use a startup script to start {{% productparam "abbrev" %}} set **LD_LIBRARY_PATH** in the script as well.

  - If you are behind an HTTP proxy, create a `gradle.properties` under the `modules/java-modules/` directory. Set the proxy parameters in the file. For details, see [The Gradle User Guide](https://docs.gradle.org/current/userguide/build_environment.html#sec:gradle_properties_and_system_properties).
