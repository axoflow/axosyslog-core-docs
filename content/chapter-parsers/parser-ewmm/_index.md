---
title: "Parsing enterprise-wide message model (EWMM) messages"
weight: 700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `ewmm-parser()` can be used to parse messages sent by another AxoSyslog host using the enterprise-wide message model (EWMM) format. Available in version 3.16 and later. Note that usually you do not have to use this parser directly, because the [default-network-drivers() source]({{< relref "/chapter-sources/source-default-network-drivers/_index.md" >}}) automatically parses such messages.


## Declaration:

```shell
   parser parser_name {
        ewmm-parser();
    };
```

