---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Example: Specifying failover servers for syslog() destinations

The following example specifies two failover servers for a simple syslog() destination.

```c
   destination d_syslog_tcp{
        syslog("10.100.20.40"
            transport("tcp")
            port(6514)
            failover-servers("10.2.3.4", "myfailoverserver")
        );
    };
```

The following example specifies a failover server for a network() destination that uses TLS encryption.

```c
   destination d_syslog_tls{
        network("10.100.20.40"
            transport("tls")
            port(6514)
            failover-servers("10.2.3.4", "myfailoverserver")
            tls(peer-verify(required-trusted)
            ca-dir('/opt/syslog-ng/etc/syslog-ng/keys/ca.d/')
            key-file('/opt/syslog-ng/etc/syslog-ng/keys/client_key.pem')
            cert-file('/opt/syslog-ng/etc/syslog-ng/keys/client_certificate.pem'))
        );
    };
```

