---
title: "Linux audit parser"
weight:  1900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The Linux audit parser can parse the log messages of the Linux Audit subsystem (`auditd`). The {{% param "product.abbrev" %}} application can separate these log messages to name-value pairs. For details on using value-pairs in {{% param "product.abbrev" %}} see {{% xref "/chapter-concepts/concepts-value-pairs/_index.md" %}}. The following is a sample log message of `auditd`:

```c
   type=SYSCALL msg=audit(1441988805.991:239): arch=c000003e syscall=59 success=yes exit=0 a0=7fe49a6d0e98 a1=7fe49a6d0e40 a2=7fe49a6d0e80 a3=2 items=2 ppid=3652 pid=3660 auid=1000 uid=0 gid=0 euid=0 suid=0 fsuid=0 egid=0 sgid=0 fsgid=0 tty=(none) ses=5 comm="dumpe2fs" exe="/sbin/dumpe2fs" key=(null)
    type=EXECVE msg=audit(1441988805.991:239): argc=3 a0="dumpe2fs" a1="-h" a2="/dev/sda1"
    type=CWD msg=audit(1441988805.991:239):  cwd="/"
    type=PATH msg=audit(1441988805.991:239): item=0 name="/sbin/dumpe2fs" inode=137078 dev=08:01 mode=0100755 ouid=0 ogid=0 rdev=00:00 nametype=NORMAL
    type=PATH msg=audit(1441988805.991:239): item=1 name="/lib64/ld-linux-x86-64.so.2" inode=5243184 dev=08:01 mode=0100755 ouid=0 ogid=0 rdev=00:00 nametype=NORMAL
    type=PROCTITLE msg=audit(1441988805.991:239): proctitle=64756D7065326673002D68002F6465762F73646131
```

Certain fields of the audit log can be encoded in hexadecimal format, for example, the `arch` field, or the `a<number>` fields in the previous example. The {{% param "product.abbrev" %}} application automatically decodes these fields (for example, the `c000003e` value becomes `x86_64`).

The {{% param "product.abbrev" %}} application extracts every field into name-value pairs. It automatically decodes the following fields:

  - `name`

  - `proctitle`

  - `path`

  - `dir`

  - `comm`

  - `ocomm`

  - `data`

  - `old`

  - `new`

To parse the log messages of the Linux Audit subsystem, define a parser that has the `linux-audit-parser()` option. By default, the parser will process the `${MESSAGE}` part of the log message. To process other parts of a log message, use the `template()` option. You can also define the parser inline in the log path.


## Declaration:

```c
   parser parser_name {
        linux-audit-parser(
            prefix()
            template()
        );
    };
```



## Example: Using the linux-audit-parser() parser

In the following example, the source is a log file created by auditd. Since the audit log format is not a syslog format, the syslog parser is disabled, so that {{% param "product.abbrev" %}} does not parse the message: `flags(no-parse)`. The parser inserts "`.auditd.`" prefix before all extracted name-value pairs. The destination is a file, that uses the `format-json` template function. Every name-value pair that begins with a dot ("`.`") character will be written to the file (`dot-nv-pairs`). The log line connects the source, the destination, and the parser.

```c
   source s_auditd {
        file(/var/log/audit/audit.log flags(no-parse));
    };
    
    destination d_json {
        file(
            "/tmp/test.json"
            template("$(format-json .auditd.*)\n")
        );
    };
    
    parser p_auditd {
        linux-audit-parser (prefix(".auditd."));
    };
    
    log {
        source(s_auditd);
        parser(p_auditd);
        destination(d_json);
    };
```

You can also define the parser inline in the log path.

```c
   source s_auditd {
        file(/var/log/audit/audit.log);
    };
    
    destination d_json {
        file(
            "/tmp/test.json"
            template("$(format-json .auditd.*)\n")
        );
    };
    
    log {
        source(s_auditd);
        parser {
            linux-audit-parser (prefix(".auditd."));
        };
        destination(d_json);
    };
```

