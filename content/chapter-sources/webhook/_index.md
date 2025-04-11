---
title: Webhook
linktitle: "webhook() source"
weight: 6000
driver: "webhook(), webhook-json()"
short_description: "Receive logs via a HTTP webhook"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.8.0, {{% param "product_name" %}} can collect logs via a webhook using the `webhook()` and `webhook-json()` sources. The `webhook-json()` source automatically parses the payload using the [`json-parser()`]({{< relref "/chapter-parsers/json-parser/_index.md" >}}).

Example minimal config:

```shell
source s_webhook {
webhook-json(
    port(8181)
    paths(["/events","/events/(?P<HOST>.*)"])
    );
};
```

To test the source, you can use `curl` for example, on the host where {{< product >}} is running:

```shell
curl -X POST --data "{'MESSAGE':'message-value'}" http://127.0.0.1:8181/events
```

This driver is actually a reusable configuration snippet based on a [custom Python source]({{< relref "/chapter-sources/python-source/_index.md" >}}). For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/main/modules/python-modules/syslogng/modules/webhook/scl/webhook.conf).

## HTTPS webhook

To receive data using HTTPS, configure a certificate and a private key for the webhook using the `tls_cert_file` and `tls_key_file` options.

To verify the certificate of the clients sending data to the webhook, set `tls_peer_verify(yes)`, and use the following options:

- `tls_use_system_cert_store(no)`, or
- `tls_ca_file("")`, or
- `tls_ca_dir("")`

## Options

## auth_token()

<!-- FIXME -->

## include_request_headers()

|          |         |
| -------- | ------- |
| Type:    | `yes` or `no` |
| Default: |   `no`   |

Available in version 4.11 and later.

*Description:* If enabled, the HTTP request headers from the webhook will available for processing. For example, when using the `webhook-json()` source, the headers will added as a JSON object to the `${&lt;prefix>.headers}` field.

## paths()

|          |         |
| -------- | ------- |
| Type:    | JSON list |
| Default: |      |

*Description:* Sets the endpoints where the webhook will receive data. You can use static paths, or regular expressions. In regular expressions you can use named capture groups to automatically set macro values.

For example, the `/events/(?P<HOST>.*)` path sets the hostname for the data received in the request based on the second part of the URL: a request to the `/events/my-example-host` URL sets the host field of that message to `my-example-host`.

You can set multiple endpoints, for example, `paths(["/events","/events/(?P<HOST>.*)"])`

## port()

|          |         |
| -------- | ------- |
| Type:    | integer |
| Default: |      |

The port number where the webhook is listening on, for example, `8080`

## prefix()

|           |           |
| --------- | --------- |
| Type: | string  |
| Default:  |  |

*Description:* Insert a prefix before the name part of the parsed name-value pairs to help further processing when using the `webhook-json()` source. For example, to insert the `webhook.` prefix, use the `prefix(webhook.)` option.

{{< include-headless "chunk/p-parser-prefix.md" >}}

## proxy_header()

Available in version 4.11 and later.

<!-- FIXME -->

## tls_ca_dir()

|                  |                |
| ---------------- | -------------- |
| Accepted values: | Directory name |
| Default:         | none           |

*Description:* The name of a directory that contains a set of trusted CA certificates in PEM format. The CA certificate files have to be named after the 32-bit hash of the subject's name. This naming can be created using the c_rehash utility in openssl. For an example, see {{% xref "/chapter-encrypted-transport-tls/tls-serverauth/procedure-configuring-tls-client/_index.md" %}}. The {{% param "product.abbrev" %}} application uses the CA certificates in this directory to validate the certificate of the peer.

This option can be used together with the optional `tls_ca_file()` option.

## tls_ca_file()

|                  |           |
| ---------------- | --------- |
| Accepted values: | File name |
| Default:         | empty     |

*Description:* Optional. The name of a file that contains a set of trusted CA certificates in PEM format. The {{% param "product.abbrev" %}} application uses the CA certificates in this file to validate the certificate of the peer.

Example format in configuration:

```shell
tls_ca_file("/etc/pki/tls/certs/ca-bundle.crt")
```

## tls_cert_file()

|          |          |
| -------- | -------- |
| Type:    | filename |
| Default: |          |

*Description:* For HTTPS endpoints, set the `tls_cert_file` and `tls_key_file` options. Set `tls_cert_file` to the name of a file that contains an X.509 certificate (or a certificate chain) in PEM format, suitable as a TLS certificate, matching the private key set in the `tls_key_file()` option. The {{% param "product.abbrev" %}} application shows this certificate to the clients sending data to the webhook endpoints. If the file contains a certificate chain, the file must begin with the certificate of the host, followed by the CA certificate that signed the certificate of the host, and any other signing CAs in order.

## tls_key_file()

|          |          |
| -------- | -------- |
| Type:    | filename |
| Default: |          |

*Description:* The name of a file that contains an unencrypted private key in PEM format, suitable as a TLS key. If properly configured, the {{% param "product.abbrev" %}} application uses this private key with the matching certificate (set in the `tls_cert_file()` option).

## tls_peer_verify()

|                  |          |
| ---------------- | -------- |
| Accepted values: | `yes` or `no` |
| Default:         | `yes`      |

*Description:* Verification method of the peer. The following table summarizes the possible options and their results depending on the certificate of the peer.

{{< include-headless "chunk/option-tls-peer-verify-yesno.md" >}}

{{< include-headless "chunk/option-destination-tls-peer-verify-notes.md" >}}

## tls_use_system_cert_store()

|          |          |
| -------- | -------- |
| Type:    | `yes` or `no` |
| Default: | `no`       |

*Description:* Use the certificate store of the system for verifying HTTPS certificates. For details, see the [curl documentation](https://curl.se/docs/sslcerts.html).
