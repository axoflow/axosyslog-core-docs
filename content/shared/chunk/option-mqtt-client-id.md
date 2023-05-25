---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## client-id()

|           |                                     |
| --------- | ----------------------------------- |
| Type:     | string                              |
| Default:  | `syslog-ng-source-{topic option}` |
| Required: | no                                  |

*Description:* The `client-id()` is used to identify the client to the MQTT server, which stores session data for each client. The session data can contains information regarding which message has been sent, received. It is not possible to set the `client-id()` to an empty string. To always start a new session see the `cleansession()` option.

