---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{% alert title="Warning" color="warning" %}}

If you reload {{% param "product.abbrev" %}}, existing Python objects are destroyed, therefore the context and state information of Python blocks is lost. Log rotation and updating the configuration of {{% param "product.abbrev" %}} typically involves a reload.

{{% /alert %}}
