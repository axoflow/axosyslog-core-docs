---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## host()

|          |                        |
| -------- | ---------------------- |
| Type:    | hostname or IP address |
| Default: | n/a                    |

*Description:* Hostname of the database server. Note that Oracle destinations do not use this parameter, but retrieve the hostname from the `/etc/tnsnames.ora` file.

{{% alert title="Note" color="info" %}}

If you specify `host="localhost"`, AxoSyslog will use a socket to connect to the local database server. Use `host="127.0.0.1"` to force TCP communication between AxoSyslog and the local database server.

To specify the socket to use, set and export the `MYSQL_UNIX_PORT` environment variable, for example, `MYSQL_UNIX_PORT=/var/lib/mysql/mysql.sock; export MYSQL_UNIX_PORT`.

{{% /alert %}}

