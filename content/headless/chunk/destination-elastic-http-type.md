---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
Use an empty string to omit the type from the index: `type("")`. For example, you need to do that when using Elasticsearch 7 or newer, and you use a mapping in Elasticsearch to modify the type of the data.
