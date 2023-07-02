---
title: "Loading modules"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.name" %}} application loads every available module during startup.

To load a module that is not loaded automatically, include the following statement in the {{% param "product.abbrev" %}} configuration file:

```shell
   @module <module-name>
```

Note the following points about the `@module` statement:

  - The `@module` statement is a top-level statement, that is, it cannot be nested into any other statement. It is usually used immediately after the `@version` statement.

  - Every `@module` statement loads a single module: loading multiple modules requires a separate `@module` statement for every module.

  - In the configuration file, the `@module` statement of a module must be earlier than the module is used.

{{% alert title="Note" color="info" %}}

To disable loading every module automatically, set the `autoload-compiled-modules` global variable to `0` in your configuration file:

```shell
   @define autoload-compiled-modules 0
```

Note that in this case you have to explicitly load the modules you want to use.

{{% /alert %}}

## Use the @requires statement to ensure that the specified module is loaded

To ensure that a module is loaded, include the following statement in the {{% param "product.abbrev" %}} configuration file or the external files included in the configuration file:

```shell
   @requires <module-name>
```

{{% alert title="Note" color="info" %}}
If you include the `@requires` statement in the:

  - {{% param "product.abbrev" %}} configuration file, {{% param "product.abbrev" %}} attempts to load the required module. If it fails to load the module, {{% param "product.abbrev" %}} stops and an error message is displayed.
  - external files included in the configuration file, {{% param "product.abbrev" %}} attempts to load the required module. If it fails to load the module, only the external file is not processed.

Note that this is not true for modules marked as mandatory. You can make a dependency module mandatory by defining an error message after the `@requires <module-name>` statement, for example:

```shell
Example
@requires http "The http() driver is required for elasticsearch-http(). Install syslog-ng-mod-http to continue."
```
{{% /alert %}}
