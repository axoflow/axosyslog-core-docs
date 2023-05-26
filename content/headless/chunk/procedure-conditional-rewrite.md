---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
# How conditional rewriting works

## Purpose:

The following procedure summarizes how conditional rewrite rules (rewrite rules that have the `condition()` parameter set) work. The following configuration snippet is used to illustrate the procedure:

```c
   rewrite r_rewrite_set{
        set(
            "myhost",
            value("HOST")
            condition(program("myapplication"))
        );
    };
    log {
        source(s1);
        rewrite(r_rewrite_set);
        destination(d1);
    };
```


## Steps:

1.  The log path receives a message from the source (`s1`).

2.  The rewrite rule (`r_rewrite_set`) evaluates the condition. If the message matches the condition (the PROGRAM field of the message is "myapplication"), {{% param "product.abbrev" %}} rewrites the log message (sets the value of the HOST field to "myhost"), otherwise it is not modified.

3.  The next element of the log path processes the message (`d1`).

