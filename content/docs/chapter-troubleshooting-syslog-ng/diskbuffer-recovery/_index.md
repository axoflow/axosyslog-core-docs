---
title: "Recover data from orphaned diskbuffer files"
weight:  1300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

When you change the configuration of a {{% productparam "abbrev" %}} host that uses disk-based buffering (also called disk queue), {{% productparam "abbrev" %}} may start new disk buffer files for the destinations that you have changed. In this case, {{% productparam "abbrev" %}} abandons the old disk queue files. If there were unsent log messages in the disk queue files, these messages remain in the disk queue files, and will not be sent to the destinations.
