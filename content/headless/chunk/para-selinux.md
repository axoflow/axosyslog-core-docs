---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
Security-Enhanced Linux (SELinux) is a set of kernel and user-space tools enforcing strict access control policies. SELinux rules in Linux distributions cover all aspects of the configuration coming in the `syslog-ng` package available in the distribution. But as soon as an unusual port number or directory name is specified in the configuration, `syslog-ng` fails to work even with a completely legitimate configuration.
