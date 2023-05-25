---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
**New option for systemd-journal() source: namespace()**

From version 3.30, the {{% param "product.abbrev" %}} application supports using the `namespace()` option for the `systemd-journal()` source, which works exactly the same way as [the respective option of the Journalctl command line tool](https://www.freedesktop.org/software/systemd/man/journalctl.html#--namespace=NAMESPACE).
