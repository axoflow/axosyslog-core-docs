---
title: Send logs, metrics, and traces to OpenTelemetry
linktitle: OpenTelemetry
weight: 3750
driver: "opentelemetry()"
short_description: "Send logs, metrics, and traces to OpenTelemetry"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.3.0, {{% param "product_name" %}} can send logs, metrics, and traces to [OpenTelemetry](https://opentelemetry.io/) over the [OpenTelemetry Protocol (OTLP/gRPC)](https://opentelemetry.io/docs/specs/otlp/).

The only required parameter is the `url()` of the destination server, which includes the port number as well.

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

{{< include-headless "chunk/grpc-authentication.md" >}}

{{% include-headless "chunk/option-destination-otlp-batch-bytes.md" %}}

{{< include-headless "chunk/option-destination-threaded-batching.md" >}}

{{< include-headless "chunk/option-grpc-channel-args.md" >}}

{{< include-headless "chunk/option-destination-grpc-compression.md" >}}

{{< include-headless "chunk/option-grpc-headers.md" >}}

{{< include-headless "chunk/option-destination-threaded-workers.md" >}}

<!-- FIXME xinclude other common options
 threaded_dest_driver_general_option-->