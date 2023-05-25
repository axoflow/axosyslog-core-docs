---
title: "Structuring macros, metadata, and other value-pairs"
weight:  1900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

*Available in {{% param "product.abbrev" %}} {{% conditional-text include-if="ose" %}}3.3{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}5.1{{% /conditional-text %}} and later.*

The {{% param "product.abbrev" %}} application allows you to select and construct name-value pairs from any information already available about the log message, or extracted from the message itself. You can directly use this structured information, for example, in the following places:

  - [`amqp()`]({{< relref "/docs/chapter-destinations/configuring-destinations-amqp/_index.md" >}}) destination

  - [`format-welf()`]({{< relref "/docs/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}) template function

  - [`mongodb()`]({{< relref "/docs/chapter-destinations/configuring-destinations-mongodb/_index.md" >}}) destination

  - [`stomp()`]({{< relref "/docs/chapter-destinations/configuring-destinations-stomp/_index.md" >}}) destination

  - or in other destinations using the [format-json()]({{< relref "/docs/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}) template function.

When using `value-pairs`, there are three ways to specify which information (that is, macros or other name-value pairs) to include in the selection.

  - Select groups of macros using the **scope()** parameter, and optionally remove certain macros from the group using the **exclude()** parameter.

  - List specific macros to include using the **key()** parameter.

  - Define new name-value pairs to include using the **pair()** parameter.

These parameters are detailed in <span class="mcFormatColor" style="color: #04aada;">value-pairs()</span>.
