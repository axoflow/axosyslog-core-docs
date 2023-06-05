---
title: "Batch mode and load balancing"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with version 3.34, you can send multiple log messages with the help of [Redis's pipelining feature](https://github.com/redis/hiredis#pipelining).


## Batch size

The `batch-lines()`, `batch-lines()`, and `batch-timeout()` options of the destination determine how many log messages {{% param "product.abbrev" %}} sends in a batch. The `batch-lines()` option determines the maximum number of messages {{% param "product.abbrev" %}} puts in a batch in. This can be limited based on size and time:

AxoSyslog sends a batch every `batch-timeout()` milliseconds, even if the number of messages in the batch is less than `batch-lines()`. That way the destination receives every message in a timely manner even if suddenly there are no more messages.

To increase the performance of the destination, increase the number of worker threads for the destination using the `workers()` option, or adjust the `batch-lines()` and/or `batch-timeout()` options.


## Example: Redis batch mode

The following destination sends log messages to a Redis server using the pipelining feature. A batch consists of `100` messages and is sent every `10` seconds (`10000` milliseconds) if there is less than `100` messages are in the queue.

```c
   destination d_redis {
        redis(
            host("localhost")
            port(6379)
            command("HINCRBY", "hosts", "$HOST", "1")
            batch-lines(100)
            batch-timeout(10000)
            log-fifo-size(100000)
        );
    };
```


