---
title: "Modules in syslog-ng Open Source Edition (syslog-ng OSE)"
weight:  1300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To increase its flexibility and simplify the development of additional modules, the {{% productparam "abbrev" %}} application is modular. The majority of {{% productparam "abbrev" %}}'s functionality is in separate modules. As a result, it is also possible to fine-tune the resource requirements of {{% productparam "abbrev" %}} (for example, by loading only the modules that are actually used in the configuration, or simply omitting modules that are not used but require large amount of memory).

Each module contains one or more plugins that add some functionality to {{% productparam "abbrev" %}} (for example, a destination or a source driver).

  - To display the list of available modules, run the **syslog-ng --version** command.

  - To display the description of the available modules, run the **syslog-ng --module-registry** command.

  - To customize which modules {{% productparam "abbrev" %}} automatically loads when {{% productparam "abbrev" %}} starts, use the **--default-modules** command-line option of {{% productparam "abbrev" %}}.

  - To request loading a module from the {{% productparam "abbrev" %}} configuration file, see {{% xref "/docs/chapter-configuration-file/modules/modules-loading/_index.md" %}}.

For details on the command-line parameters of {{% productparam "abbrev" %}} mentioned in the previous list, see the {{% productparam "abbrev" %}} man page at <span class="mcFormatColor" style="color: #04aada;">The syslog-ng manual page</span>.
