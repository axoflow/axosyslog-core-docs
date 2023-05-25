---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## host()

|          |                        |
| -------- | ---------------------- |
| Type:    | hostname or IP address |
| Default: | n/a                    |

*Description:* Hostname or IP address of the SMTP server.

{{% alert title="Note" color="info" %}}

If you specify `host="localhost"`, {{% productparam "abbrev" %}} will use a socket to connect to the local SMTP server. Use **host="127.0.0.1"** to force TCP communication between {{% productparam "abbrev" %}} and the local SMTP server.

{{% /alert %}}

