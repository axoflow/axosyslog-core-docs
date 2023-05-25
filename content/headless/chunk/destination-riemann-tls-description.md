---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
Note that you have to set the `cert-file()` and `key-file()` options only if the Riemann server requires authentication from the clients.

*Alternative 1:*

```c

    type(
        "tls"
     cert-file("/opt/syslog-ng/etc/syslog-ng/riemann-client-cert.pem")
        key-file("/opt/syslog-ng/etc/syslog-ng/riemann-client-cert.key")
        )

```

*Alternative 2:*

```c

    riemann(
        .
        .
        type("tls")
            tls(
                  cert-file("/opt/syslog-ng/etc/syslog-ng/riemann-client-cert.pem")
                  key-file("/opt/syslog-ng/etc/syslog-ng/riemann-client-cert.key")
           )

```
