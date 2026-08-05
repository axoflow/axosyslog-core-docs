---
title: "pacct: Collect process accounting logs on Linux"
weight:  2500
driver: "pacct()"
short_description: "Collect process accounting logs on Linux"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{% param "product.abbrev" %}} can collect process accounting logs on Linux systems.Process accounting is the method of recording and summarizing commands executed on Linux, for example, the commands being run, the user who executed the command, CPU time used by the process, exit code, and so on. When process accounting (also called pacct) is enabled on a system, the kernel writes accounting records to the `/var/log/account/pacct` file (might vary between different Linux distributions).

The `pacct()` driver parses the fields of the accounting logs and transforms them into name-value pairs. The fields are defined in the manual page of the accounting log file (`man acct`), {{% param "product.abbrev" %}} prepends every field with the `.pacct.` prefix. For example, the `ac_uid` field that contains the id of the user who started the process will be available under the `$.pacct.ac_uid` name. These can be used as macros in templates, in filters to select specific messages, and so on.

## Prerequisites

- {{% param "product.name" %}} version 3.2.0 or later.
- {{< include-headless "chunk/prereq-package-scl.md" >}}

    {{< include-headless "chunk/scl-config-snippet.md" "pacct()" "scl/pacct/plugin.conf" >}}

- The {{% param "product.abbrev" %}} application must be compiled with the `--enable-pacct` option. Execute the `syslog-ng -V` command to check if your binary supports process accounting.
- The `pacctformat` plugin must be loaded. By default, {{% param "product.abbrev" %}} automatically loads the available modules.
- Process accounting must be running on the host. You can enable it with the `accton` command.

## Configuration

To use the `pacct()` driver, use the following syntax.

```shell
   @version: {{% param "product.configversion" %}}
    @include "scl.conf"
    source s_pacct { pacct(); };
    ...
    log { source(s_pacct); destination(...); };
```
