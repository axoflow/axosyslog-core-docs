---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{% alert title="Note" color="info" %}}
Prior to version 4.0, {{% param "product.abbrev" %}} handled every data as strings, and allowed you to convert the strings into other types of data that only certain destinations data formats supported.

Starting with {{% param "product.abbrev" %}} 4.0, each name-value pair is a (name, type, value) triplet, and several components of {{% param "product.abbrev" %}} have typing support. For details, see {{% xref "/chapter-concepts/concepts-value-pairs/specifying-data-types/_index.md#data-types-components" %}}.
{{% /alert %}}
