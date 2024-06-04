---
title: Send data to Google Pub/Sub
linktitle: "google-pubsub: Send messages to Google Pub/Sub"
weight:  1250
driver: "google-pubsub()"
short_description: "Send messages to Google Pub/Sub"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.5.0, {{% param "product_name" %}} can send data to [Google Cloud Pub/Sub](https://cloud.google.com/pubsub?hl=en) using its [HTTP REST API](https://cloud.google.com/pubsub/docs/reference/rest).

## Prerequisites

- A [Google Pub/Sub subscription](https://cloud.google.com/pubsub?hl=en).
- An [IAM service account](https://cloud.google.com/iam/docs/service-account-overview) that {{% param "product_name" %}} uses for authentication.
- A Google Cloud project that has the Pub/Sub API enabled.

For details, see the [Google Pub/Sub tutorial](https://cloud.google.com/pubsub/docs/building-pubsub-messaging-system#before_you_begin).

<!-- FIXME Do we need more details about how to set up the Google side? -->

To configure {{% param "product_name" %}}, you'll need the name of the project and the topic where you want to send your data.

Minimal configuration:

```sh
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

> Note: The `google-pubsub()` destination automatically configures some of these `http()` destination options as required by the Google Pub/Sub API.

<!-- FIXME xinclude the http options instead of just linking them
  service_endpoint("https://pubsub.googleapis.com")

  batch_lines(1000)
  batch_bytes(10MB)
  batch_timeout(5000)
  workers(8)
  timeout(10)
  use_system_cert_store(yes)
   -->

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

### service-account()

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

*Description:* The ID of the Google Cloud project where {{% param "product_name" %}} sends the data. The  Pub/Sub API must be enabled for the project.

## topic()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* The name of the Google Pub/Sub topic where {{% param "product_name" %}} sends the data.

