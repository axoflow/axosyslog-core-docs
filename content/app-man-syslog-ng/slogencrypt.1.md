---
title: "The slogencrypt manual page"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

<span id="slogencrypt.1"></span>

## Name

`slogencrypt` — Encrypt existing plain text log files using the {{% param "product.abbrev" %}} secure logging environment.

## Synopsis

`slogencrypt [options] [arguments]`

## Description

The `slogencrypt` utility is used to encrypt plain text log file using an existing secure logging environment. Using this utility, log files obtained from a previous installation of `syslog-ng` or another logging system can be transferred to a secure logging environment. The order of the log entries is preserved. Encrypting plain text log files using an existing secure logging environment, requires the current encryption key to be supplied in order to preserve consistency.

General call sequence: `slogencrypt -k &lt;key file&gt; -m &lt;MAC file&gt; &lt;new key file&gt; &lt;new MAC file&gt; &lt;plain text log&gt;  &lt;output file&gt;  [counter]`

## Arguments

- `&lt;new key file&gt;`

    The file that will contain the new current encryption key after successful encryption.

- `&lt;new MAC file&gt;`

    The file receiving the new current message authentication code (MAC) of the secure encrypted destination after encryption. In case an existing file is supplied, new entries will be appended.

- `&lt;input log file&gt;`

    The plain text log file that will be encrypted using the secure logging environment.

- `&lt;output log file&gt;`

    The file that will contain the encrypted log entries from the supplied plain text log file after encryption.

- `counter`

    The current log entry counter of the secure encrypted destination after encryption. This is required if the log entries to be encrypted will be appended to an existing secure encrypted destination.

## Options

- `--key-file` or `-k`

    The current host key from the system where the encryption will be performed.

- `--mac-file` or `-m`

    The current MAC file from the system where the encryption will be performed.

- `--help` or `-h`

    Display a help message.

## Files

`/usr/bin/slogencrypt`

`/etc/syslog-ng.conf`

## See also

[syslog-ng.conf.5](https://axoflow.com/docs/axosyslog-core/app-man-syslog-ng/syslog-ng.conf.5/)

[syslog-ng.8](https://axoflow.com/docs/axosyslog-core/app-man-syslog-ng/syslog-ng.8/)

{{< include-headless "chunk/manpage-more-info.md" >}}
