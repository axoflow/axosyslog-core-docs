---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
The following is a sample log message in EWMM format.

```c
   <13>1 2018-05-13T13:27:50.993+00:00 my-host @syslog-ng - - -
    {"MESSAGE":"<34>Oct 11 22:14:15 mymachine su: 'su root' failed for username on
    /dev/pts/8","HOST_FROM":"my-host","HOST":"my-host","FILE_NAME":"/tmp/in","._TAGS":".source.s_file"}

```
