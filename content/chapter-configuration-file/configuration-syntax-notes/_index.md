---
title: "Notes about the configuration syntax"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

When you are editing the `syslog-ng.conf` configuration file, note the following points:

  - The configuration file can contain a maximum of 6665 source / destination / log elements.

  - When writing the names of options and parameters (or other reserved words), the hyphen (`-`) and underscore (`_`) characters are equivalent, for example, `max-connections(10)` and `max_connections(10)` are both correct.

  - Numbers can be prefixed with `+` or `-` to indicate positive or negative values. Numbers beginning with zero (`0`) or `0x` are treated as octal or hexadecimal numbers, respectively.
    
    Starting with {{% param "product.abbrev" %}} version 3.5, you can use suffixes for kilo-, mega-, and gigabytes. Use the Kb, Mb, or Gb suffixes for the base-10 version, and Kib, Mib, or Gib for the base-2 version. That is, 2MB means 2000000, while 2MiB means 2097152. For example, to set the `log-msg-size()` option to 2000000 bytes, use `log-msg-size(2Mb)`.

  - You can use commas (`,`) to separate options or other parameters for readability, AxoSyslog completely ignores them. The following declarations are equivalent:
    
    ```c
        source s_demo_stream {
            unix-stream("<path-to-socket>" max-connections(10) group(log));
        };
        source s_demo_stream {
            unix-stream("<path-to-socket>", max-connections(10), group(log));
        };
    ```

  - When enclosing object IDs (for example, the name of a destination) between double-quotes (`"mydestination"`), the ID can include whitespace as well, for example:
    
    ```c
        source "s demo stream" {
            unix-stream("<path-to-socket>" max-connections(10) group(log));
        };
    ```

  - For notes on using regular expressions, see {{% xref "/chapter-manipulating-messages/regular-expressions/_index.md" %}}.

  - You can use `if {}`, `elif {}`, and `else {}` blocks to configure conditional expressions. For details, see {{% xref "/chapter-routing-filters/logpath/concepts-if-else-conditional-expressions/_index.md" %}}.
