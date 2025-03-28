---
title: "The working mechanism behind the Proxy Protocol"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section describes how {{% param "product.name" %}} supports the [Proxy Protocol](https://www.haproxy.com/documentation/haproxy-configuration-tutorials/client-ip-preservation/enable-proxy-protocol/).

## The working mechanism behind the Proxy Protocol

When using the Proxy Protocol during load balancing, {{% param "product.abbrev" %}} detects the information behind connections connected to the load balancer, then parses the injected information into the following macros:

<span id="proxy-prot-adds-macros"></span>

| Data | Macro in version 4.9 and earlier | Version 4.10 and later |
| -------- | ------ | ------ |
| Source IP of the proxy | `PROXY_SRCIP` | `SOURCEIP` |
| Source port of the proxy | `PROXY_SRCPORT` | `SOURCEPORT` |
| Destination IP of the proxy | `PROXY_DSTIP` | `DESTIP` |
| Destination port of the proxy | `PROXY_DSTPORT` | `DESTPORT` |

{{% alert title="Note" color="info" %}}

Consider the following about macros and headers:

- When the proxy protocol header is `PROXY UNKNOWN`, no additional macros are added.
- When {{% param "product.abbrev" %}} cannot parse a proxy protocol header, the connection is closed:

    ```shell
    [2020-11-20T17:33:22.189458] PROXY protocol header received; line='PROXYdsfj'
    [2020-11-20T17:33:22.189475] Error parsing PROXY protocol header;
    [2020-11-20T17:33:22.189517] Syslog connection closed; fd='13', client='AF_INET(127.0.0.1:51665)', local='AF_INET(0.0.0.0:6666)'
    [2020-11-20T17:33:22.189546] Freeing PROXY protocol source driver; driver='0x7fffcba5bcf0'
    [2020-11-20T17:33:22.189600] Closing log transport fd; fd='13'
    ```

{{% /alert %}}

{{% alert title="Note" color="info" %}}
Originally, the driver supported version 1 of the PROXY protocol (TCP4, TCP6, and TLS connections). PROXY protocol v2 support is available in {{% param "product.abbrev" %}} version 4.1 and later.
{{% /alert %}}
