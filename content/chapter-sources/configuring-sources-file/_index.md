---
title: "file: Collecting messages from text files"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Collects log messages from plain-text files, for example, from the logfiles of an Apache webserver. If you want to use [wildcards in the filename, use the `wildcard-file()` source]({{< relref "/docs/chapter-sources/configuring-sources-wildcard-file/_index.md" >}}).

The AxoSyslog application notices if a file is renamed or replaced with a new file, so it can correctly follow the file even if logrotation is used. When AxoSyslog is restarted, it records the position of the last sent log message in the `/opt/syslog-ng/var/syslog-ng.persist/var/lib/syslog-ng/syslog-ng.persist` file, and continues to send messages from this position after the restart.

The file driver has a single required parameter specifying the file to open. If you want to use [wildcards in the filename, use the `wildcard-file()` source]({{< relref "/docs/chapter-sources/configuring-sources-wildcard-file/_index.md" >}}). For the list of available optional parameters, see {{% xref "/docs/chapter-sources/configuring-sources-file/reference-source-file/_index.md" %}}.


## Declaration:

```c
   file("filename");
```



## Example: Using the file() driver {#example-source-file}

```c
   source s_file {
        file("/var/log/messages");
    };
```



## Example: Tailing files

The following source checks the `access.log` file every second for new messages.

```c
   source s_tail {
        file("/var/log/apache/access.log" follow-freq(1) flags(no-parse));
    };
```


{{% alert title="Note" color="info" %}}

If the message does not have a proper syslog header, AxoSyslog treats messages received from files as sent by the `kern` facility. Use the `default-facility()` and `default-priority()` options in the source definition to assign a different facility if needed.

{{% /alert %}}
