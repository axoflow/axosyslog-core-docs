---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
The following points apply to using Python blocks in {{% productparam "abbrev" %}} in general:

  - Python parsers and template functions are available in {{% productparam "abbrev" %}} version {{% conditional-text include-if="ose" %}}3.10{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}7.0.2{{% /conditional-text %}} and later.
    
    Python destinations and sources are available in {{% productparam "abbrev" %}} version {{% conditional-text include-if="ose" %}}3.18{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}7.0.11{{% /conditional-text %}} and later.

  - Supported Python versions: 2.7{{% conditional-text include-if="ose" %}} and 3.4+ (if you are using pre-built binaries, check the dependencies of the package to find out which Python version it was compiled with){{% /conditional-text %}}.

  - The Python block must be a top-level block in the {{% productparam "abbrev" %}} configuration file.

  - {{% include-headless "chunk/python-code-external-file-pythonpath.md" %}}

  - The Python object is initiated every time when {{% productparam "abbrev" %}} is started or reloaded.
    
    {{% include-headless "wnt/warning-python-parser-deinit.md" %}}

  - The Python block can contain multiple Python functions.

  - Using Python code in {{% productparam "abbrev" %}} can significantly decrease the performance of {{% productparam "abbrev" %}}, especially if the Python code is slow. In general, the features of {{% productparam "abbrev" %}} are implemented in C, and are faster than implementations of the same or similar features in Python.

  - Validate and lint the Python code before using it. The {{% productparam "abbrev" %}} application does not do any of this.

  - Python error messages are available in the `internal()` source of {{% productparam "abbrev" %}}.

  - You can access the name-value pairs of {{% productparam "abbrev" %}} directly through a message object or a dictionary.

  - {{% include-headless "chunk/python-code-logging-to-internal.md" %}}

  - ## Support disclaimer
    
    Using Python in {{% productparam "abbrev" %}} is recommended only if you are familiar with both Python and {{% productparam "abbrev" %}}. Product support applies only to {{% productparam "abbrev" %}}: that is, until the entry point of the Python code and passing the specified arguments to the Python code. {{% productparam "companyabbrev" %}} is not responsible for the quality, resource requirements, or any bugs in the Python code, nor any {{% productparam "abbrev" %}} crashes, message losses, or any other damage caused by the improper use of this feature, unless explicitly stated in a contract with {{% productparam "companyabbrev" %}}.
