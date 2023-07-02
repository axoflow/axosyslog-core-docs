---
title: "Options of JSON parsers"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The JSON parser has the following options.


## extract-prefix() {#json-parser-extract-prefix}

|           |                  |
| --------- | ---------------- |
| Synopsis: | extract-prefix() |

*Description:* Extract only the specified subtree from the JSON message. Use the dot-notation to specify the subtree. The rest of the message will be ignored. For example, assuming that the incoming object is named `msg`, the `json-parser(extract-prefix("foo.bar[5]"));` parser is equivalent to the `msg.foo.bar[5]` javascript code. Note that the resulting expression must be a JSON object in order to extract its members into name-value pairs.

This feature also works when the top-level object is an array, because you can use an array index at the first indirection level, for example: `json-parser(extract-prefix("[5]"))`, which is equivalent to `msg[5]`.

In addition to alphanumeric characters, the key of the JSON object can contain the following characters: `\!"#$%&'()\*+,-/:;<=>?@\\^_`{|}\~`

It cannot contain the following characters: `.[]`


## Example: Convert logstash eventlog format v0 to v1

The following parser converts messages in the logstash eventlog v0 format to the v1 format.

```shell
   parser p_jsoneventv0 {
        channel {
            parser {
                json-parser(extract-prefix("@fields"));
            };
            parser {
                json-parser(prefix(".json."));
            };
            rewrite {
                set("1" value("@version"));
                set("${.json.@timestamp}" value("@timestamp"));
                set("${.json.@message}" value("message"));
            };
        };
    };
```




## marker {#json-parser-marker}

|           |          |
| --------- | -------- |
| Synopsis: | marker() |

*Description:* Use a marker in case of mixed log messages, to identify JSON encoded messages for the parser.

Some logging implementations require a marker to be set before the JSON payload. The JSON parser is able to find these markers and parse the message only if it is present.


## Example: Using the marker option in JSON parser

This json parser parses log messages which use the "@cee:" marker in front of the json payload. It inserts "`.cee.`" in front of the name of name-value pairs, so later on it is easier to find name-value pairs that were parsed using this parser. (For details on selecting name-value pairs, see <span class="mcFormatColor" style="color: #04aada;">value-pairs()</span>.)

```shell
   parser {
            json-parser(
                marker("@cee:")
                prefix(".cee.")
            );
        };
```



{{% include-headless "chunk/option-parser-prefix.md" %}}

{{% include-headless "chunk/no-default-prefix.md" %}}

```shell
   parser {
        json-parser(prefix("myprefix."));
    };
```

{{% include-headless "chunk/option-parser-template.md" %}}
