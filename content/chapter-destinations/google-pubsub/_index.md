---
title: Google Pub/Sub HTTP REST API
linktitle: "google-pubsub: Google Pub/Sub HTTP"
weight:  1250
driver: "google-pubsub()"
short_description: "Send messages to Google Pub/Sub via HTTP"
dest_type: http
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.5.0, {{% param "product_name" %}} can send data to [Google Cloud Pub/Sub](https://cloud.google.com/pubsub?hl=en) using its [HTTP REST API](https://cloud.google.com/pubsub/docs/reference/rest).

## Prerequisites

{{< include-headless "chunk/google-pubsub-prerequisites.md" >}}

## Configuration

To configure {{% param "product_name" %}}, you'll need the name of the project and the topic where you want to send your data.

Minimal configuration:

```sh
@include "scl.conf"
# ...

destination d_pubsub {
  google-pubsub(
    project("syslog-ng-project")
    topic("syslog-ng-topic")
    auth(
      service-account(
        key("/path/to/service-account-key.json")
      )
    )
  );
};
```

This driver is actually a reusable configuration snippet configured to send log messages using the `http()` driver using a template. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/master/scl/google/google-pubsub.conf).

## Options

The following options are specific to the `google-pubsub()` destination. But since this destination is based on the `http()` destination, you can use the [options of the `http()` destination]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}) as well if needed.

> Note: The `google-pubsub()` destination automatically configures some of these `http()` destination options as required by the Google Pub/Sub API. The following sections list these options with the defaults that the `google-pubsub()` destination sets. You can override any of them.

## attributes()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"--scope rfc5424,all-nv-pairs --exclude MESSAGE"` |

*Description:* A JSON object representing key-value pairs for the Pub/Sub Event, formatted as [{{% param "product_name" %}} value-pairs]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md" >}}). By default, the `google-pubsub()` destination sends the RFC5424 fields as attributes. If you want to send different fields, override the default template. By default, the message part is sent in the `data()` option.

## auth()

Options for cloud-related authentication. Currently only the [GCP Service Account authentication](https://cloud.google.com/iam/docs/service-account-overview) is supported.

Specify the JSON file storing the key to the service account like this:

```sh
auth(
    service-account(
      key("/path/to/service-account-key.json")
    )
  )
```

{{< include-headless "chunk/option-gcp-cloud-auth.md" >}}

## data()

|          |                            |
| -------- | -------------------------- |
| Type:    | string/template |
| Default: | `"${MESSAGE}"` |

*Description:* The template to use as the data part of the Google Pub/Sub message.

## project()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* The ID of the Google Cloud project where {{% param "product_name" %}} sends the data. The Pub/Sub API must be enabled for the project.

## topic()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* The name of the Google Pub/Sub topic where {{% param "product_name" %}} sends the data.

## service-endpoint() {#service_endpoint}

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `https://pubsub.googleapis.com` |

{{< include-headless "chunk/google-pubsub-service-endpoint-description.md" >}}

## batch-bytes()

|          |                            |
| -------- | -------------------------- |
| Type:    | number |
| Default: | `10MB` |

*Description:* For details, see [`batch-bytes()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-batch-bytes) of the `http()` destination. The `google-pubsub()` destination changes the default value of the underlying `http()` destination from none to `10MB`.

## batch-lines()

|          |                            |
| -------- | -------------------------- |
| Type:    | number |
| Default: | `1000` |

*Description:* For details, see [`batch-lines()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#batch-lines) of the `http()` destination. The `google-pubsub()` destination changes the default value of the underlying `http()` destination from `1` to `1000`.

## batch-timeout()

|          |                            |
| -------- | -------------------------- |
| Type:    | time in milliseconds |
| Default: | `0` |

*Description:* For details, see [`batch-timeout()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#batch-timeout) of the `http()` destination. The `google-pubsub()` destination changes the default value of the underlying `http()` destination from `-1` (disabled) to `0`.

## body-prefix()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `{"messages":[` |

*Description:* For details, see [`body-prefix()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-body-prefix) of the `http()` destination. The `google-pubsub()` destination sets it to `{"messages":[` to send the batch in the message format that the Pub/Sub API expects, while the underlying `http()` destination leaves it empty.

## body-suffix()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `]}` |

*Description:* For details, see [`body-suffix()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-body-suffix) of the `http()` destination. The `google-pubsub()` destination sets it to `]}` to close the message format that the Pub/Sub API expects, while the underlying `http()` destination leaves it empty.

## delimiter()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `,` |

*Description:* For details, see [`delimiter()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-delimiter) of the `http()` destination. The `google-pubsub()` destination changes the default value of the underlying `http()` destination from a newline character to a comma, so that the messages of a batch form a valid JSON array.

## headers()

|          |                            |
| -------- | -------------------------- |
| Type:    | string list |
| Default: | `Content-Type: application/json` |

*Description:* For details, see [`headers()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#headers) of the `http()` destination. The `google-pubsub()` destination sets the `Content-Type: application/json` header as required by the Pub/Sub API, while the underlying `http()` destination sends no extra headers by default.

## timeout()

|          |                            |
| -------- | -------------------------- |
| Type:    | time in seconds |
| Default: | `10` |

*Description:* For details, see [`timeout()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#http-options-timeout) of the `http()` destination. The `google-pubsub()` destination changes the default value of the underlying `http()` destination from `0` (no timeout) to `10`.

## use-system-cert-store()

|          |                            |
| -------- | -------------------------- |
| Type:    | `yes` or `no` |
| Default: | `yes` |

*Description:* For details, see [`use-system-cert-store()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#use-system-cert-store) of the `http()` destination. The `google-pubsub()` destination changes the default value of the underlying `http()` destination from `no` to `yes`.

## workers()

|          |                            |
| -------- | -------------------------- |
| Type:    | number |
| Default: | `8` |

*Description:* For details, see [`workers()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#workers) of the `http()` destination. The `google-pubsub()` destination changes the default value of the underlying `http()` destination from `1` to `8`.
