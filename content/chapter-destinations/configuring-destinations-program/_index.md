---
title: "program: Sending messages to external applications"
weight:  4100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `program()` driver starts an external application or script and sends the log messages to its standard input (`stdin`). Usually, every message is a single line (ending with a newline character), which your script can process. Make sure that your script runs in a loop and keeps reading the standard input — it should not exit. (If your script exits, {{% param "product.abbrev" %}} tries to restart it.)

The `program()` driver has a single required parameter, specifying a program name to start. The program is executed with the help of the current shell, so the command may include both file patterns and I/O redirections. For the list of available optional parameters, see {{% xref "/chapter-destinations/configuring-destinations-program/reference-destination-program/_index.md" %}}.


## Declaration:

```shell
   program(command_to_run);
```

When using the `program()` driver, consider the following:

  - The {{% param "product.abbrev" %}} application must be able to start and restart the external program, and have the necessary permissions to do so. For example, if your host is running AppArmor, you might have to modify your AppArmor configuration to enable {{% param "product.abbrev" %}} to execute external applications.

  - The {{% param "product.abbrev" %}} application executes program destinations through the standard system shell. If the system shell is not bash and you experience problems with the program destination, try changing the `/bin/sh` link to `/bin/bash`.

  - If the external program exits, the {{% param "product.abbrev" %}} application automatically restarts it. However it is not recommended to launch programs for single messages, because if the message rate is high, launching several instances of an application might overload the system, resulting in Denial of Service.

  - When the {{% param "product.abbrev" %}} application stops, it will automatically stop the external program. To avoid restarting the application when {{% param "product.abbrev" %}} is only reloaded, enable the `keep-alive()` option in the program destination.

  - Certain external applications buffer the log messages, which might cause unexpected latency and other problems. For example, if you send the log messages to an external Perl script, Perl uses a line buffer for terminal output and block buffer otherwise. You might want to disable buffering in the external application.



## Example: Using the program() destination driver {#example-destination-program}

The message format does not include the priority and facility values by default. To add these values, specify a template for the program destination, as shown in the following example. Make sure to end your template with a newline character (`\\n`).

```shell
   destination d_prog { program("/bin/script" template("<${PRI}>${DATE} ${HOST} ${MESSAGE}\n") ); };
```

The following shell script writes the incoming messages into the `/tmp/testlog` file.

```shell
   #!/bin/bash
    while read line ; do
    echo $line >> /tmp/testlog
    done
```

