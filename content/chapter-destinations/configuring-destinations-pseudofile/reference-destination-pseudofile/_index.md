---
title: "pseudofile() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `pseudofile()` destination has the following options:


## file()

|          |                    |
| -------- | ------------------ |
| Type:    | filename with path |
| Default: |                    |

*Description:* The file to write messages to, including the path.

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-destination-template.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

