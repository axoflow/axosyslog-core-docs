---
title: "unix-stream, unix-dgram: Sending messages to UNIX domain sockets"
weight:  7300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `unix-stream()` and `unix-dgram()` drivers send messages to a UNIX domain socket in either `SOCK_STREAM` or `SOCK_DGRAM` mode.

Both drivers have a single required argument specifying the name of the socket to connect to. For the list of available optional parameters, see {{% xref "/docs/chapter-destinations/configuring-destinations-unixstream/reference-destination-unixstream/_index.md" %}}.


## Declaration:

```c
   unix-stream(filename [options]);
    unix-dgram(filename [options]);
```



## Example: Using the unix-stream() driver {#example-destination-unixstream}

```c
   destination d_unix_stream { unix-stream("/var/run/logs"); };
```

