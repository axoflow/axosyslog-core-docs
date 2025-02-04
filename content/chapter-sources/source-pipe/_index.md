---
title: "pipe: Collect messages from named pipes"
weight:  2700
driver: "pipe()"
short_description: "Collect messages from named pipes"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The pipe driver opens a named pipe with the specified name and listens for messages. It is used as the native message delivery protocol on HP-UX.

The pipe driver has a single required parameter, specifying the filename of the pipe to open. For the list of available optional parameters, see {{% xref "/chapter-sources/source-pipe/reference-source-pipe/_index.md" %}}.


## Declaration:

```shell
   pipe(filename);
```


{{% alert title="Note" color="info" %}}

As of version 3.0.2, pipes are created automatically. In earlier versions, you had to create the pipe using the `mkfifo(1)` command.

{{% /alert %}}

Pipe is very similar to the `file()` driver, but there are a few differences, for example, `pipe()` opens its argument in read-write mode, therefore it is not recommended to be used on special files like `/proc/kmsg`.

{{% alert title="Warning" color="warning" %}}

  - It is not recommended to use `pipe()` on anything else than real pipes.

  - By default, {{% param "product.abbrev" %}} uses the `flags(no-hostname)` option for pipes, meaning that {{% param "product.abbrev" %}} assumes that the log messages received from the pipe do not contain the hostname field. If your messages do contain the hostname field, use `flags(expect-hostname)`.

{{% /alert %}}


## Example: Using the pipe() driver {#example-source-pipe}

```shell
   source s_pipe {
        pipe("/dev/pipe" pad-size(2048));
    };
```

