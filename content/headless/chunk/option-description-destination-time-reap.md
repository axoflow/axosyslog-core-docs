---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
|                  |                                      |
| ---------------- | ------------------------------------ |
| Accepted values: | number (seconds)                     |
| Default:         | 60 or 0, see description for details |

*Description:* The time to wait in seconds before an idle destination file or pipe is closed. Note that only destination files having macros in their filenames are closed automatically.

Starting with version {{% conditional-text include-if="ose" %}}3.23{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}7.0.17{{% /conditional-text %}}, the way how `time-reap()` works is the following.

1.  If the `time-reap()` option of the destination is set, that value is used, for example:
    
    ```c
        destination d_fifo {
            pipe(
                "/tmp/test.fifo",
                time-reap(30)  # sets time-reap() for this destination only
            );
        };
    
    ```

2.  If the `time-reap()` option of the destination is not set, and the destination does not use a template or macro in its filename or path, `time-reap()` is automatically set to 0. For example:
    
    ```c
        destination d_fifo {
            pipe(
                "/tmp/test.fifo",
            );
        };
    
    ```

3.  Otherwise, the value of the global `time-reap()` option is used, which defaults to 60 seconds.
