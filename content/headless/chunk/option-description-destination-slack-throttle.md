---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
By default, the `throttle()` option is set to 1, because Slack has a 1 message/second limit on Webhooks. It can allow more message in short bursts, so you can set it to 0, if you only expect messages in a short period of time. For details, see the [Web API rate limiting in the Slack documentation](https://api.slack.com/apis/rate-limits).
