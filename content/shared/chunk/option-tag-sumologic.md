---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## tag()

|          |             |
| -------- | ----------- |
| Type:    | string list |
| Default: | "tag"       |

*Description:* Optional. This option specifies the list of tags to add as the tags fields of Sumo Logic messages. If not specified, {{% productparam "abbrev" %}} automatically adds the tags already assigned to the message. If you set the `tag()` option, only the tags you specify will be added to the messages.

