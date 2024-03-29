---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Normal and reliable queue files

The key difference between disk queue files that employ the `reliable(yes)` option and not is the strategy they employ. Reliable disk queues guarantee that all the messages passing through them are written to disk first, and removed from the queue only after the destination has confirmed that the message has been successfully received. This prevents message loss, for example, due to {{% param "product.abbrev" %}} crashes. Of course, using the `reliable(yes)` option introduces a significant performance penalty as well.

Both reliable and normal disk-buffers employ an in-memory output queue (set in `quot-size()`) and an in-memory overflow queue (set in `flow-control-window-bytes()` for reliable disk-buffers, or `flow-control-window-size()` for normal disk-buffers). The difference between reliable and normal disk-buffers is that when the reliable disk-buffer uses one of its in-memory queues, it also stores the message on the disk, whereas the normal disk-buffer stores the message only in memory. The normal disk-buffer only uses the disk if the in-memory output buffer is filled up completely. This approach has better performance (due to fewer disk I/O operations), but also carries the risk of losing a maximum of `quot-size()` plus `flow-control-window-size()` number of messages in case of an unexpected power failure or application crash.

## Size of the queue files

Disk queue files grow. Each may take up to `capacity-bytes()` bytes on the disk. Due to the nature of reliable queue files, all the messages traversing the queue are written to disk, constantly increasing the size of the queue file.

The disk-buffer file's size should be considered as the configured `capacity-bytes()` at any point of time, even if it does not have messages in it. Truncating the disk-buffer file can slow down disk I/O operations, so {{% param "product.abbrev" %}} does not always truncate the file when it would be possible (see the `truncate-size-ratio()` option). If a large disk-buffer file is not desirable, you should set the `capacity-bytes()` option to a smaller value. Note that {{% param "product.abbrev" %}} version 4.0 and later doesn't truncate disk-buffer files by default.

Starting with {{% param "product.abbrev" %}} version 4.0, you can [preallocate disk-buffer files](#preallocate).

{{% alert title="Note" color="info" %}}
The disk-buffer file's size does not strictly correlate to the number of stored messages. If you want to get information about the disk-buffer, use `dqtool` (for more information, see {{% xref "/chapter-routing-filters/concepts-diskbuffer/get-information-about-disk-buffer-files/get-information-about-disk-buffer-files-getting-status-info/_index.md" %}}).
{{% /alert %}}

{{% alert title="Note" color="info" %}}
If a queue file becomes corrupt, {{% param "product.abbrev" %}} starts a new one. This might lead to the queue files consuming more space in total than their maximal configured size and the number of configured queue files multiplied together.
{{% /alert %}}

## Preallocating disk-buffer files {#preallocate}

{{< include-headless "chunk/option-description-destination-diskbuffer-prealloc.md" >}}
