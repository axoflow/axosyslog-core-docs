---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## keep-alive()

|          |                                      |
| -------- | ------------------------------------ |
| Type:    | positive integer number (in seconds) |
| Default: | `60`                               |

*Description:* Specifies the number of seconds that {{% productparam "abbrev" %}} keeps the connection between the broker and clients open in case there is no message traffic. When `keep-alive()` number of seconds pass, the connection is terminated, and you have to reconnect.

On the MQTT side, the keep alive function provides a workaround method to access connections that are still open.

