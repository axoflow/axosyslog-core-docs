---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
|           |                          |
| --------- | ------------------------ |
| Type:     | string                   |
| Default:  | `tcp://localhost:1883` |
| Required: | yes                      |

*Description:* Specifies the hostname or IP address, and the port number of the MQTT broker to which {{% param "product.abbrev" %}} will send the log messages.

Syntax: `<protocol type>://<host>:<port>`
