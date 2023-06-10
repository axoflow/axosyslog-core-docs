---
title: "Timezones and daylight saving"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `syslog-ng` application receives the timezone and daylight saving information from the operating system it is installed on. If the operating system handles daylight saving correctly, so does `syslog-ng`.

The `syslog-ng` application supports messages originating from different timezones. The original syslog protocol (RFC3164) does not include timezone information, but `syslog-ng` provides a solution by extending the syslog protocol to include the timezone in the log messages. The `syslog-ng` application also enables administrators to supply timezone information for legacy devices which do not support the protocol extension.
