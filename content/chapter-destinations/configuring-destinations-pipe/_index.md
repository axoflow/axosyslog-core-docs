---
title: "pipe: Sending messages to named pipes"
weight:  3900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `pipe()` driver sends messages to a named pipe like `/dev/xconsole`.

The pipe driver has a single required parameter, specifying the filename of the pipe to open. The filename can include macros. For the list of available optional parameters, see {{% xref "/chapter-destinations/configuring-destinations-pipe/reference-destination-pipe/_index.md" %}}.


## Declaration:

```c
   pipe(filename);
```

{{% alert title="Warning" color="warning" %}}

Starting with {{% param "product.abbrev" %}} 3.0.2, pipes are created automatically. In earlier versions, you had to create the pipe using the `mkfifo(1)` command.

{{% /alert %}}



## Example: Using the pipe() driver {#example-destination-pipe}

```c
   destination d_pipe { pipe("/dev/xconsole"); };
```

