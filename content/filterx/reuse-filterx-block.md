---
title: Reuse filterx blocks
---

To use a filterx block in multiple log paths, you have to define it as a separate block:

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

For example, the following filterx statement selects the messages that contain the word `deny` and come from the host `example`.

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
