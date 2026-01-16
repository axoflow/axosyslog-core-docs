---
title: "Log path flags"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Flags influence the behavior of `syslog-ng`, and the way it processes messages. The following flags may be used in the log paths, as described in {{% xref "/chapter-routing-filters/logpath/_index.md" %}}.

{{% include-headless "chunk/table-logflags-routing-filters.md" %}}

{{% alert title="Warning" color="warning" %}}

The `final`, `fallback`, and `catchall` flags apply only for the top-level log paths, they have no effect on embedded log paths.

{{% /alert %}}

## Example: Using log path flags {#example-logpath-flags}

Let's suppose that you have two hosts (`myhost_A` and `myhost_B`) that run two applications each (`application_A` and `application_B`), and you collect the log messages to a central AxoSyslog server. On the server, you create two log paths:

- one that processes only the messages sent by `myhost_A`, and
- one that processes only the messages sent by `application_A`.

This means that messages sent by `application_A` running on `myhost_A` will be processed by both log paths, and the messages of `application_B` running on `myhost_B` will not be processed at all.

- If you add the `final` flag to the first log path, then only this log path will process the messages of `myhost_A`, so the second log path will receive only the messages of `application_A` running on `myhost_B`.
- If you create a third log path that includes the `fallback` flag, it will process the messages not processed by the first two log paths, in this case, the messages of `application_B` running on `myhost_B`.
- Adding a fourth log path with the `catchall` flag would process every message received by the AxoSyslog server.

    ```shell
    log { source(s_localhost); destination(d_file); flags(catchall); };
    ```

The following example shows a scenario that can result in message loss. Do NOT use such a configuration, unless you know exactly what you are doing. The problem is if a message matches the filters in the first part of the first log path, {{% param "product.abbrev" %}} treats the message as 'processed'. Since the first log path includes the `final` flag, {{% param "product.abbrev" %}} will not pass the message to the second log path (the one with the `fallback` flag). As a result, {{% param "product.abbrev" %}} drops messages that do not match the filter of the embedded log path.

```shell
# Do not use such a configuration, unless you know exactly what you are doing.
log {
    source(s_network);
    # Filters in the external log path.
    # If a message matches this filter, it is treated as 'processed'
    filter(f_program);
    filter(f_message);
    log {
        # Filter in the embedded log path.
        # If a message does not match this filter, it is lost, it will not be processed by the 'fallback' log path
        filter(f_host);
        destination(d_file1);
    };
    flags(final);
};

log {
    source(s_network);
    destination(d_file2);
    flags(fallback);
};
```

## Example: Using the drop-unmatched flag

In the following example, if a log message arrives whose `$MSG` part does not contain the string `foo`, then {{% param "product.abbrev" %}} will discard the message and will not check compliance with the second `if` condition.

```shell
...
if {
    filter { message('foo') };
    flags(drop-unmatched)
};
if {
    filter { message('bar') };
};
...
```

(Without the `drop-unmatched` flag, {{% param "product.abbrev" %}} would check if the message complies with the second `if` condition, that is, whether or not the message contains the string `bar` .)
