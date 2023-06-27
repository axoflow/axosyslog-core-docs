---
title: "default-network-drivers: Receive and parse common syslog messages"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `default-network-drivers()` source is a special source that uses multiple source drivers to receive and parse several different types of syslog messages from the network. Available in version 3.16 and later.

To use the `default-network-drivers()` source, the `scl.conf` file must be included in your {{% param "product.abbrev" %}} configuration:

```c
   @include "scl.conf"
```

Also, make sure that your {{% param "product.selinux" %}}, {{% param "product.apparmor" %}}, and firewall settings permit {{% param "product.name" %}} to access the ports where you want to receive messages, and that no other application is using these ports. By default, the `default-network-drivers()` source accepts messages on the following ports:

  - 514, both TCP and UDP, for RFC3164 (BSD-syslog) formatted traffic

  - 601 TCP, for RFC5424 (IETF-syslog) formatted traffic

  - 6514 TCP, for TLS-encrypted traffic

In addition to receiving messages on different ports and in different formats, this source tries to parse the messages automatically. If successful, it sets the `${.app.name}` name-value pair to the name of the application that sent the log message. Currently it uses the following procedures.

{{% alert title="Warning" color="warning" %}}

If you do not configure the TLS keys to dislay to the clients, {{% param "product.abbrev" %}} cannot accept encrypted connections. The application starts and listens on TCP:6514, and can receive messages on other ports, but will display a warning messages about missing keys.

{{% /alert %}}


## Parsing RFC3164-formatted messages

For RFC3164-formatted messages (that is, messages received on the ports set in options `udp-port()` and `tcp-port()` which default to port 514), {{% param "product.abbrev" %}} attempts to use the following parsers. If a parser cannot parse the message, it passes the original message to the next parser.

1.  Parse the incoming raw message as a [message from a Cisco device]({{< relref "/chapter-parsers/cisco-parser/_index.md" >}}).

2.  Parse the incoming message as an [RFC3164-formatted message]({{< relref "/chapter-parsers/parser-syslog/_index.md" >}}).
    
      - If the incoming message was sent by a {{% param "product.abbrev" %}} client using the [`syslog-ng()` destination]({{< relref "/chapter-destinations/destination-syslog-ng/_index.md" >}}), parse its fields as a [AxoSyslog message]({{< relref "/chapter-parsers/parser-ewmm/_index.md" >}}).
        
        {{% include-headless "chunk/ewmm-intro.md" %}}
    
      - Otherwise, apply the application adapters if the message was sent from an application that already has a specific parser in {{% param "product.abbrev" %}} (for example, Splunk Common Information Model (CIM), [iptables]({{< relref "/chapter-parsers/parser-iptables/_index.md" >}}), or [sudo]({{< relref "/chapter-parsers/parser-sudo/_index.md" >}})).



## Parsing RFC5424-formatted messages

For RFC5424-formatted messages (that is, messages received on the ports set in options `rfc5424-tls-port()` and `rfc5424-tcp-port()`, which default to port 601 and 6514), {{% param "product.abbrev" %}} parses the message according to RFC5424, then attempts apply the application adapters if the message was sent from an application that already has a specific parser in {{% param "product.abbrev" %}} (for example, Splunk Common Information Model (CIM), [iptables]({{< relref "/chapter-parsers/parser-iptables/_index.md" >}}), or [sudo]({{< relref "/chapter-parsers/parser-sudo/_index.md" >}})).


## Example: Using the default-network-drivers() driver {#example-source-default-network-drivers}

The following example uses only the default settings.

```c
   source s_network {
        default-network-drivers();
    };
```

The following example can receive TLS-encrypted connections on the default port (port 6514).

```c
   source s_network {
        default-network-drivers(
            tls(
                key-file("/path/to/ssl-private-key")
                cert-file("/path/to/ssl-cert")
            )
        );
    };
```


