---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
Starting with version {{% conditional-text include-if="ose" %}}3.24{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}7.0.17{{% /conditional-text %}}, {{% productparam "abbrev" %}} tries to automatically detect the location of the database. If that is successful, the `database()` option is not mandatory.
