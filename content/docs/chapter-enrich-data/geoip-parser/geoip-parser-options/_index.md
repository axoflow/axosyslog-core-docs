---
title: "Options of geoip parsers"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `geoip` parser has the following options.


{{% include-headless "chunk/option-parser-prefix.md" %}}

For example, to insert the `geoip.` prefix, use the **prefix(.geoip.)** option. To refer to a particular data when using a prefix, use the prefix in the name of the macro, for example, `${geoip.country_code}` .



## database() {#geoip-parser-database}

|           |                                |
| --------- | ------------------------------ |
| Synopsis: | database()                     |
| Default:  | `/usr/share/GeoIP/GeoIP.dat` |

*Description:* The full path to the GeoIP database to use. Note that {{% param "product.abbrev" %}} must have the required privileges to read this file. Do not modify or delete this file while {{% param "product.abbrev" %}} is running, it can crash {{% param "product.abbrev" %}}.

