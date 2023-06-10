---
title: "Proxy Protocol: configuration and output examples"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section provides information about enabling Proxy Protocol support in your `network()` source options, and an example configuration and output to illustrate how the Proxy Protocol method works in {{% param "product.name" %}}.

For more information about the working mechanism of the Proxy Protocol, see {{% xref "/docs/chapter-sources/configuring-sources-network/proxy-prot-intro/proxy-prot-w-mech/_index.md" %}}.


## Enabling Proxy Protocol support for your network() source options

Unless you enable Proxy Protocol support for your `network()` source, {{% param "product.abbrev" %}} identifies every connection that is connected to the load balancers identically by default, regardless of the source IP or the source protocol.

To enable Proxy Protocol for your `network()` source, set [the `transport()` parameter of your `network()` source]({{< relref "/docs/chapter-sources/configuring-sources-network/reference-source-network/_index.md" >}}) to `proxied-tcp` or `proxied-tls-passthrough`, depending on your preference and configuration.

`proxied-tls` can be used in complex MITM (man in the middle) configurations, where the proxy header is sent encrypted within the same TLS session as the proxied messages.

When you enable Proxy Protocol support for your `network()` source, you can use the following configuration example with your {{% param "product.abbrev" %}} application.



## Configuration

The following code sample illustrates how you can use the Proxy Protocol in your {{% param "product.abbrev" %}} configuration (using the `transport()` parameter set to `proxied-tls-passthrough`).

```c
   @version: 3.35
    
    source s_tcp_pp {
      network (
        port(6666)
        transport("proxied-tls-passthrough")
        tls(
            key-file("/certs/certs/server/server.rsa")
            cert-file("/certs/certs/server/server.crt")
            ca-dir("/certs/certs/CA")
            peer-verify("required-trusted")
        )
      );
    };
    
    destination d_file {
      file("/var/log/proxy-proto.log" template("$(format-json --scope nv-pairs)\n"));
    };
    
    log {
      source(s_tcp_pp);
      destination(d_file);
    };
```

With this configuration, the Proxy Protocol method will perform injecting the information of the original connection into the forwarded TCP session, based on the working mechanism described in {{% xref "/docs/chapter-sources/configuring-sources-network/proxy-prot-intro/proxy-prot-w-mech/_index.md" %}}.

The following example illustrates how the parsed macros will appear in the output.


## Example: Output for the PROXY TCP4 192.168.1.1 10.10.0.1 1111 2222 input header

With the `PROXY TCP4 192.168.1.1 10.10.0.1 1111 2222` input header, the output looks like this:

```c
   {"SOURCE":"s_tcp_pp","PROXIED_SRCPORT":"1111","PROXIED_SRCIP":"192.168.1.1","PROXIED_IP_VERSION":"4","PROXIED_DSTPORT":"2222","PROXIED_DSTIP":"10.10.0.1","PROGRAM":"TestMsg","MESSAGE":"","LEGACY_MSGHDR":"TestMsg","HOST_FROM":"localhost","HOST":"localhost"}
```

Note that the [macros]({{< relref "/docs/chapter-sources/configuring-sources-network/proxy-prot-intro/proxy-prot-w-mech/_index.md#proxy-prot-adds-macros" >}}) that {{% param "product.abbrev" %}} adds to the message appear in the output.


