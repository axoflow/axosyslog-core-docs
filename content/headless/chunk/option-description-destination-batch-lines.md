---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
*Description:* Specifies how many lines are flushed to a destination in one batch. The {{% param "product.abbrev" %}} application waits for this number of lines to accumulate and sends them off in a single batch. Increasing this number increases throughput as more messages are sent in a single batch, but also increases message latency.

For example, if you set `batch-lines()` to 100, {{% param "product.abbrev" %}} waits for 100 messages.

If the `batch-timeout()` option is disabled, the {{% param "product.abbrev" %}} application flushes the messages if it has sent `batch-lines()` number of messages, or the queue became empty. If you stop or reload {{% param "product.abbrev" %}} or in case of network sources, the connection with the client is closed, {{% param "product.abbrev" %}} automatically sends the unsent messages to the destination.

Note that if the `batch-timeout()` option is enabled and the queue becomes empty, {{% param "product.abbrev" %}} flushes the messages only if `batch-timeout()` expires, or the batch reaches the limit set in `batch-lines()`.

For optimal performance, make sure that the {{% param "product.abbrev" %}} source that feeds messages to this destination is configured properly: the value of the `log-iw-size()` option of the source must be higher than the `batch-lines()`*`workers()` of the destination. Otherwise, the size of the batches cannot reach the `batch-lines()` limit.
