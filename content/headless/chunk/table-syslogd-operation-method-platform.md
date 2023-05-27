---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

**Communication methods used between the applications and syslogd**
| Platform     | Method                 |
|--------------|------------------------|
| Linux | A `SOCK_DGRAM` unix socket named `/dev/log`. Newer distributions that use systemd collect log messages into a journal file. |
| BSD flavors | A `SOCK_DGRAM` unix socket named `/var/run/log`. |
| Solaris (2.5 or below) | An SVR4 style `STREAMS` device named `/dev/log`. |
| Solaris (2.6 or above) | In addition to the `STREAMS` device used in earlier versions, 2.6 uses a new multithreaded IPC method called door. By default the door used by `syslogd` is `/etc/.syslog_door`. |
| HP-UX 11 or later | HP-UX uses a named pipe called `/dev/log` that is padded to 2048 bytes, for example, `source s_hp-ux {pipe ("/dev/log" pad-size(2048)}`. |
| AIX 5.2 and 5.3 | A `SOCK_STREAM` or `SOCK_DGRAM` unix socket called `/dev/log`. |
