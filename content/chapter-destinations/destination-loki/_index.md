---
title: "loki: Grafana Loki"
weight:  3050
driver: "loki()"
short_description: "Send messages to Grafana Loki"
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

## Options

The `loki()` destination has the following options.

{{< include-headless "chunk/grpc-authentication.md" >}}

## batch-lines()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 0      |

{{% include-headless "chunk/option-description-destination-batch-lines.md" %}}

{{% include-headless "chunk/option-destination-batch-timeout.md" %}}

## keep-alive()

Configures how {{% param "product.abbrev" %}} sends [gRPC keepalive pings](https://grpc.io/docs/guides/keepalive/).

### max-pings-without-data()

|          |                    |
| -------- | ------------------ |
| Type:    | integer |
| Default: |                 |

*Description:* The maximum number of gRPC pings that can be sent when there is no data/header frame to be sent. {{% param "product.abbrev" %}} won't send any pings after this limit. Set it to 0 disable this restriction and keep sending pings.

### time()

|          |                    |
| -------- | ------------------ |
| Type:    | number [milliseconds] |
| Default: |                 |

*Description:* The period (in milliseconds) after which {{% param "product.abbrev" %}} sends a gRPC keepalive ping.

### timeout()

|          |                    |
| -------- | ------------------ |
| Type:    | number [milliseconds] |
| Default: | 10                 |

*Description:* The time (in milliseconds) {{% param "product.abbrev" %}} waits for an acknowledgement.

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

## template()

|          |                                                    |
| -------- | -------------------------------------------------- |
| Type:    | template or template-function             |
| Default: | `$ISODATE $HOST $MSGHDR$MSG` |

*Description:* Specifies a template defining the logformat to be used in the destination. Macros are described in {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" %}}. For details on template functions, see {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" %}}.

## timestamp()

|          |                            |
| -------- | -------------------------- |
| Type:    | `current`, `received`, or `msg` |
| Default: | `current` |

*Description:* Sets the timestamp to use for the messages sent to Loki. This is important because Loki accepts data only if their timestamp is monotonously increasing, out of order messages are rejected. The possible values for this option are:

- `current`: Use the timestamp when {{% param "product.abbrev" %}} processes the message in the output. This guarantees that the timestamp is monotonously increasing, but in some cases can significantly differ from the time when the message was generated.
- `msg`: Use the original timestamp of the message.
- `received`: Use the timestamp when {{% param "product.abbrev" %}} has received the message.

## url()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `localhost:9095` |

*Description:* The URL of the Loki endpoint.

{{< include-headless "chunk/option-destination-threaded-workers.md" >}}
