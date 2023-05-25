---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
The following destination drivers can use the disk-buffer option: {{% conditional-text include-if="ose" %}}`amqp()`, {{% /conditional-text %}}`elasticsearch2()`, `file()`, `hdfs()`, `http()`, `kafka()`, `mongodb()`, `program()`, {{% conditional-text include-if="ose" %}}`redis()`, {{% /conditional-text %}}`riemann()`, {{% conditional-text include-if="pe" %}}`sentinel()`{{% /conditional-text %}}, `smtp()`,{{% conditional-text include-if="pe6" %}} `snmp()`, {{% /conditional-text %}}`sql()`, {{% conditional-text include-if="ose" %}}`stomp()`, {{% /conditional-text %}}`unix-dgram()`, and `unix-stream()`. The `network()`, `syslog()`, `tcp()`, and `tcp6()` destination drivers can also use the disk-buffer option, except when using the `udp` transport method. (The other destinations or protocols do not provide the necessary feedback mechanisms required for the disk-buffer option.)