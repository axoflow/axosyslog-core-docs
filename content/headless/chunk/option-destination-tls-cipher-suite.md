---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## cipher-suite()

|                  |                                                                              |
| ---------------- | ---------------------------------------------------------------------------- |
| Accepted values: | Name of a cipher, or a colon-separated list                                  |
| Default:         | Depends on the OpenSSL version that {{% param "product.abbrev" %}} uses |

*Description:* Specifies the cipher, hash, and key-exchange algorithms used for the encryption, for example, `ECDHE-ECDSA-AES256-SHA384`. The list of available algorithms depends on the version of OpenSSL used to compile {{% param "product.abbrev" %}}. To specify multiple ciphers, separate the cipher names with a colon, and enclose the list between double-quotes, for example:

```shell
   cipher-suite("ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384")
```

For a list of available algorithms, execute the `openssl ciphers -v` command. The first column of the output contains the name of the algorithms to use in the `cipher-suite()` option, the second column specifies which encryption protocol uses the algorithm (for example, `TLSv1.2`). That way, the `cipher-suite()` also determines the encryption protocol used in the connection: to disable SSLv3, use an algorithm that is available only in TLSv1.2, and that both the client and the server supports. You can also specify the encryption protocols using [ssl-options()]({{< relref "/chapter-encrypted-transport-tls/tlsoptions/_index.md" >}}).

You can also use the following command to automatically list only ciphers permitted in a specific encryption protocol, for example, `TLSv1.2`:

```shell
   echo "cipher-suite(\"$(openssl ciphers -v | grep TLSv1.2 | awk '{print $1}' | xargs echo -n | sed 's/ /:/g' | sed -e 's/:$//')\")"
```

Note that starting with version 3.10, when {{% param "product.abbrev" %}} receives TLS-encrypted connections, the order of ciphers set on the {{% param "product.abbrev" %}} server takes precedence over the client settings.

