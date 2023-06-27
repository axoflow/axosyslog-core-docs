---
title: "redis: Storing name-value pairs in Redis"
weight:  4700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `redis()` driver sends messages as name-value pairs to a [Redis](https://redis.io/) key-value store.

For the list of available parameters, see {{% xref "/docs/chapter-destinations/configuring-destinations-redis/reference-destination-redis/_index.md" %}}.


## Declaration:

```c
   redis(
        host("<redis-server-address>")
        port("<redis-server-port>")
        auth("<redis-server-password>") # Optional, for password-protected servers
        command("<redis-command>", "<first-command-parameter>", "<second-command-parameter>", "<third-command-parameter>")
    );
```



## Example: Using the redis() driver {#example-using-redis}

The following destination counts the number of log messages received per host.

```c
   destination d_redis {
        redis(
            host("localhost")
            port(6379)
            command("HINCRBY", "hosts", "$HOST", "1")
        );
    };
```

The following example creates a statistic from Apache webserver logs about the browsers that the visitors use (per minute)

```c
   @version: {{% param "product.techversion" %}}
    
    source s_apache {
        file("/var/log/apache2/access.log");
    };
    
    parser p_apache {
        csv-parser(columns("APACHE.CLIENT_IP", "APACHE.IDENT_NAME", "APACHE.USER_NAME",
                        "APACHE.TIMESTAMP", "APACHE.REQUEST_URL", "APACHE.REQUEST_STATUS",
                        "APACHE.CONTENT_LENGTH", "APACHE.REFERER", "APACHE.USER_AGENT",
                        "APACHE.PROCESS_TIME", "APACHE.SERVER_NAME")
                    flags(escape-double-char,strip-whitespace)
        delimiters(" ")
        quote-pairs('""[]')
        );
    };
    
    destination d_redis {
        redis( command("HINCRBY" "${MONTH_ABBREV} ${DAY} ${HOUR}:${MIN}"  "${APACHE.USER_AGENT}" "1"));
    };
    
    log {
        source(s_apache);
        parser(p_apache);
        destination(d_redis);
    };
```

