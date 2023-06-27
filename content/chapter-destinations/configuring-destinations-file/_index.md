---
title: "file: Storing messages in plain-text files"
weight:  1100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The file driver is one of the most important destination drivers. It allows to output messages to the specified text file, or to a set of files.

The destination filename may include macros which get expanded when the message is written, thus a simple `file()` driver may create several files: for example, {{% param "product.abbrev" %}} can store the messages of client hosts in a separate file for each host. For more information on available macros see {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" %}}.

If the expanded filename refers to a directory which does not exist, it will be created depending on the `create-dirs()` setting (both global and a per destination option).

The `file()` has a single required parameter that specifies the filename that stores the log messages. For the list of available optional parameters, see {{% xref "/chapter-destinations/configuring-destinations-file/reference-destination-file/_index.md" %}}.


## Declaration:

```c
   file(filename options());
```



## Example: Using the file() driver {#example-destination-file}

```c
   destination d_file { file("/var/log/messages"); };
```



## Example: Using the file() driver with macros in the file name and a template for the message {#example-destination-file-macro}

```c
   destination d_file {
        file("/var/log/${YEAR}.${MONTH}.${DAY}/messages"
             template("${HOUR}:${MIN}:${SEC} ${TZ} ${HOST} [${LEVEL}] ${MESSAGE}\n")
             template-escape(no));
    };
```


{{< include-headless "wnt/note-logrotate.md" >}}

{{% alert title="Warning" color="warning" %}}

Since the state of each created file must be tracked by `syslog-ng`, it consumes some memory for each file. If no new messages are written to a file within 60 seconds (controlled by the `time-reap()` global option), it is closed, and its state is freed.

Exploiting this, a DoS attack can be mounted against the system. If the number of possible destination files and its needed memory is more than the amount available on the AxoSyslog server.

The most suspicious macro is `${PROGRAM}`, where the number of possible variations is rather high. Do not use the `${PROGRAM}` macro in insecure environments.

{{% /alert %}}
