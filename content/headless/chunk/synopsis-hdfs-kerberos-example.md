---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
```c

    destination d_hdfs {
        hdfs(client-lib-dir("/hdfs-libs/lib")
        hdfs-uri("hdfs://hdp-kerberos.syslog-ng.example:8020")
        kerberos-keytab-file("/opt/syslog-ng/etc/hdfs.headless.keytab")
        kerberos-principal("hdfs-hdpkerberos@MYREALM")
        hdfs-file("/var/hdfs/test.log"));
    };

```
