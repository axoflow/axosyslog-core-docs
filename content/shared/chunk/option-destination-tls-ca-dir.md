---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## ca-dir()

|                  |                |
| ---------------- | -------------- |
| Accepted values: | Directory name |
| Default:         | none           |

*Description:* The name of a directory that contains a set of trusted CA certificates in PEM format. The CA certificate files have to be named after the 32-bit hash of the subject's name. This naming can be created using the c_rehash utility in openssl. For an example, see {{% xref "/docs/chapter-encrypted-transport-tls/tls-serverauth/procedure-configuring-tls-client/_index.md" %}}. The {{% param "product.abbrev" %}} application uses the CA certificates in this directory to validate the certificate of the peer.

This option can be used together with the optional `ca-file()` option.

