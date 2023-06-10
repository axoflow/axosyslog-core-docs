---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## so-reuseport()

|          |           |
| -------- | --------- |
| Type:    | yes or no |
| Default: | no        |

*Description:* Enables SO_REUSEPORT on systems that support it. When enabled, the kernel allows multiple UDP sockets to be bound to the same port, and the kernel load-balances incoming UDP datagrams to the sockets. The sockets are distributed based on the hash of (srcip, dstip, srcport, dstport), so the same listener should be receiving packets from the same endpoint. For example:

```c
   source {
            udp(so-reuseport(1) port(2000) persist-name("udp1"));
            udp(so-reuseport(1) port(2000) persist-name("udp2"));
            udp(so-reuseport(1) port(2000) persist-name("udp3"));
            udp(so-reuseport(1) port(2000) persist-name("udp4"));
    };

```

Enables keep-alive messages, keeping the socket open. This only effects TCP and UNIX-stream sockets. For details, see the `socket(7)` manual page.

