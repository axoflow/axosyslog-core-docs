---
title: "osquery() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `osquery()` destination has the following options:


## file()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* Specifies a path to the file where log messages are stored, for example, for debug purposes.

Specifying this option is optional. However, when you start losing logs for some reason, then it is recommended to write outgoing log messages to a specified file, in the same format that messages are written to the pipe. You can also use a `template()` function called `t_osquery`, which re-formats messages so they comply with the text-based protocol that osquery accepts.

{{% include-headless "chunk/option-destination-hook.md" %}}



## pipe()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* Specifies a custom path to the named pipe that acts as the interface between osquery and syslog-ng. (The default path is set in the SCL file.)

Specifying this option is optional.

