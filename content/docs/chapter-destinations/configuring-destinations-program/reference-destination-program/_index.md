---
title: "program() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This driver starts an external application or script and sends the log messages to its standard input (`stdin`).

The `program()` destination has the following options:

{{% include-headless "chunk/option-destination-diskbuffer.md" %}}

{{% include-headless "chunk/option-destination-flags.md" %}}

{{% include-headless "chunk/option-destination-flush-lines.md" %}}

{{% include-headless "chunk/option-destination-frac-digits.md" %}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{% include-headless "chunk/option-inherit-environment.md" %}}

{{% include-headless "chunk/option-destination-keep-alive-program.md" %}}

{{% include-headless "chunk/option-destination-mark-freq.md" %}}

{{% include-headless "chunk/option-destination-mark-mode.md" %}}

Note that in earlier versions of {{% param "product.abbrev" %}}, the default for the mark-mode of the `program` destination was `none`. Now it defaults to the global setting, so the `program` destination will emit a MARK message every `mark-freq` interval. To avoid such messages, set the `mark-mode()` option of the destination to `none`.

{{% include-headless "chunk/option-destination-suppress.md" %}}

{{% include-headless "chunk/option-destination-template.md" %}}

Make sure to end your template with a newline character (`\\n`).

{{% include-headless "chunk/option-destination-template-escape.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

{{% include-headless "chunk/option-destination-timezone.md" %}}

{{% include-headless "chunk/option-destination-ts-format.md" %}}
