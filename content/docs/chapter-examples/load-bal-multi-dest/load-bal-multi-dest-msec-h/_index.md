---
title: Configuration generator for the load balancing method based on MSEC hashing
weight: 200
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section describes a configuration generator for the load balancing method based on MSEC hashing to load balance your logs between multiple {{% param "product.name" %}} destinations.

{{% alert title="Warning" color="warning" %}}

Consider that `network-load-balancer()` is not a destination, only a script that generates the example configuration described in {{% xref "/docs/chapter-examples/load-bal-multi-dest/load-bal-multi-dest-macro/_index.md" %}}.

Also consider that the configuration generator script may change incompatibly in the future. As a result, {{% param "product.companyabbrev" %}} does not officially support using this script, and recommends that you only use this script at your own risk.

{{% /alert %}}

As an alternative to using the example configuration described in {{% xref "/docs/chapter-examples/load-bal-multi-dest/load-bal-multi-dest-macro/_index.md" %}}, a configuration generator script is also available in {{% param "product.abbrev" %}}:

```c
   destination d_lb {network-load-balancer(targets(myhost1 myhost2 myhost3))};
```

Where destinations share the same configuration except for the destination address, balancing is based on MSEC hashing.
