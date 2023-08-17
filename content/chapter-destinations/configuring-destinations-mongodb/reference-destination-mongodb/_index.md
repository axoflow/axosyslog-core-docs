---
title: "mongodb() destination options"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `mongodb()` driver sends messages to a MongoDB database. MongoDB is a schema-free, document-oriented database.

The `mongodb()` destination has the following options:

## bulk() {#mongodb-option-bulk}

|          |         |
| -------- | ------- |
| Type:    | `yes`, `no` |
| Default: | `yes`  |

Available in {{% param "product_name" %}} version 4.3.0 and newer.

*Description:* Enables [bulk insert](http://mongoc.org/libmongoc/current/bulk.html) mode. If disabled, each messages is inserted individually.

> Note: Bulk sending is only efficient if you use a constant [collection](#mongodb-option-collection) (without templates), or the used template does not lead to too many collections switching within a reasonable time range.

## bulk-bypass-validation() {#mongodb-option-bulk-bypass-validation}

|          |         |
| -------- | ------- |
| Type:    | `yes`, `no` |
| Default: | `no`  |

Available in {{% param "product_name" %}} version 4.3.0 and newer.

*Description:* If set to `yes`, it disables [MongoDB bulk operations validation](http://mongoc.org/libmongoc/1.23.3/bulk.html#bulk-operation-bypassing-document-validation) mode.

## bulk-unordered() {#mongodb-option-bulk-unordered}

|          |         |
| -------- | ------- |
| Type:    | `yes`, `no` |
| Default: | `no`  |

Available in {{% param "product_name" %}} version 4.3.0 and newer.

*Description:* Enables [unordered bulk operations](http://mongoc.org/libmongoc/current/bulk.html) mode.

## collection() {#mongodb-option-collection}

|          |          |
| -------- | -------- |
| Type:    | template |
| Default: | messages |

*Description:* The name of the MongoDB collection where the log messages are stored (collections are similar to SQL tables). You can use templates to change the collection dynamically based on the source or the content of the message, for example, collection("${HOST}").

{{% alert title="Warning" color="warning" %}}

Hazard of data loss! The {{% param "product.abbrev" %}} application does not verify that the specified collection name does not contain invalid characters. If you specify a collection with an invalid name, the log messages sent to the MongoDB database will be irrevocably lost without any warning.

{{% /alert %}}


{{< include-headless "chunk/option-destination-diskbuffer.md" >}}

{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

{{% include-headless "chunk/option-destination-threaded-batching.md" %}}

{{< include-headless "chunk/option-destination-frac-digits.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-destination-local-timezone.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{< include-headless "chunk/option-destination-on-error.md" >}}


{{% include-headless "chunk/option-destination-retries.md" %}}

For MongoDB operations, {{% param "product.abbrev" %}} uses a one-minute timeout: if an operation times out, {{% param "product.abbrev" %}} assumes the operation has failed.


{{% include-headless "chunk/option-source-time-reopen.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}


## uri() {#mongodb-option-uri}

|          |                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------ |
| Type:    | string                                                                                           |
| Default: | mongodb://127.0.0.1:27017/syslog?wtimeoutMS=60000\&socketTimeoutMS=60000\&connectTimeoutMS=60000 |

*Description:* Available in {{< param "product.name" >}} 3.8 and later. Please refer to the [MongoDB URI format documentation](https://docs.mongodb.com/manual/reference/connection-string/) for detailed syntax.


{{< include-headless "chunk/destination-option-value-pairs-content.md" >}}

{{< include-headless "wnt/note-typehinting.md" >}}

{{< include-headless "chunk/option-destination-threaded-workers.md" >}}

## write-concern() {#mongodb-option-write-concern}

|          |         |
| -------- | ------- |
| Type:    | `unacked`, `acked`, or `majority` |
| Default: | `acked`  |

Available in {{% param "product_name" %}} version 4.3.0 and newer.

*Description:* Sets the [write concern mode of the MongoDB operations](http://mongoc.org/libmongoc/1.23.3/bulk.html#bulk-operation-write-concerns), for both bulk and single mode.
