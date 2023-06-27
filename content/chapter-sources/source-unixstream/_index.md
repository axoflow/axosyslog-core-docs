---
title: "unix-stream, unix-dgram: Collecting messages from UNIX domain sockets"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `unix-stream()` and `unix-dgram()` drivers open an `AF_UNIX` socket and start listening on it for messages. The `unix-stream()` driver is primarily used on Linux and uses `SOCK_STREAM` semantics (connection oriented, no messages are lost), while `unix-dgram()` is used on BSDs and uses `SOCK_DGRAM` semantics: this may result in lost local messages if the system is overloaded.

To avoid denial of service attacks when using connection-oriented protocols, the number of simultaneously accepted connections should be limited. This can be achieved using the `max-connections()` parameter. The default value of this parameter is quite strict, you might have to increase it on a busy system.

Both unix-stream and unix-dgram have a single required argument that specifies the filename of the socket to create. For the list of available optional parameters, see {{% xref "/chapter-sources/source-unixstream/reference-source-unixstream/_index.md" %}}


## Declaration:

```c
   unix-stream(filename [options]);
    unix-dgram(filename [options]);
```


{{% alert title="Note" color="info" %}}

`syslogd` on Linux originally used `SOCK_STREAM` sockets, but some distributions switched to `SOCK_DGRAM` around 1999 to fix a possible DoS problem. On Linux you can choose to use whichever driver you like as syslog clients automatically detect the socket type being used.

{{% /alert %}}


## Example: Using the unix-stream() and unix-dgram() drivers {#example-source-unixstream}

```c
   source s_stream {
        unix-stream("/dev/log" max-connections(10));
    };
```

```c
   source s_dgram {
        unix-dgram("/var/run/log");
    };
```

