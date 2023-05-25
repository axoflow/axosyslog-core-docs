---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
  - If `flush-limit` is set to 1: {{% param "product.abbrev" %}} sends the message reliably: it sends a message to Elasticsearch, then waits for a reply from Elasticsearch. In case of failure, {{% param "product.abbrev" %}} repeats sending the message, as set in the `retries()` parameter. If sending the message fails for `retries()` times, {{% param "product.abbrev" %}} drops the message.
    
    This method ensures reliable message transfer, but is slow (about 1000 messages/second).

  - If `flush-limit` is higher than 1: {{% param "product.abbrev" %}} sends messages in a batch, and receives the response asynchronously. In case of a problem, {{% param "product.abbrev" %}} cannot resend the messages.
    
    This method is relatively fast (depending on the size of `flush-limit`, about 8000 messages/second), but the transfer is not reliable. In transport mode, over 5000-30000 messages can be lost before {{% param "product.abbrev" %}} recognizes the error. In node mode, about 1000 messages can be lost.

  - If `concurrent-requests` is higher than 1, {{% param "product.abbrev" %}} can send multiple batches simultaneously, increasing performance (and also the number of messages that can be lost in case of an error).
