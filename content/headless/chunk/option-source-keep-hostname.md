---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## keep-hostname()

|          |           |
| -------- | --------- |
| Type:    | yes or no |
| Default: | no        |

*Description:* Enable or disable hostname rewriting.

  - If enabled (`keep-hostname(yes)`), {{% param "product.abbrev" %}} assumes that the incoming log message was sent by the host specified in the `HOST` field of the message.

  - If disabled (`keep-hostname(no)`), {{% param "product.abbrev" %}} rewrites the `HOST` field of the message, either to the IP address (if the `use-dns()` parameter is set to `no`), or to the hostname (if the `use-dns()` parameter is set to `yes` and the IP address can be resolved to a hostname) of the host sending the message to {{% param "product.abbrev" %}}. For details on using name resolution in {{% param "product.abbrev" %}}, see {{% xref "/docs/chapter-examples/examples-dns/_index.md" %}}.
    
    s

{{% alert title="Note" color="info" %}}

If the log message does not contain a hostname in its `HOST` field, {{% param "product.abbrev" %}} automatically adds a hostname to the message.

  - For messages received from the network, this hostname is the address of the host that sent the message (this means the address of the last hop if the message was transferred via a relay).

  - For messages received from the local host, {{% param "product.abbrev" %}} adds the name of the host.

{{% /alert %}}

This option can be specified globally, and per-source as well. The local setting of the source overrides the global option if available.

{{% alert title="Note" color="info" %}}

When relaying messages, enable this option on the {{% param "product.abbrev" %}} server and also on every relay, otherwise {{% param "product.abbrev" %}} will treat incoming messages as if they were sent by the last relay.

{{% /alert %}}

