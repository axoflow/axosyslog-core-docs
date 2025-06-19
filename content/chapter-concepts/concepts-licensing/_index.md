---
title: "Product licensing"
weight:  1100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Versions 4.12 and newer

Starting with version 4.12, {{< product >}} is licensed under a single, clear open source license: [GNU General Public License version 3 or later (GPL-3.0-or-later)](https://spdx.org/licenses/GPL-3.0-or-later.html). For details on what this means, see the [AxoSyslog License Update: Moving to GPL3](https://axoflow.com/blog/axosyslog-syslog-ng-fork-license-change-gpl3) blog post.

## Versions 3.2 - 4.11

Between versions 3.2 and 4.11, the {{% param "product.name" %}} application was licensed under a combined LGPL+GPL license. The core of {{% param "product.abbrev" %}} was licensed under the GNU Lesser General Public License Version 2.1 license, while the rest of the codebase under the GNU General Public License Version 2 license.

{{% alert title="Note" color="info" %}}

Practically, the code stored under the `lib` directory of the source code package is under LGPL, the rest is GPL.

{{% /alert %}}

For details about the LGPL and GPL licenses, see [GNU Lesser General Public License](https://github.com/axoflow/axosyslog/blob/master/LGPL.txt) and [GNU General Public License](https://github.com/axoflow/axosyslog/blob/master/GPL.txt), respectively.

## Documentation license

The Documentation is licensed separately from {{< product >}}. For details, see {{% xref "/documentation-license/_index.md" %}}.
