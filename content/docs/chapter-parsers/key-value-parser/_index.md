---
title: "Parsing key=value pairs"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% productparam "abbrev" %}} application can separate a message consisting of whitespace or comma-separated `key=value` pairs (for example, Postfix log messages) into name-value pairs. You can also specify other separator character instead of the equal sign, for example, colon (`:`) to parse MySQL log messages. The {{% productparam "abbrev" %}} application automatically trims any leading or trailing whitespace characters from the keys and values, and also parses values that contain unquoted whitespace. For details on using value-pairs in {{% productparam "abbrev" %}} see {{% xref "/docs/chapter-concepts/concepts-value-pairs/_index.md" %}}.

You can refer to the separated parts of the message using the key of the value as a macro. For example, if the message contains `KEY1=value1,KEY2=value2`, you can refer to the values as **${KEY1}** and **${KEY2}**.

{{% include-headless "wnt/n-kv-parser-repeated-keys.md" %}}

{{% alert title="Warning" color="warning" %}}

If the names of keys in the message is the same as the names of {{% productparam "abbrev" %}} soft macros, the value from the parsed message will overwrite the value of the macro. For example, the `PROGRAM=value1, MESSAGE=value2` content will overwrite the `${PROGRAM}` and `${MESSAGE}` macros. To avoid overwriting such macros, use the **prefix()** option.

Hard macros cannot be modified, so they will not be overwritten. For details on the macro types, see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/macros-hard-vs-soft/_index.md" %}}.

The parser discards message sections that are not `key=value` pairs, even if they appear between `key=value` pairs that can be parsed.

The names of the keys can contain only the following characters: numbers (0-9), letters (a-z,A-Z), underscore (_), dot (.), hyphen (-). Other special characters are not permitted.

{{% /alert %}}

To parse `key=value` pairs, define a parser that has the `kv-parser()` option. Defining the prefix is optional. By default, the parser will process the `${MESSAGE}` part of the log message. You can also define the parser inline in the log path.


## Declaration:

```c

    parser parser_name {
        kv-parser(
            prefix()
        );
    };

```



## Example: Using a key=value parser

In the following example, the source is a log message consisting of comma-separated `key=value` pairs, for example, a Postfix log message:

```c

    Jun 20 12:05:12 mail.example.com <info> postfix/qmgr[35789]: EC2AC1947DA: from=<me@example.com>, size=807, nrcpt=1 (queue active)

```

The kv-parser inserts the "`.kv.`" prefix before all extracted name-value pairs. The destination is a file, that uses the `format-json` template function. Every name-value pair that begins with a dot ("`.`") character will be written to the file (`dot-nv-pairs`). The log line connects the source, the destination and the parser.

```c

    source s_kv {
        network(port(21514));
    };
    
    destination d_json {
        file("/tmp/test.json"
            template("$(format-json --scope dot-nv-pairs)\n"));
    };
    
    parser p_kv {
        kv-parser (prefix(".kv."));
    };
    
    log {
        source(s_kv);
        parser(p_kv);
        destination(d_json);
    };

```

You can also define the parser inline in the log path.

```c

    source s_kv {
        network(port(21514));
    };
    
    destination d_json {
        file("/tmp/test.json"
            template("$(format-json --scope dot-nv-pairs)\n"));
    };
    
    log {
        source(s_kv);
        parser {
            kv-parser (prefix(".kv."));
        };
        destination(d_json);
    };

```

You can set the separator character between the key and the value to parse for example, `key:value` pairs, like MySQL logs:

```c

    Mar  7 12:39:25 myhost MysqlClient[20824]: SYSTEM_USER:'oscar', MYSQL_USER:'my_oscar', CONNECTION_ID:23, DB_SERVER:'127.0.0.1', DB:'--', QUERY:'USE test;'

```

```c

    parser p_mysql {
        kv-parser(value-separator(":") prefix(".mysql."));
    };

```

