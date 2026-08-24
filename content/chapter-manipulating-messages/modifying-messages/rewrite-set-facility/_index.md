---
title: "Set the facility field"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

It is possible to set the `facility` field with the `set-facility()` rewrite function. When set, the `set-facility()` rewrite function will only rewrite the `${FACILITY}` field in the message to the first parameter value specified in the function.

{{% alert title="Note" color="info" %}}

If the parameter value is not a valid parameter value, the function ignores it and sends a debug message, but the application still sends the message.

{{% /alert %}}

FilterX has no `set_facility()` counterpart. See the related [`set_pri()`]({{< relref "/filterx/function-reference.md#set-pri" >}}) function, which sets the combined PRI value (`facility * 8 + severity`), so you cannot set the facility without also setting the severity.

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

## Options

The `set-facility()` rewrite rule has the following option.

{{% include-headless "chunk/option-rewrite-condition.md" %}}
