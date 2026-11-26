---
title: Send logs, metrics, and traces to OpenTelemetry
linktitle: OpenTelemetry
weight: 3750
driver: "opentelemetry()"
short_description: "Send logs, metrics, and traces to OpenTelemetry"
opentelemetry: true
dest_type: grpc
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{% param "product_name" %}} can send logs, metrics, and traces to [OpenTelemetry](https://opentelemetry.io/) over the [OpenTelemetry Protocol (OTLP/gRPC)](https://opentelemetry.io/docs/specs/otlp/).

The only required parameter is the `url()` of the destination server, which includes the port number as well.

## Prerequisites

- {{% param "product.name" %}} version 4.3.0 or later.
- {{< include-headless "chunk/prereq-package.md" "axosyslog-mod-grpc" "axosyslog-grpc" >}}

## Example: Forwarding OpenTelemetry data

```shell
log otel_forward_mode_alts {
  source {
    opentelemetry(
      port(12345)
      auth(alts())
    );
  };

  destination {
    opentelemetry(
      url("my-otel-server:12345")
      auth(alts())
    );
  };
};
```

## Example: Sending log messages to OpenTelemetry

The following example receives syslog messages and forwards them as OpenTelemetry logs.

```shell
log non_otel_to_otel_tls {
  source {
    network(
      port(12346)
    );
  };

  destination {
    opentelemetry(
      url("my-otel-server:12346")
      auth(
        tls(
          ca-file("/path/to/ca.pem")
          key-file("/path/to/key.pem")
          cert-file("/path/to/cert.pem")
        )
      )
    );
  };
};
```

## Options

{{< readfile "/headless/chunk/grpc-authentication.md" >}}

{{% include-headless "chunk/option-destination-otlp-batch-bytes.md" %}}

{{< include-headless "chunk/option-destination-threaded-batching.md" >}}

{{< include-headless "chunk/option-grpc-channel-args.md" >}}

{{< include-headless "chunk/option-destination-grpc-compression.md" >}}

{{< include-headless "chunk/option-destination-diskbuffer.md" >}}

{{< include-headless "chunk/option-destination-frac-digits.md" >}}

{{< include-headless "chunk/option-grpc-headers.md" >}}

{{< include-headless "chunk/option-hook-commands.md" >}}

{{< include-headless "chunk/option-destination-grpc-keep-alive.md" >}}

{{% include-headless "chunk/option-destination-local-timezone.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{< include-headless "chunk/option-destination-on-error.md" >}}

{{% include-headless "chunk/option-persist-name.md" %}}

## prefix() {#prefix}

|          |               |
| -------- | ------------- |
| Type:    | string        |
| Default: | `.otel_raw`   |

Available in {{< product >}} 4.30 and later.

*Description:* The prefix of the name-value pairs that contain the OTLP payload to send. By default, the `opentelemetry()` destination reads the payload from the `${.otel_raw.*}` name-value pairs, which the [`opentelemetry()` source]({{< relref "/chapter-sources/opentelemetry/_index.md" >}}) sets. Use `prefix()` to send a record that you build yourself, for example, in FilterX:

```shell
log {
  source(s_network);
  filterx {
    ${.axo.type} = "log";
    ${.axo.log} = otel_logrecord({"body": $MESSAGE});
  };
  destination {
    opentelemetry(
      url("otel-collector.example.com:4317")
      prefix(".axo")
    );
  };
};
```

The destination reads the following name-value pairs:

- `<prefix>.type`: the type of the record: `log`, `metric`, or `span`.
- `<prefix>.log`, `<prefix>.metric`, or `<prefix>.span`: the record.
- `<prefix>.resource` and `<prefix>.scope`: the resource and the scope of the record.
- `<prefix>.resource_schema_url` and `<prefix>.scope_schema_url`: the schema URLs of the resource and the scope.

The trailing dot is optional, so `prefix(".axo")` and `prefix(".axo.")` are the same. The leading dot keeps the name-value pairs out of the default scope of [`value-pairs()`]({{< relref "/chapter-concepts/concepts-value-pairs/_index.md" >}}), but it isn't required.

The `prefix()` option doesn't affect the `${.otel.*}` name-value pairs, which set the individual fields of the record. The `axosyslog-otlp()` destination doesn't have this option.

{{< include-headless "chunk/option-destination-grpc-response-action.md" >}}

{{% include-headless "chunk/option-destination-retries.md" %}}

{{% include-headless "chunk/option-destination-send-timezone.md" %}}

{{% include-headless "chunk/option-destination-template-escape.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

{{% include-headless "chunk/option-destination-timezone.md" %}}

{{< include-headless "chunk/option-destination-ts-format.md" >}}

## url()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `localhost:9095` |

*Description:* The URL of the OpenTelemetry receiver.

{{< include-headless "chunk/option-destination-worker-partition-autoscaling.md" >}}

{{< include-headless "chunk/option-destination-worker-partition-buckets.md" >}}

<a id="worker-partition-key"></a>
{{< include-headless "chunk/option-destination-http-worker-partition-key.md" >}}

{{< include-headless "chunk/option-destination-threaded-workers.md" >}}
