---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## transport() {#transport}

|          |        |
| -------- | ------ |
| Type:    | `auto`, `proxied-tcp`, `proxied-tls`, `proxied-tls-passthrough`, `tcp`, `text-with-nuls`, `tls`, `udp` |
| Default: | tcp |

*Description:* Specifies the protocol used to receive messages from the source.

- `auto`: Available in version 4.10 and later. Automatically detects RFC6587-style octet-count based framing in TCP traffic. In future versions this functionality will be extended to cover and detect all TCP-based protocols.
- `proxied-tcp`, `proxied-tls`, `proxied-tls-passthrough`: Refers to the HAProxy Proxy Protocol. For details, see {{% xref "/chapter-sources/configuring-sources-network/proxy-prot-intro/_index.md" %}}.
- `text-with-nuls`: Allows embedded `NUL` characters in the message from a TCP source, that is, {{% param "product.abbrev" %}} will not delimiter the incoming messages on `NUL` characters, only on `newline` characters (contrary to `tcp` transport, which splits the incoming log on `newline` characters and `NUL` characters).

    {{% alert title="Note" color="info" %}}

The {{% param "product.abbrev" %}} application does not support embedded `NUL` characters everywhere, so it is recommended that you also use `flags(no-multi-line)` that causes `NUL` characters to be replaced by space.

    {{% /alert %}}
