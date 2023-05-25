---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## batch-timeout()

|          |                      |
| -------- | -------------------- |
| Type:    | time in milliseconds |
| Default: | \-1 (disabled)       |

*Description:* Specifies the time {{% productparam "abbrev" %}} waits for lines to accumulate in the output buffer. The {{% productparam "abbrev" %}} application sends batches to the destinations evenly. The timer starts when the first message arrives to the buffer, so if only few messages arrive, {{% productparam "abbrev" %}} sends messages to the destination at most once every `batch-timeout()` milliseconds.

