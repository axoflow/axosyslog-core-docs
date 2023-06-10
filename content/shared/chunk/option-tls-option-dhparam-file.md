---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## dhparam-file()

|                  |                   |
| ---------------- | ----------------- |
| Accepted values: | string (filename) |
| Default:         | none              |

*Description:* Specifies a file containing Diffie-Hellman parameters, generated using the `openssl dhparam` utility. Note that {{% param "product.abbrev" %}} supports only DH parameter files in the PEM format. If you do not set this parameter, [{{% param "product.abbrev" %}} uses the 2048-bit MODP Group, as described in RFC 3526](https://www.ietf.org/rfc/rfc3526.txt).

