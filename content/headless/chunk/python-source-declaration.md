---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
Python sources consist of two parts. The first is a {{% param "product.abbrev" %}} source object that you define in your {{% param "product.abbrev" %}} configuration and use in the log path. This object references a Python class, which is the second part of the Python source. The Python class receives or fetches the log messages, and can do virtually anything that you can code in Python. You can either embed the Python class into your {{% param "product.abbrev" %}} configuration file, or [store it in an external Python file]({{< relref "/docs/chapter-configuration-file/python-code-external-file/_index.md" >}}).