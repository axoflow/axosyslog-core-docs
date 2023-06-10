---
title: "Python code in external files"
weight:  1700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

You can extend and customize {{% param "product.abbrev" %}} easily by writing [destinations]({{< relref "/docs/chapter-destinations/python-destination/_index.md" >}}), [parsers]({{< relref "/docs/chapter-parsers/python-parser/_index.md" >}}), [template functions]({{< relref "/docs/chapter-destinations/python-destination/_index.md#template-function-python" >}}), and [sources]({{< relref "/docs/chapter-sources/python-source/_index.md" >}}) in Python.

Instead of writing Python code into your {{% param "product.abbrev" %}} configuration file, you can store the Python code for your Python object in an external file. That way, it is easier to write, maintain, and debug the code. You can store the Python code in any directory in your system, but make sure to include it in your Python path.

When referencing a Python class from an external file in the `class()` option of a Python block in the {{% param "product.abbrev" %}} configuration file, the class name must include the name of the Python file containing the class, without the path and the .py extension. For example, if the MyDestination class is available in the `/etc/syslog-ng/etc/pythonexample.py` file, use `class("pythonexample.MyDestination")`:

```c
   destination d_python_to_file {
        python(
            class("pythonexample.MyDestination")
        );
    };
    log {
        source(src);
        destination(d_python_to_file);
    };
```

{{< include-headless "wnt/note-python-persist-name.md" >}}

{{% include-headless "chunk/python-code-external-file-pythonpath.md" %}}

{{% include-headless "chunk/python-code-logging-to-internal.md" %}}
