---
title: "Format data as XML"
linkTitle: "XML"
description: "Format a FilterX dictionary into XML with format_xml(), and see how attributes, text values, lists, and empty elements are mapped."
weight: 800
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{< product >}} 4.13 and later.

{{< include-headless "chunk/prereq-package-deb-only.md" "axosyslog-mod-xml-parser" >}}

Formats a dictionary into XML. To format data as Windows Event Log XML, see {{% xref "/filterx/filterx-format-data/format-windows-eventlog-xml.md" %}}.

To parse XML, see {{% xref "/filterx/filterx-parsing/xml/_index.md" %}}.

Usage: `format_xml({"key1":{"nestedkey":"value"}})`

The output XML for the previous example will be: `<key><nestedkey>value</nestedkey></key>`

Note the following points:

1. Store attributions in `@attr` key-value pairs.

    ```yaml
    JSON: {"foo": {"@bar": "123", "@baz": "bad"}}
    XML:  <foo bar="123" baz="bad"/>
    ```

1. If an XML element has both attributes and a value, store text value under the `#text` key.

    ```yaml
    JSON: {"foo": {"@bar": "123", "#text": "baz"}}
    XML:  <foo bar="123">baz</foo>
    ```

1. An XML element can have both a value and inner elements. We use the `#text` key here, too.

    ```yaml
    JSON: {"foo": {"#text": "bar", "baz": "123"}}
    XML:  <foo>bar<baz>123</baz></foo>
    ```

1. JSON lists become values of separate tags:

    ```yaml
    JSON: {"a":{"b":["c","d"]}}
    XML:  <a><b>c</b><b>d</b></a>
    ```

    You can add attributions for specific elements of such lists:

    ```yaml
    JSON: {"a":{"b":["c",{"@attr":"attr_val","#text":"e"}]}}
    XML:  <a><b>c</b><b attr='attr_val'>e</b></a>
    ```

1. A top-level JSON lists becomes a multi-root XML:

    ```yaml
    JSON: {"a":["b","c"]}
    XML:  <a>b</a><a>c</a>
    ```

1. Numeric values become text:

    ```yaml
    JSON: {"a":100}
    XML:  <a>100</a>
    ```

1. Empty elements are represented as short-format XML tags:

    ```yaml
    JSON: {"a":""}
    XML:  <a/>
    ```
