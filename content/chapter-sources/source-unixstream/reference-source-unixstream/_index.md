---
title: "unix-stream() and unix-dgram() source options"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

These two drivers behave similarly: they open an `AF_UNIX` socket and start listening on it for messages. The following options can be specified for these drivers:

{{% include-headless "chunk/option-source-chain-hostnames.md" %}}

{{< include-headless "chunk/option-source-check-hostname.md" >}}

{{% include-headless "chunk/option-source-check-program.md" %}}

{{% include-headless "chunk/option-destination-create-dirs.md" %}}

{{% include-headless "chunk/option-source-default-facility.md" %}}

{{% include-headless "chunk/option-source-default-level-journal.md" %}}

{{% include-headless "chunk/option-source-default-priority.md" %}}

{{% include-headless "chunk/option-source-default-severity.md" %}}

{{% include-headless "chunk/option-source-dns-cache.md" %}}

{{% include-headless "chunk/option-source-dynamic-window-realloc-ticks.md" %}}

{{% include-headless "chunk/option-source-dynamic-window-size.md" %}}

{{% include-headless "chunk/option-source-dynamic-window-stats-freq.md" %}}

{{% include-headless "chunk/option-source-encoding.md" %}}

{{< include-headless "chunk/option-source-flags.md" >}}

{{% include-headless "chunk/option-source-format.md" %}}

## group()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | root   |

*Description:* Set the gid of the socket.

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-source-host-override.md" %}}

{{< include-headless "chunk/option-source-idle-timeout.md" >}}

{{% include-headless "chunk/option-source-internal.md" %}}

## keep-alive()

|          |           |
| -------- | --------- |
| Type:    | yes or no |
| Default: | yes       |

*Description:* Selects whether to keep connections open when `syslog-ng` is restarted, cannot be used with `unix-dgram()`.

{{< include-headless "chunk/option-source-keep-hostname.md" >}}

{{< include-headless "chunk/option-source-keep-timestamp.md" >}}

{{% include-headless "chunk/option-source-listen-backlog.md" %}}

{{% include-headless "chunk/option-source-log-fetch-limit.md" %}}

{{% include-headless "chunk/option-source-log-iw-size.md" %}}

{{< include-headless "chunk/option-source-log-msg-size.md" >}}

{{< include-headless "chunk/option-source-log-prefix.md" >}}

{{% include-headless "chunk/option-source-long-hostnames.md" %}}

## max-connections()

|          |                                   |
| -------- | --------------------------------- |
| Type:    | number (simultaneous connections) |
| Default: | 256                               |

*Description:* Limits the number of simultaneously open connections. Cannot be used with `unix-dgram()`.

{{% include-headless "chunk/option-source-normalize-hostnames.md" %}}

{{% include-headless "chunk/option-source-optional.md" %}}

## owner()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | root   |

*Description:* Set the uid of the socket.

{{% include-headless "chunk/option-source-pad-size.md" %}}

## pass-unix-credentials() (DEPRECATED)

Obsolete. Use the [`pass-unix-credentials()` global option]({{< relref "/chapter-global-options/reference-options/_index.md" >}}), or [so-passcred()](#so-passcred) per source.

## perm()

|          |                         |
| -------- | ----------------------- |
| Type:    | number (octal notation) |
| Default: | 0666                    |

*Description:* Set the permission mask. For octal numbers prefix the number with '0', for example: use `0755` for `rwxr-xr-x`.

{{% include-headless "chunk/option-persist-name.md" %}}

{{% include-headless "chunk/option-source-program-override.md" %}}

{{% include-headless "chunk/option-source-read-old-records.md" %}}

{{% include-headless "chunk/option-source-sdata-prefix.md" %}}

{{% include-headless "chunk/option-so-broadcast.md" %}}

{{% include-headless "chunk/option-source-so-keepalive.md" %}}

{{% include-headless "chunk/option-source-so-passcred.md" %}}

{{< include-headless "chunk/option-source-so-rcvbuf.md" >}}

{{% include-headless "chunk/option-source-so-reuseport.md" %}}

{{% include-headless "chunk/option-so-sndbuf.md" %}}

{{% include-headless "chunk/option-source-tags.md" %}}

{{% include-headless "chunk/option-source-time-zone.md" %}}

{{% include-headless "chunk/option-source-trim-large-messages.md" %}}

{{% include-headless "chunk/option-source-use-dns.md" %}}

{{< include-headless "chunk/option-source-use-fqdn.md" >}}

{{% include-headless "chunk/option-source-use-syslogng-pid.md" %}}

<!-- cfg-helper exposes the following options that are aliases or obsolete
     forms of options already documented above. Markers kept so the next
     docs-vs-cfg-helper diff doesn't flag them as missing.

  - local-creds(): BSD-specific alias for so-passcred() (see
    afsocket-parser.c:93). Documented above as so-passcred().
  - tcp-keep-alive() / tcp-keepalive(): old aliases for so-keepalive() (see
    afsocket-parser.c keyword table). Documented above as so-keepalive().
-->
