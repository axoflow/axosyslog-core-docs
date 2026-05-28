---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

When enabled, the parser doesn't process messages that don't match the parser. For example, a message that has fewer columns than specified, or more columns when the `greedy` flag isn't enabled. Using `drop-invalid(yes)` practically turns the parser into a special filter that matches messages with the predefined number of columns (using the specified delimiters). `drop-invalid(yes)` is equivalent to setting the `drop-invalid` value in `flags()`.

{{% alert title="Note" color="info" %}}
Messages dropped as invalid can be processed by a `fallback` log path. For details on the `fallback` option, see {{% xref "/chapter-routing-filters/logpath/reference-logflags/_index.md" %}}.
{{% /alert %}}
