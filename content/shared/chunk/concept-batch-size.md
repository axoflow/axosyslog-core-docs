---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Batch size {#http-batch-size}

The `batch-bytes()`, `batch-lines()`, and `batch-timeout()` options of the destination determine how many log messages {{% productparam "abbrev" %}} sends in a batch. The `batch-lines()` option determines the maximum number of messages {{% productparam "abbrev" %}} puts in a batch in. This can be limited based on size and time:

  - {{% productparam "abbrev" %}} sends a batch every `batch-timeout()` milliseconds, even if the number of messages in the batch is less than `batch-lines()`. That way the destination receives every message in a timely manner even if suddenly there are no more messages.

  - {{% productparam "abbrev" %}} sends the batch if the total size of the messages in the batch reaches `batch-bytes()` bytes.

To increase the performance of the destination, increase the number of worker threads for the destination using the `workers()` option, or adjust the `batch-bytes()`, `batch-lines()`, `batch-timeout()` options.

