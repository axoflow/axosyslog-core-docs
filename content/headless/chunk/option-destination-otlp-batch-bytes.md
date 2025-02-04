---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## batch-bytes()

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | number [bytes] |
| Default:         | 4MB             |

Available in {{% param "product.abbrev" %}} version 4.6 and later.

*Description:* Sets the maximum size of payload in a batch. If the size of the messages reaches this value, {{% param "product.abbrev" %}} sends the batch to the destination even if the number of messages is less than the value of the `batch-lines()` option. The batch might be at most 1 message larger than the set limit.

Note that if the `batch-timeout()` option is enabled and the queue becomes empty, {{% param "product.abbrev" %}} flushes the messages only if `batch-timeout()` expires, or the batch reaches the limit set in `batch-bytes()`.

OTLP has a default 4 MiB batch limit, therefore the default value for `batch-bytes()` is 4 MB, which is a bit below 4 MiB.

The batch size is calculated before compression, which is the same as the limit is calculated on the server.
