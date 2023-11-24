---
title: "The persist-tool manual page"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

<span id="persist-tool.1"></span>

## Name

`persist-tool` — Display the content of the persist file

## Synopsis

`persist-tool [command] [options]`

## Description

The `persist-tool` application is a utility that can be used to dump the content of the persist file, and manipulate its content.

WARNING: Persist-tool is a special tool for {{% param "product.abbrev" %}} experts. Do not use the tool unless you know exactly what you are doing. Misconfiguring it will result in irrecoverable damage to the persist file, without any warning.

### Limitations

Wildcard characters are not supported in file/directory names.

## The dump command

Use the `dump` command to print the current content of the persist file in JSON format to the console.

`dump &lt;options;gt; &lt;persist_file&gt;`

Example: `persist-tool dump /opt/syslog-ng/var/syslog-ng.persist`

The output looks like:

```
run_id = { "value": "00 00 00 00 0C 00 00 00 " }
host_id = { "value": "00 00 00 00 5F 49 2F 01 " }
```

The `dump` command has the following options:

- `--help` or `-?`

    Display a brief help message.

### The add command

`add &lt;options&gt; &lt;input_file&gt;`

Use the `add` command to add or modify a specified state-entry in the persist file. The state-entry should be in the same format as the `dump` command displays it. If the given state-entry already exists, it will be updated. Otherwise, a new value will be added. If the given persist state is invalid, it will be skipped.

To use the `add` command: use `persist-tool dump` to print the content of the current persist file, and redirect it to a file. Edit the content of this file. Use `persist-tool add` with this file to modify the persist. The `add` command has the following options:

- `--help` or `-?`

    Display a brief help message.

- `--output-dir=&lt;directory&gt;` or `-o`

    Required parameter. The directory where the persist file is located at. The name of the persist file stored in this directory must be `syslog-ng.persist`.

Example: `/opt/syslog-ng/bin/persist-tool add dump_persist -o .`

The valid output looks like:

```
log_reader_curpos(Application)      OK
affile_sd_curpos(/var/aaa.txt)        OK
```

The invalid output looks like:

```
log_reader_curpos(Application)      OK
wrong
FAILED (error: Invalid entry syntax)
affile_sd_curpos(/var/aaa.txt)        OK
```

## Files

`/opt/syslog-ng/bin/persist-tool`

## See also

[syslog-ng.conf.5](https://axoflow.com/docs/axosyslog-core/app-man-syslog-ng/syslog-ng.conf.5/)

[syslog-ng.8](https://axoflow.com/docs/axosyslog-core/app-man-syslog-ng/syslog-ng.8/)

{{< include-headless "chunk/manpage-more-info.md" >}}
