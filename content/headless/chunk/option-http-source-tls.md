---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## tls() {#tls}

|          |             |
| -------- | ----------- |
| Type:    | TLS options |
| Default: |             |

*Description:* The TLS settings of the source, for example, the certificate and the private key that {{% param "product.abbrev" %}} shows to the clients. Setting [`transport(tls)`](#transport) requires a `tls()` block. For details on the individual options, see {{% xref "/chapter-encrypted-transport-tls/tlsoptions/_index.md" %}}.

```shell
tls(
    key-file("/etc/syslog-ng/server.key")
    cert-file("/etc/syslog-ng/server.crt")
)
```

The following TLS options are available: `ca-dir()`, `cert-file()`, `cipher-suite()`, `crl-dir()`, `dhparam-file()`, `ecdh-curve-list()`, `key-file()`, `peer-verify()`, `pkcs12-file()`, `ssl-options()`, `trusted-dn()`, and `trusted-keys()`.

{{% alert title="Note" color="info" %}}
This is a narrower set than what the `network()` and `syslog()` sources accept. In particular, `ca-file()` is not available, use `ca-dir()` instead. The `trusted-fingerprints()`, `ocsp-stapling-verify()`, `sigalgs()`, and `keylog-file()` options are not available either.
{{% /alert %}}
