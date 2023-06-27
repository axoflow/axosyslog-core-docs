---
title: "wildcard-file: Collecting messages from multiple text files"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `wildcard-file()` source collects log messages from multiple plain-text files from multiple directories. The `wildcard-file()` source is available in {{% param "product.abbrev" %}} version 3.10 and later.

The {{% param "product.abbrev" %}} application notices if a file is renamed or replaced with a new file, so it can correctly follow the file even if logrotation is used. When {{% param "product.abbrev" %}} is restarted, it records the position of the last sent log message in the persist file, and continues to send messages from this position after the restart. The location of the persist file depends on the package you installed {{% param "product.abbrev" %}} from, typically it is `/var/lib/syslog-ng/syslog-ng.persist` or `/opt/syslog-ng/var/syslog-ng.persist/var/lib/syslog-ng/syslog-ng.persist`.


## Declaration:

```c
   wildcard-file(
        base-dir("<pathname>")
        filename-pattern("<filename>")
    );
```


Note the following important points:

  - You can use the `\`* and `?` wildcard characters in the filename (the `filename-pattern()` option), but not in the path (the `base-dir()` option).

  - {{< include-headless "wnt/warning-wildcard-overlapping-files.md" >}}

  - {{< include-headless "chunk/para-wildcard-file-source-max-files.md" >}}

  - If the message does not have a proper syslog header, {{% param "product.abbrev" %}} treats messages received from files as sent by the `user` facility. Use the `default-facility()` and `default-priority()` options in the source definition to assign a different facility if needed.

  - For every message that {{% param "product.abbrev" %}} reads from the source files, the path and name of the file is available in the [`${FILE_NAME}` macro]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" >}}).

Required parameters: `base-dir()`, `filename-pattern()`. For the list of available optional parameters, see {{% xref "/chapter-sources/configuring-sources-wildcard-file/reference-source-wildcard-file/_index.md" %}}.


## Example: Using the wildcard-file() driver

The following example monitors every file with the `.log` extension in the `/var/log` directory for log messages.

{{% include-headless "chunk/synopsis-wildcard-file-source-example.md" %}}

