---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## ca-file()

|                  |           |
| ---------------- | --------- |
| Accepted values: | File name |
| Default:         | empty     |

*Description:* Optional. The name of a file that contains a set of trusted CA certificates in PEM format. The {{% param "product.abbrev" %}} application uses the CA certificates in this file to validate the certificate of the peer.

Example format in configuration:

```shell
   ca-file("/etc/pki/tls/certs/ca-bundle.crt")
```


{{< alert title="Note" color="info" >}}
The `ca-file()` option can be used together with the `ca-dir()` option, and it is relevant when `peer-verify()` is set to other than `no` or `optional-untrusted`.
{{< /alert >}}
