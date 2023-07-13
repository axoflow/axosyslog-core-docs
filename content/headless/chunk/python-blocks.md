---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
The following points apply to using Python blocks in {{% param "product.abbrev" %}} in general:

- Python parsers and template functions are available in {{% param "product.abbrev" %}} version 3.10 and later.
  
    Python destinations and sources are available in {{% param "product.abbrev" %}} version 3.18 and later.

- Supported Python versions: 2.7 and 3.4+ (if you are using pre-built binaries, check the dependencies of the package to find out which Python version it was compiled with).

- The Python block must be a top-level block in the {{% param "product.abbrev" %}} configuration file.

- {{< include-headless "chunk/python-code-external-file-pythonpath.md" >}}

- The Python object is initiated every time when {{% param "product.abbrev" %}} is started or reloaded.
    
    {{< include-headless "wnt/warning-python-parser-deinit.md" >}}

- The Python block can contain multiple Python functions.

- Using Python code in {{% param "product.abbrev" %}} can significantly decrease the performance of {{% param "product.abbrev" %}}, especially if the Python code is slow. In general, the features of {{% param "product.abbrev" %}} are implemented in C, and are faster than implementations of the same or similar features in Python.

- Validate and lint the Python code before using it. The {{% param "product.abbrev" %}} application does not do any of this.

- Python error messages are available in the `internal()` source of {{% param "product.abbrev" %}}.

- You can access the name-value pairs of {{% param "product.abbrev" %}} directly through a message object or a dictionary.

- {{< include-headless "chunk/python-code-logging-to-internal.md" >}}
