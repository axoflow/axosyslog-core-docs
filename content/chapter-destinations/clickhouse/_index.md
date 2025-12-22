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

Example configuration:

```sh
destination {
  clickhouse(
    url("localhost:9100")
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

If you have a [protobuf-formatted message]({{< relref "/filterx/function-reference.md#protobuf-message" >}}), you can specify it in the [`proto-var()`](#proto) option, instead of using the `schema()` option.

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

## format()

|          |                            |
| -------- | -------------------------- |
| Type:    | `JSONEachRow`, `JSONCompactEachRow`, or `Protobuf` |
| Default: | see description |

Available in {{< product >}} 4.20 and later.

*Description:* Specifies the data format to use when sending data to Clickhouse.

By default, `format()` is set to:

- `Protobuf` if the [`proto-var()`](#proto-var) option is set, or
- `JSONEachRow` if the [`json-var()`](#json-var) option is set.

Starting with {{< product >}} 4.20, you can also use `format(JSONCompactEachRow)` (when `json-var()` is also set) to use a more compact, array-based JSON representation. For example:

```shell
destination {
  clickhouse (
    # ...
    json-var(json("$my_filterx_json_variable"))
    format("JSONCompactEachRow")
    # ...
  );
};
```

In the `JSONEachRow` format each line is a JSON object, making it more readable. For example:

```json
{"id":1,"name":"foo","value":42}
{"id":2,"name":"bar","value":17}
```

In the `JSONCompactEachRow` format each row is a compact array-based row:

```json
[1,"foo",42]
[2,"bar",17]
```

Note that if the data's actual format doesn't match the selected format, ClickHouse returns a `CANNOT_PARSE_INPUT_ASSERTION_FAILED` error message.

{{< include-headless "chunk/option-destination-frac-digits.md" >}}

{{< include-headless "chunk/option-grpc-headers.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}

## json-var()

|          |              |
| -------- | ------------ |
| Type:    | string       |
| Default: | empty string |

Available in {{< product >}} 4.17 and later.

*Description:* The `json-var()` option accepts either a JSON template or a variable containing a JSON string, and sends it to the ClickHouse server in Protobuf/JSON mixed mode ([`JSONEachRow` format](https://clickhouse.com/docs/interfaces/formats/JSONEachRow)). In this mode, type validation is performed by the ClickHouse server itself, so no Protobuf schema is required for communication. For example:

```shell
destination {
  clickhouse (
    ...
    json-var(json("{\"ingest_time\":1755248921000000000, \"body\": \"test template\"}"))ß
    };
};
```

Using `json-var()` is mutually exclusive with the [`proto-var()`](#proto-var), [`server-side-schema()`](#server-side-schema), [`schema()`](#schema), and [`protobuf-schema()`](#protobuf-schema) options.

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

Alternatively, you can set the schema with the [`schema()`](#schema) option, use [proto-var()](#proto-var) to assign an already formatted object to the message, or use a JSON template with the [json-var()](#json-var) option.

{{< include-headless "chunk/option-destination-proto-var.md" >}}

{{< include-headless "chunk/option-destination-grpc-response-action.md" >}}

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

Alternatively, you can set the schema with the [`protobuf-schema()`](#protobuf-schema) option, use [proto-var()](#proto-var) to assign an already formatted object to the message, or use a JSON template with the [json-var()](#json-var) option.

You can find the available column types in the [official ClickHouse documentation](https://clickhouse.com/docs/en/sql-reference/data-types).

{{% include-headless "chunk/option-destination-send-timezone.md" %}}

## server-side-schema()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

By default, sending data to ClickHouse doesn't propagate the type information of the data fields. The `server-side-schema()` option provides a solution for that using the [ClickHouse format schema](https://clickhouse.com/docs/interfaces/formats#formatschema). Using a server-side schema is needed when you're using complex types, like [`DateTime` or `LowCardinality`](https://clickhouse.com/docs/sql-reference/data-types).

1. Create a `.proto` file that matches the `schema()` of your {{< product >}} configuration. For details on formatting, see the [ClickHouse documentation](https://clickhouse.com/docs/interfaces/formats/Protobuf#example-usage). For example:

    ```json
    syntax = "proto3";

    message MessageType {
      uint32 user_id = 3;
      string message = 1;
      string timestamp = 2;
      float metric = 4;
    };
    ```

1. Copy the `.proto` file to your ClickHouse server, into the directory set in the `proto_schema_path` option of your ClickHouse configuration.
1. Reference that schema in the `clickhouse()` destination of your {{< product >}} configuration. The parameter of `server-side-schema()` is `<name-of-the-proto-file>:<identifier-after-message-in-the-proto-file>`. So if in the previous step you named the proto file `my-proto-file.proto` with the sample content, the parameter will be `my-proto-file:MessageType`. For example:

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
        server-side-schema("<my_proto_file_on_server>:<my_message_schema_name>")
      );
    };
    ```

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

*Description:* The address of the gRPC receiver in a `host:port` format. If the port is omitted, it will default to `443`. Examples: `127.0.0.1:9100`, `[::1]:1234`, `example.com` (equivalent to `example.com:443`).

## user()

|          |              |
| -------- | ------------ |
| Type:    | string       |
| Default: | empty string |

*Description:* The username used for authentication.

{{< include-headless "chunk/option-destination-worker-partition-autoscaling.md" >}}

{{< include-headless "chunk/option-destination-worker-partition-buckets.md" >}}

<a id="worker-partition-key"></a>
{{< include-headless "chunk/option-destination-http-worker-partition-key.md" >}}

{{< include-headless "chunk/option-destination-threaded-workers.md" >}}
