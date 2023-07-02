---
title: "The Azure auth header plugin"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section describes the {{% param "product.name" %}} application's Azure auth header plugin.

For more information about modules in {{% param "product.abbrev" %}}, see {{% xref "/chapter-configuration-file/modules/_index.md" %}}.


## The Azure auth header plugin

The Azure auth header plugin is a signal-slot mechanism-based {{% param "product.abbrev" %}} module that generates authorization headers for applications that connect to Microsoft Azure.



## Defining the Azure auth header plugin

You can define the Azure auth header plugin by the following:

```shell
   azure-auth-header(
      method("POST")
      path("/api/logs")
      content-type("application/json")
      workspace-id("<workspace-id>")
      secret("<auth-secret>")
    )
```



## Options

{{% alert title="Note" color="info" %}}

All these options are mandatory. They are used as input for the method that calculates the authorization header.

{{% /alert %}}

