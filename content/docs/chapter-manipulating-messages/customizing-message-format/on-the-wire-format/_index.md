---
title: "Modifying the on-the-wire message format"
weight:  1500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Macros, templates, and template functions allow you to fully customize the format of the message. This flexibility makes it possible to use {{% param "product.abbrev" %}} in some unexpected way if needed, for example, to emulate simple, plain-text protocols. The following example shows you how to send LPUSH commands to a Redis server.

{{% alert title="Note" color="info" %}}

The purpose of this example is to demonstrate the flexibility of {{% param "product.abbrev" %}}. A dedicated Redis destination is available in {{% param "product.abbrev" %}} version 3.5. For details, see {{% xref "/docs/chapter-destinations/configuring-destinations-redis/_index.md" %}}.

{{% /alert %}}

The following template is a valid LPUSH command in accordance with the [Redis protocol](https://redis.io/topics/protocol/), and puts the $MESSAGE into a separate list for every $PROGRAM:

```c

    template t_redis_lpush {
        template("*3\r\n$$5\r\nLPUSH\r\n$$$(length ${PROGRAM})\r\n${PROGRAM}\r\n$$$(length ${MESSAGE})\r\n${MESSAGE}\r\n");
    };

```

If you use this template in a `network()` destination, {{% param "product.abbrev" %}} formats the message according to the template, and sends it to the Redis server.

```c

    destination d_redis_tcp {
        network("127.0.0.1" port(6379) template(t_redis_lpush));
    };

```
