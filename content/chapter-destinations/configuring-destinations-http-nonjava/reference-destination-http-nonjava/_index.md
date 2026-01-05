---
title: "HTTP destination options"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `http` destination of {{% param "product.abbrev" %}} can directly post log messages to web services using the HTTP protocol. The `http` destination has the following options.

## accept-encoding()

|          |                    |
| -------- | ------------------ |
| Type:    | `"identity"`, `"gzip"`, `"deflate"`, `"all"` |
| Default: | N/A (disabled) |

*Description:* Use `accept-encoding()` to request the server to compress the HTTP responses. ({{% param "product.abbrev" %}} doesn't currently use them, but they still contribute to network traffic.) To compress the messages sent by {{% param "product.abbrev" %}}, see the [`content-compression()` option](#content-compression).

- If you want to accept multiple compression types, list them separated by commas inside the quotation mark.
- Use `"identity"` for no compression.
- To enable all available compression types (including no compression), use `"all"`.
- By default, {{% param "product.abbrev" %}} doesn't send the `Accept-Encoding:` header, and the received response isn't decompressed.

{{< include-headless "chunk/option-destination-http-compression.md" >}}

## accept-redirects()

|          |                    |
| -------- | ------------------ |
| Type:    | `yes` or `no` |
| Default: |                    |

*Description:* Accept and follow redirect responses.

<!-- FIXME default? -->

## azure-auth-header()

See {{% xref "/chapter-destinations/configuring-destinations-http-nonjava/plugin-azure-auth-header/_index.md" %}}.

{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

For details on how this option influences HTTP batch mode, see [Batch mode and load balancing]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/http-batch-mode/_index.md" >}})


{{% include-headless "chunk/option-destination-threaded-batching.md" %}}

For details on how this option influences HTTP batch mode, see [Batch mode and load balancing]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/http-batch-mode/_index.md" >}})

## body()

|          |                    |
| -------- | ------------------ |
| Type:    | string or template |
| Default: |                    |

*Description:* The body of the HTTP request, for example, `body("${ISODATE} ${MESSAGE}")`. You can use strings, macros, and template functions in the body. If not set, it will contain the message received from the source by default.

## body-prefix() {#https-options-body-prefix}

|                  |        |
| ---------------- | ------ |
| Accepted values: | string or template |
| Default:         | none   |

Available in {{% param "product.abbrev" %}} version 3.18 and later.

*Description:* The string {{% param "product.abbrev" %}} puts at the beginning of the body of the HTTP request, before the log message. Starting with version 4.15, `body-prefix()` can include templates and macros as well. When using a template, note that:

- Literal dollar signs (`$`) used in `body-prefix()` must be escaped like `$$`.
- When using batching with a template, make sure to set the `worker-partition-key()` parameter appropriately to group similar messages together.

For details on how this option influences HTTP batch mode, see [Batch mode and load balancing]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/http-batch-mode/_index.md" >}})

## body-suffix() {#https-options-body-suffix}

|                  |        |
| ---------------- | ------ |
| Accepted values: | string |
| Default:         | none   |

*Description:* The string {{% param "product.abbrev" %}} puts to the end of the body of the HTTP request, after the log message. Available in {{% param "product.abbrev" %}} version 3.18 and later.

For details on how this option influences HTTP batch mode, see [Batch mode and load balancing]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/http-batch-mode/_index.md" >}}).

## cloud-auth()

Authenticate to cloud-based services, for example, Azure and GCP, using service accounts.

### azure()

Azure authentication currently supports authenticating to Azure Monitor, for example:

```shell
cloud-auth(
  azure(
    monitor(
      tenant-id("my-tenant-id")
      app-id("my-app-id")
      app-secret("my-app-secret")
    )
  )
)
```

{{< include-headless "chunk/option-azure-cloud-auth.md" >}}

### gcp()

Authenticate to GCP service accounts. For example:

```shell
cloud-auth(
  gcp(
    user-managed-service-account(
      name("your-user@your-project.iam.gserviceaccount.com")
      metadata-url("your-metadata-server:8080")
    )
  )
)
```

{{< include-headless "chunk/option-gcp-cloud-auth.md" >}}


{{% include-headless "chunk/option-destination-tls-ca-dir.md" %}}

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-http-ca-dir-only.md" %}}


## ca-file() {#https-options-ca-file}

|                  |          |
| ---------------- | -------- |
| Accepted values: | Filename |
| Default:         | none     |

*Description:* Name of a file that contains an X.509 CA certificate (or a certificate chain) in PEM format. The {{% param "product.abbrev" %}} application uses this certificate to validate the certificate of the HTTPS server. If the file contains a certificate chain, the file must begin with the certificate of the host, followed by the CA certificate that signed the certificate of the host, and any other signing CAs in order.

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-http-ca-file-only.md" %}}



{{% include-headless "chunk/option-destination-tls-cert-file.md" %}}

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-http.md" %}}

{{% include-headless "chunk/option-destination-tls-cipher-suite.md" %}}
{{% include-headless "chunk/topic-tls-block-http.md" %}}
{{% include-headless "chunk/example-tls-block-http.md" %}}

## content-compression()

|          |                    |
| -------- | ------------------ |
| Type:    | `"identity"`, `"gzip"`, `"deflate"` |
| Default: | `"identity"` |

*Description:* Use `content-compression()` to compress the messages sent by {{% param "product.abbrev" %}}. Use `"identity"` for no compression. To accept compressed responses from the server, see the [`accept-encoding()` option](#accept-encoding).

{{< include-headless "chunk/option-destination-http-compression.md" >}}

## delimiter() {#https-options-delimiter}

|                  |                   |
| ---------------- | ----------------- |
| Accepted values: | string            |
| Default:         | newline character |

*Description:* By default, {{% param "product.abbrev" %}} separates the log messages of the batch with a newline character. You can specify a different delimiter by using the `delimiter()` option. Available in {{% param "product.abbrev" %}} version 3.18 and later.

For details on how this option influences HTTP batch mode, see [Batch mode and load balancing]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/http-batch-mode/_index.md" >}})

{{< include-headless "chunk/option-destination-diskbuffer.md" >}}

{{% include-headless "chunk/option-destination-flush-lines.md" %}}

{{% include-headless "chunk/option-destination-flush-timeout.md" %}}

{{< include-headless "chunk/option-destination-frac-digits.md" >}}

## headers()

|          |             |
| -------- | ----------- |
| Type:    | string or template list |
| Default: |             |

*Description:* Custom HTTP headers to include in the request, for example, `headers("HEADER1: header1", "HEADER2: header2")`. If not set, only the default headers are included, but no custom headers.

The following headers are included by default:

- X-Syslog-Host: `<host>`
- X-Syslog-Program: `<program>`
- X-Syslog-Facility: `<facility>`
- X-Syslog-Level: `<loglevel/priority>`

Starting with {{< product >}} 4.18, you can use templates in the headers. Note that when using batching in the destination adn templates in `headers()`, the value of the template is calculated from the first message of the batch. Make sure to set the [`worker-partition-key()`](#worker-partition-key) option properly to group similar messages.

If you want to use literal dollar signs (`$`) in `headers()`, escape them like `$$`.

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-destination-tls-key-file.md" %}}

The `http()` destination supports only unencrypted key files (that is, the private key cannot be password-protected).

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-http.md" %}}
<!--  -->

{{% include-headless "chunk/option-destination-local-timezone.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

## method()

|          |            |
| -------- | ---------- |
| Type:    | `POST` or `PUT` |
| Default: | POST       |

*Description:* Specifies the HTTP method to use when sending the message to the server.

{{< include-headless "chunk/option-destination-tls-ocsp-stapling-verify.md" >}}

Example configuration:

```shell
destination {
    http(url("https://example.com") method("POST") tls(peer-verify(yes) ocsp-stapling-verify(yes)));
};
```

{{< include-headless "chunk/option-destination-on-error.md" >}}

## password()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* The password that {{% param "product.abbrev" %}} uses to authenticate on the server where it sends the messages.

{{< include-headless "chunk/option-peer-verify-simple.md" >}}

{{% include-headless "chunk/topic-tls-block-http.md" %}}


{{% include-headless "chunk/option-persist-name.md" %}}

<span id="http-proxy-option"></span>

{{% include-headless "chunk/option-dest-http-proxy.md" %}}

## python-http-header()

See {{% xref "/chapter-destinations/configuring-destinations-http-nonjava/plugin-python-http-header/_index.md" %}}

## response-action()

|          |                 |
| -------- | --------------- |
| Type:    | list            |
| Default: | N/A (see below) |

*Description:* Specifies what {{% param "product.abbrev" %}} does with the log message, based on the response code received from the HTTP server. If the server returns a status code beginning with 2 (for example, 200), {{% param "product.abbrev" %}} assumes the message was successfully sent. Otherwise, the action listed in the following table is applied. For status codes not listed in the following table, if the status code begins with 2 (for example, 299), {{% param "product.abbrev" %}} assumes the message was successfully sent. For other status codes, {{% param "product.abbrev" %}} disconnects. The following actions are possible:

- `disconnect`: Keep trying to resend the message indefinitely.
- `drop`: Drop the message without trying to resend it.
- `retry`: Retry sending the message for a maximum of `retries()` times (3 by default).
- `success`: Assume the message was successfully sent.

| code | explanation                       | action     |
| ---- | --------------------------------- | ---------- |
|  100 | "Continue"                        | disconnect |
|  101 | "Switching Protocols"             | disconnect |
|  102 | "Processing"                      | retry      |
|  103 | "Early Hints"                     | retry      |
|  200 | "OK"                              | success    |
|  201 | "Created"                         | success    |
|  202 | "Accepted"                        | success    |
|  203 | "Non-Authoritative Information"   | success    |
|  204 | "No Content"                      | success    |
|  205 | "Reset Content"                   | success    |
|  206 | "Partial Content"                 | success    |
|  300 | "Multiple Choices"                | disconnect |
|  301 | "Moved Permanently"               | disconnect |
|  302 | "Found"                           | disconnect |
|  303 | "See Other"                       | disconnect |
|  304 | "Not Modified"                    | retry      |
|  307 | "Temporary Redirect"              | disconnect |
|  308 | "Permanent Redirect"              | disconnect |
|  400 | "Bad Request"                     | disconnect |
|  401 | "Unauthorized"                    | disconnect |
|  402 | "Payment Required"                | disconnect |
|  403 | "Forbidden"                       | disconnect |
|  404 | "Not Found"                       | disconnect |
|  405 | "Method Not Allowed"              | disconnect |
|  406 | "Not Acceptable"                  | disconnect |
|  407 | "Proxy Authentication Required"   | disconnect |
|  408 | "Request Timeout"                 | disconnect |
|  409 | "Conflict"                        | disconnect |
|  410 | "Gone"                            | drop       |
|  411 | "Length Required"                 | disconnect |
|  412 | "Precondition Failed"             | disconnect |
|  413 | "Payload Too Large"               | disconnect |
|  414 | "URI Too Long"                    | disconnect |
|  415 | "Unsupported Media Type"          | disconnect |
|  416 | "Range Not Satisfiable"           | drop       |
|  417 | "Expectation Failed"              | disconnect |
|  418 | "I'm a teapot"                    | disconnect |
|  421 | "Misdirected Request"             | disconnect |
|  422 | "Unprocessable Entity"            | drop       |
|  423 | "Locked"                          | disconnect |
|  424 | "Failed Dependency"               | drop       |
|  425 | "Too Early"                       | drop       |
|  426 | "Upgrade Required"                | disconnect |
|  428 | "Precondition Required"           | retry      |
|  429 | "Too Many Requests"               | disconnect |
|  431 | "Request Header Fields Too Large" | disconnect |
|  451 | "Unavailable For Legal Reasons"   | drop       |
|  500 | "Internal Server Error"           | disconnect |
|  501 | "Not Implemented"                 | disconnect |
|  502 | "Bad Gateway"                     | disconnect |
|  503 | "Service Unavailable"             | disconnect |
|  504 | "Gateway Timeout"                 | retry      |
|  505 | "HTTP Version Not Supported"      | disconnect |
|  506 | "Variant Also Negotiates"         | disconnect |
|  507 | "Insufficient Storage"            | disconnect |
|  508 | "Loop Detected"                   | drop       |
|  510 | "Not Extended"                    | disconnect |
|  511 | "Network Authentication Required" | disconnect |

To customize the action to take for a particular response code, use the arrow operator in the following format: `response-action(<response-code> => <action>`. To customize multiple response code-action pairs, separate them with a comma, for example:

```shell
http(
    url("http://localhost:8080")
    response-action(418 => drop, 404 => retry)
);
```

{{% include-headless "chunk/option-destination-retries.md" %}}

To handle HTTP error responses, if the HTTP server returns 5xx codes, {{% param "product.abbrev" %}} will attempt to resend messages until the number of attempts reaches `retries`. If the HTTP server returns 4xx codes, {{% param "product.abbrev" %}} will drop the messages.

{{% include-headless "chunk/option-destination-send-timezone.md" %}}

## ssl-version() {#https-options-ssl-version}

|          |                                |
| -------- | ------------------------------ |
| Type:    | string                         |
| Default: | None, uses the libcurl default |

*Description:* Specifies the permitted SSL/TLS version. Possible values: `sslv2`, `sslv3`, `tlsv1`, `tlsv1_0`, `tlsv1_1`, `tlsv1_2`, `tlsv1_3`.

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-http.md" %}}


{{% include-headless "chunk/option-destination-template.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

{{% include-headless "chunk/option-destination-http-timeout.md" %}}

{{% include-headless "chunk/option-destination-timezone.md" %}}

## url()

|          |                     |
| -------- | ------------------- |
| Type:    | URL or list of URLs |
| Default: | http://localhost/   |

*Description:* Specifies the hostname or IP address and optionally the port number of the web service that can receive log data via HTTP. Use a colon (`:`) after the address to specify the port number of the server. For example: `http://127.0.0.1:8000`

In case the server on the specified URL returns a redirect request, {{% param "product.abbrev" %}} automatically follows maximum 3 redirects. Only HTTP and HTTPS based redirections are supported.

### Load balancing

{{< include-headless "chunk/destination-load-balancing-url.md" >}}

### Templates in the url()

{{< include-headless "chunk/option-destination-http-url-templating.md" >}}

{{% include-headless "chunk/option-destination-http-user-agent.md" %}}

## user()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* The username that {{% param "product.abbrev" %}} uses to authenticate on the server where it sends the messages.

{{% include-headless "chunk/option-destination-http-use-system-cert-store.md" %}}

{{< include-headless "chunk/option-destination-worker-partition-autoscaling.md" >}}

{{< include-headless "chunk/option-destination-worker-partition-buckets.md" >}}

<a id="worker-partition-key"></a>
{{< include-headless "chunk/option-destination-http-worker-partition-key.md" >}}

{{< include-headless "chunk/option-destination-threaded-workers.md" >}}

{{% include-headless "chunk/http-load-balance-workers.md" %}}
