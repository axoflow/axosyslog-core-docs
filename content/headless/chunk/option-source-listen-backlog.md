---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## listen-backlog()

|          |         |
| -------- | ------- |
| Type:    | integer |
| Default: | 256     |

*Description:* Available only for stream based transports (`unix-stream`, `tcp`, `tls`). In TCP, connections are treated incomplete until the three-way handshake is completed between the server and the client. Incomplete connection requests wait on the TCP port for the listener to accept the request. The `listen-backlog()` option sets the maximum number of incomplete connection requests. For example:

```c
   source s_network {
        network(
            ip("192.168.1.1")
            transport("tcp")
            listen-backlog(2048)
            );
    };
```

