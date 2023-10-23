---
title: "s3: Amazon S3"
weight:  4950
driver: "s3()"
short_description: "Send log messages to Amazon Simple Storage Service (S3)"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{% param "product.abbrev" %}} version 4.4 and later.

The `s3()` destination sends log messages to the [Amazon Simple Storage Service (Amazon S3)](https://aws.amazon.com/s3/) object storage service. You can send log messages over TCP, or encrypted with TLS.

## Prerequisites

- An existing S3 bucket configured for programmatic access, and the related `ACCESS_KEY` and `SECRET_KEY` of a user that can access it.
- If you are not using the venv (`/usr/bin/syslog-ng-update-virtualenv`) created by {{% param "product.abbrev" %}}, you must install the `boto3` and/or `botocore` Python dependencies.

To use the `s3()` driver, the `scl.conf` file must be included in your {{% param "product.abbrev" %}} configuration:

```shell
   @include "scl.conf"
```

The `s3()` driver is actually a reusable configuration snippet. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/modules/python-modules/syslogng/modules/s3/s3_destination.py).

## Declaration

```shell
s3(
    url("http://localhost:9000")
    bucket("syslog-ng")
    access-key("my-access-key")
    secret-key("my-secret-key")
    object-key("${HOST}/my-logs")
    template("${MESSAGE}\n")
);
```

## Creating objects

{{% param "product.abbrev" %}} can create a new object based on the following strategies:

- Based on object size: The [`max-object-size()`](#max-object-size) option configures {{% param "product.abbrev" %}} to finish an object if it reaches a certain size. {{% param "product.abbrev" %}} appends an index ("-1", "-2", ...) to the end of the object key, then starts a new object.
- Based on timestamp: The [`object-key-timestamp()`](#object-key-timestamp) option can be used to set a datetime-related template, which is appended to the end of the object, for example: `"${R_MONTH_ABBREV}${R_DAY}"`. When a log message arrives with a newer timestamp template resolution, the previous timestamped object gets finished and a new one is started with the new timestamp. If an older message arrives, it doesn`t reopen the old object, but starts a new object with the key having an index appended to the old object.
- Based on timeout: The [`flush-grace-period()`](#flush-grace-period) option sets the number of minutes to wait for new messages to arrive after the last one. If the timeout expires, {{% param "product.abbrev" %}} closes the object, and opens a new object (with an appended index) when a new message arrives.

All of these strategies can be used individually, or together.

## Upload options

{{% param "product.abbrev" %}} uploads objects using the multipart upload API. {{% param "product.abbrev" %}} composes chunks locally. When a chunk reaches the size set in `chunk-size()` (by default 5 MiB), the chunk is uploaded. When an object is finished, the multipart upload is completed and S3 merges the chunks.

You can influence the upload via the [`chunk-size()`](#chunk-size), [`upload-threads()`](#upload-threads), and the [`max-pending-uploads()`](#max-pending-uploads) options.

## Options

The following options are specific to the `s3()` destination.

## access-key()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | N/A |

*Description:* The `ACCESS_KEY` of the service account used to access the S3 bucket. (Together with [`secret-key()`](#secret-key).)

## bucket()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: |  |

*Description:* The name of the S3 bucket, for example, `my-bucket`

## canned-acl()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `empty` |

*Description:* The ACL assigned to the object, if specified, for example, `bucket-owner-read`. The following values are valid:

`authenticated-read`, `aws-exec-read`, `bucket-owner-full-control`, `bucket-owner-read`, `log-delivery-write`, `private`, `public-read`, `public-read-write`

If you configure an invalid value, the default is used.

## chunk-size()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `5MiB` |

*Description:* The size of log messages that  {{% param "product_name" %}} writes to the S3 object in a batch. If compression is enabled, the `chunk-size()` refers to the compressed size.

## compression()

|          |                            |
| -------- | -------------------------- |
| Type:    | boolean |
| Default: | `no` |

*Description:* Setting `compression(yes)` enables gzip compression, and implicitly adds a `.gz` suffix to the created object's key. You can set the level of the compression using the `compresslevel()` option (0-9).

## compresslevel()

|          |                            |
| -------- | -------------------------- |
| Type:    | integer (0-9) |
| Default: | `9` |

*Description:* Only has effect if `compression()` is set to yes. You can set the level of the compression using the `compresslevel()` option (0-9).

## flush-grace-period()

|          |                            |
| -------- | -------------------------- |
| Type:    | integer [minutes] |
| Default: | `60` |

*Description:* After the grace period expires and no new messages are routed to the destination, {{% param "product_name" %}} flushes the contents of the buffer to the S3 object even if the volume of the messages in the buffer is lower than [`chunk-size()`](#chunk-size).

{{< include-headless "chunk/option-destination-log-fifo-size.md" >}}

## max-object-size()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `5120GiB` |

*Description:* The maximal size of the S3 object. If an object reaches this size, {{% param "product_name" %}} appends an index ("-1", "-2", ...) to the end of the object key and starts a new object after rotation.

## max-pending-uploads()

|          |                            |
| -------- | -------------------------- |
| Type:    | integer |
| Default: | `32` |

*Description:* The `max-pending-uploads()` and `upload-threads()` options configure the upload of the chunks. Uploading happens in multiple threads to minimize network overhead.

- `upload-threads()` limits the maximum number of parallel uploads.
- `max-pending-uploads()` limits the number of chunks that are waiting in the work queue of the upload threads to get uploaded.

## object-key()

|          |                            |
| -------- | -------------------------- |
| Type:    | template |
| Default: | N/A |

*Description:* The [object key](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html) (or key name), which uniquely identifies the object in an Amazon S3 bucket.

## object-key-timestamp()

|          |                            |
| -------- | -------------------------- |
| Type:    | template |
| Default: |  |

*Description:* The `object-key-timestamp()` option can be used to set a datetime-related template, which is appended to the end of the object, for example: `"${R_MONTH_ABBREV}${R_DAY}"`. When a log message arrives with a newer timestamp template resolution, the previous timestamped object gets finished and a new one is started with the new timestamp. If an older message arrives, it doesn`t reopen the old object, but starts a new object with the key having an index appended to the old object.

{{< include-headless "chunk/option-persist-name.md" >}}

## region()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: |  |

*Description:* The [regional endpoint](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints) where the bucket is stored. For example, `us-east-1`

## secret-key()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | N/A |

*Description:* The `SECRET_KEY` of the service account used to access the S3 bucket. (Together with [`access-key()`](#access-key).)

## storage-class()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `STANDARD` |

*Description:* The [storage class of the object](https://aws.amazon.com/s3/storage-classes/), for example, `REDUCED_REDUNDANCY`. The following values are valid:

`DEEP_ARCHIVE`, `GLACIER`, `GLACIER_IR`, `INTELLIGENT_TIERING`, `ONEZONE_IA`, `OUTPOSTS`, `REDUCED_REDUNDANCY`, `SNOW`, `STANDARD`, `STANDARD_IA`

If you configure an invalid value, the default is used.

## upload-threads()

|          |                            |
| -------- | -------------------------- |
| Type:    | integer |
| Default: | `8` |

*Description:* The number of {{% param "product_name" %}} worker threads that are used to upload data to S3 from this destination.

## template()

|          |                               |
| -------- | ----------------------------- |
| Type:    | template or template function |
| Default: | `${MESSAGE}\n` |

*Description:* The message as written to the Amazon S3 object. You can use templates and [template functions]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}) to format the message.

## url()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | N/A |

*Description:* The URL of the S3 bucket, for example, `https://my-bucket.s3.us-west-2.amazonaws.com`