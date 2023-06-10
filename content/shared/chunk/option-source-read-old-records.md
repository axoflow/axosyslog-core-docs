---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## read-old-records()

|          |        |
| -------- | ------ |
| Type:    | yes|no |
| Default: | yes    |

*Description:* If set to **yes**, {{% productparam "abbrev" %}} will start reading the records from the beginning of the journal, if the journal has not been read yet. If set to **no**, {{% productparam "abbrev" %}} will read only the new records. If the source has a state in the persist file, this option will have no effect.

