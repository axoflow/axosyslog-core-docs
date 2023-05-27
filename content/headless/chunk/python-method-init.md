---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## init(self, options) method (optional)

The {{% param "product.abbrev" %}} application initializes Python objects every time when it is started or reloaded. The `init` method is executed as part of the initialization. You can perform any initialization steps that are necessary for your source to work.

{{< include-headless "wnt/warning-python-parser-deinit.md" >}}

When this method returns with False, {{% param "product.abbrev" %}} does not start. It can be used to check options and return False when they prevent the successful start of the source.

`options`: This optional argument contains the contents of the `options()` parameter of the {{% param "product.abbrev" %}} configuration object as a Python dictionary.

