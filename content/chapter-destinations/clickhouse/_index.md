---
title: ClickHouse database
linktitle: "ClickHouse"
weight:  200
driver: "clickhouse()"
short_description: "Send messages to a ClickHouse database"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.9.0, {{% param "product_name" %}} can send data to [ClickHouse databases](https://clickhouse.com/) using its [gRPC interface](https://clickhouse.com/docs/en/interfaces/grpc).

## Prerequisites

- A [self-hosted ClickHouse installation](https://clickhouse.com/docs/en/install).

    {{% alert title="Warning" color="warning" %}}
ClickHouse Cloud doesn't support the gRPC interface currently.
    {{% /alert %}}

- The [gRPC interface](https://clickhouse.com/docs/en/interfaces/grpc) must be enabled in your ClickHouse configuration.
- To configure {{% param "product_name" %}}, you'll need:

    - the name of an existing database and a table where you want to send your data, and
    - the credentials (username and password) to access the database.

Example configuration (sends data to the default `localhost:9100` URL):

```sh
destination {
  clickhouse(
    database("default")
    table("demo_table")
    user("your-username")
    password("your-password")
    schema(
      "user_id" UInt32 => $R_MSEC,
      "message" String => "$MSG",
      "timestamp" DateTime => "$R_UNIXTIME",
      "metric" Float32 => 3.14
    )
  );
};
```

## Options

This destination has the following options:

{{< include-headless "chunk/grpc-authentication.md" >}}

{{% include-headless "chunk/option-destination-otlp-batch-bytes.md" %}}

## batch-lines()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 0      |

{{% include-headless "chunk/option-description-destination-batch-lines.md" %}}

{{% include-headless "chunk/option-destination-batch-timeout.md" %}}

{{< include-headless "chunk/option-grpc-channel-args.md" >}}

{{< include-headless "chunk/option-destination-grpc-compression.md" >}}

## database()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `default` |

*Description:* The database where {{% param "product_name" %}} sends the data.

{{< include-headless "chunk/option-destination-diskbuffer.md" >}}

{{< include-headless "chunk/option-destination-frac-digits.md" >}}

{{< include-headless "chunk/option-grpc-headers.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{< include-headless "chunk/option-destination-grpc-keep-alive.md" >}}

{{% include-headless "chunk/option-destination-local-timezone.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{< include-headless "chunk/option-destination-on-error.md" >}}

## password()

|          |              |
| -------- | ------------ |
| Type:    | string       |
| Default: | empty string |

*Description:* The password used for authentication.

{{% include-headless "chunk/option-persist-name.md" %}}

## protobuf-schema()

|          |                            |
| -------- | -------------------------- |
| Type:    | See the description |
| Default: | - |

*Description:* Sets the schema of the database table from a protobuf schema file.

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

{{% include-headless "chunk/option-destination-retries.md" %}}

## schema()

|          |                            |
| -------- | -------------------------- |
| Type:    | arrow list |
| Default: |  |

*Description:* Sets the schema of the database table. On the left side of the arrow, set the name of the column and its type. On the right side, set any {{% param "product_name" %}} template or macro, which gets evaluated on each log that is routed to the destination. For example:

```shell
schema(
  "user_id" UInt32 => $R_MSEC,
  "message" String => "$MSG",
  "timestamp" DateTime => "$R_UNIXTIME",
  "metric" Float32 => 3.14
)
```

Alternatively, you can set the schema with the [`protobuf-schema()`](#protobuf-schema) option.

You can find the available column types in the [official ClickHouse documentation](https://clickhouse.com/docs/en/sql-reference/data-types).

{{% include-headless "chunk/option-destination-send-timezone.md" %}}

## table()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* The name of the table where {{% param "product_name" %}} sends the data.

{{% include-headless "chunk/option-destination-template-escape.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

{{% include-headless "chunk/option-destination-timezone.md" %}}

{{< include-headless "chunk/option-destination-ts-format.md" >}}

## url()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `localhost:9100` |

*Description:* The URL of the gRPC receiver.

## user()

|          |              |
| -------- | ------------ |
| Type:    | string       |
| Default: | empty string |

*Description:* The username used for authentication.

<a id="worker-partition-key"></a>
{{< include-headless "chunk/option-destination-http-worker-partition-key.md" >}}

{{< include-headless "chunk/option-destination-threaded-workers.md" >}}