---
title: "Logging from your Python code"
weight:  1900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

You can extend and customize {{% param "product.abbrev" %}} easily by writing [destinations]({{< relref "/docs/chapter-destinations/python-destination/_index.md" >}}), [parsers]({{< relref "/docs/chapter-parsers/python-parser/_index.md" >}}), [template functions]({{< relref "/docs/chapter-destinations/python-destination/_index.md#template-function-python" >}}), and [sources]({{< relref "/docs/chapter-sources/python-source/_index.md" >}}) in Python.

To debug and troubleshoot your Python code, {{% param "product.abbrev" %}} allows you to use the `logger()` method to send log messages to the [`internal()`]({{< relref "/docs/chapter-sources/configuring-sources-internal/_index.md" >}}) source of {{% param "product.abbrev" %}}. That way the diagnostic messages of your Python code are treated the same way as other such log messages of {{% param "product.abbrev" %}}. This has the following benefits:

  - The `logger()` method respects the log level settings of {{% param "product.abbrev" %}}. You can write error, warning, info, debug, and trace level messages.

  - You can follow what your Python code is doing even if {{% param "product.abbrev" %}} is running as a daemon in the background.

Logging to the `internal()` source is available in {{% param "product.abbrev" %}} version 3.20 and later.

To send log messages to the internal() source from Python

1.  Add the following import to your Python code:
    
    ```c
        import syslogng
    
    ```

2.  Create a logger object:
    
    ```c
        logger = syslogng.Logger()
    
    ```

3.  Use the logger object in your Python code, for example:
    
    ```c
        logger.info("This is a sample log message send from the Python code.")
    
    ```
    
    You can use the following log levels: `logger.error`, `logger.warning`, `logger.info`, `logger.debug`, `logger.trace`

4.  Make sure that your {{% param "product.abbrev" %}} configuration includes the `internal()` source, for example:
    
    ```c
        source s_internal { internal(); };
        destination d_internal { file("/var/log/internal.txt"); };
        log {source(s_internal); destination(d_internal); };
    ```
