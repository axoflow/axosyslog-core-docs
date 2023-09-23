---
title: "s3: Amazon S3"
weight:  2700
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The `s3()` destination sends log messages to the [Amazon Simple Storage Service (Amazon S3)](https://aws.amazon.com/s3/) object storage service. You can send log messages over TCP, or encrypted with TLS.

<!-- FIXME minimal config example, required options -->

<!-- FIXME what logic do we use to create objects in the bucket? -->

## Prerequisites

- An existing S3 bucket configured for programmatic access, and the related `ACCESS_KEY` and `SECRET_KEY` of a user that can access it.
<!-- FIXME What else needs to be configured from the Amazon side? -->

<!-- 
required Python dependencies (`boto3` and/or `botocore`)
    > When does the user have to install these manually?
-->

To use the `s3()` driver, the `scl.conf` file must be included in your {{% param "product.abbrev" %}} configuration:

```shell
   @include "scl.conf"
```

The `s3()` driver is actually a reusable configuration snippet. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/modules/python-modules/syslogng/modules/s3/s3_destination.py).

## Options

The following options are specific to the `s3()` destination.

<!-- FIXME are there any common/generic/inherited options that we should reference? -->

## access-key()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: |  |

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

*Description:* The size of log messages that  {{% param "product_name" %}} writes to the S3 object in a batch.
<!-- FIXME how does is relate to compression? -->

## compression()

|          |                            |
| -------- | -------------------------- |
| Type:    | boolean |
| Default: | `no` |

*Description:* <!-- FIXME -->

## compresslevel()

|          |                            |
| -------- | -------------------------- |
| Type:    | integer |
| Default: | `9` |

*Description:* <!-- FIXME -->

## flush-grace-period()

|          |                            |
| -------- | -------------------------- |
| Type:    | integer (seconds) |
| Default: | `60` |

*Description:* After the grace period expires and no new messages are routed to the destination, {{% param "product_name" %}} flushes the contents of the buffer to the S3 object even if the volume of the messages in the buffer is lower than [`chunk-size()`](#chunk-size).

## max-object-size()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `5120GiB` |

*Description:* The maximal size of the S3 object.
<!-- What happens if we reach it, we start a new object? -->

## max-pending-uploads()

|          |                            |
| -------- | -------------------------- |
| Type:    | integer |
| Default: | `32` |

*Description:* <!-- FIXME -->

## object-key()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: |  |

*Description:* The [object key](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html) (or key name), which uniquely identifies the object in an Amazon S3 bucket.

## object-key-timestamp()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: |  |

*Description:* The timestamp added to the object.
<!-- FIXME ?? -->

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
| Default: |  |

*Description:* The `SECRET_KEY` of the service account used to access the S3 bucket. (Together with [`access-key()`](#access-key).)

## storage-class()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `STANDARD` |

*Description:* The [storage class of the object](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html), for example, `REDUCED_REDUNDANCY`. The following values are valid:

`DEEP_ARCHIVE`, `GLACIER`, `GLACIER_IR`, `INTELLIGENT_TIERING`, `ONEZONE_IA`, `OUTPOSTS`, `REDUCED_REDUNDANCY`, `SNOW`, `STANDARD`, `STANDARD_IA`

If you configure an invalid value, the default is used.

<!-- FIXME do we have any recommendation on which one is good for storing logs? -->

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

<!-- FIXME What else do we write into the object? Timestamp/and so on? -->

## url()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: |  |

*Description:* The URL of the S3 bucket, for example, `https://my-bucket.s3.us-west-2.amazonaws.com`