---
title: "What's new in the pattern database format V5"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The V5 database format has the following differences compared to the V4 format:

  - The `<ruleset>` element can now store multiple reference URLs using the new `<rule_urls>` element. For details, see {{% xref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-ruleset/_index.md" %}}.

  - In an `<action>`, you can now initialize a new context. As a result, the `<message>` element is not required. For details, see {{% xref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-create-context/_index.md" %}}.

  - The `inherit-properties` attribute is deprecated, use the `inherit-mode` attribute instead. For details, see {{% xref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-action/_index.md" %}}.
