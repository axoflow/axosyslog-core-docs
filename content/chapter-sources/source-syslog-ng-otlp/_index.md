---
title: "axosyslog-otlp(): Receive logs from another node using OpenTelemetry"
weight: 3950
driver: "axosyslog-otlp()"
short_description: "Receive logs from another node using OpenTelemetry"
axosyslog-otlp: true
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{% param "product.abbrev" %}} version 4.12 and later. (From version 4.4 to 4.11, this driver was called `syslog-ng-otlp()`.)

{{< include-headless "chunk/syslog-ng-otlp-intro.md" >}}

<!--
    FIXME format(<string>) — option-source-format.md chunk is an empty FIXME stub.
-->

## Options

The `axosyslog-otlp()` source has the following options.

{{< readfile "/headless/chunk/grpc-authentication.md" >}}

{{< include-headless "chunk/option-source-chain-hostnames.md" >}}

{{< include-headless "chunk/option-grpc-channel-args.md" >}}

{{< include-headless "chunk/option-source-concurrent-requests.md" >}}

{{< include-headless "chunk/option-source-default-facility.md" >}}

{{% include-headless "chunk/option-source-default-level-journal.md" %}}

{{% include-headless "chunk/option-source-default-priority.md" %}}

{{% include-headless "chunk/option-source-default-severity.md" %}}

{{% include-headless "chunk/option-source-dns-cache.md" %}}

{{< include-headless "chunk/option-source-flags.md" >}}

{{< include-headless "chunk/option-source-format.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{< include-headless "chunk/option-source-host-override.md" >}}

{{% include-headless "chunk/option-source-internal.md" %}}

{{% include-headless "chunk/option-grpc-source-ip.md" %}}

{{< include-headless "chunk/option-source-otlp-keep-alive.md" >}}

## keep-hostname()

The `axosyslog-otlp()` source ignores this option and uses the hostname from the message as the `${HOST}`.

{{< include-headless "chunk/option-source-keep-timestamp.md" >}}

{{< include-headless "chunk/option-source-log-fetch-limit.md" >}}

{{< include-headless "chunk/option-source-file-log-iw-size.md" >}}

{{< include-headless "chunk/option-source-log-prefix.md" >}}

{{% include-headless "chunk/option-source-long-hostnames.md" %}}

{{< include-headless "chunk/option-source-normalize-hostnames.md" >}}

{{% include-headless "chunk/option-persist-name.md" %}}

## port()

|          |        |
| -------- | ------ |
| Type:    | integer |
| Default: | `4317` |

*Description:* The port number to bind to.

{{% include-headless "chunk/option-source-program-override.md" %}}

<!-- cfg-helper exposes read-old-records() and sdata-prefix() for axosyslog-otlp(),
     but they have no useful effect on this source. Keep these markers so the
     next docs-vs-cfg-helper diff doesn't flag them as missing.
{{% include-headless "chunk/option-source-read-old-records.md" %}}
{{< include-headless "chunk/option-source-sdata-prefix.md" >}}
-->

{{< include-headless "chunk/option-source-tags.md" >}}

{{< include-headless "chunk/option-source-time-zone.md" >}}

{{< include-headless "chunk/option-source-use-dns.md" >}}

{{< include-headless "chunk/option-source-use-fqdn.md" >}}

{{< include-headless "chunk/option-source-use-syslogng-pid.md" >}}

{{< include-headless "chunk/option-source-threaded-workers.md" >}}
