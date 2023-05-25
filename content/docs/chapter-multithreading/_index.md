---
title: "Multithreading and scaling in syslog-ng OSE"
weight:  3900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with version {{% conditional-text include-if="pe" %}}4 F1{{% /conditional-text %}}{{% conditional-text include-if="ose" %}}3.3{{% /conditional-text %}}, {{% param "product.abbrev" %}} can process sources and destinations in multithreaded mode to scale to multiple CPUs or cores for increased performance. Starting with version {{% conditional-text include-if="ose" %}}3.6{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}5 F4{{% /conditional-text %}}, this multithreaded mode is the default.
