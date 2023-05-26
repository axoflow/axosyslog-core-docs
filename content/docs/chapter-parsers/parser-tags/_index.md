---
title: "Parsing tags"
weight:  1500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.name" %}} ({{% param "product.abbrev" %}}) application can tag log messages, and can include these tags in the log messages, as described in {{% xref "/docs/chapter-routing-filters/filters/tagging-messages/_index.md" %}}. The `tags-parser()` can parse these tags from the incoming messages and re-tag them. That way if you add tags to a log message on a {{% param "product.abbrev" %}} client, the message will have the same tags on the {{% param "product.abbrev" %}} server. Available in version 3.23 and later.

Specify the macro that contains the list of tags to parse in the `template()` option of the parser, for example, the SDATA field that you used to transfer the tags, or the name of the JSON field that contains the tags after using the `json-parser()`.

```c
   tags-parser(template("${<macro-or-field-with-tags>}"));
```
