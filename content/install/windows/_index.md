---
title: Forward Windows logs
linktitle: Windows
weight: 2000
---

{{% param "product.companyabbrev" %}} provides a [custom OpenTelemetry Collector distribution](https://github.com/axoflow/axoflow-otel-collector-releases/blob/main/distributions/axoflow-otel-collector/) that you can use to collect logs on Windows hosts and forward them to {{% param "product.name" %}} using the OpenTelemetry Protocol (OTLP/gRPC).

The distribution provides installers for AMD64 and Arm64 based Windows for:

- Windows Server 2025
- Windows Server 2022
- Windows Server 2019
- Windows 11

## Steps

To forward Windows logs to {{% param "product.abbrev" %}}, complete the following steps.

1. Configure an [`opentelemetry()` source]({{< relref "/chapter-sources/opentelemetry/_index.md" >}}) on the {{% param "product.abbrev" %}} that will receive the Windows logs.
1. Download the installation package for your platform (https://github.com/axoflow/axoflow-otel-collector-releases/releases/) from the **Assets** section of the [Axoflow OpenTelemetry Collector releases](https://github.com/axoflow/axoflow-otel-collector-releases/releases) page. We provide MSI installers and binary releases for amd64 and arm64 architectures.
1. Run the installer on your Windows host. The installer installs:

    - the collector agent (by default) to `C:\Program Files\Axoflow\OpenTelemetry Collector\axoflow-otel-collector.exe`, and
    - a default configuration file (`C:\ProgramData\Axoflow\OpenTelemetry Collector\config.yaml`) that must be edited before use.

1. Open the configuration file (`C:\ProgramData\Axoflow\OpenTelemetry Collector\config.yaml`).
1. Set the IP address and port of the {{% param "product.abbrev" %}} host where you want to send data from this Windows host. Use the IP address and port of an [`opentelemetry()` source]({{< relref "/chapter-sources/opentelemetry/_index.md" >}}). For example:

    ```yaml
    exporters:
      otlp/axosyslog:
        endpoint: 10.0.2.2:4317
        tls:
          insecure: true
    ```

    Set the TLS settings to match the configuration of the [{{% param "product.abbrev" %}} `opentelemetry()` source]({{< relref "/chapter-sources/opentelemetry/_index.md" >}}).

1. Configure receivers to collect logs of the Windows host, and the pipelines to forward them. For example, to collect event logs from the Application, System, and Security channels:

    ```yaml
    receivers:
      windowseventlog/application:
        channel: application
        raw: true
        suppress_rendering_info: true
      windowseventlog/system:
        channel: system
        raw: true
        suppress_rendering_info: true
      windowseventlog/security:
          channel: security
          raw: true
          suppress_rendering_info: true
    service:
      pipelines:
        logs/eventlog:
          receivers: [windowseventlog/application, windowseventlog/system, windowseventlog/security]
          processors: [resource/agent, resourcedetection/system]
           exporters: [otlp/axosyslog]
    ```

    For details, see the [Windows installation Readme](https://github.com/axoflow/axoflow-otel-collector-releases/blob/main/distributions/axoflow-otel-collector/README_windows.md) and the [OpenTelemetry Collector documentation](https://opentelemetry.io/docs/collector/configuration/).

1. Save the file.
1. Restart the service.

    ```shell
    Restart-Service axoflow-otel-collector
    ```

    The agent starts sending data to the configured {{% param "product.abbrev" %}}.
