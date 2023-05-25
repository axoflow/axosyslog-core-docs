---
title: "stdin: Collecting messages from the standard input stream"
weight:  5100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `stdin()` driver collects messages from the standard input stream. When the standard input stream is closed, syslog-ng stops and `stdin()` inherits all options from the `file()` source, including multi-line options, or `flags(no-parse)`.

The `stdin()` driver causes syslog-ng to exit once it hits end-of-file (EOF).


## Declaration:

```c

    stdin(); 

```



## Example: Using the stdin() driver

```c

    @version: {{% productparam "techversion" %}}
    log { 
        source { stdin(); };
        destination { file("/dev/stdout"); };
    };

```

The following code snippet is an example of how the `stdin()` driver is used to collect a test message:

```c

    $ echo "this is a test message" | ./syslog-ng -Fe --no-caps
    [2017-11-14T13:47:16.757938] syslog-ng starting up; version='3.12.1'
    [2017-11-14T13:47:16.758195] syslog-ng shutting down; version='3.12.1'
    Nov 14 13:47:16 testserver this is a test message

```

