---
title: "Message format parsed by panos-parser()"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section illustrates the most commonly used PAN-OS log format on the {{% param "product.name" %}} side.

For information about customizing log format on the PAN-OS side, see [the relevant section of the PAN-OS<sup>®</sup> Administrator's Guide](https://docs.paloaltonetworks.com/pan-os/8-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/custom-logevent-format.html).


## Message format and log format

Using the `panos-parser()`, the parsed messages in {{% param "product.abbrev" %}} have the following general format:

```shell
   <PRI><TIMESTAMP> <HOST> <PALO-ALTO-fields-in-CSV-format>
```

There are several "types" of log formats in Palo Alto Networks PAN-OS. For example, the most commonly used [SYSTEM type](https://docs.paloaltonetworks.com/pan-os/9-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/system-log-fields.html) has the following message format on the {{% param "product.abbrev" %}} side after parsing:

```shell
   <12>Apr 14 16:48:54 paloalto.test.net 1,2020/04/14 16:48:54,unknown,SYSTEM,auth,0,2020/04/14 16:48:54,,auth-fail,,0,0,general,medium,failed authentication for user 'admin'. Reason: Invalid username/password. From: 10.0.10.55.,1718,0x0,0,0,0,0,,paloalto
```

