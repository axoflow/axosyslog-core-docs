---
title: "stdout: Sending messages to standard output"
weight:  6050
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{% param "product.abbrev" %}} version 4.4 and later.

The `stdout()` destination driver sends messages to the standard output.

## Declaration:

```shell
log {
    source{ stdin(); };
    destination{ stdout(); };
};
```

## Options

{{< include-headless "chunk/option-destination-flags.md" >}}

{{% include-headless "chunk/option-destination-flush-lines.md" %}}

{{% include-headless "chunk/option-destination-flush-timeout.md" %}}

{{< include-headless "chunk/option-destination-frac-digits.md" >}}

{{% include-headless "chunk/option-destination-local-timezone.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{% include-headless "chunk/option-destination-mark-freq.md" %}}

{{< include-headless "chunk/option-destination-mark-mode.md" >}}

{{< include-headless "chunk/option-destination-pad-size.md" >}}

{{% include-headless "chunk/option-persist-name.md" %}}

{{% include-headless "chunk/option-destination-send-timezone.md" %}}

{{% include-headless "chunk/option-destination-suppress.md" %}}

{{% include-headless "chunk/option-destination-template.md" %}}

{{% include-headless "chunk/option-destination-template-escape.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-destination-timezone.md" %}}

{{< include-headless "chunk/option-destination-ts-format.md" >}}
