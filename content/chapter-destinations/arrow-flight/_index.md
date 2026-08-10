---
title: Send data to Apache Arrow Flight
linktitle: "Apache Arrow Flight"
weight: 125
driver: "arrow-flight()"
short_description: "Send messages to an Apache Arrow Flight server"
dest_type: grpc
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.26.0, the `arrow-flight()` destination can send data to an [Apache Arrow Flight](https://arrow.apache.org/docs/format/Flight.html) server over gRPC. Use this destination to deliver structured, columnar data to systems that accept Arrow Flight streams.

## Prerequisites

- An Apache Arrow Flight server that accepts the schema you configure.

## Configuration

You define the columns and their types using the [`schema()`](#schema) option, and map each column to an {{% param "product_name" %}} template or macro that is evaluated for every message routed to the destination. For example:

```shell
destination d_arrow_flight {
  arrow-flight(
    url("grpc://flight.example.com:8815")
    path("events.${HOST}")
    schema(
      "timestamp" TIMESTAMP => "${UNIXTIME}"
      "host"      STRING    => "${HOST}"
      "program"   STRING    => "${PROGRAM}"
      "severity"  INT64     => "${LEVEL_NUM}"
      "message"   STRING    => "${MSG}"
    )
    workers(4)
  );
};
```

## Options

This destination has the following options:

{{% include-headless "chunk/option-destination-batch-idle-timeout.md" %}}

## batch-bytes()

|                  |                  |
| ---------------- | ---------------- |
| Type:            | number [bytes]   |
| Default:         | 0 (disabled)     |

Available in {{% param "product.abbrev" %}} version 4.26.0 and later.

*Description:* Sets the maximum size of the payload in a batch. If the size of the messages reaches this value, {{% param "product_name" %}} sends the batch to the destination even if the number of messages is less than the value of the [`batch-lines()`](#batch-lines) option. Setting `batch-bytes()` without setting `batch-lines()` removes the limit on the number of messages in a batch.

## batch-lines()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 0      |

{{% include-headless "chunk/option-description-destination-batch-lines.md" %}}

{{% include-headless "chunk/option-destination-batch-timeout.md" %}}

{{< include-headless "chunk/option-destination-diskbuffer.md" >}}

{{< include-headless "chunk/option-destination-frac-digits.md" >}}

{{< include-headless "chunk/option-hook-commands.md" >}}

{{% include-headless "chunk/option-destination-local-timezone.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

## path()

|          |          |
| -------- | -------- |
| Type:    | template |
| Default: |          |

*Description:* The descriptor path that identifies the dataset (for example, a table) on the Flight server. The `path()` option is templatable, so a single destination can route messages to multiple datasets based on the content of each message. For example:

```shell
path("events.${HOST}")
```

When `path()` resolves to different values for different messages, {{% param "product_name" %}} uses it as the default value of the [`worker-partition-key()`](#worker-partition-key) option, so that each batch contains messages belonging to the same path.

{{% include-headless "chunk/option-persist-name.md" %}}

{{% include-headless "chunk/option-destination-retries.md" %}}

## schema()

|          |                |
| -------- | -------------- |
| Type:    | arrow list     |
| Default: |                |

*Description:* Sets the columns of the data sent to the Flight server. This option is required. On the left side of the arrow (`=>`), set the name of the column and its type. On the right side, set any {{% param "product_name" %}} template or macro, which is evaluated for each message routed to the destination. For example:

```shell
schema(
  "timestamp" TIMESTAMP => "${UNIXTIME}"
  "host"      STRING    => "${HOST}"
  "severity"  INT64     => "${LEVEL_NUM}"
  "message"   STRING    => "${MSG}"
  "labels"    MAP(STRING STRING) => "${MSG}"
)
```

The following column types are available:

| Type                 | Aliases   | Description                          |
| -------------------- | --------- | ------------------------------------ |
| `STRING`             |           | UTF-8 string. This is the default type if you omit the type keyword. |
| `INT64`              | `INTEGER` | 64-bit signed integer.               |
| `DOUBLE`             | `FLOAT64` | Double-precision floating-point number. |
| `BOOL`               | `BOOLEAN` | Boolean value.                       |
| `TIMESTAMP`          |           | Timestamp value.                     |
| `MAP(STRING STRING)` |           | Map with string keys and string values. |

{{% include-headless "chunk/option-destination-send-timezone.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

## timeout()

|          |                          |
| -------- | ------------------------ |
| Type:    | number [seconds]         |
| Default: | 0 (no timeout)           |

Available in {{% param "product.abbrev" %}} version 4.26.0 and later.

*Description:* Sets the timeout for the gRPC requests sent to the Flight server. Set it to `0` to disable the timeout.

## url()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* The address of the Apache Arrow Flight server, for example, `grpc://flight.example.com:8815`. If you omit the scheme from the URL (like `flight.example.com:8815`), {{% param "product_name" %}} assumes `grpc://`.

## workers()

|          |         |
| -------- | ------- |
| Type:    | integer |
| Default: | 1       |

{{< include-headless "chunk/option-destination-description-workers.md" >}}

{{< include-headless "chunk/option-destination-worker-partition-autoscaling.md" >}}

{{< include-headless "chunk/option-destination-worker-partition-buckets.md" >}}

## worker-partition-key()

|          |          |
| -------- | -------- |
| Type:    | template |
| Default: | value of `path()` |

*Description:* The `worker-partition-key()` option specifies a template: messages that expand the template to the same value are mapped to the same partition. When batching is enabled and multiple [`workers()`](#workers) are configured, only messages that belong to the same [`path()`](#path) should be added to the same batch. By default, {{% param "product_name" %}} uses the `path()` template as the partition key, so you only need to set `worker-partition-key()` explicitly if you want to partition messages differently.

For example, you can partition messages based on the source host:

```shell
worker-partition-key("${HOST}")
```
