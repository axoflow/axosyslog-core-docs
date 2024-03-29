---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## multi-line-mode()

|          |                 |
| -------- | --------------- |
| Type:    | `indented`, `prefix-garbage`, `prefix-suffix`, `regexp`, `smart` |
| Default: | empty string    |

*Description:* Use the `multi-line-mode()` option when processing multi-line messages. The {{% param "product.abbrev" %}} application provides the following methods to process multi-line messages:

- `indented`: The `indented` mode can process messages where each line that belongs to the previous line is indented by whitespace, and the message continues until the first non-indented line. For example, the Linux kernel (starting with version 3.5) uses this format for `/dev/log`, as well as several applications, like Apache Tomcat.

    ```shell
        source s_tomcat {
            file("/var/log/tomcat/xxx.log" multi-line-mode(indented));
        };
    ```

- `prefix-garbage`: The *prefix-garbage* mode uses a string or regular expression (set in `multi-line-prefix()`) that matches the beginning of the log messages, ignores newline characters from the source until a line matches the regular expression again, and treats the lines between the matching lines as a single message. For details on using `multi-line-mode(prefix-garbage)`, see the `multi-line-prefix()` and `multi-line-garbage()` options.

- `prefix-suffix`: The `prefix-suffix` mode uses a string or regular expression (set in `multi-line-prefix()`) that matches the beginning of the log messages, ignores newline characters from the source until a line matches the regular expression set in `multi-line-suffix()`, and treats the lines between `multi-line-prefix()` and `multi-line-suffix()` as a single message. Any other lines between the end of the message and the beginning of a new message (that is, a line that matches the `multi-line-prefix()` expression) are discarded. For details on using `multi-line-mode(prefix-suffix)`, see the `multi-line-prefix()` and `multi-line-suffix()` options.

    The `prefix-suffix` mode is similar to the `prefix-garbage` mode, but it appends the garbage part to the message instead of discarding it.

- `smart`: The `smart` mode recognizes multi-line data backtraces even if they span multiple lines in the input. The backtraces are converted to a single log message for easier analysis. Backtraces for the following programming languages are recognized : Python, Java, JavaScript, PHP, Go, Ruby, and Dart.

    `smart` mode is available in {{% param "product.name" %}} version 4.2 and newer.

    The regular expressions to recognize these programming languages are specified in an external file called `/usr/share/syslog-ng/smart-multi-line.fsm` (installation path depends on configure arguments), in a format that is described in that file.

{{< include-headless "wnt/tip-multi-line-output.md" >}}
