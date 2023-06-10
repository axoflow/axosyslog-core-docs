---
title: "Correlating messages using the grouping-by() parser"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.abbrev" %}} application can correlate log messages that match a set of filters. This works similarly to SQL GROUP BY statements. Alternatively, you can also correlate log messages using pattern databases. For details, see {{% xref "/docs/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-correlation/_index.md" %}}.

{{% include-headless "chunk/correlation-intro.md" %}}


## How the grouping-by() parser works

![](../Images/Figures/fig-grouping-by-parser-works.png)

The `grouping-by()` parser has three options that determine if a message is added to a context: `scope()`, `key()`, and `where()`.

  - The `scope()` option acts as an early filter, selecting messages sent by the same process (`${HOST}${PROGRAM}${PID}` is identical), application (`${HOST}${PROGRAM}` is identical), or host.

  - The `key()` identifies the context the message belongs to. (The value of the key must be the same for every message of the context.)

  - To use a filter to further limit the messages that are added to the context, you can use the **where()** option.

The `timeout()` option determines how long a context is stored, that is, how long {{% param "product.abbrev" %}} waits for related messages to arrive. If the group has a specific log message that ends the context (for example, a logout message), you can specify it using the **trigger()** option.

When the context is closed, and the messages match the filter set in the `having()` option (or the `having()` option is not set), {{% param "product.abbrev" %}} generates and sends the message set in the `aggregate()` option.

{{% include-headless "wnt/note-message-context.md" %}}



## Declaration:

```c
   parser parser_name {
        grouping-by(
            key()
            having()
            aggregate()
            timeout()
        );
    };
```


For the parser to work, you must set at least the following options: `key()`, `aggregate()`, and `timeout()`.

{{% include-headless "chunk/correlation-context-timeout.md" %}}


## Example: Correlating Linux Audit logs

Linux audit logs tend to be broken into several log messages (generated as a list of lines). Usually, the related lines are close to each other in time, but multiple events can be logged at around the same time, which get mixed up in the output. The example below is the audit log for running `ntpdate`:

```c
   type=SYSCALL msg=audit(1440927434.124:40347): arch=c000003e syscall=59 success=yes exit=0 a0=7f121cef0b88 a1=7f121cef0c00 a2=7f121e690d98 a3=2 items=2 ppid=4312 pid=4347 auid=4294967295 uid=0 gid=0 euid=0 suid=0 fsuid=0 egid=0 sgid=0 fsgid=0 tty=(none) ses=4294967295 comm="ntpdate" exe="/usr/sbin/ntpdate" key=(null)
    type=EXECVE msg=audit(1440927434.124:40347): argc=3 a0="/usr/sbin/ntpdate" a1="-s" a2="ntp.ubuntu.com"
    type=CWD msg=audit(1440927434.124:40347):  cwd="/"
    type=PATH msg=audit(1440927434.124:40347): item=0 name="/usr/sbin/ntpdate" inode=2006003 dev=08:01 mode=0100755 ouid=0 ogid=0 rdev=00:00 nametype=NORMAL
    type=PATH msg=audit(1440927434.124:40347): item=1 name="/lib64/ld-linux-x86-64.so.2" inode=5243184 dev=08:01 mode=0100755 ouid=0 ogid=0 rdev=00:00 nametype=NORMAL
    type=PROCTITLE msg=audit(1440927434.124:40347): proctitle=2F62696E2F7368002F7573722F7362696E2F6E7470646174652D64656269616E002D73

```

These lines are connected by their second field: `msg=audit(1440927434.124:40347)`. You can parse such messages using the [Linux audit parser of {{% param "product.abbrev" %}}]({{< relref "/docs/chapter-parsers/linux-audit-parser/_index.md" >}}), and then use the parsed `.auditd.msg` field to group the messages.

```c
   parser auditd_groupingby {
        grouping-by(
            key("${.auditd.msg}")
            aggregate(
                value("MESSAGE" "$(format-json .auditd.*)")
            )
            timeout(10)
        );
    };
```

For another example, see [The grouping-by() parser in syslog-ng blog post](https://www.syslog-ng.com/community/b/blog/posts/the-grouping-by-parser-in-syslog-ng-3-8)

