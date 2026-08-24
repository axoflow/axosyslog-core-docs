---
title: "graylog2() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `graylog2()` destination has the following options.

The `graylog2()` destination is a reusable configuration snippet based on the `network()` destination, so you can use the [options of the `network()` destination]({{< relref "/chapter-destinations/configuring-destinations-network/reference-destination-network-chapter/_index.md" >}}) as well. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/master/scl/graylog2/plugin.conf). Note that the `graylog2()` destination changes the default value of the following `network()` option.

<!-- FIXME include/reference network() options -->

{{% include-headless "chunk/option-destination-tls-ca-dir.md" %}}

{{< include-headless "chunk/option-destination-tls-ca-file.md" >}}

{{< include-headless "chunk/option-hook-commands.md" >}}

{{% include-headless "chunk/option-tls.md" %}}

{{% include-headless "chunk/option-destination-transport.md" %}}

## port() {#graylog2-option-port}

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | `12201` |

*Description:* For details, see [`port()`]({{< relref "/chapter-destinations/configuring-destinations-network/reference-destination-network-chapter/_index.md" >}}#port-or-destport) of the `network()` destination. The `graylog2()` destination changes the default value of the underlying `network()` destination from `601` to `12201`, the port that the Graylog GELF TCP input listens on.
