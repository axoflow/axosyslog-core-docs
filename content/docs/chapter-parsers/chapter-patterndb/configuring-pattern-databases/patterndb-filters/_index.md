---
title: "Using parser results in filters and templates"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The results of message classification and parsing can be used in custom filters and templates, for example, in file and database templates. The following built-in macros allow you to use the results of the classification:

  - The `.classifier.class` macro contains the class assigned to the message (for example, violation, security, or unknown).

  - The `.classifier.rule_id` macro contains the identifier of the message pattern that matched the message.

  - The `.classifier.context_id` macro contains the identifier of the context for messages that were correlated. For details on correlating messages, see {{% xref "/docs/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-correlation/_index.md" %}}.


## Example: Using classification results for filtering messages

To filter on a specific message class, create a filter that checks the `.classifier_class` macro, and use this filter in a log statement.

```c

    filter fi_class_violation {
        match(
            "violation"
            value(".classifier.class")
            type("string")
        );
    };

```

```c

    log {
        source(s_all);
        parser(pattern_db);
        filter(fi_class_violation);
        destination(di_class_violation);
    };

```

Filtering on the `unknown` class selects messages that did not match any rule of the pattern database. Routing these messages into a separate file allows you to periodically review new or unknown messages.

To filter on messages matching a specific classification rule, create a filter that checks the `.classifier.rule_id` macro. The unique identifier of the rule (for example, `e1e9c0d8-13bb-11de-8293-000c2922ed0a`) is the `id` attribute of the rule in the XML database.

```c

    filter fi_class_rule {
        match(
            "e1e9c0d8-13bb-11de-8293-000c2922ed0a"
            value(".classifier.rule_id")
            type("string")
        );
    };

```


Pattern database rules can assign tags to messages. These tags can be used to select tagged messages using the `tags()` filter function.

{{% include-headless "wnt/note-patterndb-class-tag.md" %}}

The message-segments parsed by the pattern parsers can also be used as macros as well. To accomplish this, you have to add a name to the parser, and then you can use this name as a macro that refers to the parsed value of the message.


## Example: Using pattern parsers as macros

For example, you want to parse messages of an application that look like `"Transaction: \<type\>."`, where \<type\> is a string that has different values (for example, refused, accepted, incomplete, and so on). To parse these messages, you can use the following pattern:

```c

    'Transaction: @ESTRING::.@'

```

Here the @ESTRING@ parser parses the message until the next full stop character. To use the results in a filter or a filename template, include a name in the parser of the pattern, for example:

```c

    'Transaction: @ESTRING:TRANSACTIONTYPE:.@'

```

After that, add a custom template to the log path that uses this template. For example, to select every `accepted` transaction, use the following custom filter in the log path:

```c

    match("accepted" value("TRANSACTIONTYPE"));

```


{{% alert title="Note" color="info" %}}

The above macros can be used in database columns and filename templates as well, if you create custom templates for the destination or logspace.

Use a consistent naming scheme for your macros, for example, `APPLICATIONNAME_MACRONAME`.

{{% /alert %}}
