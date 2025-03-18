---
title: "XML"
weight: 1300
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->



Available in {{< product >}} 4.9 and later.

The `parse_xml()` FilterX function parses raw XMLs into dictionaries. This is a new implementation, so the limitations and options of the [legacy `xml-parser()`]({{< relref "/chapter-parsers/xml-parser/_index.md" >}}) do not apply.

There is no standardized way of converting XML into a dict. {{< product >}} creates the most compact dict possible. This means certain nodes will have different types and structures depending on the input XML element. Note the following points:

1. Empty XML elements become empty strings.

    ```yaml
    XML:  <foo></foo>
    JSON: {"foo": ""}
    ```

1. Attributions are stored in `@attr` key-value pairs, similarly to other converters (like python xmltodict).

    ```yaml
    XML:  <foo bar="123" baz="bad"/>
    JSON: {"foo": {"@bar": "123", "@baz": "bad"}}
    ```

1. If an XML element has both attributes and a value, we need to store them in a dict, and the value needs a key. We store the text value under the `#text` key.

    ```yaml
    XML:  <foo bar="123">baz</foo>
    JSON: {"foo": {"@bar": "123", "#text": "baz"}}
    ```

1. An XML element can have both a value and inner elements. We use the `#text` key here, too.

    ```yaml
    XML:  <foo>bar<baz>123</baz></foo>
    JSON: {"foo": {"#text": "bar", "baz": "123"}}
    ```

1. An XML element can have multiple values separated by inner elements. In that case we concatenate the values.

    ```yaml
    XML:  <foo>bar<a></a>baz</foo>
    JSON: {"foo": {"#text": "barbaz", "a": ""}}
    ```

## Usage

```shell
my_structured_data = parse_xml(raw_xml);
```
