---
title: "file() source options"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `file()` driver has the following options:

{{< include-headless "chunk/option-source-chain-hostnames.md" >}}

{{< include-headless "chunk/option-source-check-hostname.md" >}}

{{< include-headless "chunk/option-source-check-program.md" >}}

{{< include-headless "chunk/option-source-default-facility.md" >}}

{{< include-headless "chunk/option-source-default-priority.md" >}}

{{% include-headless "chunk/option-source-default-level-journal.md" %}}

{{% include-headless "chunk/option-source-default-severity.md" %}}

{{% include-headless "chunk/option-source-dns-cache.md" %}}

{{< include-headless "chunk/option-source-encoding.md" >}}

{{< include-headless "chunk/option-source-flags.md" >}}

{{< include-headless "chunk/option-source-follow-freq.md" >}}

{{< include-headless "chunk/option-source-format.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-source-host-override.md" %}}

{{< include-headless "chunk/option-source-idle-timeout.md" >}}

{{% include-headless "chunk/option-source-internal.md" %}}

{{< include-headless "chunk/option-source-keep-hostname.md" >}}

{{< include-headless "chunk/option-source-keep-timestamp.md" >}}

{{< include-headless "chunk/option-source-log-fetch-limit.md" >}}

{{< include-headless "chunk/option-source-file-log-iw-size.md" >}}

{{< include-headless "chunk/option-source-log-msg-size.md" >}}

{{< include-headless "chunk/option-source-log-prefix.md" >}}

{{% include-headless "chunk/option-source-long-hostnames.md" %}}

{{< include-headless "chunk/option-source-multi-line-garbage.md" >}}

{{< include-headless "chunk/option-source-multi-line-mode.md" >}}

{{< include-headless "chunk/option-source-multi-line-prefix.md" >}}

{{< include-headless "chunk/option-source-multi-line-suffix.md" >}}

{{% include-headless "chunk/option-source-multi-line-timeout.md" %}}

{{< include-headless "chunk/option-source-normalize-hostnames.md" >}}

{{< include-headless "chunk/option-source-pad-size.md" >}}

{{% include-headless "chunk/option-persist-name.md" %}}

{{< include-headless "chunk/option-source-program-override.md" >}}

{{% include-headless "chunk/option-source-read-old-records.md" %}}

{{< include-headless "chunk/option-source-sdata-prefix.md" >}}

{{< include-headless "chunk/option-source-tags.md" >}}

{{< include-headless "chunk/option-source-time-zone.md" >}}

{{< include-headless "chunk/option-source-trim-large-messages.md" >}}

{{< include-headless "chunk/option-source-use-dns.md" >}}

{{< include-headless "chunk/option-source-use-fqdn.md" >}}

{{< include-headless "chunk/option-source-use-syslogng-pid.md" >}}

<!-- cfg-helper exposes the following file()-source options that have no useful
     effect on the file() driver. Markers kept so the next docs-vs-cfg-helper
     diff doesn't flag them as missing.

  - force-directory-polling(): obsolete (KWS_OBSOLETE in affile-parser.c).
    Valid only on legacy wildcard-file sources. Use wildcard-file(monitor-method())
    instead.
  - recursive(): wildcard-file()-only (source_wildcard_option in affile-grammar.ym).
    Has no effect on file().
  - dir-group(), dir-owner(), dir-perm(), group(), owner(), perm():
    inherited via the shared file_perm_option grammar rule. These describe how
    AxoSyslog creates output files/directories on the destination side; on a
    file source they are accepted but have no documented effect.
-->
