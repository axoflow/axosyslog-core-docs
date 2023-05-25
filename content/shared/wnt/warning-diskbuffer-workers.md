---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{% alert title="Warning" color="warning" %}}

**Hazard of data loss.** When you use more than one worker threads together with disk-based buffering, {{% param "product.abbrev" %}} creates a separate disk buffer for each worker thread. This means that decreasing the number of workers can result in losing data currently stored in the disk buffer files. Do not decrease the number of workers when the disk buffer files are in use.

{{% /alert %}}
