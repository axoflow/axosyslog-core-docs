---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## disk-buffer()

*Description:* This option enables putting outgoing messages into the disk buffer of the destination to avoid message loss in case of a system failure on the destination side. It has the following options:



*reliable()*


Type:

yes|no

Default:

no

*Description:* If set to **yes**, {{% productparam "abbrev" %}} cannot lose logs in case of reload/restart, unreachable destination or {{% productparam "abbrev" %}} crash. This solution provides a slower, but reliable disk-buffer option. It is created and initialized at startup and gradually grows as new messages arrive. If set to **no**, the normal disk-buffer will be used. This provides a faster, but less reliable disk-buffer option.

{{% alert title="Warning" color="warning" %}}

Hazard of data loss\! If you change the value of `reliable()` option when there are messages in the disk-buffer, the messages stored in the disk-buffer will be lost.

{{% /alert %}}


*compaction()*


Type:

yes|no

Default:

no

*Description:* If set to `yes`, {{% productparam "abbrev" %}} prunes the unused space in the LogMessage representation, making the disk queue size smaller at the cost of some CPU time. Setting the `compaction()` argument to `yes` is recommended when numerous name-value pairs are unset during processing, or when the same names are set multiple times.

{{% alert title="Note" color="info" %}}

Simply unsetting these name-value pairs by using the `unset()` rewrite operation is not enough, as due to performance reasons that help when {{% productparam "abbrev" %}} is CPU bound, the internal representation of a `LogMessage` will not release the memory associated with these name-value pairs. In some cases, however, the size of this overhead becomes significant (the raw message size can grow up to four times its original size), which unnecessarily increases the disk queue file size. For these cases, the compaction will drop `unset` values, making the `LogMessage` representation smaller at the cost of some CPU time required to perform compaction.

{{% /alert %}}


*dir()*


Type:

string

Default:

N/A

*Description:* Defines the folder where the disk-buffer files are stored.

{{% include-headless "wnt/warning-disk-buffer-new-directory-delete-persist-file.md" %}} {{% alert title="Note" color="info" %}}

If the `dir()` path provided by the user does not exist, {{% productparam "ose" %}} creates the path with the same permission as the running instance.

{{% /alert %}}

*disk-buf-size()*

Type:

number (bytes)

Default:

*Description:* This is a required option. The maximum size of the disk-buffer in bytes. The minimum value is `1048576` bytes. If you set a smaller value, the minimum value will be used automatically. It replaces the old `log-disk-fifo-size()` option.


*mem-buf-length()*


Type:

number (messages)

Default:

10000

*Description:* Use this option if the option `reliable()` is set to **no**. This option contains the number of messages stored in overflow queue. It replaces the old `log-fifo-size()` option. It inherits the value of the global `log-fifo-size()` option if provided. If it is not provided, the default value is **10000** messages. Note that this option will be ignored if the option `reliable()` is set to **yes**.


*mem-buf-size()*


Type:

number (bytes)

Default:

163840000

*Description:* Use this option if the option `reliable()` is set to **yes**. This option contains the size of the messages in bytes that is used in the memory part of the disk buffer. It replaces the old `log-fifo-size()` option. It does not inherit the value of the global `log-fifo-size()` option, even if it is provided. Note that this option will be ignored if the option `reliable()` is set to **no**.


*qout-size()*


Type:

number (messages)

Default:

64

*Description:* The number of messages stored in the output buffer of the destination. Note that if you change the value of this option and the disk-buffer already exists, the change will take effect when the disk-buffer becomes empty.

Options `reliable()` and `disk-buf-size()` are required options.


## Example: Examples for using disk-buffer()

In the following case reliable disk-buffer() is used.

```c

    destination d_demo {
        network(
            "127.0.0.1"
            port(3333)
            disk-buffer(
                mem-buf-size(10000)
                disk-buf-size(2000000)
                reliable(yes)
                dir("/tmp/disk-buffer")
            )
        );
    };

```

In the following case normal disk-buffer() is used.

```c

    destination d_demo {
        network(
            "127.0.0.1"
            port(3333)
               disk-buffer(
                mem-buf-length(10000)
                disk-buf-size(2000000)
                reliable(no)
                dir("/tmp/disk-buffer")
            )
        );
    };

```



<span id="diskbuf-trunkate-size-ratio"></span>*truncate-size-ratio()*


Type:

number (between 0 and 1)

Default:

0.1 (10%)

*Description:* Limits the truncation of the disk-buffer file. Truncating the disk-buffer file can slow down the disk IO operations, but it saves disk space, so syslog-ng only truncates the file, if the possible disk gain is more than `truncate-size-ratio()` times `disk-buf-size()`.

{{% alert title="Warning" color="warning" %}}

{{% productparam "companyabbrev" %}} does not recommend you to change `truncate-size-ratio()`. Only change its value if you know the performance implications of doing so.

{{% /alert %}}
