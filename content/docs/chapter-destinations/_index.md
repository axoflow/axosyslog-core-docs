---
title: "destination: Forward, send, and store log messages"
weight:  2100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

A destination is where a log message is sent if the filtering rules match. Similarly to sources, destinations consist of one or more drivers, each defining where and how messages are sent.

{{% alert title="Note" color="info" %}}

If no drivers are defined for a destination, all messages sent to the destination are discarded. This is equivalent to omitting the destination from the log statement.

{{% /alert %}}

To define a destination, add a destination statement to the `syslog-ng` configuration file using the following syntax:

```c
   destination <identifier> {
        destination-driver(params); destination-driver(params); ...
    };
```


## Example: A simple destination statement

The following destination statement sends messages to the TCP port `1999` of the `10.1.2.3` host.

```c
   destination d_demo_tcp {
        network("10.1.2.3" port(1999));
    };
```

If name resolution is configured, you can use the hostname of the target server as well.

```c
   destination d_tcp {
        network("target_host" port(1999));
    };
```


{{% alert title="Warning" color="warning" %}}

  - Do not define the same drivers with the same parameters more than once, because it will cause problems. For example, do not open the same file in multiple destinations.

  - Do not use the same destination in different log paths, because it can cause problems with most destination types. Instead, use filters and log paths to avoid such situations.

  - {{% include-headless "chunk/para-initializing-sources-destinations.md" %}}

{{% /alert %}}

The following table lists the destination drivers available in {{% param "product.abbrev" %}}. If these destinations do not satisfy your needs, you can extend {{% param "product.abbrev" %}} and write your own destination, for example, in C, Java, or Python. For details, see {{% xref "/docs/chapter-destinations/reference-destination-custom/_index.md" %}}.

The following destination driver groups are available in {{% param "product.abbrev" %}}:
