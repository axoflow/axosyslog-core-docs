---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
*Description:* Specifies how many lines are flushed to a destination at a time. The {{% productparam "abbrev" %}} application waits for this number of lines to accumulate and sends them off in a single batch. Increasing this number increases throughput as more messages are sent in a single batch, but also increases message latency.

The {{% productparam "abbrev" %}} application flushes the messages if it has sent `flush-lines()` number of messages, or the queue became empty. If you stop or reload {{% productparam "abbrev" %}} or in case of network sources, the connection with the client is closed, {{% productparam "abbrev" %}} automatically sends the unsent messages to the destination.
