---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
Destination drivers available in `syslog-ng`

| Name     | Description                |
|--------------|------------------------|
| [amqp()]({{< relref "/docs/chapter-destinations/configuring-destinations-amqp/_index.md" >}}) | Publishes messages using the AMQP (Advanced Message Queuing Protocol). |

| [elasticsearch-http()]({{< relref "/docs/chapter-destinations/configuring-destinations-elasticsearch-http/_index.md" >}}) | Sends messages to an Elasticsearch server over HTTP using its REST API. |

| [file()]({{< relref "/docs/chapter-destinations/configuring-destinations-file/_index.md" >}}) | Writes messages to the specified file. |

| [graphite()]({{< relref "/docs/chapter-destinations/configuring-destinations-graphite/_index.md" >}}) | Sends metrics to a [Graphite](http://graphite.readthedocs.io/en/latest/index.html) server to store numeric time-series data. |

| [graylog2()]({{< relref "/docs/chapter-destinations/configuring-destinations-graylog/_index.md" >}}) | Sends syslog messages to [Graylog](http://docs.graylog.org). |

| [hdfs()]({{< relref "/docs/chapter-destinations/configuring-destinations-hdfs/_index.md" >}}) | Sends messages into a file on a [Hadoop Distributed File System (HDFS)](http://hadoop.apache.org/) node.

| http() | Sends messages over the HTTP protocol. There are two different implementations of this driver: a [Java-based http driver]({{< relref "/docs/chapter-destinations/configuring-destinations-http/_index.md" >}}), and an [http driver without Java]({{< relref "/docs/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}}). |

| [kafka()]({{< relref "/docs/chapter-destinations/configuring-destinations-kafka/_index.md" >}}) | Publishes log messages to the [Apache Kafka](http://kafka.apache.org) message bus, where subscribers can access them. |

| [loggly()]({{< relref "/docs/chapter-destinations/configuring-destinations-loggly/_index.md" >}}) | Sends log messages to the [Loggly](https://www.loggly.com/) Logging-as-a-Service provider. |

| [logmatic()]({{< relref "/docs/chapter-destinations/configuring-destinations-logmatic/_index.md" >}}) | Sends log messages to the [Logmatic.io](https://logmatic.io/) Logging-as-a-Service provider. |

| [mongodb()]({{< relref "/docs/chapter-destinations/configuring-destinations-mongodb/_index.md" >}}) | Sends messages to a [MongoDB](https://www.mongodb.com) database. |

| [network()]({{< relref "/docs/chapter-destinations/configuring-destinations-network/_index.md" >}}) | Sends messages to a remote host using the [BSD-syslog protocol]({{< relref "/docs/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/_index.md" >}}) over IPv4 and IPv6. Supports the TCP, UDP, and TLS network protocols.

| [pipe()]({{< relref "/docs/chapter-destinations/configuring-destinations-pipe/_index.md" >}}) | Writes messages to the specified named pipe. |

| [program()]({{< relref "/docs/chapter-destinations/configuring-destinations-program/_index.md" >}}) | Forks and launches the specified program, and sends messages to its standard input. |

| [python()]({{< relref "/docs/chapter-destinations/python-destination/_index.md" >}}) | Send messages to a custom destination written in Python. |

| [redis()]({{< relref "/docs/chapter-destinations/configuring-destinations-redis/_index.md" >}}) | Sends messages as name-value pairs to a [Redis](https://redis.io/) key-value store. |

| [slack()]({{< relref "/docs/chapter-destinations/destination-slack/_index.md" >}}) | Sends messages and alerts to a [Slack](https://slack.com/) channel using the Slack Web API. |

| [riemann()]({{< relref "/docs/chapter-destinations/configuring-destinations-riemann/_index.md" >}}) | Sends metrics or events to a [Riemann](http://riemann.io/) monitoring system. |

| [smtp()]({{< relref "/docs/chapter-destinations/configuring-destinations-smtp/_index.md" >}}) | Sends email messages to the specified recipients. |

| [snmp()]({{< relref "/docs/chapter-destinations/configuring-destinations-smtp/_index.md" >}}) | Sends sends SNMP traps using the Simple Network Management Protocol version 2c or version 3. |

| [sql()]({{< relref "/docs/chapter-destinations/configuring-destinations-sql/_index.md" >}}) | Sends messages into an SQL database. In addition to the standard `syslog-ng` packages, the `sql()` destination requires database-specific packages to be installed. Refer to the section appropriate for your platform in {{% xref "/docs/chapter-install/_index.md" %}}.

| [snmp()]({{< relref "/docs/chapter-destinations/configuring-destinations-snmp/_index.md" >}}) | Sends messages to the specified remote host using the SNMP v2c or v3 protocol. |

| [stomp()]({{< relref "/docs/chapter-destinations/configuring-destinations-stomp/_index.md" >}}) | Sends messages to a STOMP server. |

| [syslog()]({{< relref "/docs/chapter-destinations/configuring-destinations-syslog/_index.md" >}}) | Sends messages to the specified remote host using the [IETF-syslog protocol]({{< relref "/docs/chapter-concepts/concepts-message-structure/concepts-message-ietfsyslog/_index.md" >}}). The IETF standard supports message transport using the UDP, TCP, and TLS networking protocols. |

| [telegram()]({{< relref "/docs/chapter-destinations/configuring-destinations-telegram/_index.md" >}}) | Sends log messages to [Telegram](https://core.telegram.org/ "https://core.telegram.org"), which is a secure, cloud-based mobile and desktop messaging app. |

| [unix-dgram()]({{< relref "/docs/chapter-destinations/configuring-destinations-unixstream/_index.md" >}}) | Sends messages to the specified unix socket in `SOCK_DGRAM` style (BSD). |

| [unix-stream()]({{< relref "/docs/chapter-destinations/configuring-destinations-unixstream/_index.md" >}}) | Sends messages to the specified unix socket in `SOCK_STREAM` style (Linux). |

| [usertty()]({{< relref "/docs/chapter-destinations/destination-usertty/_index.md" >}}) | Sends messages to the terminal of the specified user, if the user is logged in.
