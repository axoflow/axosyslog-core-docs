---
title: "Discord destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `discord()` destination of {{% param "product.abbrev" %}} can directly post log messages to web services using the HTTP protocol. The `discord()` destination has the following options.


## avatar-url()

|          |     |
| -------- | --- |
| Type:    | URL |
| Default: | N/A |

*Description:* A hyperlink for icon of the author to be displayed in Discord. For details, see the `avatar_url` option in the [Discord documentation](https://discord.com/developers/intro).



{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

For details on how this option influences HTTP batch mode, see [http: Posting messages over HTTP without Java]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}})



{{% include-headless "chunk/option-destination-batch-lines.md" %}}

For details on how this option influences HTTP batch mode, see [http: Posting messages over HTTP without Java]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}})



{{% include-headless "chunk/option-d-b-t-http-spl-sent-pub.md" %}}

For details on how this option influences HTTP batch mode, see [http: Posting messages over HTTP without Java]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}})



{{% include-headless "chunk/option-destination-tls-ca-dir.md" %}}

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-http-ca-dir-only.md" %}}



{{% include-headless "chunk/option-destination-tls-cert-file.md" %}}

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-http.md" %}}



{{% include-headless "chunk/option-destination-tls-cipher-suite.md" %}}

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-http.md" %}}


{{< include-headless "chunk/option-destination-diskbuffer.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}


{{% include-headless "chunk/option-destination-tls-key-file.md" %}}

The `http()` destination supports only unencrypted key files (that is, the private key cannot be password-protected).

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-http.md" %}}



## max-msg-length()

|          |        |
| -------- | ------ |
| Type:    | Number |
| Default: | 2000   |

*Description:* Removes every character above the set limit. For details, see the content option in the [Discord documentation](https://discord.com/developers/resources/webhook#webhook-object-jsonform-params).



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

```shell
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

```shell
 http(
    url("http://localhost:8080")
    response-action(418 => drop, 404 => retry)
);
```



{{% include-headless "chunk/option-destination-retries.md" %}}

To handle HTTP error responses, if the HTTP server returns 5xx codes, {{% param "product.abbrev" %}} will attempt to resend messages until the number of attempts reaches `retries`. If the HTTP server returns 4xx codes, {{% param "product.abbrev" %}} will drop the messages.



{{% include-headless "chunk/option-destination-template.md" %}}

{{% alert title="Warning" color="warning" %}}

Hazard of data loss! Make sure to include a fallback value, as if the template gets resolved to an empty string, Discord rejects the message.

{{% /alert %}}



## throttle()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 5      |

{{% include-headless "chunk/option-throttle-description.md" %}}

For more information, see [Discord: Rate Limits](https://discord.com/developers/topics/rate-limits#global-rate-limit).


{{% include-headless "chunk/option-destination-http-timeout.md" %}}


## tts()

|          |              |
| -------- | ------------ |
| Type:    | `true | false` |
| Default: | false        |

*Description:* Enables TTS (Text-To-Speech) mode. For more information, see the tts option in the [Discord documentation](https://discord.com/developers/%5Dresources/webhook#webhook-object-jsonform-params).



## url()

|          |     |
| -------- | --- |
| Type:    | URL |
| Default: | N/A |

*Description:* The webhook URL of the Discord server/channel. For more information, see [Discord: Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).


{{% include-headless "chunk/option-destination-http-user-agent.md" %}}


## username()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* Overrides the default username of the webhook. For details, see the username option in the [Discord documentation](https://discord.com/developers/%5Dresources/webhook#webhook-object-jsonform-params).


{{% include-headless "chunk/option-destination-http-use-system-cert-store.md" %}}

{{< include-headless "chunk/option-destination-http-workers.md" >}}
