---
title: "syslog: Collect messages using the IETF-syslog protocol"
weight:  3900
driver: "syslog()"
short_description: "Collect messages using the IETF-syslog protocol"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `syslog()` driver can receive messages from the network using the standard IETF-syslog protocol (as described in RFC5424-26). UDP, TCP, and TLS-encrypted TCP can all be used to transport the messages.

{{% alert title="Note" color="info" %}}

The `syslog()` driver can also receive BSD-syslog-formatted messages (described in RFC 3164, see {{% xref "/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/_index.md" %}}) if they are sent using the IETF-syslog protocol.

In {{% param "product.abbrev" %}} versions 3.1 and earlier, the `syslog()` driver could handle only messages in the IETF-syslog (RFC 5424-26) format.

Starting with version 4.10, {{% param "product.abbrev" %}} can automatically detect RFC6587-style octet-count based framing. For details, see the [transport option]({{< relref "/chapter-sources/source-syslog/reference-source-syslog-chapter/_index.md#transport" >}}).

{{% /alert %}}

For the list of available optional parameters, see {{% xref "/chapter-sources/source-syslog/reference-source-syslog-chapter/_index.md" %}}.


## Declaration:

```shell
   syslog(ip() port() transport() options());
```



## Example: Using the syslog() driver {#example-source-syslog}

TCP source listening on the localhost on port 1999.

```shell
   source s_syslog { syslog(ip(127.0.0.1) port(1999) transport("tcp")); };
```

UDP source with defaults.

```shell
   source s_udp { syslog( transport("udp")); };
```

Encrypted source where the client is also authenticated. For details on the encryption settings, see {{% xref "/chapter-encrypted-transport-tls/tlsoptions/_index.md" %}}.

```shell
   source s_syslog_tls{ syslog(
        ip(10.100.20.40)
        transport("tls")
        tls(
        peer-verify(required-trusted)
        ca-dir('/opt/syslog-ng/etc/syslog-ng/keys/ca.d/')
        key-file('/opt/syslog-ng/etc/syslog-ng/keys/server_privatekey.pem')
        cert-file('/opt/syslog-ng/etc/syslog-ng/keys/server_certificate.pem')
        )
        );
    };
```


{{< include-headless "wnt/warning-udp-recvbuf.md" >}}
