---
title: "Correlating log messages using pattern databases"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.abbrev" %}} application can correlate log messages identified using [pattern databases]({{< relref "/chapter-parsers/chapter-patterndb/_index.md" >}}). Alternatively, you can also correlate log messages using the `grouping-by()` parser. For details, see {{% xref "/chapter-correlating-log-messages/grouping-by-parser/_index.md" %}}.

{{% include-headless "chunk/correlation-intro.md" %}}

(For details on triggering actions and generating messages, see {{% xref "/chapter-parsers/chapter-patterndb/patterndb-triggers-actions/_index.md" %}}.)

There are two attributes for pattern database rules that determine if a message matching the rule is added to a context: `context-scope` and `context-id`. The `context-scope` attribute acts as an early filter, selecting messages sent by the same process (`${HOST}${PROGRAM}${PID}` is identical), application (`${HOST}${PROGRAM}` is identical), or host, while the `context-id` actually adds the message to the context specified in the id. The `context-id` can be a simple string, or can contain macros or values extracted from the log messages for further filtering. Starting with {{% param "product.abbrev" %}} version 3.5, if a message is added to a context, {{% param "product.abbrev" %}} automatically adds the identifier of the context to the `.classifier.context_id` macro of the message.

{{< include-headless "wnt/note-message-context.md" >}}

Another parameter of a rule is the `context-timeout` attribute, which determines how long a context is stored, that is, how long {{% param "product.abbrev" %}} waits for related messages to arrive.

{{% include-headless "chunk/correlation-context-timeout.md" %}}


## Example: Using message correlation

```shell
   <rule xml:id="..." context-id="ssh-session" context-timeout="86400" context-scope="process">
        <patterns>
            <pattern>Accepted @ESTRING:usracct.authmethod: @for @ESTRING:usracct.username: @from @ESTRING:usracct.device: @port @ESTRING:: @@ANYSTRING:usracct.service@</pattern>
        </patterns>
    ...
    </rule>
```


For details on configuring message correlation, see the [context-id, context-timeout, and context-scope]({{< relref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/_index.md" >}}) attributes of pattern database rules.
