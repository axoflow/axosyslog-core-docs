---
title: "Using pattern databases"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To classify messages using a pattern database, include a `db-parser()` statement in your `syslog-ng` configuration file using the following syntax:


## Declaration:

```c
   parser <identifier> {
        db-parser(file("<database_filename>"));
    };
```


Note that using the parser in a log statement only performs the classification, but does not automatically do anything with the results of the classification.


## Example: Defining pattern databases

The following statement uses the database located at `/opt/syslog-ng/var/db/patterndb.xml`.

```c
   parser pattern_db {
        db-parser(
            file("/opt/syslog-ng/var/db/patterndb.xml")
        );
    };
```

To apply the patterns on the incoming messages, include the parser in a log statement:

```c
   log {
        source(s_all);
        parser(pattern_db);
        destination( di_messages_class);
    };
```

By default, `syslog-ng` tries to apply the patterns to the body of the incoming messages, that is, to the value of the $MESSAGE macro. If you want to apply patterns to a specific field, or to an expression created from the log message (for example, using template functions or other parsers), use the `message-template()` option. For example:

```c
   parser pattern_db {
        db-parser(
            file("/opt/syslog-ng/var/db/patterndb.xml")
            message-template("${MY-CUSTOM-FIELD-TO-PROCESS}")
        );
    };
```

By default, `syslog-ng` uses the name of the application (content of the `${PROGRAM}` macro) to select which rules to apply to the message. If the content of the `${PROGRAM}` macro is not the proper name of the application, you can use the `program-template()` option to specify it. For example:

```c
   parser pattern_db {
        db-parser(
            file("/opt/syslog-ng/var/db/patterndb.xml")
            program-template("${MY-CUSTOM-FIELD-TO-SELECT-RULES}")
        );
    };
```

Note that the `program-template()` option is available in {{% param "product.abbrev" %}} version 3.21 and later.


{{% alert title="Note" color="info" %}}

The default location of the pattern database file is `/opt/syslog-ng/var/run/patterndb.xml`. The `file` option of the `db-parser()` statement can be used to specify a different file, thus different db-parser statements can use different pattern databases.

{{% /alert %}}


## Example: Using classification results

The following destination separates the log messages into different files based on the class assigned to the pattern that matches the message (for example, Violation and Security type messages are stored in a separate file), and also adds the ID of the matching rule to the message:

```c
   destination di_messages_class {
        file(
            "/var/log/messages-${.classifier.class}"
            template("${.classifier.rule_id};${S_UNIXTIME};${SOURCEIP};${HOST};${PROGRAM};${PID};${MESSAGE}\n")
            template-escape(no)
        );
    };
```

Note that if you chain pattern databases, that is, use multiple databases in the same log path, the class assigned to the message (the value of `${.classifier.class}`) will be the one assigned by the last pattern database. As a result, a message might be classified as unknown even if a previous parser successfully classified it. For example, consider the following configuration:

```c
   log {
        ...
        parser(db_parser1);
        parser(db_parser2);
        ...
    };
```

Even if `db_parser1` matches the message, `db_parser2` might set `${.classifier.class}` to unknown. To avoid this problem, you can use an 'if' statement to apply the second parser only if the first parser could not classify the message:

```c
   log {
        ...
        parser{ db-parser(file("db_parser1.xml")); };
        if (match("^unknown$" value(".classifier.class"))) {
            parser { db-parser(file("db_parser2.xml")); };
        };
        ...
    };
```


For details on how to create your own pattern databases see {{% xref "/docs/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/_index.md" %}}.


## Drop unmatched messages {#patterndb-drop-unmatched-messages}

If you want to automatically drop unmatched messages (that is, discard every message that does not match a pattern in the pattern database), use the `drop-unmatched()` option in the definition of the pattern database:

```c
   parser pattern_db {
        db-parser(
            file("/opt/syslog-ng/var/db/patterndb.xml")
            drop-unmatched(yes)
        );
    };
```

Note that the `drop-unmatched()` option is available in {{% param "product.abbrev" %}} version 3.11 and later.

