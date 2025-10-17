---
title: Receive logs, metrics, and traces from OpenTelemetry
linktitle: OpenTelemetry
weight: 2350
driver: "opentelemetry()"
short_description: "Receive logs, metrics, and traces from OpenTelemetry clients over the OpenTelemetry Protocol (OTLP/gRPC)"
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

{{< include-headless "chunk/grpc-authentication.md" >}}

{{< include-headless "chunk/option-grpc-channel-args.md" >}}

{{< include-headless "chunk/option-source-concurrent-requests.md" >}}

## keep-hostname()

The `opentelemetry()` source ignores this option and uses the address of the OTLP peer as the HOST.

{{< include-headless "chunk/option-source-file-log-iw-size.md" >}}

## `port()` {#port}

The port number to receive incoming connections. Default value: 4317

{{< include-headless "chunk/option-source-threaded-workers.md" >}}

<!-- FIXME xinclude other common options
 threaded_source_driver_option -->