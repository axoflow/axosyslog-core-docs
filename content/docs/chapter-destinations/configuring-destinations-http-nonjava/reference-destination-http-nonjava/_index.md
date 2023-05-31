---
title: "HTTP destination options"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `http` destination of {{% param "product.abbrev" %}} can directly post log messages to web services using the HTTP protocol. The `http` destination has the following options.


{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

For details on how this option influences HTTP batch mode, see [http: Posting messages over HTTP without Java]({{< relref "/docs/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}})



{{% include-headless "chunk/option-destination-batch-lines.md" %}}

For details on how this option influences HTTP batch mode, see [http: Posting messages over HTTP without Java]({{< relref "/docs/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}})



{{% include-headless "chunk/option-d-b-t-http-spl-sent-pub.md" %}}

For details on how this option influences HTTP batch mode, see [http: Posting messages over HTTP without Java]({{< relref "/docs/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}})



## body()

|          |                    |
| -------- | ------------------ |
| Type:    | string or template |
| Default: |                    |

*Description:* The body of the HTTP request, for example, `body("${ISODATE} ${MESSAGE}")`. You can use strings, macros, and template functions in the body. If not set, it will contain the message received from the source by default.



## body-prefix() {#https-options-body-prefix}

|                  |        |
| ---------------- | ------ |
| Accepted values: | string |
| Default:         | none   |

*Description:* The string {{% param "product.abbrev" %}} puts at the beginning of the body of the HTTP request, before the log message. Available in {{% param "product.abbrev" %}} version 3.18 and later.

For details on how this option influences HTTP batch mode, see [http: Posting messages over HTTP without Java]({{< relref "/docs/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}})



## body-suffix() {#https-options-body-suffix}

|                  |        |
| ---------------- | ------ |
| Accepted values: | string |
| Default:         | none   |

*Description:* The string {{% param "product.abbrev" %}} puts to the end of the body of the HTTP request, after the log message. Available in {{% param "product.abbrev" %}} version 3.18 and later.

For details on how this option influences HTTP batch mode, see [http: Posting messages over HTTP without Java]({{< relref "/docs/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}})



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



## delimiter() {#https-options-delimiter}

|                  |                   |
| ---------------- | ----------------- |
| Accepted values: | string            |
| Default:         | newline character |

*Description:* By default, {{% param "product.abbrev" %}} separates the log messages of the batch with a newline character. You can specify a different delimiter by using the `delimiter()` option. Available in {{% param "product.abbrev" %}} version 3.18 and later.

For details on how this option influences HTTP batch mode, see [http: Posting messages over HTTP without Java]({{< relref "/docs/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}})


{{< include-headless "chunk/option-destination-diskbuffer.md" >}}


## headers()

|          |             |
| -------- | ----------- |
| Type:    | string list |
| Default: |             |

*Description:* Custom HTTP headers to include in the request, for example, `headers("HEADER1: header1", "HEADER2: header2")`. If not set, only the default headers are included, but no custom headers.

The following headers are included by default:

  - X-Syslog-Host: \<host\>

  - X-Syslog-Program: \<program\>

  - X-Syslog-Facility: \<facility\>

  - X-Syslog-Level: \<loglevel/priority\>


{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}


{{% include-headless "chunk/option-destination-tls-key-file.md" %}}

The `http()` destination supports only unencrypted key files (that is, the private key cannot be password-protected).

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-http.md" %}}



## method()

|          |            |
| -------- | ---------- |
| Type:    | POST | PUT |
| Default: | POST       |

*Description:* Specifies the HTTP method to use when sending the message to the server.



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

```c
   |------+-----------------------------------+------------|
    | code | explanation                       | action     |
    |------+-----------------------------------+------------|
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
    |------+-----------------------------------+------------|
```

To customize the action to take for a particular response code, use the following format: `response-action(<response-code> => <action>`. To customize multiple response code-action pairs, separate them with a comma, for example:

```c
 http(
    url("http://localhost:8080")
    response-action(418 => drop, 404 => retry)
);
```



{{% include-headless "chunk/option-destination-retries.md" %}}

To handle HTTP error responses, if the HTTP server returns 5xx codes, {{% param "product.abbrev" %}} will attempt to resend messages until the number of attempts reaches `retries`. If the HTTP server returns 4xx codes, {{% param "product.abbrev" %}} will drop the messages.



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


## url()

|          |                     |
| -------- | ------------------- |
| Type:    | URL or list of URLs |
| Default: | http://localhost/   |

*Description:* Specifies the hostname or IP address and optionally the port number of the web service that can receive log data via HTTP. Use a colon (`:`) after the address to specify the port number of the server. For example: `http://127.0.0.1:8000`

In case the server on the specified URL returns a redirect request, {{% param "product.abbrev" %}} automatically follows maximum 3 redirects. Only HTTP and HTTPS based redirections are supported.

{{< include-headless "chunk/destination-load-balancing-url.md" >}}


{{% include-headless "chunk/option-destination-http-user-agent.md" %}}


## user()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* The username that {{% param "product.abbrev" %}} uses to authenticate on the server where it sends the messages.


{{% include-headless "chunk/option-destination-http-use-system-cert-store.md" %}}

{{< include-headless "chunk/option-destination-http-workers.md" >}}
