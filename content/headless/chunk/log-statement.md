---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
The following log statement sends all messages arriving to the localhost to a remote server.

```shell
   source s_localhost {
        network(
            ip(127.0.0.1)
            port(1999)
        );
    };
    destination d_tcp {
        network("10.1.2.3"
            port(1999)
            localport(999)
        );
    };
    log {
        source(s_localhost);
        destination(d_tcp);
    };
```
