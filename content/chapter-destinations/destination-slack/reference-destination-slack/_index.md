---
title: "Slack destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `slack` destination of {{% param "product.abbrev" %}} can directly post log messages and notifications to Slack channels. The `slack` destination has the following options.


## author-name()

|          |                                                                       |
| -------- | --------------------------------------------------------------------- |
| Type:    | string or template                                                    |
| Default: | 'host: ${HOST} | program: ${PROGRAM}(${PID}) | severity: ${PRIORITY}' |

*Description:* The sender of the message as displayed in Slack. For details, see the [author_name option in the Slack documentation](https://api.slack.com/message-attachments).



## author-link()

|          |               |
| -------- | ------------- |
| Type:    | string or URL |
| Default: | None          |

*Description:* A hyperlink for the sender of the message as displayed in Slack. For details, see the [author_link option in the Slack documentation](https://api.slack.com/message-attachments).



## author-icon()

|          |      |
| -------- | ---- |
| Type:    | URL  |
| Default: | None |

*Description:* A hyperlink for icon of the author to be displayed in Slack. For details, see the [author_icon option in the Slack documentation](https://api.slack.com/message-attachments).



{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

For details on how this option influences batch mode, see [http: Posting messages over HTTP without Java]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}})



{{% include-headless "chunk/option-destination-batch-lines.md" %}}

For details on how this option influences batch mode, see [http: Posting messages over HTTP without Java]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}})



{{% include-headless "chunk/option-destination-batch-timeout.md" %}}

For details on how this option influences batch mode, see [http: Posting messages over HTTP without Java]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}})



{{% include-headless "chunk/option-destination-tls-ca-dir.md" %}}

{{% include-headless "chunk/topic-tls-block-http.md" %}}



## ca-file() {#https-options-ca-file}

|                  |          |
| ---------------- | -------- |
| Accepted values: | Filename |
| Default:         | none     |

*Description:* Name of a file that contains an X.509 CA certificate (or a certificate chain) in PEM format. The {{% param "product.abbrev" %}} application uses this certificate to validate the certificate of the HTTPS server. If the file contains a certificate chain, the file must begin with the certificate of the host, followed by the CA certificate that signed the certificate of the host, and any other signing CAs in order.

{{% include-headless "chunk/topic-tls-block-http.md" %}}



{{% include-headless "chunk/option-destination-tls-cipher-suite.md" %}}

{{% include-headless "chunk/topic-tls-block-http.md" %}}

{{% include-headless "chunk/example-tls-block-http.md" %}}



## colors()

|          |                                                                           |
| -------- | ------------------------------------------------------------------------- |
| Type:    | list of colors in hexadecimal format                                      |
| Default: | '#512E5F,#B03A2E,#E74C3C,#F39C12,#F8C471,#7DCEA0,#5DADE2,#85929E' |

*Description:* The colors to be assigned to the messages of different importance levels.



## color-chooser()

|          |                     |
| -------- | ------------------- |
| Type:    | integer or template |
| Default: | '${LEVEL_NUM}'     |

*Description:* An integer that assigns a color to the message from the list of colors set in the `colors()` option.


{{< include-headless "chunk/option-destination-diskbuffer.md" >}}


## fallback()

|          |                                                                                |
| -------- | ------------------------------------------------------------------------------ |
| Type:    | string or template                                                             |
| Default: | '${MSG} - host: ${HOST} | program: ${PROGRAM}(${PID}) | severity: ${PRIORITY}' |

*Description:* The plain-text summary of the Slack attachment. For details, see the [fallback option in the Slack documentation](https://api.slack.com/message-attachments).



## footer()

|          |                    |
| -------- | ------------------ |
| Type:    | URL                |
| Default: | string or template |

*Description:* The footer of the message. For details, see the [footer option in the Slack documentation](https://api.slack.com/message-attachments).



## footer-icon()

|          |      |
| -------- | ---- |
| Type:    | URL  |
| Default: | None |

*Description:* A hyperlink for an image. For details, see the [footer_icon option in the Slack documentation](https://api.slack.com/message-attachments).


{{< include-headless "chunk/option-destination-hook.md" >}}


## hook-url()

|          |      |
| -------- | ---- |
| Type:    | URL  |
| Default: | None |

*Description:* The Webhook URL for the Incoming Webhook of your Slack app. This URL must also include the authentication token that {{% param "product.abbrev" %}} uses to authenticate to Slack. For example: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`

For details, see the [Slack documentation about Incoming Webhooks](https://api.slack.com/incoming-webhooks).



## image-url()

|          |      |
| -------- | ---- |
| Type:    | URL  |
| Default: | None |

*Description:* A hyperlink for an image. For details, see the [image_url option in the Slack documentation](https://api.slack.com/message-attachments).


{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{% include-headless "chunk/option-persist-name.md" %}}


## pretext()

|          |                    |
| -------- | ------------------ |
| Type:    | string or template |
| Default: | None               |

*Description:* The text that appears above the attachment block. For details, see the [pretext option in the Slack documentation](https://api.slack.com/message-attachments).



{{% include-headless "chunk/option-destination-retries.md" %}}

To handle HTTP error responses, if the HTTP server returns 5xx codes, {{% param "product.abbrev" %}} will attempt to resend messages until the number of attempts reaches `retries`. If the HTTP server returns 4xx codes, {{% param "product.abbrev" %}} will drop the messages.



## ssl-version() {#https-options-ssl-version}

|          |                                |
| -------- | ------------------------------ |
| Type:    | string                         |
| Default: | None, uses the libcurl default |

*Description:* Specifies the permitted SSL/TLS version. Possible values: `sslv2`, `sslv3`, `tlsv1`, `tlsv1_0`, `tlsv1_1`, `tlsv1_2`, `tlsv1_3`.

{{% include-headless "chunk/topic-tls-block-http.md" %}}


{{% include-headless "chunk/option-destination-template.md" %}}


{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-description-destination-slack-throttle.md" %}}



## thumb-url()

|          |      |
| -------- | ---- |
| Type:    | URL  |
| Default: | None |

*Description:* A hyperlink for a thumbnail image. For details, see the [thumb_url option in the Slack documentation](https://api.slack.com/message-attachments).


{{% include-headless "chunk/option-destination-http-timeout.md" %}}


## title()

|          |                    |
| -------- | ------------------ |
| Type:    | string or template |
| Default: | None               |

*Description:* The message title in Slack. For details, see the [title option in the Slack documentation](https://api.slack.com/message-attachments).



## title-link()

|          |      |
| -------- | ---- |
| Type:    | URL  |
| Default: | None |

*Description:* A hyperlink for the message title in Slack. For details, see the [title_link option in the Slack documentation](https://api.slack.com/message-attachments).


{{% include-headless "chunk/option-destination-http-user-agent.md" %}}

{{% include-headless "chunk/option-destination-http-use-system-cert-store.md" %}}

{{< include-headless "chunk/option-destination-http-workers.md" >}}
