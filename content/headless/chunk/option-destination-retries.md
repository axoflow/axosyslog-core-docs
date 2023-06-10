---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## retries()

|          |                      |
| -------- | -------------------- |
| Type:    | number (of attempts) |
| Default: | 3                    |

*Description:* If {{% param "product.abbrev" %}} cannot send a message, it will try again until the number of attempts reaches `retries()`.

If the number of attempts reaches `retries()`, {{% param "product.abbrev" %}} will wait for `time-reopen()` time, then tries sending the message again.

