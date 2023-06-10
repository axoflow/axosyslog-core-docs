---
title: Load balancing logs between multiple destinations
weight: 800
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

These sections describe a method of load balancing logs between multiple {{% param "product.name" %}} ({{% param "product.abbrev" %}}) destinations. The first subsection describes the round robin load balancing method based on the `R_MSEC` macro of {{% param "product.abbrev" %}}, while the second subsection describes a configuration generator that you can use as an alternative to using the example configuration described in the first subsection.

For more information about the `R_MSEC` macro and further macros of {{% param "product.abbrev" %}}, see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" %}}.
