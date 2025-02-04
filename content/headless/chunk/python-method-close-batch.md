---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## close_batch(self)

Closes the current source-side batch. Source-side batching helps {{% param "product.abbrev" %}} to effectively process a larger chunk of messages, instead of processing messages each message. For example, when feeding a destination queue and instead of taking a lock on the queue for every message (causing contention), we only take it once per batch.

The native drivers built into {{% param "product.abbrev" %}} typically close batches once every mainloop iteration, allowing a single iteration to process multiple messages. For instance, when receiving multiple messages in a single TCP datagram, all of those messages
can be processed as a part of the same batch.

In Python-based log sources, a batch will automatically be closed after every message posted via `post_message()`, except if `self.auto_close_batches` is set to `False` during initialization. In case `self.auto_close_batches` is set to `False`, the driver has to call `close_batch()` explicitly, preferably at a natural boundary between incoming batches of messages. A good example is when we retrieve several messages via the same HTTP REST call, then the right time to close the batch would be after the last message in the response is posted.
