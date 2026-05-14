---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## hook-commands()

*Description:* This option makes it possible to execute external programs when the relevant driver is initialized or torn down. The `hook-commands()` can be used with all source and destination drivers with the exception of the `usertty()` and `internal()` drivers.


{{% alert title="Note" color="info" %}}

The {{% param "product.abbrev" %}} application must be able to start and restart the external program, and have the necessary permissions to do so. For example, if your host is running AppArmor or {{% param "product.selinux" %}}, you might have to modify your AppArmor or {{% param "product.selinux" %}} configuration to enable {{% param "product.abbrev" %}} to execute external applications.

{{% /alert %}}


### Using `hook-commands()` when {{% param "product.abbrev" %}} starts or stops

To execute an external program when {{% param "product.abbrev" %}} starts or stops, use the following options:

#### `startup()`

| Type: | string |
|-------|--------|
| Default: | N/A |

*Description:* Defines the external program that is executed as {{% param "product.abbrev" %}} starts.

#### `shutdown()`

| Type: | string |
|-------|--------|
| Default: | N/A |

*Description:* Defines the external program that is executed as {{% param "product.abbrev" %}} stops.


### Using the hook-commands() when {{% param "product.abbrev" %}} reloads

To execute an external program when the {{% param "product.abbrev" %}} configuration is initiated or torn down, for example, on startup/shutdown or during a {{% param "product.abbrev" %}} reload, use the following options:

#### `setup()`

| Type: | string |
|-------|--------|
| Default: | N/A |

*Description:* Defines an external program that is executed when the {{% param "product.abbrev" %}} configuration is initiated, for example, on startup or during a {{% param "product.abbrev" %}} reload.

#### `teardown()`

| Type: | string |
|-------|--------|
| Default: | N/A |


*Description:* Defines an external program that is executed when the {{% param "product.abbrev" %}} configuration is stopped or torn down, for example, on shutdown or during a {{% param "product.abbrev" %}} reload.


### Example: Using hook-commands() with a network source

In the following example, the `hook-commands()` is used with the `network()` driver and it opens an [iptables](https://en.wikipedia.org/wiki/Iptables "https://en.wikipedia.org/wiki/Iptables") port automatically as {{% param "product.abbrev" %}} is started/stopped.

The assumption in this example is that the `LOGCHAIN` chain is part of a larger ruleset that routes traffic to it. Whenever the {{% param "product.abbrev" %}} created rule is there, packets can flow, otherwise the port is closed.

```shell
source {
    network(transport(udp)
    hook-commands(
          startup("iptables -I LOGCHAIN 1 -p udp --dport 514 -j ACCEPT")
          shutdown("iptables -D LOGCHAIN 1")
        )
     );
};
```
