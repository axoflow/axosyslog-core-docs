---
title: "opensearch() destination options"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `opensearch` destination of {{% param "product.abbrev" %}} can directly post log messages to an OpenSearch deployment using the OpenSearch Bulk API over the HTTP and Secure HTTP (HTTPS) protocols. The `opensearch` destination has the following options. The required options are: `index()` and `url()`.

This destination is available in {{% param "product.abbrev" %}} version 4.4 and later.

{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

For details on how this option influences batch mode, see {{% xref "/chapter-destinations/destination-opensearch/batch-mode/_index.md" %}}.

## batch-lines()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 25     |

{{% include-headless "chunk/option-description-destination-batch-lines.md" %}}

For details on how this option influences batch mode, see {{% xref "/chapter-destinations/destination-opensearch/batch-mode/_index.md" %}}.

{{% include-headless "chunk/option-destination-batch-timeout.md" %}}

For details on how this option influences batch mode, see {{% xref "/chapter-destinations/destination-opensearch/batch-mode/_index.md" %}}.

{{% include-headless "chunk/option-destination-tls-ca-dir.md" %}}

{{% include-headless "chunk/topic-tls-block-http.md" %}}

### Declaration:

```shell
   destination d_opensearch {
        opensearch(
            url("http://your-server:9200/_bulk")
            index("example-index")
            tls(
                ca-dir("dir")
                cert-file("cert")
                cipher-suite("cipher")
                key-file("key")
                peer-verify(yes|no)
                ssl-version(<the permitted SSL/TLS version>)
            )
        );
    };
```

## ca-file() {#opensearch-options-ca-file}

|                  |          |
| ---------------- | -------- |
| Accepted values: | Filename |
| Default:         | none     |

*Description:* Name of a file that contains an X.509 CA certificate (or a certificate chain) in PEM format. The {{% param "product.abbrev" %}} application uses this certificate to validate the certificate of the HTTPS server. If the file contains a certificate chain, the file must begin with the certificate of the host, followed by the CA certificate that signed the certificate of the host, and any other signing CAs in order.

{{% include-headless "chunk/topic-tls-block-http.md" %}}

### Declaration:

```shell
   destination d_opensearch {
        opensearch(
            url("http://your-server:9200/_bulk")
            index("example-index")
            tls(
                ca-file("ca")
                cert-file("cert")
                cipher-suite("cipher")
                key-file("key")
                peer-verify(yes|no)
                ssl-version(<the permitted SSL/TLS version>)
            )
        );
    };
```

{{% include-headless "chunk/option-destination-tls-cert-file.md" %}}

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-opensearch.md" %}}

{{% include-headless "chunk/option-destination-tls-cipher-suite.md" %}}

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-opensearch.md" %}}

## custom-id() {#opensearch-options-custom-id}

|                  |              |
| ---------------- | ------------ |
| Accepted values: | string       |
| Default:         | empty string |

*Description:* Sets the specified value as the ID of the OpenSearch index (`_id`).

## delimiter() {#opensearch-options-delimiter}

|                  |                   |
| ---------------- | ----------------- |
| Accepted values: | string            |
| Default:         | newline character |

*Description:* By default, {{% param "product.abbrev" %}} separates the log messages of the batch with a newline character. You can specify a different delimiter by using the `delimiter()` option.

For details on how this option influences batch mode, see {{% xref "/chapter-destinations/destination-opensearch/batch-mode/_index.md" %}}.

{{< include-headless "chunk/option-destination-diskbuffer.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}

## index()

|                  |                    |
| ---------------- | ------------------ |
| Accepted values: | string or template |
| Default:         | None               |

*Description:* The name of the OpenSearch index where OpenSearch will store the messages received from {{% param "product.abbrev" %}}. This option is mandatory for this destination.

You can use macros and template functions, but you must ensure that the resolved template contains only characters that OpenSearch permits in the name of the index. The {{% param "product.abbrev" %}} application does not validate the name of the index. For details on the characters permitted in the name of OpenSearch indices, see the documentation of OpenSearch.


{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}


{{% include-headless "chunk/option-destination-tls-key-file.md" %}}

This destination supports only unencrypted key files (that is, the private key cannot be password-protected).

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-opensearch.md" %}}



## password()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* The password that {{% param "product.abbrev" %}} uses to authenticate on the server where it sends the messages.

{{< include-headless "chunk/option-peer-verify-simple.md" >}}

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-opensearch.md" %}}

{{% include-headless "chunk/option-persist-name.md" %}}


<span id="http-proxy"></span>

{{< include-headless "chunk/option-dest-http-proxy.md" >}}

{{% include-headless "chunk/option-destination-retries.md" %}}

To handle HTTP error responses, if the HTTP server returns 5xx codes, {{% param "product.abbrev" %}} will attempt to resend messages until the number of attempts reaches `retries`. If the HTTP server returns 4xx codes, {{% param "product.abbrev" %}} will drop the messages.

## ssl-version() {#opensearch-options-ssl-version}

|          |                                |
| -------- | ------------------------------ |
| Type:    | string                         |
| Default: | None, uses the libcurl default |

*Description:* Specifies the permitted SSL/TLS version. Possible values: `sslv2`, `sslv3`, `tlsv1`, `tlsv1_0`, `tlsv1_1`, `tlsv1_2`, `tlsv1_3`.

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-opensearch.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

## timeout() {#opensearch-options-timeout}

|          |                    |
| -------- | ------------------ |
| Type:    | number [seconds] |
| Default: | 10                 |

*Description:* The value (in seconds) to wait for an operation to complete, and attempt to reconnect the server if exceeded.

## url()

|          |                                                        |
| -------- | ------------------------------------------------------ |
| Type:    | URL or list of URLs, for example, url("site1" "site2") |
| Default: | N/A                                                    |

*Description:* Specifies the hostname or IP address and optionally the port number of the OpenSearch indexer. Use a colon (`:`) after the address to specify the port number of the server. For example: `http://your-opensearch-indexer.server:8088/_bulk`

This option is mandatory for this destination.

Make sure that the URL ends with `_bulk`, this is the OpenSearch API endpoint that properly parses the messages sent by {{% param "product.abbrev" %}}.

In case the server on the specified URL returns a redirect request, {{% param "product.abbrev" %}} automatically follows maximum 3 redirects. Only HTTP and HTTPS based redirections are supported.

{{< include-headless "chunk/destination-load-balancing-url.md" >}}

## user()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* The username that {{% param "product.abbrev" %}} uses to authenticate on the server where it sends the messages.

{{% include-headless "chunk/option-destination-http-use-system-cert-store.md" %}}

## workers()

|          |         |
| -------- | ------- |
| Type:    | integer |
| Default: | 4       |

{{< include-headless "chunk/option-destination-description-workers.md" >}}

{{% include-headless "chunk/http-load-balance-workers.md" %}}
