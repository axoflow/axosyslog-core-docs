---
title: Receive logs, metrics, and traces from OpenTelemetry
linktitle: OpenTelemetry
weight: 2300
driver: "opentelemetry()"
short_description: "Receive logs, metrics, and traces from OpenTelemetry clients over the OpenTelemetry Protocol (OTLP/gRPC)"
opentelemetry: true
source_type_grpc: true
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.3.0, {{% param "product_name" %}} can receive logs, metrics, and traces from [OpenTelemetry](https://opentelemetry.io/) clients over the [OpenTelemetry Protocol (OTLP/gRPC)](https://opentelemetry.io/docs/specs/otlp/).

## Example: Receiving OpenTelemetry data

The following example receives OpenTelemetry data and forwards it to an OpenTelemetry receiver. Note that by default, {{% param "product_name" %}} doesn't parse the fields of the incoming messages into name-value pairs, but are only available for forwarding using the `opentelemetry()` destination. To parse the fields into name-value pairs, use the [`opentelemetry()` parser]({{< relref "/chapter-parsers/opentelemetry/_index.md" >}}).

```shell
log otel_forward_mode_alts {
  source {
    opentelemetry(
      port(4317)
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

{{< readfile "/headless/chunk/grpc-authentication.md" >}}

{{% include-headless "chunk/option-source-chain-hostnames.md" %}}

{{< include-headless "chunk/option-grpc-channel-args.md" >}}

{{< include-headless "chunk/option-source-concurrent-requests.md" >}}

{{% include-headless "chunk/option-source-default-facility.md" %}}

{{% include-headless "chunk/option-source-default-level-journal.md" %}}

{{% include-headless "chunk/option-source-default-priority.md" %}}

<!-- has no useful effect on this source  {{% include-headless "chunk/option-source-default-severity.md" %}} -->

{{% include-headless "chunk/option-source-dns-cache.md" %}}

{{% include-headless "chunk/option-source-flags.md" %}}

{{% include-headless "chunk/option-source-format.md" %}}

{{% include-headless "chunk/option-hook-commands.md" %}}

{{% include-headless "chunk/option-source-host-override.md" %}}

{{% include-headless "chunk/option-source-internal.md" %}}

{{% include-headless "chunk/option-grpc-source-ip.md" %}}

{{< include-headless "chunk/option-source-otlp-keep-alive.md" >}}

## keep-hostname()

The `opentelemetry()` source ignores this option and uses the address of the OTLP peer as the HOST.

{{% include-headless "chunk/option-source-keep-timestamp.md" %}}

{{< include-headless "chunk/option-source-log-fetch-limit.md" >}}

{{< include-headless "chunk/option-source-file-log-iw-size.md" >}}

{{% include-headless "chunk/option-source-log-prefix.md" %}}

<!-- Obsolete alias, only left here to make cfg-helper comparisons easier {{% include-headless "chunk/option-source-long-hostnames.md" %}} -->

## `mode()` {#mode}

|          |         |
| -------- | ------- |
| Type:    | `logmessage` or `filterx-dict` |
| Default: | `logmessage` |

Available in {{< product >}} 4.28 and later.

*Description:* Determines how {{% param "product.abbrev" %}} makes the contents of incoming OpenTelemetry log records available for processing.

- `logmessage`: {{% param "product.abbrev" %}} stores the record in the `${.otel_raw.log}`, `${.otel_raw.resource}`, and `${.otel_raw.scope}` name-value pairs. To work with them in FilterX, map them to OTEL objects first, as described in {{% xref "/filterx/filterx-otel/_index.md" %}}.
- `filterx-dict`: {{% param "product.abbrev" %}} converts the record directly into three declared FilterX variables called `log`, `resource`, and `scope`, each holding a plain [FilterX dictionary]({{< relref "/filterx/_index.md#json" >}}). Use them in your FilterX block without any input mapping.

    Because this skips serializing and deserializing the `${.otel_raw.*}` name-value pairs, `mode(filterx-dict)` is significantly faster than `mode(logmessage)` when you process the records in FilterX.

Note the following points about `mode(filterx-dict)`:

- The `log`, `resource`, and `scope` variables are plain dictionaries, not the `otel_logrecord`, `otel_resource`, and `otel_scope` objects that the [OTEL FilterX functions]({{< relref "/filterx/filterx-otel/_index.md" >}}) create.
- The mode affects only log records. Metrics and traces are always stored as name-value pairs.
- Messages sent by a {{% param "product.abbrev" %}} `syslog-ng-otlp()` destination are recognized and parsed the same way in both modes.
- The `${.otel_raw.*}` name-value pairs are not set, so configurations that depend on them — for example, forwarding the received data unchanged to an `opentelemetry()` destination — require `mode(logmessage)`.

{{% include-headless "chunk/option-source-normalize-hostnames.md" %}}

{{% include-headless "chunk/option-persist-name.md" %}}

## `port()` {#port}

The port number to receive incoming connections. Default value: 4317

{{% include-headless "chunk/option-source-program-override.md" %}}

<!-- cfg-helper exposes read-old-records() and sdata-prefix() for opentelemetry(),
     but they have no useful effect on this gRPC subscription source. Markers
     kept so the next docs-vs-cfg-helper diff doesn't flag them.
{{% include-headless "chunk/option-source-read-old-records.md" %}}
{{% include-headless "chunk/option-source-sdata-prefix.md" %}}
-->

{{% include-headless "chunk/option-source-tags.md" %}}

{{% include-headless "chunk/option-source-time-zone.md" %}}

{{% include-headless "chunk/option-source-use-dns.md" %}}

{{% include-headless "chunk/option-source-use-fqdn.md" %}}

{{% include-headless "chunk/option-source-use-syslogng-pid.md" %}}

{{< include-headless "chunk/option-source-threaded-workers.md" >}}
