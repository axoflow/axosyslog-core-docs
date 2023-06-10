---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## key-file()

|                  |          |
| ---------------- | -------- |
| Accepted values: | Filename |
| Default:         | none     |

*Description:* The name of a file that contains an unencrypted private key in PEM format, suitable as a TLS key. If properly configured, the {{% param "product.abbrev" %}} application uses this private key and the matching certificate (set in the `cert-file()` option) to authenticate the {{% param "product.abbrev" %}} client on the destination server.

