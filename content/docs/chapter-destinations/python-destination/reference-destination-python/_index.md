---
title: "python() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The Python destination allows you to write your own destination in Python. The `python()` destination has the following options. The `class()` option is mandatory. For details on writing destinations in Python, see {{% xref "/docs/chapter-destinations/python-destination/_index.md" %}}.


{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

This option does not have any effect unless the `flush()` method is implemented in the destination.



## batch-lines()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 25     |

{{% include-headless "chunk/option-description-destination-batch-lines.md" %}}

This option does not have any effect unless the `flush()` method is implemented in the destination.



{{% include-headless "chunk/option-destination-batch-timeout.md" %}}

This option does not have any effect unless the `flush()` method is implemented in the destination.



## class()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The name of the Python class that implements the destination, for example:

```c
   python(
        class("MyPythonDestination")
    );

```

If you want to store the Python code in an external Python file, the `class()` option must include the name of the Python file containing the class, without the path and the .py extension, for example:

```c
   python(
        class("MyPythonfilename.MyPythonDestination")
    );

```

For details, see {{% xref "/docs/chapter-configuration-file/python-code-external-file/_index.md" %}}


{{% include-headless "chunk/option-destination-diskbuffer.md" %}}

{{% include-headless "chunk/option-destination-frac-digits.md" %}}

{{% include-headless "chunk/option-python-loaders.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{% include-headless "chunk/option-destination-on-error.md" %}}<span id="python-options"></span>

{{% include-headless "chunk/option-python-options.md" %}}


{{% include-headless "chunk/option-persist-name.md" %}}

{{% include-headless "wnt/note-python-persist-name.md" %}}


{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-source-time-reopen-py.md" %}}


{{% include-headless "chunk/destination-option-value-pairs-content.md" %}}

You can use this option to limit which name-value pairs are passed to the Python code for each message. Note that if you use the `value-pairs()` option, the Python code receives the specified value-pairs as a Python dict. Otherwise, it receives the message object. In the following example, only the text of the log message is passed to Python.

```c
   destination d_python_to_file {
        python(
            class("pythonexample.TextDestination")
            value-pairs(key(MESSAGE))
        );
    };

```

