---
title: "syslog-ng-otlp(): Forward logs to another node using OpenTelemetry"
weight: 6750
driver: "syslog-ng-otlp()"
short_description: "Forward logs to another node using OpenTelemetry"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{% param "product.abbrev" %}} version 4.4 and later.

{{< include-headless "chunk/syslog-ng-otlp-intro.md" >}}

<!--  FIXME:  internal(<yesno>) option is globally undocumented
      FIXME: worker-partition-key(<template-content>) Is that a renamed version of the partition-key() option from parallelize? https://axoflow.com/docs/axosyslog-core/chapter-nonsequential-processing/
 -->

## Options

The `syslog-ng-otlp()` destination has the following options.

{{< include-headless "chunk/grpc-authentication.md" >}}

## batch-lines()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 0      |

{{% include-headless "chunk/option-description-destination-batch-lines.md" %}}

{{% include-headless "chunk/option-destination-batch-timeout.md" %}}

{{< include-headless "chunk/option-destination-grpc-compression.md" >}}

{{< include-headless "chunk/option-destination-diskbuffer.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{% include-headless "chunk/option-persist-name.md" %}}

{{% include-headless "chunk/option-destination-retries.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

## url()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `localhost:9095` |

*Description:* The URL of the {{% param "product.abbrev" %}} receiver.

{{< include-headless "chunk/option-destination-threaded-workers.md" >}}
