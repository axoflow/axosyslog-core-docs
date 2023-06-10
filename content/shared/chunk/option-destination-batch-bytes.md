---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## batch-bytes() {#https-options-batch-bytes}

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | number [bytes] |
| Default:         | none             |

*Description:* Sets the maximum size of payload in a batch. If the size of the messages reaches this value, {{% productparam "abbrev" %}} sends the batch to the destination even if the number of messages is less than the value of the `batch-lines()` option.

Note that if the `batch-timeout()` option is enabled and the queue becomes empty, {{% productparam "abbrev" %}} flushes the messages only if `batch-timeout()` expires, or the batch reaches the limit set in `batch-bytes()`.

Available in {{% productparam "abbrev" %}} version {{% conditional-text include-if="ose" %}}3.19{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}7.0.12{{% /conditional-text %}} and later.

