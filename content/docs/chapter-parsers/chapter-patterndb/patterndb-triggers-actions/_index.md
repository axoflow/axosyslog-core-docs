---
title: "Triggering actions for identified messages"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.abbrev" %}} application can generate (trigger) messages automatically if certain events occur, for example, a specific log message is received, or the correlation timeout of a message expires. Basically, you can define messages for every pattern database rule that are emitted when a message matching the rule is received. Triggering messages is often used together with message correlation, but can also be used separately. When used together with message correlation, you can also create a new correlation context when a new message is received.

The generated message is injected into the same place where the `db-parser()` statement is referenced in the log path. To post the generated message into the `internal()` source instead, use the **inject-mode()** option in the definition of the parser.


## Example: Sending triggered messages to the internal() source

To send the generated messages to the `internal` source, use the **inject-mode(internal)** option:

```c
   parser p_db {
        db-parser(
            file("mypatterndbfile.xml")
            inject-mode(internal)
        );
    };
```

To inject the generated messages where the pattern database is referenced, use the **inject-mode(pass-through)** option:

```c
   parser p_db {
        db-parser(
            file("mypatterndbfile.xml")
            inject-mode(pass-through)
        );
    };
```


The generated message must be configured in the pattern database rule. It is possible to create an entire message, use macros and values extracted from the original message with pattern database, and so on.

{{% include-headless "chunk/example-patterndb-actions.md" %}}


## Example: Creating a new context from an action

In {{% param "product.abbrev" %}} version 3.8 and newer, you can create a new context as an action. For details, see {{% xref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/patterndb-scheme-create-context/_index.md" %}}.

{{% include-headless "chunk/example-create-context-action.md" %}}


For details on configuring actions, see the description of the pattern database format.
