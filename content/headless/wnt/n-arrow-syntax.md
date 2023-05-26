---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{% alert title="Note" color="info" %}}

From version 3.27, {{% param "product.abbrev" %}} supports the arrow syntax for declaring custom Java and Python options. You can alternatively declare them using a similar syntax:

```c
options(
  "host" => "localhost"
  "port" => "1883"
  "otheroption" => "value"
)           
```
{{% /alert %}}
