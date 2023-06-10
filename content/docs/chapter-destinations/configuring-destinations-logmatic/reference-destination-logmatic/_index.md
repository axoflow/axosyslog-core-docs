---
title: "logmatic() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `logmatic()` destination has the following options. You can also set other options of the underlying `tcp()` driver (for example, port number or TLS-encryption).

{{% include-headless "chunk/option-destination-hook.md" %}}

## token() {#logmatic-option-token}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* Your API Key that you received from Logmatic.io.
