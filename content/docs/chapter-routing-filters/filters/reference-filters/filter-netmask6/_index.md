---
title: "netmask6()"
weight:  1700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

|           |                     |
| --------- | ------------------- |
| Synopsis: | netmask6(ipv6/mask) |

*Description:* Select only messages sent by a host whose IP address belongs to the specified IPv6 subnet. Note that this filter checks the IP address of the last-hop relay (the host that actually sent the message to {{% productparam "abbrev" %}}), not the contents of the `HOST` field of the message. You can use both the regular and the compressed format to specify the IP address, for example, `1080:0:0:0:8:800:200C:417A` or `1080::8:800:200C:417A`. If you do not specify the address, `localhost` is used.

Use the netmask (also called prefix) to specify how many of the leftmost bits of the address comprise the netmask (values 1-128 are valid). For example, the following specify a 60-bit prefix: `12AB:0000:0000:CD30:0000:0000:0000:0000/60` or `12AB::CD30:0:0:0:0/60`. Note that if you set an IP address and a prefix, {{% productparam "abbrev" %}} will ignore the bits of the address after the prefix. To filter IPv4 addresses, see {{% xref "/docs/chapter-routing-filters/filters/reference-filters/filter-netmask/_index.md" %}}.

The `netmask6()` filter is available in {{% productparam "abbrev" %}} {{% conditional-text include-if="pe" %}}5.0.8 and 5.2.2{{% /conditional-text %}}{{% conditional-text include-if="ose" %}}3.7{{% /conditional-text %}} and later.

{{% alert title="Warning" color="warning" %}}

If the IP address is not syntactically correct, the filter will never match. The {{% productparam "abbrev" %}} application currently does not send a warning for such configuration errors.

{{% /alert %}}
