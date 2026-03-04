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

{{< include-headless "chunk/option-source-encoding.md" >}}

{{< include-headless "chunk/option-source-flags.md" >}}

{{< include-headless "chunk/option-source-follow-freq.md" >}}

{{< include-headless "chunk/option-source-format.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{< include-headless "chunk/option-source-idle-timeout.md" >}}

{{< include-headless "chunk/option-source-keep-timestamp.md" >}}

{{< include-headless "chunk/option-source-log-fetch-limit.md" >}}

{{< include-headless "chunk/option-source-file-log-iw-size.md" >}}

{{< include-headless "chunk/option-source-log-msg-size.md" >}}

{{< include-headless "chunk/option-source-log-prefix.md" >}}

{{< include-headless "chunk/option-source-multi-line-garbage.md" >}}

{{< include-headless "chunk/option-source-multi-line-mode.md" >}}

{{< include-headless "chunk/option-source-multi-line-prefix.md" >}}

{{< include-headless "chunk/option-source-multi-line-suffix.md" >}}

{{< include-headless "chunk/option-source-normalize-hostnames.md" >}}

{{< include-headless "chunk/option-source-pad-size.md" >}}

{{< include-headless "chunk/option-source-program-override.md" >}}

{{% include-headless "chunk/option-source-read-old-records.md" %}}

{{< include-headless "chunk/option-source-sdata-prefix.md" >}}

{{< include-headless "chunk/option-source-tags.md" >}}

{{< include-headless "chunk/option-source-time-zone.md" >}}

{{< include-headless "chunk/option-source-trim-large-messages.md" >}}

{{< include-headless "chunk/option-source-use-fqdn.md" >}}

{{< include-headless "chunk/option-source-use-syslogng-pid.md" >}}

<!--
FIXME options to check
 file(
    <string>
    check-program(<yesno>)
    default-level(<string>)
    default-severity(<string>)
    dir-group(
        <empty>
        <string-or-number>
    )
    dir-owner(
        <empty>
        <string-or-number>
    )
    dir-perm(
        <empty>
        <number>
    )
    dns-cache(<yesno>)

    force-directory-polling(<yesno>) > only for wildcard sources

    format(<string>)
    group(
        <empty>
        <string-or-number>
    )

    host-override(<string>)
    keep-hostname(<yesno>)

    multi-line-timeout(<nonnegative-integer>)
    normalize-hostnames(<yesno>)
    owner(
        <empty>
        <string-or-number>
    )

    perm(
        <empty>
        <number>
    )
    persist-name(<string>)
    recursive(<yesno>)
    sdata-prefix(<string>)

    use-dns(
        <yesno>
        persist-only
 -->