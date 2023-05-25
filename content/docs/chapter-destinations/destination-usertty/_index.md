---
title: "usertty: Sending messages to a user terminal: usertty() destination"
weight:  7500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This driver writes messages to the terminal of a logged-in user.

The `usertty()` driver has a single required argument, specifying a username who should receive a copy of matching messages. Use the asterisk **\*** to specify every user currently logged in to the system.


## Declaration:

```c

    usertty(username);

```

The `usertty()` does not have any further options nor does it support templates.


## Example: Using the usertty() driver

```c

    destination d_usertty { usertty("root"); };

```


{{% include-headless "chunk/option-source-time-reopen.md" %}}

