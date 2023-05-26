---
title: "Multithreading concepts of syslog-ng OSE"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section is a brief overview on how {{% param "product.abbrev" %}} works in multithreaded mode. It is mainly for illustration purposes: the concept has been somewhat simplified and may not completely match reality.

{{% alert title="Note" color="info" %}}

The way {{% param "product.abbrev" %}} uses multithreading may change in future releases. The current documentation applies to version {{% param "product.version" %}}.

{{% /alert %}}

{{% param "product.abbrev" %}} always uses multiple threads:

  - A main thread that is always running

  - A number of worker threads that process the messages. You can influence the behavior of worker threads using the `threaded()` option and the `--worker-threads` command-line option.

  - Some other, special threads for internal functionalities. For example, certain destinations run in a separate thread, independently of the multithreading (`threaded()`) and `--worker-threads` settings of {{% param "product.abbrev" %}}.

The maximum number of worker threads {{% param "product.abbrev" %}} uses is the number of CPUs or cores in the host running {{% param "product.abbrev" %}} (up to 64). You can limit this value using the `--worker-threads` command-line option that sets the maximum total number of threads {{% param "product.abbrev" %}} can use, including the main {{% param "product.abbrev" %}} thread. However, the `--worker-threads` option does not affect the supervisor of {{% param "product.abbrev" %}}. The supervisor is a separate process (see <span class="mcFormatColor" style="color: #04aada;">The syslog-ng manual page</span>), but certain operating systems might display it as a thread. In addition, certain destinations always run in a separate thread, independently of the multithreading (`threaded()`) and `--worker-threads` settings of {{% param "product.abbrev" %}}.

When an event requiring a new thread occurs (for example, {{% param "product.abbrev" %}} receives new messages, or a destination becomes available), {{% param "product.abbrev" %}} tries to start a new thread. If there are no free threads, the task waits until a thread finishes its task and becomes available. There are two types of worker threads:

  - Reader threads read messages from a source (as many as possible, but limited by the `log-fetch-limit()` and `log-iw-size()` options). The thread then processes these messages, that is, performs filtering, rewriting and other tasks as necessary, and puts the log message into the queue of the destination. If the destination does not have a queue (for example, usertty), the reader thread sends the message to the destination, without the interaction of a separate writer thread.

  - Writer threads take the messages from the queue of the destination and send them to the destination, that is, write the messages into a file, or send them to the syslog server over the network. The writer thread starts to process messages from the queue only if the destination is writable, and there are enough messages in the queue, as set in the `flush-lines()` option. Writer threads stop processing messages when the destination becomes unavailable, or there are no more messages in the queue.


## Sources and destinations affected by multithreading

The following list describes which sources and destinations can use multiple threads. Changing the `--worker-threads` command-line option changes the number of threads available to these sources and destinations.

  - The `tcp` and `syslog(tcp)` sources can process independent connections in separate threads. The number of independent connections is limited by the `max-connections()` option of the source. Separate sources are processed by separate thread, for example, if you have two separate `tcp` sources defined that receive messages on different IP addresses or port, {{% param "product.abbrev" %}} will use separate threads for these sources even if they both have only a single active connection.

  - The `udp`, `file`, and `pipe` sources use a single thread for every source statement.

  - The `tcp`, `syslog`, and `pipe` destinations use a single thread for every destination.

  - The `file` destination uses a single thread for writing the destination file, but may use a separate thread for each destination file if the filename includes macros.



## Sources and destinations not affected by multithreading

The following list describes sources and destinations that use a separate thread even if you disable multithreading in {{% param "product.abbrev" %}}, in addition to the limit set in the `--worker-threads` command-line option.

  - The `logstore` destination uses separate threads for writing the messages from the journal to the logstore files, and also for timestamping. These threads are independent from the setting of the `--worker-threads` command-line option.

  - Every `sql` destination uses its own thread. These threads are independent from the setting of the `--worker-threads` command-line option.

  - The `java` destinations use one thread, even if there are multiple Java-based destinations configured. This thread is independent from the setting of the `--worker-threads` command-line option.

