---
title: "Referencing earlier messages of the context"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

When creating the aggregated message, or in the various parameters of the `grouping-by()` parser, you can also refer to fields and values of earlier messages of the context by adding the `@\<distance-of-referenced-message-from-the-current\>` suffix to the macro. For example, if there are three log messages in a context, the `${HOST}@1` expression refers to the host field of the current (third) message in the context, the `${HOST}@2` expression refers to the host field of the previous (second) message in the context, `${PID}@3` to the PID of the first message, and so on. For example, the following message can be created from SSH login/logout messages: `An SSH session for ${SSH_USERNAME}@1 from ${SSH_CLIENT_ADDRESS}@2 closed. Session lasted from ${DATE}@2 to ${DATE}`.

{{% alert title="Warning" color="warning" %}}

When referencing an earlier message of the context, always enclose the field name between braces, for example, `${PID}@3`. The reference will not work if you omit the braces.

{{% /alert %}}

{{% include-headless "wnt/note-escape-at.md" %}}


{{% include-headless "chunk/example-grouping-by-referencing-earlier-values.md" %}}


If you do not know in which message of the context contains the information you need, you can use the `grep` template function. For details, see [grep]({{< relref "/docs/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}).


{{% include-headless "chunk/example-grep-template-function.md" %}}


To perform calculations on fields that have numerical values, see [Numerical operations]({{< relref "/docs/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}).
