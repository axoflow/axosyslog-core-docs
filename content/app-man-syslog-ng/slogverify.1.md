---
title: "The slogverify manual page"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

<span id="slogverify.1"></span>

## Name

`slogverify` — Verify cryptographically secured logs.

## Synopsis

`slogverify [options] [arguments]`

## Description

The `slogverify` utility is used to verify the integrity of cryptographically secured logs and to decrypt log entries produced in a {{% param "product.abbrev" %}} secure logging environment.

- Normal mode: `slogverify -k &lt;host key file&gt; -m &lt;input MAC file&gt; &lt;input file&gt; &lt;output file&gt; [buffers]`
- Iterative mode: `slogverify -i -p &lt;previous host key&gt; -r &lt;previous MAC&gt; -m &lt;current MAC&gt; &lt;input file&gt; &lt;output file&gt; [buffers]`

## Arguments

- `input file`

    An encrypted log file from the syslog-ng secure logging environment that will be verified.

- `output file`

    The file that will contain the plain text log entries after decryption and verification.

- `buffers`

    Optional number of input buffers. The number of buffers can be used for performance adjustments in case the log file to be verified is very large and cannot be processed at once. It is a positive number of log entries that can be held in memory during verification. The minimum number if 10 and the maximum number is 4294967295. If this argument is not supplied the default of 1000 is used.

## Options

- `--iterative` or `-i`

    Iterative mode. This is useful in case the log files are periodically copied from the system on which they where generated to central collector. As log rotation, i.e. overwriting log files in order to preserve space cannot be done in a secure logging environment, the iterative mode can be used instead. This works as follows: If a certain storage limit is reached the log file together with the host key and the MAC file is copied to new destination and the old file is deleted. The verification is then performed in iterations, i.e. separately for each file that was retrieved from the log host. For this to work, it is important to always retrieve the corresponding host key and MAC files. The process can be automated, e.g. by calling slogverify in iterative mode from a script.<

- `--key-file` or `-k`

    The initial host key (k0). This option is used in normal mode only.

- `--mac-file` or `-m`

    The current MAC file used.

- `--prev-key-file` or `-p`

    The host key corresponding to the previous log file. This option can be used in iterative mode only. In theory, this can be initial host key (k0) but using this key might generate warnings, as the gap between the first log entry ever (log entry 0) and the first log entry of the current log file might be large.

- `--prev-mac-file` or `-r`

    The MAC file from the previous log file. This option can only be used in iterative mode.

- `--help` or `-h`

    Display a help message.

## Files

`/usr/bin/slogverify`

`/etc/syslog-ng.conf`

## See also

[syslog-ng.conf.5](https://axoflow.com/docs/axosyslog-core/app-man-syslog-ng/syslog-ng.conf.5/)

[secure-logging.7](https://axoflow.com/docs/axosyslog-core/app-man-syslog-ng/secure-logging.7/)

{{< include-headless "chunk/manpage-more-info.md" >}}
