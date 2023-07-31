---
title: Nonsequential message processing
weight: 3950
---

By default, {{% param "product.abbrev" %}} processes log messages arriving from a single connection sequentially. Sequential processing:

- ensures message ordering, and the
- efficient use CPU on a per message basis.

Sequential processing performs well if you have relatively many parallel connections, in which case it uses all the available CPU cores. However, if a small number of connections deliver a large number of messages, this behavior becomes a bottleneck.

Starting with {{% param "product.abbrev" %}} version 4.3, {{% param "product.abbrev" %}} can split a stream of incoming messages into a set of partitions, which can be processed by multiple threads in parallel. Depending on how you partition the stream, you might lose the message ordering, but can scale the incoming load to all CPUs in the system, even if the entire load is coming from a single, chatty sender.

To enable this mode of execution, use the `parallelize()` element in your log path.

The following example takes the messages of the `tcp()` source and processes them with 4 parallel threads, regardless of the number of connections used to deliver the messages to the `tcp()` source.

```shell
log {
  source {
    tcp(
      port(2000)
      log-iw-size(10M) max-connections(10) log-fetch-limit(100000)
    );
  };
  parallelize(partitions(4));

  # from this part on, messages are processed in parallel even if
  # messages are originally coming from a single connection

  parser { ... };
  destination { ... };
};
```

`parallelize()` uses round-robin to allocate messages to partitions by default, but you can retain ordering for a subset of messages with the `partition-key()` option. The `partition-key()` option specifies a template: messages that expand the template to the same value are mapped to the same partition. For example, you can partition messages based on their sender host:

```shell
log {
  source {
    tcp(
      port(2000)
      log-iw-size(10M) max-connections(10) log-fetch-limit(100000)
    );
  };
  parallelize(partitions(4) partition-key("$HOST"));

  # from this part on, messages are processed in parallel if their
  # $HOST value differs. Messages with the same $HOST will be mapped
  # to the same partition and are processed sequentially.

  parser { ... };

  destination { ... };
};
```
