---
title: "Correlating log messages"
weight:  3300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.abbrev" %}} application can correlate log messages. Alternatively, you can also correlate log messages using pattern databases. For details, see {{% xref "/docs/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-correlation/_index.md" %}}.

  - To group or correlate log messages that match a set of filters, use the **group-by** parser. This works similarly to SQL GROUP BY statements. For details, see {{% xref "/docs/chapter-correlating-log-messages/grouping-by-parser/_index.md" %}}.

  - You can correlate log messages identified using pattern databases. For details, see {{% xref "/docs/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-correlation/_index.md" %}}.

{{% include-headless "chunk/correlation-intro.md" %}}
