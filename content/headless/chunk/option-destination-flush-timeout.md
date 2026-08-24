---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## flush-timeout() (DEPRECATED)

|          |                        |
| -------- | ---------------------- |
| Type:    | time in milliseconds   |
| Default: | 10000 [milliseconds] |

This option is deprecated. Several destination drivers support the `batch-timeout()` option instead, which you can set at the destination level.

*Description:* Specifies the time {{% param "product.abbrev" %}} waits for lines to accumulate in the output buffer. The {{% param "product.abbrev" %}} application sends flushes to the destinations evenly. The timer starts when the first message arrives to the buffer, so if only few messages arrive, {{% param "product.abbrev" %}} sends messages to the destination at most once every `flush-timeout()` seconds.
