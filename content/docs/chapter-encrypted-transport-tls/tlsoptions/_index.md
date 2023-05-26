---
title: "TLS options"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The syslog-ng application can encrypt incoming and outgoing syslog message flows using TLS if you use the `network()` or `syslog()` drivers.

{{% alert title="Note" color="info" %}}

The format of the TLS connections used by syslog-ng is similar to using syslog-ng and stunnel, but the source IP information is not lost.

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

{{% include-headless "chunk/option-destination-tls-ca-file.md" %}}

{{% include-headless "chunk/option-destination-tls-cert-file.md" %}}

{{% include-headless "chunk/option-destination-tls-cipher-suite.md" %}}


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

This option is only available when syslog-ng is compiled with OpenSSL version 1.0.2 or later. In the case of older versions, prime256v1 (NIST P-256) is used.

The following example curves work for all versions of OpenSSL that are equal to or later than version 1.0.2:

```c
   ecdh-curve-list("prime256v1:secp384r1")

```



## tls-options-sigalgs {#tls-options-sigalgs}

|                  |                                 |
| ---------------- | ------------------------------- |
| Accepted values: | string [colon-separated list] |
| Default:         | none                            |

*Description:* A colon-separated list that specifies the supported signature algorithms for TLSv1.2 and higher, for example, `RSA-PSS+SHA256:ed25519`.

For servers, it is used to determine which signature algorithms to support.

For clients, this value is used directly for the supported signature algorithms extension.



## tls-options-sigalgs {#tls-options-client-sigalgs}

|                  |                                 |
| ---------------- | ------------------------------- |
| Accepted values: | string [colon-separated list] |
| Default:         | none                            |

*Description:* A colon-separated list that specifies the supported signature algorithms associated with client authentication for TLSv1.2 and higher, for example, `RSA-PSS+SHA256:ed25519`.

For servers, the value is used in the

    signature_algorithms

field of a

    CertificateRequest

message.

For clients, it is used to determine which signature algorithm to use with the client certificate.


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



## peer-verify() {#tls-options-peer-verify}

|                  |                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| Accepted values: | `optional-trusted` | `optional-untrusted` | `required-trusted` | `required-untrusted | `yes` | `no`` |
| Default:         | `required-trusted`                                                                                             |

*Description:* Verification method of the peer, the four possible values is a combination of two properties of validation:

  - Whether the peer is required to provide a certificate (required or optional prefix).

  - Whether the certificate provided needs to be valid or not.

The following table summarizes the possible options and their results depending on the certificate of the peer.


The remote peer has:

no certificate

invalid certificate

valid certificate

*Local peer-verify() setting*

*optional-untrusted*

TLS-encryption

TLS-encryption

TLS-encryption

*optional-trusted*

TLS-encryption

rejected connection

TLS-encryption

*required-untrusted*

rejected connection

TLS-encryption

TLS-encryption

*required-trusted*

rejected connection

rejected connection

TLS-encryption

{{% include-headless "chunk/option-destination-tls-peer-verify-notes.md" %}}

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


## Example: Using pkcs12-file()

In the following example, the first command creates a single `PKCS #12` file from the private key, X.509 certificate, and CA certificate files. Then, the second half of the example uses the same `PKCS #12` file in the syslog-ng configuration.


## Example:

```c
   $ openssl pkcs12 -export -inkey server.key -in server.crt -certfile ca.crt -out server.p12

```



## Example configuration:

```c
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





## sni() {#tls-options-sni}

|                  |          |
| ---------------- | -------- |
| Accepted values: | yes | no |
| Default:         | no       |

*Description:* When set to `yes` in a destination that uses TLS encryption, this option enables [Server Name Indication](https://tools.ietf.org/html/rfc6066#page-6) (also called Server Name Identification, SNI). The {{% param "product.abbrev" %}} sends the hostname or the IP address set in the destination to the server during the TLS handshake.

Available in {{% param "product.abbrev" %}} 3.24 and newer.


## Example: Using Server Name Indication

The following destination sends the hostname of its destination during the TLS handshake.

```c
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
| Accepted values: | comma-separated list of the following options: no-sslv2, no-sslv3, no-tlsv1, no-tlsv11, no-tlsv12, no-tlsv13, none |
| Default:         | no-sslv2                                                                                                           |

*Description:* Sets the specified options of the SSL/TLS protocols. Currently, you can use it to disable specific protocol versions. Note that disabling a newer protocol version (for example, TLSv1.1) does not automatically disable older versions of the same protocol (for example, TLSv1.0). For example, use the following option to permit using only TLSv1.1 or newer:

```c
   ssl-options(no-sslv2, no-sslv3, no-tlsv1)

```

Using `ssl-options(none)` means that {{% param "product.abbrev" %}} does not specify any restrictions on the protocol used. However, in this case, the underlying OpenSSL library can restrict the available protocols, for example, certain OpenSSL versions automatically disable SSLv2.

This option is available in {{% param "product.abbrev" %}} 3.7 and newer.


## Example: Using ssl-options

The following destination explicitly disables SSL and TLSv1.0

```c
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

To find the fingerprint of a certificate, you can use the following command: `openssl x509 -in \<certificate-filename\> -sha1 -noout -fingerprint`

{{% alert title="Note" color="info" %}}

When using the `trusted-keys()` and `trusted-dn()` parameters, note the following:

  - First, the `trusted-keys()` parameter is checked. If the fingerprint of the peer is listed, the certificate validation is performed.

  - If the fingerprint of the peer is not listed in the `trusted-keys()` parameter, the `trusted-dn()` parameter is checked. If the DN of the peer is not listed in the `trusted-dn()` parameter, the authentication of the peer fails and the connection is closed.

{{% /alert %}}

