---
title: Google Pub/Sub gRPC
linktitle: "google-pubsub-grpc: Google Pub/Sub gRPC"
weight:  1250
driver: "google-pubsub-grpc()"
short_description: "Send messages to Google Pub/Sub via gRPC"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.10.0, {{% param "product_name" %}} can send data to [Google Cloud Pub/Sub](https://cloud.google.com/pubsub?hl=en) using its [gRPC interface](https://cloud.google.com/pubsub/docs/reference/service_apis_overview).

## Prerequisites

{{< include-headless "chunk/google-pubsub-prerequisites.md" >}}

## Configuration

To configure {{% param "product_name" %}}, you'll need the name of the project and the topic where you want to send your data.

Example configuration:

```sh
destination d_pubsub_grpc {
  google-pubsub-grpc(
    project("my_project")
    topic($topic)
  
    data($MESSAGE)
    attributes(
      timestamp => $S_ISODATE,
      host => $HOST,
    )
  
    workers(4)
    batch-timeout(1000) # ms
    batch-lines(1000)
  );
};
```

You can change the default endpoint using [`service_endpoint()`](#service_endpoint).

## Options

The following options are specific to the `google-pubsub-grpc()` destination.

## attributes()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"--scope rfc5424,all-nv-pairs --exclude MESSAGE"` |

*Description:* A JSON object representing key-value pairs for the Pub/Sub Event, formatted as [{{% param "product_name" %}} value-pairs]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md" >}}). By default, the destination sends the RFC5424 fields as attributes. If you want to send different fields, override the default template. By default, the message part is sent in the [`data()`](#data) option.

If you want to dynamically create the `data()` and `attributes()` part of the message, use the `protovar()` attribute.

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

{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

## batch-lines()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 0      |

{{% include-headless "chunk/option-description-destination-batch-lines.md" %}}

{{% include-headless "chunk/option-destination-batch-timeout.md" %}}

{{< include-headless "chunk/option-grpc-channel-args.md" >}}

{{< include-headless "chunk/option-destination-grpc-compression.md" >}}

## data()

|          |                            |
| -------- | -------------------------- |
| Type:    | string/template |
| Default: | `"${MESSAGE}"` |

*Description:* The template to use as the data part of the Google Pub/Sub message.

{{< include-headless "chunk/option-destination-diskbuffer.md" >}}

{{< include-headless "chunk/option-destination-frac-digits.md" >}}

{{< include-headless "chunk/option-grpc-headers.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{< include-headless "chunk/option-destination-grpc-keep-alive.md" >}}

{{% include-headless "chunk/option-destination-local-timezone.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{< include-headless "chunk/option-destination-on-error.md" >}}

{{% include-headless "chunk/option-persist-name.md" %}}

## project()

|          |                            |
| -------- | -------------------------- |
| Type:    | string/template |
| Default: | - |

*Description:* The ID of the Google Cloud project where {{% param "product_name" %}} sends the data. The Pub/Sub API must be enabled for the project.

## proto-var()

|          |                            |
| -------- | -------------------------- |
| Type:    | template |
| Default: | - |

*Description:* An alternative to using [`attributes()`](#attributes) and [`data()`](#data). The advantage of `protovar()` is that the number of attributes it sends to the destination can vary between the messages, it doesn't have to be constant. That's useful is you're dynamically building your messages using {{% xref "/filterx/_index.md" %}}.

{{< include-headless "chunk/option-destination-grpc-response-action.md" >}}

{{% include-headless "chunk/option-destination-retries.md" %}}

{{% include-headless "chunk/option-destination-send-timezone.md" %}}

## service_endpoint() {#service-endpoint}

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `pubsub.googleapis.com:443` |

{{< include-headless "chunk/google-pubsub-service-endpoint-description.md" >}}

{{% include-headless "chunk/option-destination-template-escape.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

{{% include-headless "chunk/option-destination-timezone.md" %}}

## topic()

|          |                            |
| -------- | -------------------------- |
| Type:    | string/template |
| Default: | - |

*Description:* The name of the Google Pub/Sub topic where {{% param "product_name" %}} sends the data.

{{< include-headless "chunk/option-destination-ts-format.md" >}}

## url()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* An alias for [`service_endpoint`](#service-endpoint).

<a id="worker-partition-key"></a>
{{< include-headless "chunk/option-destination-http-worker-partition-key.md" >}}

{{< include-headless "chunk/option-destination-threaded-workers.md" >}}