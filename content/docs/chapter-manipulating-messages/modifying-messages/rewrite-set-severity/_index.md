---
title: "Setting severity with the set-severity() rewrite function"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

It is possible to configure the `severity` field with the `set-severity()` rewrite function. When configured, the `set-severity()` rewrite function will only rewrite the `$SEVERITY` field in the message to the first parameter value specified in the function.

{{% alert title="Note" color="info" %}}

If the parameter value is not a valid parameter value, the function ignores it and sends a debug message, but the {{% param "product.name" %}} application still sends the message.

{{% /alert %}}


## Declaration

```c
   rewrite <name_of_the_rule> {
        set-severity("severity string or number");
    };
```



## Parameters

The `set-severity()` rewrite function has a single, mandatory parameter that can be defined as follows:

```c
   `set-severity( "parameter1" );`
```



## Accepted values

The `set-severity()` rewrite function accepts the following values:

  - numeric strings: `[0-7]`
  - named values: `emerg`, `emergency`, `panic`, `alert`, `crit`, `critical`, `err`, `error`, `warning`, `warn`, `notice`, `info`, `informational`, `debug`



## Example usage for the set-severity() rewrite function

The following examples can be used in production for the `set-severity()` rewrite function.

`Example using string:`

```c
   rewrite {
        set-severity("info");
    };
```

`Example using numeric string:`

```c
   rewrite {
        set-severity("6");
    };
```

`Example using template:`

```c
   rewrite {
        set-severity("${.json.severity}");
    };
```

