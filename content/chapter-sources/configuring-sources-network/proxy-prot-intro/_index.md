---
title: "Proxy Protocol support"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

If you connect load balancers to your {{% param "product.abbrev" %}} application, {{% param "product.abbrev" %}} identifies every connection that is connected to the load balancers identically by default, regardless of the source IP or the source protocol. Essentially, the load balancer masks the source IP unless you enable [Proxy Protocol](https://www.haproxy.com/blog/haproxy/proxy-protocol/) support for your proxy TLS `transport()` to inject information about the original connection into the forwarded TCP session.

For further details about the working mechanism behind the Proxy Protocol support on {{% param "product.abbrev" %}} and the configuration details, see the following sections:
