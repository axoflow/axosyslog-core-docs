---
title: "smtp() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `smtp()` sends email messages using SMTP, without needing external applications. The `smtp()` destination has the following options:

{{% include-headless "chunk/smtp-option-body.md" %}}

{{% include-headless "chunk/smtp-option-bcc.md" %}}

{{% include-headless "chunk/smtp-option-cc.md" %}}

{{< include-headless "chunk/option-destination-diskbuffer.md" >}}

{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

{{% include-headless "chunk/option-destination-threaded-batching.md" %}}

{{% include-headless "chunk/smtp-option-from.md" %}}

{{% include-headless "chunk/smtp-option-header.md" %}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{< include-headless "chunk/smtp-option-host.md" >}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{% include-headless "chunk/smtp-option-port.md" %}}

{{% include-headless "chunk/smtp-option-reply-to.md" %}}

{{% include-headless "chunk/option-destination-retries.md" %}}

{{% include-headless "chunk/smtp-option-subject.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

{{% include-headless "chunk/smtp-option-to.md" %}}
