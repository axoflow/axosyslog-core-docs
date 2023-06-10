---
title: "host()"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

|           |              |
| --------- | ------------ |
| Synopsis: | host(regexp) |

*Description:* Match messages by using a regular expression against the hostname field of log messages. Note that you can filter only on the actual content of the HOST field of the message (or what it was rewritten to). That is, {{% param "product.abbrev" %}} will compare the filter expression to the content of the ${HOST} macro. This means that for the IP address of a host will not match, even if the IP address and the hostname field refers to the same host. To filter on IP addresses, use the [`netmask()`]({{< relref "/docs/chapter-routing-filters/filters/reference-filters/filter-netmask/_index.md" >}}) filter.

```c
   filter demo_filter { host("example") };
```
