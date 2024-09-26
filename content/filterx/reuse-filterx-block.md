---
title: Reuse FilterX blocks
weight: 3000
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

To use a FilterX block in multiple log paths, you have to define it as a separate block:

```shell
block filterx <identifier>() {
    <filterx-statement-1>;
    <filterx-statement-2>;
    ...
};
```

Then use it in a log path:

```shell
log {
    source(s1);
    filterx(<identifier>);
    destination(d1);
};
```

For example, the following FilterX statement selects the messages that contain the word `deny` and come from the host `example`.

```shell
block filterx demo_filterx() {
    ${HOST} == "example";
    ${MESSAGE} =~ "deny";
};
log {
    source(s1);
    filter(demo_filterx);
    destination(d1);
};
```
