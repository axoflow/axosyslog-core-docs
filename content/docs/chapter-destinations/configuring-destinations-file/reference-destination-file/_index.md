---
title: "file() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `file()` driver outputs messages to the specified text file, or to a set of files. The `file()` destination has the following options:

{{< include-headless "wnt/warning-fd-ulimit.md" >}}

{{% include-headless "chunk/option-destination-create-dirs.md" %}}

{{% include-headless "chunk/option-destination-dir-group.md" %}}

{{% include-headless "chunk/option-destination-dir-owner.md" %}}

{{% include-headless "chunk/option-destination-dir-perm.md" %}}

{{< include-headless "chunk/option-destination-diskbuffer.md" >}}

{{< include-headless "chunk/option-destination-flags-file.md" >}}

{{% include-headless "chunk/option-destination-flush-lines.md" %}}

{{< include-headless "chunk/option-destination-frac-digits.md" >}}

{{< include-headless "chunk/option-destination-fsync.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-destination-group.md" %}}

{{% include-headless "chunk/option-destination-local-timezone.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{% include-headless "chunk/option-destination-mark-freq.md" %}}

{{< include-headless "chunk/option-destination-mark-mode.md" >}}

{{% include-headless "chunk/option-destination-overwrite-if-older-file.md" %}}

{{% include-headless "chunk/option-destination-owner.md" %}}

{{< include-headless "chunk/option-destination-pad-size.md" >}}

{{% include-headless "chunk/option-destination-perm.md" %}}

{{% include-headless "chunk/option-destination-suppress.md" %}}


## symlink-as()

|          |          |
| -------- | -------- |
| Type:    | Filename |
| Default: | N/A      |

*Description:* The configured file name will be used as a symbolic link to the last created file by file destination.


## Example: symlink-as()

An example when time-based macro is used:

```c
   file("/var/log/cron.${YEAR}${MONTH}" symlink-as("/var/log/cron"));
```

In this case the `/var/log/cron` should point to the current month.

{{% alert title="Note" color="info" %}}

The symlink uses the same permissions as the file destination.

{{% /alert %}}



{{% include-headless "chunk/option-destination-template.md" %}}

{{% include-headless "chunk/option-destination-template-escape.md" %}}


## time-reap() {#file-option-time-reap}

{{% include-headless "chunk/option-description-destination-time-reap.md" %}}


{{% include-headless "chunk/option-source-time-reopen.md" %}}

{{% include-headless "chunk/option-destination-timezone.md" %}}

{{< include-headless "chunk/option-destination-ts-format.md" >}}
