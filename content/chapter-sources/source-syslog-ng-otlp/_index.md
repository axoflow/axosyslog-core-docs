---
title: "axosyslog-otlp(): Receive logs from another node using OpenTelemetry"
weight: 3950
driver: "axosyslog-otlp()"
short_description: "Receive logs from another node using OpenTelemetry"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{% param "product.abbrev" %}} version 4.12 and later. (From version 4.4 to 4.11, this driver was called `syslog-ng-otlp()`.)

{{< include-headless "chunk/syslog-ng-otlp-intro.md" >}}

<!-- 

    FIXME default-severity(<string>) this is globally undocumented
    FIXME format(<string>)
    FIXME does it make sense to confogire it? hook-commands(
        setup(<string>)
        shutdown(<string>)
        startup(<string>)
        teardown(<string>)
    )
    internal(<yesno>)
    long-hostnames(<yesno>)

 -->

## Options

The `syslog-ng-otlp()` source has the following options.

{{< include-headless "chunk/grpc-authentication.md" >}}

## chain-hostnames()

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | `yes`, `no` |
| Default:         | `no`           |

*Description:* Enable or disable the chained hostname format. For details, see the [chain-hostnames() global option]({{< relref "/chapter-global-options/reference-options/_index.md#global-options-chain-hostnames" >}}).

{{< include-headless "chunk/option-grpc-channel-args.md" >}}

{{< include-headless "chunk/option-source-concurrent-requests.md" >}}

{{< include-headless "chunk/option-source-default-facility.md" >}}

{{% include-headless "chunk/option-source-default-level-journal.md" %}}

{{% include-headless "chunk/option-source-default-priority.md" %}}

## dns-cache()

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | `yes`, `no` |
| Default:         | `no`           |

*Description:* Enable or disable DNS cache usage.

{{< include-headless "chunk/option-source-ebpf.md" >}}

{{< include-headless "chunk/option-source-flags.md" >}}

{{< include-headless "chunk/option-source-host-override.md" >}}

{{< include-headless "chunk/option-source-otlp-keep-alive.md" >}}

## keep-hostname()

The `syslog-ng-otlp()` source ignores this option and uses the hostname from the message as the `${HOST}`.

{{< include-headless "chunk/option-source-keep-timestamp.md" >}}

{{< include-headless "chunk/option-source-log-fetch-limit.md" >}}

{{< include-headless "chunk/option-source-file-log-iw-size.md" >}}

{{< include-headless "chunk/option-source-log-prefix.md" >}}

{{< include-headless "chunk/option-source-normalize-hostnames.md" >}}

{{% include-headless "chunk/option-persist-name.md" %}}

## port()

|          |        |
| -------- | ------ |
| Type:    | integer |
| Default: |        |

<!-- FIXME what is the default port? -->

*Description:* The port number to bind to.

{{% include-headless "chunk/option-source-program-override.md" %}}

{{< include-headless "chunk/option-source-tags.md" >}}

{{< include-headless "chunk/option-source-time-zone.md" >}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

{{< include-headless "chunk/option-source-use-dns.md" >}}

{{< include-headless "chunk/option-source-use-fqdn.md" >}}

{{< include-headless "chunk/option-source-threaded-workers.md" >}}
