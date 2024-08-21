---
title: "Options of syslog-parser() parsers"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `syslog-parser()` has the following options:

{{% include-headless "chunk/option-source-default-facility.md" %}}

{{% include-headless "chunk/option-source-default-priority.md" %}}

{{< include-headless "chunk/option-source-drop-invalid.md" >}}

{{< include-headless "chunk/option-source-flags.md" >}}

For the `syslog-parser()` you can also set the `check-hostname` flag, which is equivalent with the [`check-hostname()` global option]({{< relref "/chapter-global-options/reference-options/_index.md#global-option-check-hostname" >}}), but only applies to this parser.

## sdata-prefix()

|           |                              |
| --------- | ---------------------------- |
| Type: | string |
| Default: | `.SDATA.` |

Available in {{% param "product.abbrev" %}} 4.1 and later.

*Description:* Adds a specific string before the names of the parsed SDATA fields to store the name-value pairs created from the SDATA fields separately. Note that unless the value of `sdata-prefix` starts with `.SDATA.`, using this option excludes the parsed fields from the [`sdata` and `rfc5424` scopes of the value pairs]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md#scope" >}}).

{{% include-headless "chunk/option-parser-template.md" %}}
