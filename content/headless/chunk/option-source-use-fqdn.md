---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## use-fqdn()

|          |           |
| -------- | --------- |
| Type:    | yes or no |
| Default: | no        |

*Description:* Use this option to add a Fully Qualified Domain Name (FQDN) instead of a short hostname. You can specify this option either globally or per-source. The local setting of the source overrides the global option if available.

{{% alert title="Note" color="info" %}}

Set `use-fqdn()` to `yes` if you want to use the `custom-domain()` global option.

{{% /alert %}}

{{< include-headless "chunk/p-keep-hostname.md" >}}
