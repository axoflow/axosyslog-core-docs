---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## peer-verify()

|                  |          |
| ---------------- | -------- |
| Accepted values: | `yes` or `no` |
| Default:         | `yes`      |

*Description:* Verification method of the peer. The following table summarizes the possible options and their results depending on the certificate of the peer.

{{% include-headless "chunk/option-tls-peer-verify-yesno.md" %}}

{{< include-headless "chunk/option-destination-tls-peer-verify-notes.md" >}}
