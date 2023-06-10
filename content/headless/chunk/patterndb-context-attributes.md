---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
*context-id*: OPTIONAL — An identifier to group related log messages when using the pattern database to correlate events. The ID can be a descriptive string describing the events related to the log message (for example, `ssh-sessions` for log messages related to SSH traffic), but can also contain macros to generate IDs dynamically. When using macros in IDs, see also the `context-scope` attribute. Starting with {{% param "product.abbrev" %}} version 3.5, if a message is added to a context, {{% param "product.abbrev" %}} automatically adds the identifier of the context to the `.classifier.context_id` macro of the message. For details on correlating messages, see {{% xref "/docs/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-correlation/_index.md" %}}.

{{% alert title="Note" color="info" %}}

The {{% param "product.abbrev" %}} application determines the context of the message *after* the pattern matching is completed. This means that macros and name-value pairs created by the matching pattern database rule can be used as context-id macros.

{{% /alert %}}

*context-timeout*: OPTIONAL — The number of seconds the context is stored. Note that for high-traffic log servers, storing open contexts for long time can require significant amount of memory. For details on correlating messages, see {{% xref "/docs/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-correlation/_index.md" %}}.

*context-scope*: OPTIONAL — Specifies which messages belong to the same context. This attribute is used to determine the context of the message if the `context-id` does not specify any macros. Usually, `context-scope` acts a filter for the context, with `context-id` refining the filtering if needed. The following values are available:

{{% include-headless "chunk/correlation-context-scope.md" %}} {{% alert title="Note" color="info" %}}

Using the `context-scope` attribute is significantly faster than using macros in the `context-id` attribute.

{{% /alert %}}

For details on correlating messages, see {{% xref "/docs/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-correlation/_index.md" %}}.
