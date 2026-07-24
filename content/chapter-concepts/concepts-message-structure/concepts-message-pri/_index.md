---
title: "The PRI message part"
weight:  50
aliases:
- /chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/concepts-message-bsdsyslog-pri/
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{< include-headless "banner-new-to-axosyslog.md" >}}

This section describes the `PRI` (priority) part of a syslog message, which encodes the message's facility and severity. The `PRI` is used the same way by the [BSD-syslog](https://datatracker.ietf.org/doc/rfc3164/) and [IETF-syslog](https://tools.ietf.org/html/rfc5424) protocols.


## The PRI message part

The `PRI` part of the syslog message (known as Priority value) represents the Facility and Severity of the message. Facility represents the part of the system sending the message, while Severity marks its importance.



## PRI formula

The Priority value is calculated using the following formula:

```shell
   <PRI> = ( <facility> * 8) + <severity> 
```

That is, you first multiply the Facility number by 8, and then add the numerical value of the Severity to the multiplied sum.



## Example: the correlation between facility value, severity value, and the Priority value in the PRI message part

The following example illustrates a sample syslog message with a sample `PRI` field (that is, Priority value):

```shell
   <133> Feb 25 14:09:07 webserver syslogd: restart
```

In this example, `<133>` represents the `PRI` field (Priority value). The syslog message's Facility value is `16`, and the Severity value is `5`.

Substituting the numerical values into the `<PRI>` = ( `<facility>` * `8`) + `<severity>` formula, the results match the Priority value in our example:

`<133>` = ( `<16>` * `8`) + `<5>`.


## Facility and Severity values

The possible Facility values (between `0` and `23`) and Severity values (between `0` and `7`) each correspond to a message type (see [Table 1: syslog Message Facilities</span>](#facility-codes)), or a message importance level (see [Table 2: syslog Message Severities](#severity-codes)).

{{% alert title="Note" color="info" %}}

Facility and severity are set by the sender and used inconsistently, and their names have varied across platforms over time, so a code's name or description is not a reliable indicator of the message. The descriptions follow RFC 5424, while the macro values are the traditional BSD names. {{% param "product.abbrev" %}} also accepts Facility codes as numerical values.

{{% /alert %}}

## syslog Message Facilities {#facility-codes}

The following table lists possible Facility values. The `Name` column shows the [`${FACILITY}`]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" >}}#macro-facility) macro value.


| Numerical Code (`${FACILITY_NUM}`) | Name (`${FACILITY}`) | Facility                                 |
| ---------------------------------- | -------------------- | ---------------------------------------- |
| 0              | `kern`            | kernel messages            |
| 1              | `user`            | user-level messages  |
| 2              | `mail`            | mail system            |
| 3              | `daemon`          | system daemons                  |
| 4              | `auth`            | security/authorization messages |
| 5              | `syslog`          | messages generated internally by syslogd |
| 6              | `lpr`             | line printer subsystem |
| 7              | `news`            | network news subsystem |
| 8              | `uucp`            | UUCP subsystem |
| 9              | `cron`            | clock daemon |
| 10             | `authpriv`        | security/authorization messages |
| 11             | `ftp`             | FTP daemon |
| 12             | `ntp`             | NTP subsystem |
| 13             | `security`        | log audit |
| 14             | `console`         | log alert |
| 15             | `solaris-cron`    | clock daemon |
| 16-23          | `local0`-`local7` | locally used facilities (local0-local7) |

## syslog Message Severities {#severity-codes}

The following table lists possible Severity values. The `Name` column shows the [`${SEVERITY}`]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" >}}#macro-priority) macro value (`${LEVEL}` and `${PRIORITY}` are aliases).

| Numerical Code (`${LEVEL_NUM}`) | Name (`${SEVERITY}`) | Severity                                 |
| ------------------------------- | -------------------- | ---------------------------------------- |
| 0              | `emerg`   | Emergency: system is unusable            |
| 1              | `alert`   | Alert: action must be taken immediately  |
| 2              | `crit`    | Critical: critical conditions            |
| 3              | `err`     | Error: error conditions                  |
| 4              | `warning` | Warning: warning conditions              |
| 5              | `notice`  | Notice: normal but significant condition |
| 6              | `info`    | Informational: informational messages    |
| 7              | `debug`   | Debug: debug-level messages              |

{{% alert title="Note" color="info" %}}

A message that arrives without a PRI — from a non-syslog source such as [OpenTelemetry]({{< relref "/chapter-sources/opentelemetry/_index.md" >}}) or a file, or a syslog message that omits the `<PRI>` field — defaults to facility `user` and severity `notice` (PRI `13`). Use the source's [`default-facility()`]({{< relref "/chapter-sources/configuring-sources-network/reference-source-network/_index.md" >}}#default-facility) and [`default-priority()`]({{< relref "/chapter-sources/configuring-sources-network/reference-source-network/_index.md" >}}#default-priority) options to change this.

{{% /alert %}}

## Setting the facility and severity

To override the facility and severity of a message, use the [`set-facility()`]({{< relref "/chapter-manipulating-messages/modifying-messages/rewrite-set-facility/_index.md" >}}) and [`set-severity()`]({{< relref "/chapter-manipulating-messages/modifying-messages/rewrite-set-severity/_index.md" >}}) rewrite rules:

```shell
rewrite r_pri {
    set-facility("local0");
    set-severity("err");
};
```

With [FilterX]({{< relref "/filterx/_index.md" >}}), set the combined PRI value with [`set_pri()`]({{< relref "/filterx/function-reference.md" >}}#set-pri) (`facility * 8 + severity`, so `local0` (16) and `err` (3) give `131`):

```shell
filterx {
    set_pri(131);
};
```

Both examples set the message to `local0.err`. Assigning the macros directly (such as `$SEVERITY` or `$PRIORITY`) does not work — they are read-only, macro-based values.
