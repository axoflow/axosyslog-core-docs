---
title: "logmatic() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `logmatic()` destination has the following options.

The `logmatic()` destination is a reusable configuration snippet based on the `network()` destination, so you can use the [options of the `network()` destination]({{< relref "/chapter-destinations/configuring-destinations-network/reference-destination-network-chapter/_index.md" >}}) as well. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/master/scl/logmatic/logmatic.conf). Note that the `logmatic()` destination changes the default value of the following `network()` options.

<!-- FIXME include/reference network() options -->

{{< include-headless "chunk/option-hook-commands.md" >}}

## token() {#logmatic-option-token}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* Your API Key that you received from Logmatic.io.

## port()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | `10514` |

*Description:* For details, see [`port()`]({{< relref "/chapter-destinations/configuring-destinations-network/reference-destination-network-chapter/_index.md" >}}#port-or-destport) of the `network()` destination. The `logmatic()` destination changes the default value of the underlying `network()` destination from `601` to `10514`, the port that the Logmatic.io endpoint listens on.

## so-keepalive()

|          |           |
| -------- | --------- |
| Type:    | yes or no |
| Default: | `yes`     |

*Description:* For details, see [`so-keepalive()`]({{< relref "/chapter-destinations/configuring-destinations-network/reference-destination-network-chapter/_index.md" >}}#so-keepalive) of the `network()` destination. The `logmatic()` destination changes the default value of the underlying `network()` destination from `no` to `yes`, so that the connection to the Logmatic.io endpoint stays open.
