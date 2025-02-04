---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{% alert title="Note" color="info" %}}

If a log message contains the same key multiple times (for example, `key1=value1, key2=value2, key1=value3, key3=value4, key1=value5`), then {{% param "product.abbrev" %}} only stores the last (rightmost) value for the key. Using the previous example, {{% param "product.abbrev" %}} will store the following pairs: `key1=value5, key2=value2, key3=value4`.

{{% /alert %}}
