---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
Available in {{% param "product_name" %}} version 4.5.0 and later.

In {{% param "product_name" %}}, a template can only be resolved on a single message, because the same template might have different resolutions on different messages. As a batch consists of multiple messages, it's not trivial to decide which message should be used for the resolution.

When batching is enabled (`batch-lines()` or `batch-bytes()`) and the `url()` option contains message-dependent templates, you must set the [`worker-partition-key()` option](#worker-partition-key) to a template that contains all the message-dependent templates used in the `url()` option, otherwise the destination fails to start. {{% param "product_name" %}} flushes the batch whenever the partition key changes, so every message of a batch generates the same URL.

For security reasons, all the templated contents in the `url()` option are URL-encoded automatically. The following parts of the URL cannot be templated:

- scheme
- host
- port
- user
- password
