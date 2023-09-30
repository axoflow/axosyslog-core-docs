---
title: "TLS options"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The AxoSyslog application can encrypt incoming and outgoing syslog message flows using TLS if you use the `network()` or `syslog()` drivers.

{{% alert title="Note" color="info" %}}

The format of the TLS connections used by AxoSyslog is similar to using AxoSyslog and stunnel, but the source IP information is not lost.

{{% /alert %}}

To encrypt connections, use the `transport("tls")` and `tls()` options in the source and destination statements.

The tls() option can include the following settings:


## allow-compress() {#tls-options-allow-compress}

|                  |          |
| ---------------- | -------- |
| Accepted values: | yes | no |
| Default:         | no       |

*Description:* Enable on-the-wire compression in TLS communication. Note that this option must be enabled both on the server and the client to have any effect. Enabling compression can significantly reduce the bandwidth required to transport the messages, but can slightly decrease the performance of {{% param "product.abbrev" %}}, reducing the number of transferred messages during a given period.

Available in version 3.19 and later.


{{% include-headless "chunk/option-destination-tls-ca-dir.md" %}}

{{< include-headless "chunk/option-destination-tls-ca-file.md" >}}

{{% include-headless "chunk/option-destination-tls-cert-file.md" %}}

{{% include-headless "chunk/option-destination-tls-cipher-suite.md" %}}

## client-sigalgs() {#tls-options-client-sigalgs}

|                  |                                 |
| ---------------- | ------------------------------- |
| Accepted values: | string [colon-separated list] |
| Default:         | none                            |

*Description:* A colon-separated list that specifies the supported signature algorithms associated with client authentication for TLSv1.2 and higher, for example, `RSA-PSS+SHA256:ed25519`.

- For servers, the value is used in the `signature_algorithms` field of a `CertificateRequest` message.
- For clients, it is used to determine which signature algorithm to use with the client certificate.

If `client-sigalgs()` is not set but `sigalgs()` is, then the values of [`sigalgs()`](#tls-options-sigalgs) are used.

## crl-dir() {#tls-options-crl-dir}

|                  |                |
| ---------------- | -------------- |
| Accepted values: | Directory name |
| Default:         | none           |

*Description:* Name of a directory that contains the Certificate Revocation Lists for trusted CAs. Similarly to `ca-dir()` files, use the 32-bit hash of the name of the issuing CAs as filenames. The extension of the files must be `.r0`.


{{% include-headless "chunk/option-tls-option-dhparam-file.md" %}}


## ecdh-curve-list() {#tls-options-ecdh-curve-list}

|                  |                                 |
| ---------------- | ------------------------------- |
| Accepted values: | string [colon-separated list] |
| Default:         | none                            |

*Description:* A colon-separated list that specifies the curves that are permitted in the connection when using Elliptic Curve Cryptography (ECC).

This option is only available when `syslog-ng` is compiled with OpenSSL version 1.0.2 or later. In the case of older versions, prime256v1 (NIST P-256) is used.

The following example curves work for all versions of OpenSSL that are equal to or later than version 1.0.2:

```shell
   ecdh-curve-list("prime256v1:secp384r1")
```

{{% include-headless "chunk/option-destination-tls-key-file.md" %}}

## keylog-file()

|                  |          |
| ---------------- | -------- |
| Accepted values: | Filename |
| Default:         | N/A      |

*Description:* This option enables saving TLS secrets (decryption keys) for a given source or destination, which can be used to decrypt data with, for example, Wireshark. The given path and name of a file will be used to save these secrets.

This option is only available with the following drivers:

  - network

  - syslog

  - tcp

  - tcp6

{{% alert title="Warning" color="warning" %}}

Using `keylog-file()` makes TLS connections less secure by writing secret key materials into the given file. This option should only be enabled for debugging purposes and should be disabled after that. It is also recommended to delete the file after the debugging session is over.

{{% /alert %}}

{{< include-headless "chunk/option-destination-tls-ocsp-stapling-verify.md" >}}

Example configuration:

```shell
destination {

    network("example.com" transport(tls)
        tls(
            pkcs12-file("/path/to/test.p12")
            peer-verify(yes)
            ocsp-stapling-verify(yes)
        )
    );
};
```

## openssl-conf-cmds() {#tls-options-openssl-conf-cmds}

Available in {{% param "product.abbrev" %}} version 4.0 and later.

IMPORTANT: `openssl-conf-cmds()` always has the highest priority, so it overrides any other options that can be found in the `tls()` section.

OpenSSL offers an alternative, software-independent configuration mechanism through the [SSL_CONF_cmd](https://www.openssl.org/docs/man1.1.1/man3/SSL_CONF_cmd.html) interface for setting the various SSL_CTX and SSL options.

The order of operations within `openssl-conf-cmds()` is significant and the commands are executed in top-down order. This means that if the same option occurs multiple times, then the 'last one wins'. This is also true for options that can be set multiple ways (for example, cipher suites or protocols).

Example configuration:

```shell
    tls(
        ca-dir("/etc/ca.d")
        key-file("/etc/cert.d/serverkey.pem")
        cert-file("/etc/cert.d/servercert.pem")
        peer-verify(yes)

        openssl-conf-cmds(
            # For system wide available cipher suites use: /usr/bin/openssl ciphers -v
            # For formatting rules see: https://www.openssl.org/docs/man1.1.1/man3/SSL_CONF_cmd.html
            "CipherString" => "ECDHE-RSA-AES128-SHA",                                   # TLSv1.2 and bellow
            "CipherSuites" => "TLS_CHACHA20_POLY1305_SHA256:TLS_AES_256_GCM_SHA384",    # TLSv1.3+ (OpenSSl 1.1.1+)

            "Options" => "PrioritizeChaCha",
            "Protocol" => "-ALL,TLSv1.3",
        )
    )
```

## peer-verify() {#tls-options-peer-verify}

|                  |                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| Accepted values: | `optional-trusted` | `optional-untrusted` | `required-trusted` | `required-untrusted | `yes` | `no`` |
| Default:         | `required-trusted`                                                                                             |

*Description:* Verification method of the peer, the four possible values is a combination of two properties of validation:

  - Whether the peer is required to provide a certificate (required or optional prefix).

  - Whether the certificate provided needs to be valid or not.

The following table summarizes the possible options and their results depending on the certificate of the peer.

<table class="TableStyle-RuledTableWithoutHeading_DoNotEdit" style="WIDTH: 100%; mc-table-style: url('../../Resources/TableStyles/RuledTableWithoutHeading_DoNotEdit.css')" cellspacing="0">
<thead>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Head-Header1">
<th class="TableStyle-RuledTableWithoutHeading_DoNotEdit-HeadH-Column1-" rowspan="2" colspan="2">
<p></p></th>
<th class="TableStyle-RuledTableWithoutHeading_DoNotEdit-HeadG-Column1-" colspan="3">The remote peer has:</th></tr>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Head-Header1">
<th class="TableStyle-RuledTableWithoutHeading_DoNotEdit-HeadH-Column1-">no certificate </th>
<th class="TableStyle-RuledTableWithoutHeading_DoNotEdit-HeadH-Column1-">invalid certificate </th>
<th class="TableStyle-RuledTableWithoutHeading_DoNotEdit-HeadG-Column1-">valid certificate </th></tr></thead>
<tbody>
<tr class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Body-Body1">
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1" rowspan="4"><i style="FONT-STYLE: normal">Local peer-verify() setting</i> </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1"><i style="FONT-STYLE: normal">optional-untrusted</i> </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1">TLS-encryption </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1">TLS-encryption </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyD-Column1-Body1">TLS-encryption </td></tr>
<tr class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Body-Body1">
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1"><i style="FONT-STYLE: normal">optional-trusted</i> </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1">TLS-encryption </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1">rejected connection </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyD-Column1-Body1">TLS-encryption </td></tr>
<tr class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Body-Body1">
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1"><i style="FONT-STYLE: normal">required-untrusted</i> </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1">rejected connection </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1">TLS-encryption </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyD-Column1-Body1">TLS-encryption </td></tr>
<tr class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Body-Body1">
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyB-Column1-Body1"><i style="FONT-STYLE: normal">required-trusted</i> </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyB-Column1-Body1">rejected connection </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyB-Column1-Body1">rejected connection </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyA-Column1-Body1">TLS-encryption </td></tr></tbody>
<colgroup>
<col class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Column-Column1" style="WIDTH: 0.3in">
<col class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Column-Column1" style="WIDTH: 0.3in">
<col class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Column-Column1" style="WIDTH: 0.3in">
<col class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Column-Column1" style="WIDTH: 0.3in"></colgroup></table>

{{< include-headless "chunk/option-destination-tls-peer-verify-notes.md" >}}

Starting with {{% param "product.abbrev" %}} version 3.10, you can also use a simplified configuration method for the `peer-verify` option, simply setting it to `yes` or `no`. The following table summarizes the possible options and their results depending on the certificate of the peer.

{{% include-headless "chunk/option-tls-peer-verify-yesno.md" %}}


## pkcs12-file() {#tls-options-pkcs12-file}

|                  |          |
| ---------------- | -------- |
| Accepted values: | Filename |
| Default:         | none     |

*Description:* The name of a `PKCS #12` file that contains an unencrypted private key, an X.509 certificate, and an optional set of trusted CA certificates.

If this option is used in the configuration, the value of `key-file()` and `cert-file()` will be omitted.

You can use the `ca-dir()` option together with `pkcs12-file()`. However, this is optional because the `PKCS #12` file may contain CA certificates as well.

Passphrase is currently not supported.


### Example: Using pkcs12-file()

In the following example, the first command creates a single `PKCS #12` file from the private key, X.509 certificate, and CA certificate files. Then, the second half of the example uses the same `PKCS #12` file in the AxoSyslog configuration.

```bash
openssl pkcs12 -export -inkey server.key -in server.crt -certfile ca.crt -out server.p12
```

Example configuration:

```shell
   source s_tls {
        syslog(
            transport(tls)
            tls(
                pkcs12-file("/path/to/server.p12")
                ca-dir("/path/to/cadir") # optional
                peer-verify(yes)
            )
        );
    };
```

## sigalgs() {#tls-options-sigalgs}

|                  |                                 |
| ---------------- | ------------------------------- |
| Accepted values: | string [colon-separated list] |
| Default:         | none                            |

*Description:* A colon-separated list that specifies the supported signature algorithms (in order of decreasing preference) for TLSv1.2 and higher, for example, `RSA-PSS+SHA256:ed25519`. If this option is not set then all supported signature algorithms supported are permissible.

- For servers, it is used to determine which signature algorithms to support.
- For clients, this value is used directly for the supported signature algorithms extension.

## sni() {#tls-options-sni}

|                  |          |
| ---------------- | -------- |
| Accepted values: | yes | no |
| Default:         | no       |

*Description:* When set to `yes` in a destination that uses TLS encryption, this option enables [Server Name Indication](https://tools.ietf.org/html/rfc6066#page-6) (also called Server Name Identification, SNI). The {{% param "product.abbrev" %}} sends the hostname or the IP address set in the destination to the server during the TLS handshake.

Available in {{% param "product.abbrev" %}} 3.24 and newer.


### Example: Using Server Name Indication

The following destination sends the hostname of its destination during the TLS handshake.

```shell
   destination demo_tls_destination_with_sni {
        network(
             "logserver.example.com" port(6514)
            transport("tls")
            tls(
                ca_dir("/etc/syslog-ng/ca.d")
                key-file("/etc/syslog-ng/cert.d/clientkey.pem")
                cert-file("/etc/syslog-ng/cert.d/clientcert.pem")
                sni(yes)
            )
        );
    };
```

## ssl-options() {#tls-options-ssl-options}

|                  |                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| Accepted values: | comma-separated list of the following options: no-sslv2, no-sslv3, no-tlsv1, no-tlsv11, no-tlsv12, no-tlsv13, none, ignore-hostname-mismatch |
| Default:         | no-sslv2                                                                                                           |

Available in {{% param "product.abbrev" %}} 3.7 and newer.

*Description:* Sets the specified options of the SSL/TLS protocols. You can use it to disable specific protocol versions, and set other options. Note that disabling a newer protocol version (for example, TLSv1.1) does not automatically disable older versions of the same protocol (for example, TLSv1.0). For example, use the following option to permit using only TLSv1.1 or newer:

```shell
   ssl-options(no-sslv2, no-sslv3, no-tlsv1)
```

Using `ssl-options(none)` means that {{% param "product.abbrev" %}} does not specify any restrictions on the protocol used. However, in this case, the underlying OpenSSL library can restrict the available protocols, for example, certain OpenSSL versions automatically disable SSLv2.

By specifying `ignore-hostname-mismatch`, you can ignore the subject name of a certificate during the validation process. This means that {{% param "product.abbrev" %}} checks only that the certificate itself is trusted by the current set of trust anchors (e.g. trusted CAs), and ignores the mismatch between the targeted hostname and the certificate subject. `ignore-hostname-mismatch` is available in {{% param "product.abbrev" %}} 4.4 and newer.

### Example: Using ssl-options

The following destination explicitly disables SSL and TLSv1.0

```shell
   destination demo_tls_destination {
        network(
             "172.16.177.147" port(6514)
            transport("tls")
            tls(
                ca_dir("/etc/syslog-ng/ca.d")
                key-file("/etc/syslog-ng/cert.d/clientkey.pem")
                cert-file("/etc/syslog-ng/cert.d/clientcert.pem")
                ssl-options(no-sslv2, no-sslv3, no-tlsv1)
            )
        );
    };
```

## trusted-dn() {#tls-options-trusted-dn}

|                  |                                      |
| ---------------- | ------------------------------------ |
| Accepted values: | list of accepted distinguished names |
| Default:         | none                                 |

*Description:* To accept connections only from hosts using certain certificates signed by the trusted CAs, list the distinguished names of the accepted certificates in this parameter. For example, using `trusted-dn("\*, O=Example Inc, ST=Some-State, C=\*")` will accept only certificates issued for the `Example Inc` organization in `Some-State` state.

## trusted-keys() {#tls-options-trusted-keys}

|                  |                                     |
| ---------------- | ----------------------------------- |
| Accepted values: | list of accepted SHA-1 fingerprints |
| Default:         | none                                |

*Description:* To accept connections only from hosts using certain certificates having specific SHA-1 fingerprints, list the fingerprints of the accepted certificates in this parameter. for example, `trusted-keys("SHA1:00:EF:ED:A4:CE:00:D1:14:A4:AB:43:00:EF:00:91:85:FF:89:28:8F", "SHA1:0C:42:00:3E:B2:60:36:64:00:E2:83:F0:80:46:AD:00:A8:9D:00:15")`.

To find the fingerprint of a certificate, you can use the following command: `openssl x509 -in <certificate-filename>sha1 -noout -fingerprint`

{{% alert title="Note" color="info" %}}

When using the `trusted-keys()` and `trusted-dn()` parameters, note the following:

  - First, the `trusted-keys()` parameter is checked. If the fingerprint of the peer is listed, the certificate validation is performed.

  - If the fingerprint of the peer is not listed in the `trusted-keys()` parameter, the `trusted-dn()` parameter is checked. If the DN of the peer is not listed in the `trusted-dn()` parameter, the authentication of the peer fails and the connection is closed.

{{% /alert %}}

