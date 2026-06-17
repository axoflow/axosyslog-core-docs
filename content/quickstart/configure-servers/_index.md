---
title: "Configuring AxoSyslog on server hosts"
weight:  300
aliases:
- /chapter-quickstart/configure-servers/
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To configure AxoSyslog on a server host, complete the following steps.

1. Install the AxoSyslog application on the host. For details installing AxoSyslog on specific operating systems, see {{% xref "/install/_index.md" %}}.
1. {{% param "product.abbrev" %}} automatically collects the log messages that use the native system logging method of the platform, for example, messages from `/dev/log` on Linux, or `/dev/klog` on FreeBSD. For a complete list of messages that are collected automatically, see {{% xref "/chapter-sources/source-system/_index.md" %}}.
1. {{< include-headless "chunk/para-config-file-location.md" >}}

    Configure the network sources that collect the log messages sent by the clients and relays. How the network sources should be configured depends also on the capabilities of your client hosts: many older networking devices support only the legacy BSD-syslog protocol (RFC3164) using UDP transport:

    ```shell
    source s_network {
        syslog(ip(10.1.2.3) transport("udp"));
    };
    ```

    However, if possible, use the much more reliable TCP transport:

    ```shell
    source s_network {
        syslog(ip(10.1.2.3) transport("tcp"));
    };
    ```

    If your clients are also {{% param "product.abbrev" %}} nodes, you can receive their messages over the OpenTelemetry protocol with the `axosyslog-otlp()` source. This preserves the internal representation of the messages, and adds scalability, application-layer acknowledgement, and improved load balancing:

    ```shell
    source s_otlp {
        axosyslog-otlp(port(4317));
    };
    ```

    {{% alert title="Note" color="info" %}}
The `axosyslog-otlp()` driver is available in {{% param "product.abbrev" %}} version 4.12 and later, and requires the `axosyslog-grpc` (or `axosyslog-mod-grpc`) package. For all options, see {{% xref "/chapter-sources/source-syslog-ng-otlp/_index.md" %}}. To receive data from a third-party OpenTelemetry sender rather than another {{% param "product.abbrev" %}} node, use the {{% xref "/chapter-sources/opentelemetry/_index.md" %}} source.
    {{% /alert %}}

    For other options, see {{% xref "/chapter-sources/source-syslog/_index.md" %}} and {{% xref "/chapter-sources/configuring-sources-tcpudp/_index.md" %}}.

    {{% alert title="Note" color="info" %}}
Starting with {{% param "product.abbrev" %}} version 3.2, the `syslog()` source driver can handle both BSD-syslog (RFC 3164) and IETF-syslog (RFC 5424-26) messages.
    {{% /alert %}}

1. Create local destinations that will store the log messages, for example, file- or program destinations. The default configuration of {{% param "product.abbrev" %}} places the collected messages into the `/var/log/messages` file:

    ```shell
    destination d_local {
        file("/var/log/messages");
    };
    ```

    If you want to create separate logfiles for every client host, use the `${HOST}` macro when specifying the filename, for example:

    ```shell
    destination d_local {
        file("/var/log/messages_${HOST}");
    };
    ```

    For details on further macros and how to use them, see {{% xref "/chapter-manipulating-messages/_index.md" %}}.

1. Create a log statement connecting the sources to the local destinations.

    ```shell
    log {
        source(s_local); source(s_network); destination(d_local);
    };
    ```

1. Set filters, options (for example, TLS encryption) and other advanced features as necessary.

    {{< include-headless "wnt/note-relaying-hostname.md" >}}

## Example: A simple configuration for servers {#example-serverconfig}

The following is a simple configuration file for {{% param "product.name" %}} that collects incoming log messages and stores them in a text file.

```shell
@version: {{% param "product.configversion" %}}
@include "scl.conf"
options {
    time-reap(30);
    mark-freq(10);
    keep-hostname(yes);
};
source s_local {
    system(); internal();
};
source s_network {
    syslog(transport(tcp));
};
destination d_logs {
    file(
        "/var/log/syslog-ng/logs.txt"
        owner("root")
        group("root")
        perm(0777)
        );
    };
log {
    source(s_local); source(s_network); destination(d_logs);
};
```

## Example: An OpenTelemetry server configuration {#example-otlpserverconfig}

The following configuration receives log messages from {{% param "product.abbrev" %}} clients over the OpenTelemetry protocol and stores them in a text file.

```shell
@version: {{% param "product.configversion" %}}
@include "scl.conf"
source s_local {
    system(); internal();
};
source s_otlp {
    axosyslog-otlp(port(4317));
};
destination d_logs {
    file("/var/log/syslog-ng/logs.txt");
};
log {
    source(s_local); source(s_otlp); destination(d_logs);
};
```
