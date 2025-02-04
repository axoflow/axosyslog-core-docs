---
title: Parse OpenTelemetry messages
linktitle: OpenTelemetry
weight: 1550
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

By default, {{% param "product_name" %}} doesn't parse the fields of incoming OpenTelemetry messages into name-value pairs, but are only available for forwarding using the `opentelemetry()` destination. To parse the fields into name-value pairs, use the `opentelemetry()` parser.

The `opentelemetry()` parser parses the fields into name-value pairs starting with the `.otel.` prefix.

- The type of the message is stored in the `.otel.type` field (possible values: `log`, `metric`, and `span`).
- Resource information is mapped into the `.otel.resource.<...>` , for example, `.otel.resource.dropped_attributes_count`, or `.otel.resource.schema_url`. 
- Scope information is mapped into `.otel.scope.<...>`, for example, `.otel.scope.name`, `.otel.scope.schema_url`.
- The fields of log records are mapped into `.otel.log.<...>`, for example, `.otel.log.body`, `.otel.log.severity_text`.
- The fields of metrics are mapped into `.otel.metric.<...>`, for example, `.otel.metric.name`, `.otel.metric.unit`.
    - The type of the metric is mapped into `.otel.metric.data.type`. Possible values: `gauge`, `sum`, `histogram`, `exponential_histogram`, `summary`.
    - The actual data is mapped into `.otel.metric.data.<type>.<...>`, for example, `.otel.metric.data.gauge.data_points.0.time_unix_nano`.
- The fields of traces are mapped into `.otel.span.<...>`, for example, `.otel.span.name`, `.otel.span.trace_state`. Repeated fields have an index, for example, `.otel.span.events.5.time_unix_nano`.

For details on the parsed fields, you can check the [OpenTelemetry proto files](https://github.com/open-telemetry/opentelemetry-proto/tree/v0.20.0/opentelemetry/proto).

## Mapping data types

String, bool, int64, double, and bytes values are mapped to their respective {{% param "product_name" %}} name-value type, for example, `.otel.resource.attributes.string_key` becomes a string value. <!-- FIXME add a link to the value-pairs docs -->

The mapping of AnyValue type fields is limited.

`ArrayValue` and `KeyValueList` types are stored serialized with protobuf type. Note that `protobuf` and `bytes` types are only available, unless explicitly type cast. For example, `bytes(${.otel.log.span_id})`. When using template functions, use `--include-bytes`, for example, `$(format-json .otel.* --include-bytes`. In the case of `$(format-json)`, the content is base64-encoded into the bytes content.

## Options

## set-hostname()

|           |                              |
| --------- | ---------------------------- |
| Synopsis: | `yes | no ` |
| Default: | `yes` |

Available in {{< product >}} 4.8 and later.

*Description:* If set to yes, the parser extracts the `host.name` resource attribute if available in the message. Otherwise, it leaves the [HOST](https://opentelemetry.io/docs/specs/semconv/attributes-registry/host/) field as-is.
