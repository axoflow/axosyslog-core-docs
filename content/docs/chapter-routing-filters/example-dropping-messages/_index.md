---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
# Dropping messages

To skip the processing of a message without sending it to a destination, create a log statement with the appropriate filters, but do not include any destination in the statement, and use the **final** flag.


## Example: Skipping messages

The following log statement drops all `debug` level messages without any further processing.

```c

    filter demo_debugfilter { level(debug); };
    log { source(s_all); filter(demo_debugfilter); flags(final); };

```

