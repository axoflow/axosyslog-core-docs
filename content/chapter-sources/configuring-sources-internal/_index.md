---
title: "internal: Collect internal messages"
weight:  500
driver: "internal()"
short_description: "Collect internal messages"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

All messages generated internally by {{% param "product.abbrev" %}} use the `internal()` source. To collect warnings, errors and notices from {{% param "product.abbrev" %}} itself, include this source in one of your source statements. The {{% param "product.abbrev" %}} application issues a warning upon startup if none of the defined log paths reference this driver.

```shell
internal()
```

The {{% param "product.abbrev" %}} application sends the following message types from the `internal()` source:

- *fatal*: Priority value: critical (2), Facility value: syslog (5)
- *error*: Priority value: error (3), Facility value: syslog (5)
- *warning*: Priority value: warning (4), Facility value: syslog (5)
- *notice*: Priority value: notice (5), Facility value: syslog (5)
- *info*: Priority value: info (6), Facility value: syslog (5)

## Example: Using the internal() driver {#example-source-internal}

```shell
source s_local { internal(); };
log { source(s_internal); destination(d_file); };
```
