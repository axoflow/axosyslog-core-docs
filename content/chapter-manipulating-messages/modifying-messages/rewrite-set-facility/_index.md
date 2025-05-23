---
title: "Set the facility field"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

It is possible to set the `facility` field with the `set-facility()` rewrite function. When set, the `set-facility()` rewrite function will only rewrite the `${PRIORITY}` field in the message to the first parameter value specified in the function.

{{% alert title="Note" color="info" %}}

If the parameter value is not a valid parameter value, the function ignores it and sends a debug message, but the application still sends the message.

{{% /alert %}}

## Declaration

```shell
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

```shell
set-facility( "parameter1" );
```

## Accepted values

The `set-facility()` rewrite function accepts the following numeric strings and named values:

{{< include-headless "chunk/table-facility-codes.md" >}}

## Example usage for the set-facility() rewrite function

The following two `set-facility()` examples are equivalent:

```shell
rewrite {
  set-facility("security");
  set-facility("13");
  };
```
