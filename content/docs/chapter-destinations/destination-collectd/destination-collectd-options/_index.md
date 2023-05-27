---
title: "collectd() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `collectd()` destination has the following options. The `plugin()` and `type()` options are required options. You can also set other options of the underlying `unix-stream()` driver (for example, socket buffer size).

{{% include-headless "chunk/option-destination-diskbuffer.md" %}}

{{% include-headless "chunk/option-destination-flush-lines.md" %}}

{{% include-headless "chunk/option-destination-frac-digits.md" %}}

{{< include-headless "chunk/option-destination-hook.md" >}}


## host()

|          |                            |
| -------- | -------------------------- |
| Type:    | string, macro, or template |
| Default: | ${HOST}                    |

*Description:* The hostname that is passed to collectd. By default, {{% param "product.abbrev" %}} uses the host from the log message as the hostname.

```c
   type("gauge"),
```



## interval()

|          |         |
| -------- | ------- |
| Type:    | integer |
| Default: | 60      |

*Description:* The interval in which the data is collected.


{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{% include-headless "chunk/option-destination-keep-alive.md" %}}


## plugin()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* The name of the plugin that submits the data to collectd. For example:

```c
   plugin("${PROGRAM}"),
```



## plugin-instance()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* The name of the plugin-instance that submits the data to collectd.



## socket()

|          |                            |
| -------- | -------------------------- |
| Type:    | path                       |
| Default: | /var/run/collectd-unixsock |

*Description:* The path to the socket of collectd. For details, see the [collectd-unixsock(5) manual page](https://collectd.org/documentation/manpages/collectd-unixsock.5.shtml).

```c
   type("gauge"),
```


{{% include-headless "chunk/option-so-broadcast.md" %}}

{{% include-headless "chunk/option-source-so-keepalive.md" %}}

{{% include-headless "chunk/option-destination-so-rcvbuf..md" %}}

{{% include-headless "chunk/option-so-sndbuf.md" %}}

{{% include-headless "chunk/option-destination-suppress.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}


## type()

|          |                    |
| -------- | ------------------ |
| Type:    | string or template |
| Default: |                    |

*Description:* Identifies the type and number of values passed to collectd. For details, see the [types.db manual page](https://collectd.org/documentation/manpages/types.db.5.shtml). For example:

```c
   type("gauge"),
```



## type-instance()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* For example:

```c
   type-instance("seqnum"),
```



## values()

|          |                           |
| -------- | ------------------------- |
| Type:    | string, macro,or template |
| Default: | U                         |

*Description:* Colon-separated list of the values to send to collectd. For example:

```c
   values("${SEQNUM}"),
```

