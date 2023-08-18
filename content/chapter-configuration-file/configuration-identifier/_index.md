---
title: Configuration identifier
weight:  1250
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with {{% param "product.name" %}} version 4.2, you can specify a configuration identifier in the `syslog-ng.conf` file, for example:

```shell
@config-id: cfg-20230404-13-g02b0850fc
```

This can be useful in managed environments, where {{% param "product.name" %}} instances and their configuration are automatically deployed or generated.

To show the configuration ID, run `syslog-ng-ctl config --id`

This returns the ID of the currently active configuration, and the SHA256 hash of the configuration (the hash of the output of the `syslog-ng-ctl config --preprocessed` command). The output is similar to:

```shell
cfg-20230404-13-g02b0850fc (08ddecfa52a3443b29d5d5aa3e5114e48dd465e195598062da9f5fc5a45d8a83)
```
