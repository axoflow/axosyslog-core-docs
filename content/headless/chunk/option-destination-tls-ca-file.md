---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## ca-file()

{{< include-headless "chunk/option-destination-tls-ca-file-description.md" >}}

{{< alert title="Note" color="info" >}}
The `ca-file()` option can be used together with the `ca-dir()` option, and it is relevant when `peer-verify()` is set to other than `no` or `optional-untrusted`.
{{< /alert >}}
