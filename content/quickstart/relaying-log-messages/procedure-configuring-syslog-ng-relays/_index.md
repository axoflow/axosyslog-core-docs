---
title: "Configuring AxoSyslog on relay hosts"
weight:  100
aliases:
- /chapter-quickstart/procedure-configuring-syslog-ng-relays/
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To configure AxoSyslog on a relay host, complete the following steps:


1.  Install the AxoSyslog application on the host. For details on installing AxoSyslog on specific operating systems, see {{% xref "/install/_index.md" %}}.

2.  Configure the network sources that collect the log messages sent by the clients.

3.  Create a network destination that points to the AxoSyslog server.

    {{% alert title="Note" color="info" %}}
If both your clients (or the relay) and the upstream server run {{% param "product.abbrev" %}}, you can use the OpenTelemetry protocol on both legs instead of the syslog protocol: receive messages with an `axosyslog-otlp()` source and forward them with an `axosyslog-otlp()` destination. The `axosyslog-otlp()` driver is available in {{% param "product.abbrev" %}} version 4.12 and later, and requires the `axosyslog-grpc` (or `axosyslog-mod-grpc`) package. For details, see {{% xref "/chapter-sources/source-syslog-ng-otlp/_index.md" %}} and {{% xref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" %}}.
    {{% /alert %}}

4.  Create a log statement connecting the network sources to the AxoSyslog server.

5.  Configure the local sources that collect the log messages of the relay host.

6.  Create a log statement connecting the local sources to the AxoSyslog server.

7.  Enable the `keep-hostname()` and disable the `chain-hostnames()` options. (For details on how these options work, see [Global options]({{< relref "/chapter-global-options/reference-options/_index.md" >}}).)
    
    {{% alert title="Note" color="info" %}}
It is recommended to use these options on your {{% param "product.abbrev" %}} server as well.
    {{% /alert %}}

8.  Set filters and options (for example, TLS encryption) as necessary.
    
    {{< include-headless "wnt/note-relaying-hostname.md" >}}
    
    
## Example: A simple configuration for relays {#example-relayconfig}

The following is a simple configuration file that collects local and incoming log messages and forwards them to a logserver using the IETF-syslog protocol.

```shell
    @version: {{% param "product.configversion" %}}
    @include "scl.conf"
    options {
        time-reap(30);
        mark-freq(10);
        keep-hostname(yes);
        chain-hostnames(no);
    };
    source s_local {
        system(); internal();
    };
    source s_network {
        syslog(transport(tcp));
    };
    destination d_syslog_tcp {
        syslog("192.168.1.5" transport("tcp") port(2010));
    };
    log {
        source(s_local); source(s_network);
        destination(d_syslog_tcp);
    };
```

## Example: A relay configuration using OpenTelemetry {#example-otlprelayconfig}

The following relay configuration receives log messages from {{% param "product.abbrev" %}} clients over the OpenTelemetry protocol and forwards them to the upstream {{% param "product.abbrev" %}} server using the same protocol.

```shell
@version: {{% param "product.configversion" %}}
@include "scl.conf"
options {
    time-reap(30);
    mark-freq(10);
    keep-hostname(yes);
    chain-hostnames(no);
};
source s_local {
    system(); internal();
};
source s_network {
    axosyslog-otlp(port(4317));
};
destination d_otlp {
    axosyslog-otlp(url("192.168.1.5:4317"));
};
log {
    source(s_local); source(s_network);
    destination(d_otlp);
};
```
