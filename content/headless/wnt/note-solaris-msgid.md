---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{% alert title="Note" color="info" %}}

Starting with version {{% conditional-text include-if="ose" %}}3.7{{% /conditional-text %}}, the {{% param "product.abbrev" %}}`system()` driver automatically extracts the msgid from the message (if available), and stores it in the `.solaris.msgid` macro. To extract the msgid from the message without using the `system()`driver, use the **extract-solaris-msgid()** parser. You can find the exact source of this parser in the [{{% param "product.abbrev" %}} GitHub repository](https://github.com/syslog-ng/syslog-ng/blob/master/scl/solaris/plugin.conf).

{{% /alert %}}
