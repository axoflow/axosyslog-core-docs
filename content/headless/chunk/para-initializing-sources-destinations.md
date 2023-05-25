---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
Sources and destinations are initialized only when they are used in a log statement. For example, {{% param "product.abbrev" %}} starts listening on a port or starts polling a file only if the source is used in a log statement. For details on creating log statements, see {{% xref "/docs/chapter-routing-filters/_index.md" %}}.
