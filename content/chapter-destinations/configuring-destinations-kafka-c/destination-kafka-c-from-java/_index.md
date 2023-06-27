---
title: "Shifting from Java implementation to C implementation"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

If you were using the Java implementation of the `kafka` destination and want to shift to its C implementation, the following changes to the configuration file and considerations are necessary.


  - Unlike the old one, the new `topic()` option can not handle templates. It must be a string.

  - The `template()` option has been renamed `message()`.

  - The `kafka-bootstrap-servers()` option has been renamed `bootstrap-servers()`.

  - The `properties-file()` is a Java properties file with options that are similar to, but not identical with, the options in the old, Java implementation's <span class="userinput">properties-file()</span>. For more information, click [here]({{< relref "/chapter-destinations/configuring-destinations-kafka-c/reference-destination-kafka-c/_index.md#kafka-options-properties-file" >}}).

  - The `sync-send()` option has been deprecated. Remove it from the configuration file.

  - The `client_lib_dir()` option has been deprecated. Remove it from the configuration file.

  - The old implementation's `option()` option has been removed and replaced by the `config()` option, which has a different syntax.

For more information, see {{% xref "/chapter-destinations/configuring-destinations-kafka-c/reference-destination-kafka-c/_index.md" %}}.

