---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
An alternative way to specify this option is to put into a `tls()` block and specify it there, together with any other TLS options. This allows you to separate these options and ensure better readability.


## Declaration:

```c

    destination  d_ampqp {
        amqp(
            host("127.0.0.1")
            port(5672)
            username("test")
            password("test")
            tls(
                ca-file("ca")
                cert-file("cert") 
                key-file("key")
                peer-verify(yes|no)
            )
        );
    };

```

Make sure that you specify TLS options either using their own dedicated option (`ca-file()`, `cert-file()`, `key-file()`, and `peer-verify()`), or using the `tls()` block and inserting the relevant options within `tls()`. Avoid mixing the two methods. In case you do specify TLS options in both ways, the one that comes later in the configuration file will take effect.

