---
title: "Client modes"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% productparam "abbrev" %}} application can interact with Elasticsearch in the following modes of operation: {{% conditional-text include-if="ose" %}}http, https, {{% /conditional-text %}}node,{{% conditional-text include-if="ose" %}} searchguard,{{% /conditional-text %}} and transport.

{{% include-headless "chunk/option-destination-elasticsearch-client-mode-description.md" %}}
