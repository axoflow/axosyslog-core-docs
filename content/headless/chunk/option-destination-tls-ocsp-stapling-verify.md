---
---
## ocsp-stapling-verify {#tls-options-ocsp-stapling-verify}

|                  |          |
| ---------------- | -------- |
| Accepted values: | `yes`, `no` |
| Default:         | `no`      |

Available in {{% param "product.abbrev" %}} 4.0 and later.

*Description:* When [OCSP stapling verification](https://en.wikipedia.org/wiki/OCSP_stapling) is enabled, {{% param "product.abbrev" %}} requests the server to send back its OCSP status. {{% param "product.abbrev" %}} verifies this status response using the trust store you have configured using the `ca-file()`, `ca-dir()`, or the `pkcs12-file()` options.

{{% alert title="Note" color="info" %}}
RFC 6961 multi-stapling and TLS 1.3-provided multiple responses are currently not validated, only the peer certificate is verified.
{{% /alert %}}
