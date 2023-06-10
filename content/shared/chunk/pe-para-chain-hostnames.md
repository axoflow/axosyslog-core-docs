---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
The `chain-hostnames()` option can interfere with the way {{% productparam "abbrev" %}} counts the log source hosts. As a result, {{% productparam "abbrev" %}} falsely perceives several hosts logging to the central server, especially if the clients sends a hostname in the message that is different from its real hostname (as resolved from DNS). Disable the **chain-hostnames()** option on your log sources to avoid any problems related to license counting.
