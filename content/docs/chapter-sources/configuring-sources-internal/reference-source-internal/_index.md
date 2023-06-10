---
title: "internal() source options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `internal()` driver has the following options:

{{% include-headless "chunk/option-source-host-override.md" %}}

{{% include-headless "chunk/option-source-log-iw-size.md" %}}


## normalize-hostnames() {#ss-internal-source-option-normalize-hostnames}

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | `yes` | `no` |
| Default:         | `no`           |

*Description:* If enabled (**normalize-hostnames(yes)**), {{% param "product.abbrev" %}} converts the hostnames to lowercase.


{{% include-headless "chunk/option-source-program-override.md" %}}

{{% include-headless "chunk/option-source-tags.md" %}}


## use-fqdn() {#ss-internal-source-option-use-fqdn}

|          |           |
| -------- | --------- |
| Type:    | yes or no |
| Default: | no        |

*Description:* Add Fully Qualified Domain Name instead of short hostname. This option can be specified globally, and per-source as well. The local setting of the source overrides the global option if available.

