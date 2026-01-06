---
title: "if-else-elif: Conditional expressions"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

You can use `if {}`, `elif {}`, and `else {}` blocks to configure conditional expressions.

## Conditional expressions' format

Conditional expressions have two formats:

- Explicit filter expression:

    ```shell
    if (message('foo')) {
        parser { date-parser(); };
    } else {
        ...
    };
    ```

    This format only uses the filter expression in `if()`. If `if` does not contain `'foo'`, the `else` branch is taken. The `else{}` branch can be empty, you can use it to send the message to the default branch.

- Condition embedded in the log path:

    ```shell
    if {
        filter { message('foo')); };
        parser { date-parser(); };
    } else {
        ...
    };
    ```

    This format considers all filters and all parsers as the condition, combined. If the message contains `'foo'` and the `date-parser()` fails, the `else` branch is taken. Similarly, if the message does not contain `'foo'`, the `else` branch is taken.

## Using the if {} and else {} blocks in your configuration

You can copy-paste the following example and use it as a template for using the `if {}` and `else {}` blocks in your configuration.

```shell
log{
    source { example-msg-generator(num(1) template("...,STRING-TO-MATCH,..."));};
    source { example-msg-generator(num(1) template("...,NO-MATCH,..."));};

    if (message("STRING-TO-MATCH")) {
        destination { file(/dev/stdout template("matched: $MSG\n") persist-name("1")); };
    }

    else {
    destination { file(/dev/stdout template("unmatched: $MSG\n") persist-name("2")); };
    };
};
```

The configuration results in the following console printout:

```shell
matched: ...,STRING-TO-MATCH,...
unmatched: ...,NO-MATCH,...
```

An alternative, less straightforward way to implement conditional evaluation is to use junctions. For details on junctions and channels, see {{% xref "/chapter-routing-filters/logpath/junctions/_index.md" %}}.
