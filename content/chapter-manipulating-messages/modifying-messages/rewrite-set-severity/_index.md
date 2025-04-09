---
title: "Set the severity field"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

It is possible to configure the `severity` field with the `set-severity()` rewrite function. When configured, the `set-severity()` rewrite function will only rewrite the `$SEVERITY` field in the message to the first parameter value specified in the function.

{{% alert title="Note" color="info" %}}

If the parameter value is not a valid parameter value, the function ignores it and sends a debug message, but the {{% param "product.name" %}} application still sends the message.

{{% /alert %}}

## Declaration

```shell
rewrite <name_of_the_rule> {
    set-severity("severity string or number");
};
```

## Parameters

The `set-severity()` rewrite function has a single, mandatory parameter that can be defined as follows:

```shell
set-severity( "parameter1" );
```

## Accepted values

The `set-severity()` rewrite function accepts numeric values, named values, and aliases. Aliases are available in  {{% param "product.abbrev" %}} version 4.6 and later.

| Numerical Code | Named Value | Alias                                 |
| -------------- | ------------| ------------------------------------- |
| 0 | `emerg` | `SYSLOG_SEVERITY_CODE(0)` |
| 0 | `emergency` | `SYSLOG_SEVERITY_CODE(0)` |
| 0 | `panic` | `SYSLOG_SEVERITY_CODE(0)` |
| 1 | `alert` | `SYSLOG_SEVERITY_CODE(1)` |
| 2 | `crit` | `SYSLOG_SEVERITY_CODE(2)` |
| 2 | `critical` | `SYSLOG_SEVERITY_CODE(2)` |
| 2 | `fatal` | `SYSLOG_SEVERITY_CODE(2)` |
| 3 | `err` | `SYSLOG_SEVERITY_CODE(3)` |
| 3 | `error` | `SYSLOG_SEVERITY_CODE(3)` |
| 4 | `warning` | `SYSLOG_SEVERITY_CODE(4)` |
| 4 | `warn` | `SYSLOG_SEVERITY_CODE(4)` |
| 5 | `notice` | `SYSLOG_SEVERITY_CODE(5)` |
| 6 | `info` | `SYSLOG_SEVERITY_CODE(6)` |
| 6 | `log` | `SYSLOG_SEVERITY_CODE(6)` |
| 7 | `debug` | `SYSLOG_SEVERITY_CODE(7)` |

## Example usage for the set-severity() rewrite function

The following examples use the `set-severity()` rewrite function.

Using a named value:

```shell
rewrite {
    set-severity("info");
};
```

Using a numeric value:

```shell
rewrite {
    set-severity("6");
};
```

Using a template:

```shell
rewrite {
    set-severity("${.json.severity}");
};
```
