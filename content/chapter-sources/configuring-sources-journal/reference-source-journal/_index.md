---
title: "systemd-journal() source options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `systemd-journal()` driver has the following options:

{{% include-headless "chunk/option-source-default-facility-journal.md" %}}

{{% include-headless "chunk/option-source-default-level-journal.md" %}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-source-host-override.md" %}}

{{% include-headless "chunk/option-source-keep-hostname-journal.md" %}}

## match-boot()

|          |                     |
| -------- | ------------------- |
| Type:    | `yes`, `no` |
| Default: | no |

Available in {{% param "product.abbrev" %}} 4.1 and later.

*Description:* If set to yes, {{% param "product.abbrev" %}} fetches only journal messages that relate to the current boot, and to ignores messages generated in previous boots.

## matches()

|          |                     |
| -------- | ------------------- |
| Type:    | string |
| Default: |                |

Available in {{% param "product.abbrev" %}} 4.1 and later.

*Description:* Specifies one or more filters to apply on the journal fields, similarly how you can use `journalctl`. For example:

```shell
matches(
    "_COMM" => "systemd"
    )
```

{{% include-headless "chunk/option-source-max-field-size-journal.md" %}}

<span id="systemd-namespace"></span>
{{< include-headless "chunk/systemd-journal-namespace.md" >}}

{{% include-headless "chunk/option-source-prefix-journal.md" %}}

{{% include-headless "chunk/option-source-read-old-records.md" %}}

{{% include-headless "chunk/option-source-time-zone.md" %}}

{{< include-headless "chunk/option-source-use-fqdn.md" >}}
