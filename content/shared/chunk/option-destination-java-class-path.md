---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## client-lib-dir()

|          |                                                                                                      |
| -------- | ---------------------------------------------------------------------------------------------------- |
| Type:    | string                                                                                               |
| Default: | The {{% productparam "abbrev" %}} module directory: /opt/syslog-ng/lib/syslog-ng/java-modules/ |

*Description:* The list of the paths where the required Java classes are located. For example, **class-path("/opt/syslog-ng/lib/syslog-ng/java-modules/:/opt/my-java-libraries/libs/")**. If you set this option multiple times in your {{% productparam "abbrev" %}} configuration (for example, because you have multiple Java-based destinations), {{% productparam "abbrev" %}} will merge every available paths to a single list.

