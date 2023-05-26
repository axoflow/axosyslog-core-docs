---
title: "snmp: Sending SNMP traps"
weight:  5500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `snmp()` driver sends SNMP traps using the Simple Network Management Protocol version 2c or version 3. Incoming log messages can be converted to SNMP traps, as the fields of the SNMP messages can be customized using {{% param "product.abbrev" %}} macros.

The `snmp()` driver is available in {{% param "product.abbrev" %}} version 3.22 and later.


{{% alert title="Note" color="info" %}}

The `snmp` destination driver currently supports sending SNMP traps only using the UDP transport protocol.

{{% /alert %}}


The `snmp()` driver requires the `host()`, `trap-obj()`, and `snmp-obj()` options to be set, as well as the `engine-id()` and `version()` options when using the SNMPv3 protocol. For the list of available optional parameters, see {{% xref "/docs/chapter-destinations/destination-snmp/reference-destination-snmp/_index.md" %}}.


## Declaration:

```c
   destination d_snmp {snmp(host() trap-obj() snmp-obj() ...);};
```



{{% alert title="Warning" color="warning" %}}

If {{% param "product.abbrev" %}} cannot resolve the destination hostname during startup, it will try to resolve the hostname again when the next message to be sent as an SNMP trap is received. However, if this name resolution fails, the trap will be dropped.

{{% /alert %}}



{{% alert title="Note" color="info" %}}

The `snmp()` destination driver does not generate MARK signals itself, but can receive and forward MARK signals.

{{% /alert %}}



## Example: Using the snmp() destination driver

The following example defines an SNMP destination that uses the SNMPv2c protocol.

```c
   destination d_snmpv2c{
        snmp(
            version('v2c')
            host('192.168.1.1')
            trap-obj('.1.3.6.1.6.3.1.1.4.1.0', 'Objectid', '.1.3.6.1.4.1.18372.3.1.1.1.2.1')
            snmp-obj('.1.3.6.1.4.1.18372.3.1.1.1.1.1.0', 'Octetstring', 'Test SNMP trap')
            snmp-obj('.1.3.6.1.4.1.18372.3.1.1.1.1.2.0', 'Octetstring', 'admin')
            snmp-obj('.1.3.6.1.4.1.18372.3.1.1.1.1.3.0', 'Ipaddress', '192.168.1.1')
            );
    };
```

The following example defines an SNMP destination that uses the SNMPv3 protocol and uses macros to fill the values of the SNMP objects.

```c
   destination d_snmpv3{
        snmp(
            version('v3')
            host('192.168.1.1')
            port(162)
            engine-id('0xdeadbeefde')
            auth-username('myusername')
            auth-password('password')
            enc-algorithm('AES')
            enc-password('password')
            trap-obj('.1.3.6.1.6.3.1.1.4.1.0', 'Objectid', '.1.3.6.1.4.1.18372.3.1.1.1.2.1')
            snmp-obj('.1.3.6.1.4.1.18372.3.1.1.1.1.1', 'Octetstring', '${MESSAGE}')
            snmp-obj('.1.3.6.1.4.1.18372.3.1.1.1.1.2', 'Octetstring', 'admin')
            snmp-obj('.1.3.6.1.4.1.18372.3.1.1.1.1.3', 'Ipaddress', '${SOURCEIP}')
            );
    };
```

