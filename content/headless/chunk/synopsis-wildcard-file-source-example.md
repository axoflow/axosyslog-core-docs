---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
```shell
   source s_files {
        wildcard-file(
            base-dir("/var/log")
            filename-pattern("*.log")
            recursive(no)
            follow-freq(1)
        );
    };
```
