---
title: "Notes on reading kernel messages"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Note the following points when reading kernel messages on various platforms.

  - The kernel usually sends log messages to a special file (`/dev/kmsg` on BSDs, `/proc/kmsg` on Linux). The `file()` driver reads log messages from such files. The AxoSyslog application can periodically check the file for new log messages if the `follow-freq()` option is set.

  - On Linux, the `klogd` daemon can be used in addition to AxoSyslog to read kernel messages and forward them to `syslog-ng`. `klogd` used to preprocess kernel messages to resolve symbols and so on, but as this is deprecated by `ksymoops` there is really no point in running both `klogd` and AxoSyslog in parallel. Also note that running two processes reading `/proc/kmsg` at the same time might result in dead-locks.

  - When using AxoSyslog to read messages from the `/proc/kmsg` file, AxoSyslog automatically disables the `follow-freq()` parameter to avoid blocking the file.

  - To read the kernel messages on HP-UX platforms, use the following options in the source statement:
    
    ```shell
        file("/dev/klog" program-override("kernel") flags(kernel) follow-freq(0));
    ```
