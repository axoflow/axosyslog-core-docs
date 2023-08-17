---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

*Description:* Specifies the number of worker threads (at least 1) that {{% param "product.abbrev" %}} uses to send messages to the server. Increasing the number of worker threads can drastically improve the performance of the destination.

{{< include-headless "wnt/warning-diskbuffer-workers.md" >}}
