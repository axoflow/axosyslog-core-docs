---
title: "XML parser"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Extensible Markup Language (XML) is a text-based open standard designed for both human-readable and machine-readable data interchange. Like JSON, it is used primarily to transmit data between a server and web application. It is described in [W3C Recommendation: Extensible Markup Language (XML)](https://www.w3.org/TR/REC-xml/).

The XML parser processes input in XML format, and adds the parsed data to the message object.

To create an XML parser, define an `xml_parser` that has the `xml()` option. By default, the parser will process the `${MESSAGE}` part of the log message. To process other parts of a log message using the XML parser, use the `template()` option. You can also define the parser inline in the log path.


## Declaration:

```c
   parser xml_name {
        xml(
            template()
            prefix()
            drop-invalid()
            exclude-tags()
            strip-whitespaces()
        );
    };
```



## Example: Using an XML parser

In the following example, the source is an XML-encoded log message. The destination is a file that uses the `format-json` template. The log line connects the source, the destination and the parser.

```c
   source s_local {
        file("/tmp/aaa");
    };
    
    destination d_local {
        file(
            "/tmp/bbb"
            template("$(format-json .xml.*)\n")
        );
    };
    
    parser xml_parser {
        xml();
    };
    
    log {
        source(s_local);
        parser(xml_parser);
        destination(d_local);
    };
```

You can also define the parser inline in the log path.

```c
   log {
        source(s_file);
        parser { xml(prefix(".SDATA")); };
        destination(d_file);
    };
```


The XML parser inserts an "`.xml`" prefix by default before the extracted name-value pairs. Since `format-json` replaces a dot with an underscore at the beginning of keys, the "`.xml`" prefix becomes "`_xml`". Attributes get an `_` prefix. For example, from the XML input:

```c
   <tags attr='attrval'>part1<tag1>Tag1 Leaf</tag1>part2<tag2>Tag2 Leaf</tag2>part3</tags>
```

The following output is generated:

```c
   {"_xml":{"tags":{"tag2":"Tag2 Leaf","tag1":"Tag1 Leaf","_attr":"attrval","tags":"part1part2part3"}}}
```

When the text is separated by tags on different levels or tags on the same level, the parser simply concatenates the different parts of text. For example, from this input XML:

```c
   <tag>
     <tag1>text1</tag1>
     <tag1>text2</tag1>
    </tag>
```

The following output is generated:

```c
   .xml.tag.tag1 = text1text2
```

Whitespaces are kept as they are in the XML input. No collapsing happens on significant whitespaces. For example, from this input XML:

```c
   <133>Feb 25 14:09:07 webserver syslogd: <b>|Test\n\n   Test2|</b>\n
```

The following output is generated:

```c
   [2017-09-04T13:20:27.417266] Setting value; msg='0x7f2fd8002df0', name='.xml.b', value='|Test\x0a\x0a   Test2|'
```

However, note that users can choose to strip whitespaces using the [`strip-whitespaces()`]({{< relref "/chapter-parsers/xml-parser/xml-parser-options/_index.md" >}}) option.


## Configuration hints

Define a source that correctly detects the end of the message, otherwise the XML parser will consider the input invalid, resulting in a parser error.

To ensure that the end of the XML document is accurately detected, use any of the following options:

- Ensure that the XML is a single-line message.

- In the case of multiline XML documents:

    - If the opening and closing tags are fixed and known, you can use `multi-line-mode(prefix-suffix)`. Using regular expressions, specify a prefix and suffix matching the opening and closing tags. For details on using `multi-line-mode(prefix-suffix)`, see the `multi-line-prefix()` and `multi-line-suffix()` options.
    
        - In the case of TCP, you can encapsulate and send the document in syslog-protocol format, and use a `syslog()` source. Make sure that the message conforms to [the octet counting method described in RFC6587](https://tools.ietf.org/html/rfc6587#section-3.4.1).
        
            For example:
            
            ```c
            
                59 <133>Feb 25 14:09:07 webserver syslogd: <book>\nText\n</book>
            
            ```
            
            Considering the new lines as one character, `59` is appended to the original message.
        
      - You can use a datagram-based source. In the case of datagram-based sources, the protocol signals the end of the message automatically. Ensure that the complete XML document is written in one message.
    
      - Unless the opening and closing tags are fixed and known, stream-based sources are currently not supported.

In case you experience issues, start `syslog-ng` with debug logs enabled. There will be a debug log about the incoming log entry, which shows the complete message to be parsed. The entry should contain the entire XML document.

{{< include-headless "wnt/note-xml-parser-format.md" >}}

