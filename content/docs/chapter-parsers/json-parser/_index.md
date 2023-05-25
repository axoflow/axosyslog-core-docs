---
title: "JSON parser"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

JavaScript Object Notation (JSON) is a text-based open standard designed for human-readable data interchange. It is used primarily to transmit data between a server and web application, serving as an alternative to XML. It is described in [RFC 4627](https://tools.ietf.org/html/rfc4627). The {{% param "product.abbrev" %}} application can separate parts of incoming JSON-encoded log messages to name-value pairs. For details on using value-pairs in {{% param "product.abbrev" %}} see {{% xref "/docs/chapter-concepts/concepts-value-pairs/_index.md" %}}.

You can refer to the separated parts of the JSON message using the key of the JSON object as a macro. For example, if the JSON contains `{"KEY1":"value1","KEY2":"value2"}`, you can refer to the values as **${KEY1}** and **${KEY2}**. If the JSON content is structured, {{% param "product.abbrev" %}} converts it to dot-notation-format. For example, to access the value of the following structure `{"KEY1": {"KEY2": "VALUE"}}`, use the **${KEY1.KEY2}** macro.

{{% alert title="Warning" color="warning" %}}

If the names of keys in the JSON content are the same as the names of {{% param "product.abbrev" %}} soft macros, the value from the JSON content will overwrite the value of the macro. For example, the `{"PROGRAM":"value1","MESSAGE":"value2"}` JSON content will overwrite the `${PROGRAM}` and `${MESSAGE}` macros. To avoid overwriting such macros, use the **prefix()** option.

Hard macros cannot be modified, so they will not be overwritten. For details on the macro types, see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/macros-hard-vs-soft/_index.md" %}}.

{{% /alert %}}

{{% alert title="Note" color="info" %}}

The JSON parser currently supports only integer, double and string values when interpreting JSON structures. As syslog-ng does not handle different data types internally, the JSON parser converts all JSON data to string values. In case of boolean types, the value is converted to 'TRUE' or 'FALSE' as their string representation.

The JSON parser discards messages if it cannot parse them as JSON messages, so it acts as a JSON-filter as well.

{{% /alert %}}

To create a JSON parser, define a parser that has the `json-parser()` option. Defining the prefix and the marker are optional. By default, the parser will process the `${MESSAGE}` part of the log message. To process other parts of a log message with the JSON parser, use the **template()** option. You can also define the parser inline in the log path.


## Declaration:

```c
   parser parser_name {
        json-parser(
            marker()
            prefix()
        );
    };

```



## Example: Using a JSON parser

In the following example, the source is a JSON encoded log message. The syslog parser is disabled, so that {{% param "product.abbrev" %}} does not parse the message: `flags(no-parse)`. The json-parser inserts "`.json.`" prefix before all extracted name-value pairs. The destination is a file that uses the `format-json` template function. Every name-value pair that begins with a dot ("`.`") character will be written to the file (`dot-nv-pairs`). The log line connects the source, the destination and the parser.

```c
   source s_json {
        network(
            port(21514
            flags(no-parse)
        );
    };
    
    destination d_json {
        file(
            "/tmp/test.json"
            template("$(format-json --scope dot-nv-pairs)\n")
        );
    };
    
    parser p_json {
        json-parser (prefix(".json."));
    };
    
    log {
        source(s_json);
        parser(p_json);
        destination(d_json);
    };

```

You can also define the parser inline in the log path.

```c
   source s_json {
        network(
            port(21514)
            flags(no-parse)
        );
    };
    
    destination d_json {
        file(
            "/tmp/test.json"
            template("$(format-json --scope dot-nv-pairs)\n")
        );
    };
    
    log {
        source(s_json);
        parser {
            json-parser (prefix(".json."));
        };
        destination(d_json);
    };

```

