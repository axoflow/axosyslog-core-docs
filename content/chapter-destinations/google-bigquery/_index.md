---
title: Send data to Google BigQuery
linktitle: "bigquery: Send messages to Google BigQuery"
weight:  150
driver: "bigquery()"
short_description: "Send messages to Google BigQuery"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.6.0, {{% param "product_name" %}} can send data to [Google Cloud BigQuery](https://cloud.google.com/bigquery/?hl=en) via the [BigQuery Storage Write API](https://cloud.google.com/bigquery/docs/write-api) using a high-performance gRPC-based implementation.

## Prerequisites

- A Google BigQuery environment, for example, the [BigQuery Sandbox](https://cloud.google.com/bigquery/docs/sandbox).
- A BigQuery table.
- Using the Storage Write API requires one of the following OAuth scopes:

    - `https://www.googleapis.com/auth/bigquery`
    - `https://www.googleapis.com/auth/cloud-platform`
    - `https://www.googleapis.com/auth/bigquery.insertdata`

To configure {{% param "product_name" %}}, you'll need the name of the project, dataset, the name of the table to use, and the schema of the table.

<!-- - An [IAM service account](https://cloud.google.com/iam/docs/service-account-overview) that {{% param "product_name" %}} uses for authentication. -->

<!-- FIXME Do we need more details about how to set up the Google side? -->

For authentication, the destination uses `GoogleDefaultCredentials`, which covers everything listed as [ADC](https://cloud.google.com/docs/authentication/provide-credentials-adc). In a production environment, use a service account and [Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity).

Example configuration:

```sh
destination d_bigquery {
    bigquery(
        project("test-project")
        dataset("test-dataset")
        table("test-table")
        workers(8)

        schema(
            "message" => "$MESSAGE"
            "app" STRING => "$PROGRAM"
            "host" STRING => "$HOST"
            "time" DATETIME => "$ISODATE"
            "pid" INTEGER => int("$PID")
        )

        on-error("drop-property")
    );
}
```

By default, the messages are sent with one worker, one message per batch, and without compression.

## Options

The `bigquery()` destination has the following options.

<!-- FIXME add other inherited options -->

<!-- FIXME update code examples in the included grpc authentication -->
{{< include-headless "chunk/grpc-authentication.md" >}}

{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

By default, the `batch-bytes()` option of the `bigquery()` destination is 10 MB. This is an upper limit for the `bigquery()` destination. Note that due to a framework limitation, the batch might be at most 1 message larger than the set limit.

{{% include-headless "chunk/option-description-destination-batch-lines.md" %}}

{{% include-headless "chunk/option-destination-batch-timeout.md" %}}

{{< include-headless "chunk/option-destination-grpc-compression.md" >}}

## dataset()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* The name of the dataset where {{% param "product_name" %}} sends the data.

{{< include-headless "chunk/option-destination-grpc-keep-alive.md" >}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{< include-headless "chunk/option-destination-on-error.md" >}}

## project()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* The ID of the Google Cloud project where {{% param "product_name" %}} sends the data.

## protobuf-schema()

<!-- FIXME -->

```shell
protobuf-schema("/tmp/test.proto" => "$MESSAGE", "$PROGRAM", "$HOST", "$PID")
```

An example proto file when using the `protobuf-schema()` option:

```shell
syntax = "proto2";
​
message CustomRecord {
  optional string message = 1;
  optional string app = 2;
  optional string host = 3;
  optional int64 pid = 4;
}
```

Alternatively, you can set the schema with the [`schema()`](#schema) option.

## schema()

|          |                            |
| -------- | -------------------------- |
| Type:    | See the description |
| Default: | - |

*Description:* Sets the schema of the BigQuery table. On the left side of the arrow, set the name of the column and its type. On the right side, set any {{% param "product_name" %}} template or macro, which gets evaluated on each log that is routed to the `bigquery()` destination. The available column types are: `STRING`, `BYTES`, `INTEGER`, `FLOAT`, `BOOLEAN`, `TIMESTAMP`, `DATE`, `TIME`, `DATETIME`, `JSON`, `NUMERIC`, `BIGNUMERIC`, `GEOGRAPHY`, `RECORD`, `INTERVAL`. For example:

```shell
schema(
    "message" => "$MESSAGE"
    "app" STRING => "$PROGRAM"
    "host" STRING => "$HOST"
    "time" DATETIME => "$ISODATE"
    "pid" INTEGER => int("$PID")
)
```

Alternatively, you can set the schema with the [`protobuf-schema()`](#protobuf-schema) option.

## table()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* The name of the Google BigQuery table where {{% param "product_name" %}} sends the data.

{{< include-headless "chunk/option-destination-threaded-workers.md" >}}
