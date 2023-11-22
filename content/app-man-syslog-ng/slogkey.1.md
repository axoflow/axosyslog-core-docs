---
title: "The slogkey tool manual page"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

<span id="slogkey.1"></span>

## Name

`slogkey` — Manage cryptographic keys for use with the {{% param "product.abbrev" %}} secure logging environment.

## Synopsis

`slogkey [options] [arguments]`

## Description

The `slogkey` utility is used to manage cryptographic keys for use with the secure logging module of {{% param "product.abbrev" %}}. Use this utility to create a master key, derive a host key to be used by a secure logging configuration and to display the current sequence counter of a key. The options determine the operating mode and are mutually exclusive.

## Arguments

The arguments depend on the operating mode.

- Master key generation

    Call sequence: `slogkey --master-ḱey &lt;filename&gt;`

    `&lt;filename&gt;`: The name of the file to which the master key will be written.

- Host key derivation

    Call sequence: `slogkey --derive-key &lt;master key file&gt; &lt;host MAC address&gt; &lt;host serial number&gt; &lt;host key file&gt;`

    - `&lt;master key file&gt;`: The master key from which the host key will be derived.
    - `&lt;host MAC address&gt;`: The MAC address of the host on which the key will be used. Instead of the MAC address, any other string that uniquely identifies a host can be supplied, e.g. the company inventory number.
    - `&lt;host serial number&gt;`: The serial number of the host on which the key will be used. Instead of the serial number, any other string that uniquely identifies a host can be supplied, for example, the company inventory number.
    - `&lt;host key file&gt;`: The name of the file to which the host key will be written.

    > NOTE: The newly created host key has its counter set to 0 indicating that it represents the initial host key k0. This host key must be kept secret and not be disclosed to third parties. It will be required to successfully decrypt and verify log archives processed by the secure logging environment. As each log entry will be encrypted with its own key, a new host key will be created after successful processing of a log entry and will replace the previous key. Therefore, the initial host key needs to be stored in a safe place before starting the secure logging environment, as it will be deleted from the log host after processing of the first log entry.

- Sequence counter display

    Call sequence: `slogkey --counter &lt;host key file&gt;`

    - `&lt;host key file&gt;`: The host key file from which the sequence will be read.

## Options

- `--master-key` or `-m`

    Generates a mew master key. `&lt;filename&gt;` is the name of the file storing the newly generated master key.

- `--derive-key` or `-d`

    Derive a host key using a previously generated master key.

- `--counter` or `-c`

    Display the current log sequence counter of a key.

- `--help` or `-h`

    Display a help message.

## Files

`/usr/bin/slogkey`

`/etc/syslog-ng.conf`

## See also

[syslog-ng.conf.5](https://axoflow.com/docs/axosyslog-core/app-man-syslog-ng/syslog-ng.conf.5/)

[secure-logging.7](https://axoflow.com/docs/axosyslog-core/app-man-syslog-ng/secure-logging.7/)

{{< include-headless "chunk/manpage-more-info.md" >}}
