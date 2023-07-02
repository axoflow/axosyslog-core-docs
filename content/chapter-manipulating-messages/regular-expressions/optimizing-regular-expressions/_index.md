---
title: "Optimizing regular expressions"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `host()`, `match()`, and `program()` filter functions and some other objects accept regular expressions as parameters. But evaluating general regular expressions puts a high load on the CPU, which can cause problems when the message traffic is very high. Often the regular expression can be replaced with simple filter functions and logical operators. Using simple filters and logical operators, the same effect can be achieved at a much lower CPU load.


## Example: Optimizing regular expressions in filters

Suppose you need a filter that matches the following error message logged by the `xntpd` NTP daemon:

```shell
   xntpd[1567]: time error -1159.777379 is too large (set clock manually);
```

The following filter uses regular expressions and matches every instance and variant of this message.

```shell
   filter f_demo_regexp {
        program("demo_program") and
        match("time error .* is too large .* set clock manually");
    };
```

Segmenting the `match()` part of this filter into separate `match()` functions greatly improves the performance of the filter.

```shell
   filter f_demo_optimized_regexp {
        program("demo_program") and
        match("time error") and
        match("is too large") and
        match("set clock manually");
    };
```

