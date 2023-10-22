---
title: "High availability support"
weight:  1300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Multiple {{% param "product.abbrev" %}} servers can be run in fail-over mode. The {{% param "product.abbrev" %}} application does not include any internal support for this, as clustering support must be implemented on the operating system level. A tool that can be used to create UNIX clusters is Heartbeat (for details, see [this page](http://www.linux-ha.org/wiki/Main_Page/)).

Starting with {{% param "product.name" %}} version 3.2, {{% param "product.abbrev" %}} clients can be configured to send the log messages to failover servers in case the primary syslog server becomes unaccessible. For details on configuring failover servers, see the description of the `failover-servers()` destination option in {{% xref "/chapter-destinations/_index.md" %}}.
