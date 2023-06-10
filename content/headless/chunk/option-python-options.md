---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## options()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* This option allows you to pass custom values from the configuration file to the Python code. Enclose both the option names and their values in double-quotes. The Python code will receive these values during initialization as the `options` dictionary. For example, you can use this to set the IP address of the server from the configuration file, so it is not hard-coded in the Python object.

```c

    python(
        class("MyPythonClass")
        options(
            "host" "127.0.0.1"
            "port" "1883"
            "otheroption" "value")
    );

```

For example, you can refer to the value of the host field in the Python code as **options["host"]**. Note that the Python code receives the values as strings, so you might have to cast them to the type required, for example: **int(options["port"])**

{{% include-headless "wnt/n-arrow-syntax.md" %}}

