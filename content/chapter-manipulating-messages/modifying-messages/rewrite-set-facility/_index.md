---
title: "Setting the facility field with the set-facility() rewrite function"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

It is possible to set the `facility` field with the `set-facility()` rewrite function. When set, the `set-facility()` rewrite function will only rewrite the <span>$PRIORITY</span> field in the message to the first parameter value specified in the function.

{{% alert title="Note" color="info" %}}

If the parameter value is not a valid parameter value, the function ignores it and sends a debug message, but the application still sends the message.

{{% /alert %}}


## Declaration

```c
   log {
                    source { system(); };
                        if (program("postfix")) {
                          rewrite { set-facility("mail"); };
                        };
                        destination { file("/var/log/mail.log"); };
                        flags(flow-control);
                    };
```



## Parameters

The `set-facility()` rewrite function has a single, mandatory parameter that can be defined as follows:

```c
   `set-facility( "parameter1" );`
```



## Accepted values

The `set-facility()` rewrite function accepts the following values:

  - numeric strings: `[0-7]`
  - named values: `emerg`, `emergency`, `panic`, `alert`, `crit`, `critical`, `err`, `error`, `warning`, `warn`, `notice`, `info`, `informational`, `debug`



## Example usage for the set-facility() rewrite function

The following example can be used in production for the `set-facility()` rewrite function.

```c
   rewrite {
    set-facility("info");
    set-facility("6");
    set-facility("${.json.severity}");};
```

