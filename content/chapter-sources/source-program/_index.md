---
title: "program: Receive messages from external applications"
weight:  2900
driver: "program()"
short_description: "Receive messages from external applications"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The program driver starts an external application and reads messages from the standard output (stdout) of the application. It is mainly useful to receive log messages from daemons that accept incoming messages and convert them to log messages.

The program driver has a single required parameter, specifying the name of the application to start.


## Declaration:

```shell
   program(filename);
```



## Example: Using the program() driver {#example-source-program}

```shell
   source s_program {
        program("/etc/init.d/mydaemon");
    };
```


{{% alert title="Note" color="info" %}}

The program is restarted automatically if it exits.

{{% /alert %}}
