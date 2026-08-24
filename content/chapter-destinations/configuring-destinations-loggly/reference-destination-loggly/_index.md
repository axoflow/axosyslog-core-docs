---
title: "loggly() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `loggly()` destination has the following options.

The `loggly()` destination is a reusable configuration snippet based on the `network()` destination, so you can use the [options of the `network()` destination]({{< relref "/chapter-destinations/configuring-destinations-network/reference-destination-network-chapter/_index.md" >}}) as well. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/master/scl/loggly/loggly.conf). Note that the `loggly()` destination changes the default value of the following `network()` options.

<!-- FIXME include/reference network() options -->

{{< include-headless "chunk/option-hook-commands.md" >}}


{{% include-headless "chunk/option-tls.md" %}}



## token() {#loggly-option-token}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* Your Customer Token that you received from Loggly.



{{% include-headless "chunk/option-destination-transport.md" %}}

## port()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | `514` |

*Description:* For details, see [`port()`]({{< relref "/chapter-destinations/configuring-destinations-network/reference-destination-network-chapter/_index.md" >}}#port-or-destport) of the `network()` destination. The `loggly()` destination changes the default value of the underlying `network()` destination from `601` to `514`, the port that the Loggly syslog endpoint listens on.
