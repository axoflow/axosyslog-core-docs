---
title: "The pdbtool manual page"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

<span id="pdbtool.1"></span>


## Name

`pdbtool` — An application to test and convert pattern database rules



## Synopsis

`pdbtool [command] [options]`



<span id="pdbtool-mandescription"></span>

## Description



The {{% param "product.abbrev" %}} application can match the contents of the log messages to a database of predefined message patterns (also called `patterndb`). By comparing the messages to the known patterns, {{% param "product.abbrev" %}} is able to identify the exact type of the messages, tag the messages, and sort them into message classes. The message classes can be used to classify the type of the event described in the log message. The functionality of the pattern database is similar to that of the logcheck project, but the {{% param "product.syslog-ng" %}} approach is faster, scales better, and is much easier to maintain compared to the regular expressions of logcheck.

The `pdbtool` application is a utility that can be used to:

- [test messages](#pdbtool-match), or [specific rules](#pdbtool-test)

- convert an older pattern database to the latest database format

- [merge pattern databases](#pdbtool-merge) into a single file

- [automatically create pattern databases](#pdbtool-patternize) from a large amount of log messages

- [dump the RADIX tree](#pdbtool-dump) built from the pattern database (or a part of it) to explore how the pattern matching works.



<span id="pdbtool-dictionary"></span>

## The dictionary command

`dictionary [options]`

Lists every name-value pair that can be set by the rules of the pattern database.

- `--dump-tag` or `-T`
    
    List the tags instead of the names of the name-value pairs.

- `--pdb \<path-to-file\>` or `-p \<path-to-file\>`
    
    Name of the pattern database file to use.

- `--program \<programname\>` or `-P \<programname\>`
    
    List only the name-value pairs that can be set for the messages of the specified `$PROGRAM` application.



<span id="pdbtool-dump"></span>

## The dump command

`dump [options]`

Display the RADIX tree built from the patterns. This shows how are the patterns represented in {{% param "product.abbrev" %}} and it might also help to track down pattern-matching problems. The dump utility can dump the tree used for matching the PROGRAM or the MSG parts.

- `--debug` or `-d`
    
    Enable debug/diagnostic messages on `stderr`.

- `--pdb` or `-p`
    
    Name of the pattern database file to use.

- `--program` or `-P`
    
    Displays the RADIX tree built from the patterns belonging to the `${PROGRAM}` application.

- `--program-tree` or `-T`
    
    Display the `${PROGRAM}` tree.

- `--verbose` or `-v`
    
    Enable verbose messages on `stderr`.


## Example and sample output:

```shell
pdbtool dump -p patterndb.xml  -P 'sshd'
```

```shell
'p'
     'assword for'
    @QSTRING:@
      'from'
        @QSTRING:@
          'port '
        @NUMBER:@ rule_id='fc49054e-75fd-11dd-9bba-001e6806451b'
          ' ssh' rule_id='fc55cf86-75fd-11dd-9bba-001e6806451b'
             '2' rule_id='fc4b7982-75fd-11dd-9bba-001e6806451b'
     'ublickey for'
    @QSTRING:@
      'from'
        @QSTRING:@
          'port '
        @NUMBER:@ rule_id='fc4d377c-75fd-11dd-9bba-001e6806451b'
          ' ssh' rule_id='fc5441ac-75fd-11dd-9bba-001e6806451b'
             '2' rule_id='fc44a9fe-75fd-11dd-9bba-001e6806451b'
                
```

<span id="pdbtool-match"></span>

## The match command

`match [options]`

Use the `match` command to test the rules in a pattern database. The command tries to match the specified message against the patterns of the database, evaluates the parsers of the pattern, and also displays which part of the message was parsed successfully. The command returns with a `0` (success) or `1` (no match) return code and displays the following information:

- the class assigned to the message (that is, system, violation, and so on),

- the ID of the rule that matched the message, and

- the values of the parsers (if there were parsers in the matching pattern).

The `match` command has the following options:

- `--color-out` or `-c`
    
    Color the terminal output to highlight the part of the message that was successfully parsed.

- `--debug` or `-d`
    
    Enable debug/diagnostic messages on `stderr`.

- `--debug-csv` or `-C`
    
    Print the debugging information returned by the `--debug-pattern` option as comma-separated values.

- `--debug-pattern` or `-D`
    
    Print debugging information about the pattern matching. See also the `--debug-csv` option.

- `--file=\<filename-with-path\>` or `-f`
    
    Process the messages of the specified log file with the pattern database. This option allows to classify messages offline, and to apply the pattern database to already existing logfiles. To read the messages from the standard input (`stdin`), specify a hyphen (`-`) character instead of a filename.

- `--filter=<filter-expression>` or `-F`
    
    Print only messages matching the specified AxoSyslog filter expression.

- `--message` or `-M`
    
    The text of the log message to match (only the `${MESSAGE}` part without the syslog headers).

- `--pdb` or `-p`
    
    Name of the pattern database file to use.

- `--program` or `-P`
    
    Name of the program to use, as contained in the `${PROGRAM}` part of the syslog message.

- `--template=\<template-expression\>` or `-T`
    
    An AxoSyslog template expression that is used to format the output messages.

- `--verbose` or `-v`
    
    Enable verbose messages on `stderr`.

## Example

The following command checks if the `patterndb.xml` file recognizes the `Accepted publickey for myuser from 127.0.0.1 port 59357 ssh6` message:

```shell
pdbtool match -p patterndb.xml -P sshd -M "Accepted publickey for myuser from 127.0.0.1 port 59357 ssh6"
```

## Example

The following example applies the `sshd.pdb` pattern database file to the log messages stored in the `/var/log/messages` file, and displays only the messages that received a `useracct` tag.

```shell
   pdbtool match -p sshd.pdb \
                        –file /var/log/messages \
                    –filter ‘tags(“usracct”);’ 
```

<span id="pdbtool-merge"></span>

## The merge command

`merge [options]`

Use the `merge` command to combine separate pattern database files into a single file (pattern databases are usually stored in separate files per applications to simplify maintenance). If a file uses an older database format, it is automatically updated to the latest format (`V3`). See the [AxoSyslog documentation](https://axoflow.com/docs/axosyslog-core/) for details on the different pattern database versions.

- `--debug` or `-d`
    
    Enable debug/diagnostic messages on stderr.

- `--directory` or `-D`
    
    The directory that contains the pattern database XML files to be merged.

- `--glob` or `-G`
    
    Specify filenames to be merged using a glob pattern, for example, using wildcards. For details on glob patterns, see `man glob`. This pattern is applied only to the filenames, and not on directory names.

- `--pdb` or `-p`
    
    Name of the output pattern database file.

- `--recursive` or `-r`
    
    Merge files from subdirectories as well.

- `--sort` or `-s`
    
    Sort files into alphabetic order during the merge (first sort by filename, then by directory name).

- `--verbose` or `-v`
    
    Enable verbose messages on stderr.

## Example

```shell
pdbtool merge --recursive --directory /home/me/mypatterns/  --pdb /var/lib/syslog-ng/patterndb.xml
```

Currently it is not possible to convert a file without merging, so if you only want to convert an older pattern database file to the latest format, you have to copy it into an empty directory.

<span id="pdbtool-patternize"></span>

## The patternize command

`patternize [options]`

Automatically create a pattern database from a log file containing a large number of log messages. The resulting pattern database is printed to the standard output (`stdout`). The `pdbtool patternize` command uses a data clustering technique to find similar log messages and replacing the differing parts with `@ESTRING:: @` parsers. For details on pattern databases and message parsers, see the [AxoSyslog documentation](https://axoflow.com/docs/axosyslog-core/). The `patternize` command is available only in version 3.2 and later.

- `--debug` or `-d`
    
    Enable debug/diagnostic messages on stderr.

- `--file=\<path\>` or `-f`
    
    The logfile containing the log messages to create patterns from. To receive the log messages from the standard input (`stdin`), use `-`.

- `--iterate-outliers` or `-o`
    
    Recursively iterate on the log lines to cover as many log messages with patterns as possible.

- `--named-parsers` or `-n`
    
    The number of example log messages to include in the pattern database for every pattern. Default value: `1`

- `--no-parse` or `-p`
    
    Do not parse the input file, treat every line as the message part of a log message.

- `--samples=\<number-of-samples\>`
    
    Include a generated name in the parsers, for example, `.dict.string1`, `.dict.string2`, and so on.

- `--support=\<number\>` or `-S`
    
    A pattern is added to the output pattern database if at least the specified percentage of log messages from the input logfile match the pattern. For example, if the input logfile contains 1000 log messages and the `--support=3.0` option is used, a pattern is created only if the pattern matches at least 3 percent of the log messages (that is, 30 log messages). If patternize does not create enough patterns, try to decrease the support value.
    
    Default value: `4.0`

- `--verbose` or `-v`
    
    Enable verbose messages on `stderr`.

## Example

```shell
pdbtool patternize --support=2.5 --file=/var/log/messages
```

<span id="pdbtool-test"></span>

## The test command

`test [options]`

Use the `test` command to validate a pattern database XML file. Note that you must have the `xmllint` application installed. The `test` command is available only in {{% param "product.abbrev" %}} version 3.2 and later.

- `--color-out` or `-c`
    
    Enable coloring in terminal output.

- `--debug` or `-d`
    
    Enable debug/diagnostic messages on `stderr`.

- `--debug` or `-D`
    
    Print debugging information on non-matching patterns.

- `--rule-id` or `-r`
    
    Test only the patterndb rule (specified by its rule id) against its example.

- `--validate`
    
    Validate a pattern database XML file.

- `--verbose` or `-v`
    
    Enable verbose messages on stderr.

## Example

```shell
pdbtool test --validate /home/me/mypatterndb.pdb
```

## Files

`/opt/syslog-ng/`

`/opt/syslog-ng/etc/syslog-ng.conf`



## See also

[AxoSyslog documentation](https://axoflow.com/docs/axosyslog-core/)

{{% xref "/app-man-syslog-ng/syslog-ng.conf.5.md" %}}

{{% xref "/app-man-syslog-ng/syslog-ng.8/_index.md" %}}

{{< include-headless "chunk/manpage-more-info.md" >}}
