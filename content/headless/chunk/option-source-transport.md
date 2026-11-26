---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## transport() {#transport}

|          |        |
| -------- | ------ |
| Type:    | `auto`, `lumberjack`, `nul-terminated`, `proxied-tcp`, `proxied-tls`, `proxied-tls-passthrough`, `proxied-udp`, `splunk-s2s`, `tcp`, `text-with-nuls`, `tls`, `udp` |
| Default: | `tcp` |

*Description:* Specifies the protocol used to receive messages from the source.

- `auto`: Available in version 4.10 and later. Automatically detects RFC6587-style octet-count based framing in TCP traffic. In future versions this functionality will be extended to cover and detect all TCP-based protocols.
- `lumberjack`: Available in version 4.30 and later. Receives events from Filebeat, other Beats, and Logstash over the Lumberjack (Beats) protocol. The `lumberjack()` transport has its own options, for example, `transport(lumberjack(max-window-size(2048)))`. For details, see {{% xref "/chapter-sources/lumberjack/_index.md" %}}.
- `nul-terminated`: Available in version 4.21 and later. Uses NUL characters to separate log records instead of newline characters. For example, the following message body will be interpreted as a multi-line message: `line1\nline2\nline3\x00`
- `proxied-tcp`, `proxied-tls`, `proxied-tls-passthrough`, `proxied-udp`: Refers to the HAProxy Proxy Protocol. `proxied-udp` is available in version 4.25 and later. For details, see {{% xref "/chapter-sources/configuring-sources-network/proxy-prot-intro/_index.md" %}}.
- `splunk-s2s`: Available in version 4.30 and later. Receives data from Splunk Universal and Heavy Forwarders over the Splunk-to-Splunk (S2S) protocol. For details, see {{% xref "/chapter-sources/splunk-s2s/_index.md" %}}.
- `text-with-nuls`: Allows embedded `NUL` characters in the message from a TCP source, that is, {{% param "product.abbrev" %}} will not delimiter the incoming messages on `NUL` characters, only on `newline` characters (contrary to `tcp` transport, which splits the incoming log on `newline` characters and `NUL` characters).

    {{% alert title="Note" color="info" %}}

The {{% param "product.abbrev" %}} application does not support embedded `NUL` characters everywhere, so it is recommended that you also use `flags(no-multi-line)` that causes `NUL` characters to be replaced by space.

    {{% /alert %}}
