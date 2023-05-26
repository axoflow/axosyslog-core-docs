---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Declaration:

```c
   destination d_elasticsearch-http {
        elasticsearch-http(
            url("http://your-elasticsearch-server:9200/_bulk")
            type("")
            index("example-index")
            tls(
                ca-dir("dir")
                cert-file("cert")
                cipher-suite("cipher")
                key-file("key")
                peer-verify(yes|no)
                ssl-version(<the permitted SSL/TLS version>)
            )
        );
    };
```

