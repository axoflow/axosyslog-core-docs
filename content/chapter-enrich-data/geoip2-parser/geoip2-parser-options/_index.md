---
title: "Options of geoip2 parsers"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `geoip2` parser has the following options.


{{% include-headless "chunk/option-parser-prefix.md" %}}

For example, to insert the `.geoip2` prefix, use the `prefix(.geoip2)` option. To refer to a particular data when using a prefix, use the prefix in the name of the macro, for example, `${geoip2.country_code}` .



## database() {#geoip2-parser-database}

|           |            |
| --------- | ---------- |
| Synopsis: | database() |
| Default:  |            |

*Description:* Path to the GeoIP2 database to use. This works with absolute and relative paths as well. Note that {{% param "product.abbrev" %}} must have the required privileges to read this file. Do not modify or delete this file while {{% param "product.abbrev" %}} is running, it can crash {{% param "product.abbrev" %}}.

{{% include-headless "chunk/option-parser-geoip.md" %}}

## kind() {#geoip2-parser-kind}

|           |                                                     |
| --------- | --------------------------------------------------- |
| Synopsis: | `kind("country")`, `kind("city")`, or `kind("asn")` |
| Default:  |                                                     |

Available in {{< product >}} 4.30 and later.

*Description:* The type of the GeoIP database to use, instead of the path of the database file. You can't use the `kind()` and `database()` options together. For example:

```shell
parser p_geoip2 { geoip2("${HOST}" kind("city") prefix(".geoip2.")); };
```

If you set neither `kind()` nor `database()`, {{% param "product.abbrev" %}} uses the GeoLite2 City database from its default location.

{{< include-headless "chunk/geoip-database-kinds.md" >}}

{{< include-headless "chunk/option-source-internal.md" >}}

{{% include-headless "chunk/option-parser-template.md" %}}

