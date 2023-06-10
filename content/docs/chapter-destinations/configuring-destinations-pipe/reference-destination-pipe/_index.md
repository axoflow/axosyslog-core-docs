---
title: "pipe() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This driver sends messages to a named pipe like `/dev/xconsole`.

The `pipe()` destination has the following options:

{{% include-headless "chunk/option-destination-create-dirs.md" %}}

{{% include-headless "chunk/option-destination-flags.md" %}}

{{% include-headless "chunk/option-destination-flush-lines.md" %}}

{{% include-headless "chunk/option-destination-frac-digits.md" %}}

{{% include-headless "chunk/option-destination-group.md" %}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{% include-headless "chunk/option-destination-mark-freq.md" %}}

{{% include-headless "chunk/option-destination-mark-mode.md" %}}

{{% include-headless "chunk/option-destination-owner.md" %}}

{{% include-headless "chunk/option-destination-pad-size.md" %}}

{{% include-headless "chunk/option-destination-perm-pipe.md" %}}

{{% include-headless "chunk/option-destination-suppress.md" %}}

{{% include-headless "chunk/option-destination-template.md" %}}

{{% include-headless "chunk/option-destination-template-escape.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}


## time-reap() {#pipe-option-time-reap}

{{% include-headless "chunk/option-description-destination-time-reap.md" %}}


{{% include-headless "chunk/option-source-time-reopen.md" %}}

{{% include-headless "chunk/option-destination-timezone.md" %}}

{{% include-headless "chunk/option-destination-ts-format.md" %}}
