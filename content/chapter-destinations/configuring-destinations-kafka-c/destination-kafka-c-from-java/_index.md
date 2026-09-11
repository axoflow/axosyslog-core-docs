---
title: "Shifting from Java implementation to C implementation"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{% param "product.name" %}} has removed the Java implementation of the `kafka()` destination: both `kafka()` and `kafka-c()` now use the C implementation. If you're migrating a configuration written for the Java implementation, make the following changes.

  - The `template()` option has been renamed [`message()`]({{< relref "/chapter-destinations/configuring-destinations-kafka-c/reference-destination-kafka-c/_index.md#kafka-option-message" >}}).

  - The `kafka-bootstrap-servers()` option has been renamed [`bootstrap-servers()`]({{< relref "/chapter-destinations/configuring-destinations-kafka-c/reference-destination-kafka-c/_index.md#kafka-option-kafka-bootstrap-servers" >}}).

  - The `properties-file()` option has been removed. Set the Kafka producer properties in the [`config()`]({{< relref "/chapter-destinations/configuring-destinations-kafka-c/reference-destination-kafka-c/_index.md#config" >}}) option instead, which also replaces the old implementation's `option()` option and has a different syntax.

  - The `client-lib-dir()` option has been removed. Remove it from the configuration file, the C implementation needs no Java libraries.

  - The `@define kafka-implementation kafka-c` line is no longer needed. Remove it from the configuration file.

  - The [`topic()`]({{< relref "/chapter-destinations/configuring-destinations-kafka-c/reference-destination-kafka-c/_index.md#kafka-option-kafka-topic" >}}) option accepts templates. If you use a template, also set the [`fallback-topic()`]({{< relref "/chapter-destinations/configuring-destinations-kafka-c/reference-destination-kafka-c/_index.md#kafka-option-fallback-topic" >}}) option, which {{% param "product.abbrev" %}} uses when the template resolves to an invalid topic name.

For more information, see {{% xref "/chapter-destinations/configuring-destinations-kafka-c/reference-destination-kafka-c/_index.md" %}}.

