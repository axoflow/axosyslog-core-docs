---
title: "snmptrap: Read Net-SNMP traps"
weight:  3500
driver: "snmptrap()"
short_description: "Read Net-SNMP traps"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Using the `snmptrap()` source, you can read and parse the SNMP traps of the [Net-SNMP](http://www.net-snmp.org)'s `snmptrapd` application. {{% param "product.abbrev" %}} can read these traps from a log file, and extract their content into name-value pairs, making it easy to forward them as a structured log message (for example, in JSON format). The {{% param "product.abbrev" %}} application automatically adds the `.snmp.` prefix to the name of the fields the extracted from the message.

The `snmptrap()` source is available in {{% param "product.abbrev" %}} version 3.10 and later.


## Limitations:

  - The `snmptrap()` source has only the options listed in {{% xref "/chapter-sources/syslog-ng-source-snmptrap/reference-source-snmptrap/_index.md" %}}. Other options commonly available in other source drivers are not supported.

  - {{< include-headless "chunk/para-snmptrap-discards-messages.md" >}}

  - The {{% param "product.abbrev" %}} application cannot resolve OIDs, you have to configure `snmptrapd` to do so. Note that because of a bug, if `snmptrapd` does not escape String values in the VarBindList if it can resolve an OID to a symbolic name. As a result, {{% param "product.abbrev" %}} cannot process traps that contain the `=` in the value of the string. To overcome this problem, disable resolving OIDs in `snmptrapd`. For details, see the documentation of `snmptrapd`.

  - The colon (`:`) character is commonly used in SNMP traps. However, this character cannot be used in the name of {{% param "product.abbrev" %}} macros (name-value pairs). Therefore, the {{% param "product.abbrev" %}} application automatically replaces all consecutive `:` characters with a single underscore (`_`) character. For example, you can reference the value of the `NET-SNMP-EXAMPLES-MIB::netSnmpExampleString` key using the `${NET-SNMP-EXAMPLES-MIB_netSnmpExampleString}` macro.
    
    Note that this affects only name-value pairs (macros). The generated message always contains the original name of the key.



## Prerequisites:

  - Configure `snmptrapd` to log into a file.

  - If you use SMIv1 traps, include the following format string in the configuration file of `snmptrapd`:
    
    ```shell
        format1 %.4y-%.2m-%.2l %.2h:%.2j:%.2k %B [%b]: %N\n\t%W Trap (%q) Uptime: %#T\n%v\n
    
    ```

  - If you use SMIv2 traps, use the default format. The `snmptrap()` source of {{% param "product.abbrev" %}} expects this default format:
    
    ```shell
        format2 %.4y-%.2m-%.2l %.2h:%.2j:%.2k %B [%b]:\n%v\n
    
    ```

  - Beacause of an `snmptrapd` bug, if you specify the filename in the configuration file with `logOption`, you must also specify another output as a command line argument (-Lf, -Ls). Otherwise, `snmptrapd` will not apply the the trap format.

To use the `snmptrap()` driver, the `scl.conf` file must be included in your {{% param "product.abbrev" %}} configuration:

```shell
   @include "scl.conf"
```



## Example: Using the snmptrap() driver {#example-source-snmptrap}

A sample `snmptrapd` configuration:

```shell
   authCommunity log,execute,net public
    format1 %.4y-%.2m-%.2l %.2h:%.2j:%.2k %B [%b]: %N\n\t%W Trap (%q) Uptime: %#T\n%v\n
    outputOption s
```

Starting `snmptrapd`: `snmptrapd -A -Lf /var/log/snmptrapd.log`

Sending a sample V2 trap message: `snmptrap -v2c -c public 127.0.0.1 666 NET-SNMP-EXAMPLES-MIB::netSnmpExampleHeartbeatNotification netSnmpExampleHeartbeatRate i 60 netSnmpExampleString s "string"`. From this trap, {{% param "product.abbrev" %}} receives the following input:

```shell
   2017-05-23 15:29:40 localhost [UDP: [127.0.0.1]:59993->[127.0.0.1]:162]:
    SNMPv2-SMI::mib-2.1.3.0 = Timeticks: (666) 0:00:06.66   SNMPv2-SMI::snmpModules.1.1.4.1.0 = OID: NET-SNMP-EXAMPLES-MIB::netSnmpExampleHeartbeatNotification     NET-SNMP-EXAMPLES-MIB::netSnmpExampleHeartbeatRate = INTEGER: 60        NET-SNMP-EXAMPLES-MIB::netSnmpExampleString = STRING: string
```

The following {{% param "product.abbrev" %}} configuration sample uses the default settings of the driver, reading SNMP traps from the `/var/log/snmptrapd.log` file, and writes the log messages generated from the traps into a file.

```shell
   @include "scl.conf"
    log {
      source {
        snmptrap(filename("/var/log/snmptrapd.log"));
      };
      destination {
        file("/var/log/example.log");
      };
    };
```

From the trap, {{% param "product.abbrev" %}} writes the following into the log file:

```shell
   May 23 15:29:40 myhostname snmptrapd: hostname='localhost', transport_info='UDP: [127.0.0.1]:59993->[127.0.0.1]:162', SNMPv2-SMI::mib-2.1.3.0='(666) 0:00:06.66', SNMPv2-SMI::snmpModules.1.1.4.1.0='NET-SNMP-EXAMPLES-MIB::netSnmpExampleHeartbeatNotification', NET-SNMP-EXAMPLES-MIB::netSnmpExampleHeartbeatRate='60', NET-SNMP-EXAMPLES-MIB::netSnmpExampleString='string'
```

Using the same input trap, the following configuration example formats the SNMP traps as JSON messages.

```shell
   @include "scl.conf"
    log {
      source {
        snmptrap(
          filename("/var/log/snmptrapd.log")
          set-message-macro(no)
        );
      };
    
      destination {
        file("/var/log/example.log" template("$(format-json --scope dot-nv-pairs)\n"));
      };
    };
```

The previous trap formatted as JSON:

```shell
   {
       "_snmp":{
          "transport_info":"UDP: [127.0.0.1]:59993->[127.0.0.1]:162",
          "hostname":"localhost",
          "SNMPv2-SMI_snmpModules":{
             "1":{
                "1":{
                   "4":{
                      "1":{
                         "0":"NET-SNMP-EXAMPLES-MIB::netSnmpExampleHeartbeatNotification"
                      }
                   }
                }
             }
          },
          "SNMPv2-SMI_mib-2":{
             "1":{
                "3":{
                   "0":"(666) 0:00:06.66"
                }
             }
          },
          "NET-SNMP-EXAMPLES-MIB_netSnmpExampleString":"string",
          "NET-SNMP-EXAMPLES-MIB_netSnmpExampleHeartbeatRate":"60"
       }
    }
```

