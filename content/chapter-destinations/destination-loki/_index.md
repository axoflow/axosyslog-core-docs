---
title: "loki: Grafana Loki"
weight:  3050
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{% param "product.abbrev" %}} version 4.4 and later.

The `loki()` destination sends your log data to [Grafana Loki](https://grafana.com/docs/loki/) via gRPC, using the same message format documented for the [Grafana Loki HTTP endpoint](https://grafana.com/docs/loki/latest/reference/api/#push-log-entries-to-loki).

Sample configuration:

```shell
loki(
    url("localhost:9096")
    labels(
        "app" => "$PROGRAM",
        "host" => "$HOST",
    )

    workers(16)
    batch-timeout(10000)
    batch-lines(1000)
);
```

## Prerequisites

<!-- FIXME  -->

## Options

The `loki()` destination has the following options.

<!-- FIXME  required options -->

<!-- FIXME other inherited options
 threaded_dest_driver_general_option
  | threaded_dest_driver_workers_option
  | threaded_dest_driver_batch_option
 -->

## batch-lines()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 25     |

{{% include-headless "chunk/option-description-destination-batch-lines.md" %}}

<!-- FIXME should we add batch-bytes as well? -->

{{% include-headless "chunk/option-destination-batch-timeout.md" %}}


<!--
  { "target_service_accounts", KW_TARGET_SERVICE_ACCOUNTS },
   -->

{{< include-headless "chunk/opentelemetry-authentication.md" >}}
<!-- FIXME generalize the authentication chunk, now it refers only to opentelemetry -->

## keep-alive()

<!-- FIXME add example -->

### max-pings-without-data()

|          |                    |
| -------- | ------------------ |
| Type:    | number [seconds] |
| Default: |                 |

<!-- FIXME -->

### time()

|          |                    |
| -------- | ------------------ |
| Type:    | number [seconds] |
| Default: |                 |

<!-- FIXME -->

### timeout()

|          |                    |
| -------- | ------------------ |
| Type:    | number [seconds] |
| Default: | 10                 |

*Description:* The value (in seconds) to wait for an operation to complete, and attempt to reconnect the server if exceeded.

## labels()

|          |         |
| -------- | ------- |
| Type:    |  |
| Default: | See the description |

The labels applied to the message as they are sent to the destination. Use the following format:

```shell
labels(
    "name-of-the-label-in-the-output" => "field-of-the-message"
)
```

Default value:

<!-- FIXME -->

## timestamp()

|          |                            |
| -------- | -------------------------- |
| Type:    | `current`, `received`, or `msg` |
| Default: | `received` |

*Description:* Sets the timestamp to use for the messages sent to Loki. This is important because Loki accepts data only if their timestamp is monotonously increasing, out of order messages are rejected. The possible values for this option are:

- `current`: Use the timestamp when {{% param "product.abbrev" %}} processes the message in the output. This guarantees that the timestamp is monotonously increasing, but in some cases can significantly differ from the time when the message was generated.
- `msg`: Use the original timestamp of the message.
- `received`: Use the timestamp when {{% param "product.abbrev" %}} has received the message.

## url()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: |  |

*Description:* The URL of the Loki endpoint.

{{< include-headless "chunk/option-destination-threaded-workers.md" >}}
