---
title: "sun-streams: Collecting messages on Sun Solaris"
weight:  3700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Solaris uses its `STREAMS` framework to send messages to the `syslogd` process. Solaris 2.5.1 and above uses an IPC called *door* in addition to `STREAMS`, to confirm the delivery of a message. The AxoSyslog application supports the IPC mechanism via the `door()` option (see below).

{{% alert title="Note" color="info" %}}

The `sun-streams()` driver must be enabled when the `syslog-ng` application is compiled (see `./configure --help`).

{{% /alert %}}

The `sun-streams()` driver has a single required argument specifying the `STREAMS` device to open, and the `door()` option. For the list of available optional parameters, see {{% xref "/chapter-sources/source-sunstreams/reference-source-sunstreams/_index.md" %}}.

{{< include-headless "wnt/note-solaris-msgid.md" >}}


## Declaration:

```c
   sun-streams(<name_of_the_streams_device> door(<filename_of_the_door>));
```



## Example: Using the sun-streams() driver {#example-source-sunstreams}

```c
   source s_stream {
        sun-streams("/dev/log" door("/etc/.syslog_door"));
    };
```

