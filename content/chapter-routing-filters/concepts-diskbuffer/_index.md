---
title: "Using disk-based and memory buffering"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.name" %}} application can store messages on the local hard disk if the destination (for example, the central log server) or the network connection to the destination becomes unavailable. The {{% param "product.abbrev" %}} application automatically sends the stored messages to the destination when the connection is reestablished. The disk buffer is used as a queue: when the connection to the destination is reestablished, {{% param "product.abbrev" %}} sends the messages to the destination in the order they were received.

{{% alert title="Note" color="info" %}}

Disk-based buffering can be used in conjunction with flow-control. For details on flow-control, see {{% xref "/chapter-routing-filters/concepts-flow-control/_index.md" %}}.

{{% /alert %}}

{{% include-headless "chunk/p-disk-buffer-drivers.md" %}}

Every such destination uses a separate disk buffer (similarly to the output buffers controlled by `log-fifo-size()`). The hard disk space is not pre-allocated, so ensure that there is always enough free space to store the disk buffers even when the disk buffers are full.

If {{% param "product.abbrev" %}} is restarted (using the `/etc/init.d/syslog-ng restart` command, or another appropriate command on your platform), it automatically saves any unsent messages from the disk buffer and in-memory queues. After the restart, {{% param "product.abbrev" %}} sends the saved messages to the destination. In other words, the disk buffer is persistent. The disk buffer is also resistant to {{% param "product.abbrev" %}} crashes.

The {{% param "product.abbrev" %}} application supports two types of disk buffering: reliable and normal. For details, see {{% xref "/chapter-routing-filters/concepts-diskbuffer/configuring-diskbuffer-reliable/_index.md" %}} and {{% xref "/chapter-routing-filters/concepts-diskbuffer/configuring-diskbuffer-normal/_index.md" %}}, respectively.


## Message handling and normal disk-based buffering

When you use disk-based buffering, and the `reliable()` option is set to `no`, {{% param "product.abbrev" %}} handles outgoing messages the following way:

![Disk buffering](/images/figures/disk-buffer-diagram-normal.png)

  - *Output queue*: In-memory queue. If there is space left in it, {{% param "product.abbrev" %}} puts the message into this queue first . Messages stored here are processed faster, because {{% param "product.abbrev" %}} can skip writing to, and reading from the disk, as well as serializing or deserializing the message, saving I/O and processor time as a result. The contents of the in-memory output queue are persisted to the disk-buffer file during {{% param "product.abbrev" %}} reload, restart or stop, but they cannot be persisted if in the event of power failures, or if {{% param "product.abbrev" %}} crashes. By default, the output queue can hold 1000 messages (you can adjust this number using the `quot-size()` option).

  - *Disk-buffer file*: Disk queue. If there is no space left in the output queue, the message is stored on the disk-buffer file. Messages stored here are persisted on the disk, even in case of power failures or if {{% param "product.abbrev" %}} crashes. Using the disk-buffer file takes considerable amount of disk I/O and processor time. The size of this queue can be set with the `capacity-bytes()` option.

  - *Overflow queue*: In-memory queue. This queue is used to trigger flow-control if it is set. The contents of the in-memory overflow queue are persisted to the disk-buffer file in case of {{% param "product.abbrev" %}} reload, restart or stop, but they are not persisted in case of power failures or if {{% param "product.abbrev" %}} crashes. Setting the size of the overflow queue can be done with the `flow-control-window-size()` option.

{{% alert title="Warning" color="warning" %}}

Hazard of data loss!

In case of normal disk-buffers, the messages stored in the output queue and the overflow queue can be lost in case of power failures or if {{% param "product.abbrev" %}} crashes.

{{% /alert %}}


{{% alert title="Note" color="info" %}}

Using disk buffer can significantly decrease performance.

{{% /alert %}}


## Message handling and reliable disk-based buffering

When you use disk-based buffering, and the `reliable()` option is set to `yes`, {{% param "product.abbrev" %}} handles outgoing messages the following way.

The `flow-control-window-bytes()` option determines when flow-control is triggered. After the size of the disk-buffer file reaches (`capacity-bytes()` minus `flow-control-window-bytes()`), messages are written into both the disk-buffer file and the overflow queue, indicating that flow-control needs to slow down the message source. These messages are not taken out from the control window (governed by `log-iw-size()`), causing the control window to fill up.

If the control window is full, the flow-control completely stops reading incoming messages from the source. (As a result, `flow-control-window-bytes()` must be at least as large as `log-iw-size()` times the average message size.)

![Reliable disk buffering](/images/figures/disk-buffer-diagram-reliable.png)

  - *Output queue*: In-memory and disk queue. If there is space left in it, {{% param "product.abbrev" %}} puts the message into this queue first. In case of reliable disk-buffer, in addition to storing the message in memory, it is stored directly in the disk-buffer file as well for safety reasons (see the next point). Messages stored here are processed faster, because {{% param "product.abbrev" %}} can skip reading from the disk, and deserializing the message, saving I/O and processor time. By default, the output queue can hold 1000 messages (you can adjust it using the `quot-size()` option).

  - *Disk-buffer file*: Disk queue. If there is no space left in the output queue, the message is stored on the disk-buffer file. Messages stored here are persisted on the disk, and survive {{% param "product.abbrev" %}} crash or power failure. Using the disk-buffer file takes considerable amount of disk I/O and processor time. The size of this queue can be set with the `capacity-bytes()` option.

  - *Overflow queue*: In-memory and disk queue. This queue is used to trigger flow-control if it is set. Similarly to the output queue, in case of reliable disk-buffer in addition to storing the message in memory, it is stored directly in the disk-buffer file as well for safety reasons. Setting the size of the overflow queue can be done with the `flow-control-window-bytes()` option.

