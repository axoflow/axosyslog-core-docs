---
title: "Converting Cisco syslog messages to clogMessageGenerated SNMP traps"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.abbrev" %}} application can convert the syslog messages sent by Cisco devices to Cisco-specific SNMP traps defined by the CISCO-SYSLOG-MIB (`enterprises.cisco.ciscoMgmt.ciscoCiscoMIB`) is also supported (such traps are also referred to as `clogMessageGenerated` notifications). That way, the incoming log messages can be forwarded to devices used to process and analyze Cisco-specific SNMP traps. For this to work correctly, the following requirements must be met:

  - The syslog-ng Source Configuration Library (SCL) must be included in the {{% param "product.abbrev" %}} configuration file:
    
    ```c
        @include "scl.conf"
    
    ```

  - The pattern database described in [Parsing Cisco-specific message fields with patterndb](#cisco-snmp-patterndb) must be used to parse the incoming log messages.

To accomplish this, {{% param "product.abbrev" %}} has to use a special pattern database to parse the Cisco-specific syslog messages, because these messages do not comply with the standard syslog formats.

For details on the Cisco-specific SNMP trap format, see [CISCO-SYSLOG-MIB](http://tools.cisco.com/ITDIT/MIBS/servlet/index) on the Cisco website.


## Parsing Cisco-specific message fields with patterndb

The `${PROGRAM}` part of the syslog messages sent by Cisco devices contain not only the program name, but other important protocol information part as well. The `${PROGRAM}` of these messages contains the Facility, Severity, and the Mnemonic (the Cisco name) of the message. The following pattern database parses these values and makes them available as the `.cisco.Facility`, `.cisco.Severity`, and `.cisco.MsgName`, respectively. The actual log message is available as `.cisco.MsgText`.

```c
   <patterndb version="4" pub_date="2011-05-03">
        <ruleset name="cisco snmp ruleset1" xml:id="480de478-d4a6-4a7f-bea4-0c0245d361e3">
            <description>Pattern for Cisco messages having BSD timestamps, for example: Jul 01 2010 00:32:59: %SYS-5-CONFIG_I: Configured from console by console</description>
            <pattern>%@ESTRING:.cisco.Facility:-@@ESTRING:.cisco.Severity:-@@ANYSTRING:.cisco.MsgName@</pattern>
                <rules>
                    <rule xml:id="09944c71-95eb-4bc0-8575-936931d85713" provider="oneidentity" class="system">
                        <patterns>
                            <pattern> @ANYSTRING:.cisco.MsgText@</pattern>
                        </patterns>
                    </rule>
                </rules>
        </ruleset>
        <ruleset name="cisco snmp ruleset2" xml:id="480de478-d4a6-4a7f-bea4-0c0245d361e3">
            <description>Pattern for Cisco messages having cisco-specific timestamps, for example: 18: Jan 22 10:45:44.543: %SYS-5-CONFIG_I: Configured from console by console</description>
            <rules>
                <rule xml:id="09944c71-95eb-4bc0-8575-936931d85714" provider="oneidentity" class="system">
                    <patterns>
                        <pattern>%@ESTRING:.cisco.Facility:-@@ESTRING:.cisco.Severity:-@@ESTRING:.cisco.MsgName::@ @ANYSTRING:.cisco.MsgText@</pattern>
                    </patterns>
                </rule>
            </rules>
        </ruleset>
    </patterndb>

```



## Sending clogMessageGenerated SNMP traps

To send out clogMessageGenerated SNMP traps, use the **cisco_snmp()** destination driver. The `cisco-snmp()` destination is actually a modified version of the `snmp()` destination driver.


{{% alert title="Note" color="info" %}}

The `cisco-snmp()` driver is actually a reusable configuration snippet. For details on using or writing SCLs, see {{% xref "/docs/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}.

{{% /alert %}}


The `cisco-snmp()` driver has the same requirements and options as the `snmp()` destination driver, but automatically fills the clogMessageGenerated-specific fields with the data received from parsing the Cisco-specific syslog messages using the pattern database. For details on the , see the `\<INSTALLDIR\>/ share/include/scl/snmp/plugin.conf` file.

**Declaration:**

```c
   destination d_cisco_snmp {cisco-snmp(host(<hostname>));};

```


## Example: Defining a Cisco-specific SNMP destination

The following example defines an SNMP destination that sends out clogMessageGenerated messages using the SNMPv3 protocol.

```c
   destination d_cisco_snmp {cisco-snmp(host("192.168.1.1")
    version("v3")
    engine-id("'0xdeadbeefde'")
    auth-username('myusername')
    auth-password('password')
    enc-password('password'));};

```


