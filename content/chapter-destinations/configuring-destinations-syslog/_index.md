---
title: "syslog: Send messages to a remote logserver using the IETF-syslog protocol"
weight:  6500
driver: "syslog()"
short_description: "Send messages to a remote logserver using the IETF-syslog protocol"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `syslog()` driver sends messages to a remote host (for example, a syslog-ng server or relay) on the local intranet or internet using the new standard syslog protocol developed by IETF (for details about the new protocol, see {{% xref "/chapter-concepts/concepts-message-structure/concepts-message-ietfsyslog/_index.md" %}}). The protocol supports sending messages using the UDP, TCP, or the encrypted TLS networking protocols.

The required arguments of the driver are the address of the destination host (where messages should be sent). The transport method (networking protocol) is optional, syslog-ng uses the TCP protocol by default. For the list of available optional parameters, see {{% xref "/chapter-destinations/configuring-destinations-syslog/reference-destination-syslog-chapter/_index.md" %}}.


## Declaration:

```shell
   syslog(host transport [options]);
```


{{% alert title="Note" color="info" %}}

Note that the `syslog` destination driver has required parameters, while the source driver defaults to the local bind address, and every parameter is optional.

{{% /alert %}}

The `udp` transport method automatically sends multicast packets if a multicast destination address is specified. The `tcp` and `tls` methods do not support multicasting.

{{% alert title="Note" color="info" %}}

The default ports for the different transport protocols are as follows: UDP — 514, TCP — 514, TLS — 6514.

{{% /alert %}}


## Example: Using the syslog() driver {#example-destination-syslog}

```shell
   destination d_tcp { syslog("10.1.2.3" transport("tcp") port(1999) localport(999)); };
```

If name resolution is configured, the hostname of the target server can be used as well.

```shell
   destination d_tcp { syslog("target_host" transport("tcp") port(1999) localport(999)); };
```

Send the log messages using TLS encryption and use mutual authentication. For details on the encryption and authentication options, see {{% xref "/chapter-encrypted-transport-tls/tlsoptions/_index.md" %}}.

```shell
   destination d_syslog_tls {
        syslog("10.100.20.40"
            transport("tls")
            port(6514)
            tls(peer-verify(required-trusted)
                ca-dir('/opt/syslog-ng/etc/syslog-ng/keys/ca.d/')
                key-file('/opt/syslog-ng/etc/syslog-ng/keys/client_key.pem')
                cert-file('/opt/syslog-ng/etc/syslog-ng/keys/client_certificate.pem')
            )
        );
    };
```


{{< include-headless "wnt/note-formatting-messages.md" >}}
