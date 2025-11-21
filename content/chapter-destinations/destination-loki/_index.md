---
title: "loki: Grafana Loki"
weight:  3050
driver: "loki()"
short_description: "Send messages to Grafana Loki"
aliases:
- /chapter-destinations/syslog-ng-with-loki/
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{% param "product.abbrev" %}} version 4.4 and later.

The `loki()` destination sends your log data to [Grafana Loki](https://grafana.com/docs/loki/). Note that:

- {{% param "product.abbrev" %}} sends data using **gRPC**, HTTP transport is currently not supported. Since currently the Loki deployment in the free Grafana Cloud doesn't have gRPC enabled, you must use a self-deployed Grafana Loki instance.
- The message format is the same as documented for the [Grafana Loki HTTP endpoint](https://grafana.com/docs/loki/latest/reference/api/#push-log-entries-to-loki).

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

{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

## batch-lines()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 0      |

{{< include-headless "chunk/option-description-destination-batch-lines.md" >}}

{{< include-headless "chunk/option-destination-batch-timeout.md" >}}

{{< include-headless "chunk/option-grpc-channel-args.md" >}}

{{< include-headless "chunk/option-destination-grpc-compression.md" >}}

{{< include-headless "chunk/option-grpc-headers.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{< include-headless "chunk/option-destination-grpc-keep-alive.md" >}}

## labels()

|          |         |
| -------- | ------- |
| Type:    | arrow list |
| Default: |  |

The labels applied to the message as they are sent to the destination. They must match the `[a-zA-Z_:][a-zA-Z0-9_:]*` regular expression, so labels can contain:

- ASCII letters,
- numbers, (but cannot begin with numbers)
- underscores (`_`), and
- colons (`:`).

Use the following format:

```shell
labels(
    "name_of_the_label_in_the_output" => "field-of-the-message",
)
```

For example:

```shell
    labels(
        "app" => "$PROGRAM",
        "host" => "$HOST",
    )
```

For details on using labels, see the [Grafana Loki documentation](https://grafana.com/docs/loki/latest/get-started/labels/).

{{% include-headless "chunk/option-destination-local-timezone.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{< include-headless "chunk/option-destination-on-error.md" >}}

{{% include-headless "chunk/option-persist-name.md" %}}

{{< include-headless "chunk/option-destination-grpc-response-action.md" >}}

{{% include-headless "chunk/option-destination-retries.md" %}}

{{% include-headless "chunk/option-destination-send-timezone.md" %}}

## template()

|          |                                                    |
| -------- | -------------------------------------------------- |
| Type:    | template or template-function             |
| Default: | `$ISODATE $HOST $MSGHDR$MSG` |

*Description:* Specifies a template defining the logformat to be used in the destination. Macros are described in {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" %}}. For details on template functions, see {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" %}}.

## tenant-id()

|          |                                                    |
| -------- | -------------------------------------------------- |
| Type:    | string             |
| Default: | - |

*Description:* Available in version 4.7 and newer. Sets the tenant ID for multi-tenant scenarios. For example:

```shell
loki(
    url("localhost:9096")
    labels(
        "app" => "$PROGRAM",
        "host" => "$HOST",
    )

    tenant-id("testTenant")
);
```

{{% include-headless "chunk/option-destination-template-escape.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

## timestamp()

|          |                            |
| -------- | -------------------------- |
| Type:    | `current`, `received`, or `msg` |
| Default: | `current` |

*Description:* Sets the timestamp to use for the messages sent to Loki. This is important because Loki accepts data only if their timestamp is monotonously increasing, out of order messages are rejected. The possible values for this option are:

- `current`: Use the timestamp when {{% param "product.abbrev" %}} processes the message in the output. This guarantees that the timestamp is monotonously increasing, but in some cases can significantly differ from the time when the message was generated.
- `msg`: Use the original timestamp of the message.
- `received`: Use the timestamp when {{% param "product.abbrev" %}} has received the message.

{{% include-headless "chunk/option-destination-timezone.md" %}}

## url()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `localhost:9095` |

*Description:* The URL of the Loki endpoint, including the gRPC listen port of your Loki deployment.

{{< include-headless "chunk/option-destination-worker-partition-buckets.md" >}}

<a id="worker-partition-key"></a>
{{< include-headless "chunk/option-destination-http-worker-partition-key.md" >}}

{{< include-headless "chunk/option-destination-threaded-workers.md" >}}
