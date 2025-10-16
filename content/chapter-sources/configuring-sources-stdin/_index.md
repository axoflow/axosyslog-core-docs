---
title: "stdin: Collect messages from the standard input stream"
weight:  5100
driver: "stdin()"
short_description: "Collect messages from the standard input stream"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `stdin()` driver collects messages from the standard input stream. When the standard input stream is closed, AxoSyslog stops and `stdin()` inherits all options from the `file()` source, including multi-line options, or `flags(no-parse)`.

The `stdin()` driver causes AxoSyslog to exit once it hits end-of-file (EOF).


## Declaration:

```shell
   stdin(); 
```



## Example: Using the stdin() driver

```shell
   @version: {{% param "product.configversion" %}}
    log { 
        source { stdin(); };
        destination { file("/dev/stdout"); };
    };
```

The following code snippet is an example of how the `stdin()` driver is used to collect a test message:

```shell
   $ echo "this is a test message" | ./syslog-ng -Fe --no-caps
    [2017-11-14T13:47:16.757938] syslog-ng starting up; version='3.12.1'
    [2017-11-14T13:47:16.758195] syslog-ng shutting down; version='3.12.1'
    Nov 14 13:47:16 testserver this is a test message
```

