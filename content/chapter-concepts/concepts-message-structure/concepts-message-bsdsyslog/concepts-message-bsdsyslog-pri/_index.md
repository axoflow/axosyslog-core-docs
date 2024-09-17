---
title: "The PRI message part"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section describes the `PRI` message part of a syslog message, according to the [legacy-syslog or BSD-syslog protocol](https://tools.ietf.org/search/rfc3164).

For further details about the `HEADER` and `MSG` parts of a syslog message, see the following sections:

  - [`HEADER`]({{< relref "/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/concepts-message-bsdsyslog-header/_index.md" >}})

  - [`MSG`]({{< relref "/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/concepts-message-bsdsyslog-msg/_index.md" >}})


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

Facility codes may slightly vary between different platforms. The {{% param "product.name" %}} application accepts Facility codes as numerical values as well.

{{% /alert %}}

## syslog Message Facilities {#facility-codes}

The following table lists possible Facility values.


| Numerical Code | Facility                                 |
| -------------- | ---------------------------------------- |
| 0              | kernel messages            |
| 1              | user-level messages  |
| 2              | mail system            |
| 3              | system daemons                  |
| 4              | security/authorization messages |
| 5              | messages generated internally by syslogd |
| 6              | line printer subsystem |
| 7              | network news subsystem |
| 8              | UUCP subsystem |
| 9              | clock daemon |
| 10             | security/authorization messages |
| 11             | FTP daemon |
| 12             | NTP subsystem |
| 13             | log audit |
| 14             | log alert |
| 15             | clock daemon |
| 16-23          | locally used facilities (local0-local7) |

## syslog Message Severities {#severity-codes}

The following table lists possible Severity values.

| Numerical Code | Severity                                 |
| -------------- | ---------------------------------------- |
| 0              | Emergency: system is unusable            |
| 1              | Alert: action must be taken immediately  |
| 2              | Critical: critical conditions            |
| 3              | Error: error conditions                  |
| 4              | Warning: warning conditions              |
| 5              | Notice: normal but significant condition |
| 6              | Informational: informational messages    |
| 7              | Debug: debug-level messages              |
