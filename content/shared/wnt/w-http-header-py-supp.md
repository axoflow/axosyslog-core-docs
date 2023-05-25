---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{% alert title="Warning" color="warning" %}}

Although it is possible to configure multiple HTTP workers for {{% param "product.abbrev" %}}, the {{% param "product.abbrev" %}} application can only embed a single Python interpreter at the same time. As a result, if you configure more than one HTTP workers on your {{% param "product.abbrev" %}} application, the Python code will run in concurrent mode. To protect the state of the object, you may need to use locks.

For more information about using locks, see [Introduction to the Python HTTP header](https://www.syslog-ng.com/community/b/blog/posts/introduction-to-the-python-http-header).

{{% /alert %}}
