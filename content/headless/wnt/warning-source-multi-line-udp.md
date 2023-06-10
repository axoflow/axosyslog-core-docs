---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{% alert title="Warning" color="warning" %}}

If you receive messages using the UDP protocol, do not use multi-line processing. If every line of a multi-line message is received in the same UDP packet, everything is fine, but if a multi-line message is fragmented into multiple UDP packets, the order they are received (thus the way how they are processed) cannot be guaranteed, and causes problems.

{{% /alert %}}
