---
title: "Options of the XML parsers"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The XML parser has the following options.

## create-lists() {#xml-parser-create-lists}

|                  |             |
| ---------------- | ----------- |
| Accepted values: | `yes`, `no` |
| Default:         | `yes`       |
| Mandatory:       | no          |

Available in {{% param "product.abbrev" %}} version 3.20 and later.

*Description:* If an XML element appears multiple times on the same level, the parser stores the repeated values as a list-typed name-value pair. If you set `create-lists(no)`, the parser concatenates the repeated values into a single string instead, which was the behavior before version 3.20.

For example, from the following XML input:

```shell
   <tag><item>first</item><item>second</item></tag>
```

The parser creates the `${.xml.tag.item}` name-value pair with the list value `first,second`. With `create-lists(no)`, the value of `${.xml.tag.item}` is the string `firstsecond`.

## drop-invalid() {#xml-parser-drop-invalid}

|            |                |
| ---------- | -------------- |
| Synopsis:  | drop-invalid() |
| Format:    | `yes` or `no`         |
| Default:   | no             |
| Mandatory: | no             |

*Description:* If set, messages with an invalid XML will be dropped entirely.



## exclude-tags() {#xml-parser-exclude-tags}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Synopsis:</td>
<td>exclude-tags()</td>
</tr>
<tr class="even">
<td>Format:</td>
<td>list of globs</td>
</tr>
<tr class="odd">
<td>Default:</td>
<td><p>None</p>
<p>If not set, no filtering is done.</p></td>
</tr>
<tr class="even">
<td>Mandatory:</td>
<td>no</td>
</tr>
</tbody>
</table>

*Description:* The XML parser matches tags against the listed globs. If there is a match, the given subtree of the XML will be omitted.


## Example: Using exclude_tags

```shell
   parser xml_parser {
        xml(
            template("$MSG")
            exclude-tags("tag1", "tag2", "inner*")
        );
    };
```

From this XML input:

```shell
   <tag1>Text1</tag1><tag2>Text2</tag2><tag3>Text3<innertag>TextInner</innertag></tag3>
```

The following output is generated:

```shell
   {"_xml":{"tag3":"Text3"}}
```

{{< include-headless "chunk/option-source-internal.md" >}}

{{% include-headless "chunk/option-parser-prefix.md" %}}

The `prefix()` option is optional and its default value is `".xml"`.



## strip-whitespaces() {#xml-parser-strip-whitespaces}

|            |                     |
| ---------- | ------------------- |
| Synopsis:  | strip-whitespaces() |
| Format:    | `yes` or `no`              |
| Default:   | no                  |
| Mandatory: | no                  |

*Description:* Strip the whitespaces from the XML text nodes before adding them to the message.


## Example: Using strip-whitespaces

```shell
   parser xml_parser {
        xml(
            template("$MSG")
            strip-whitespaces(yes)
        );
    };
```

From this XML input:

```shell
   <tag1> Tag </tag1>
```

The following output is generated:

```shell
   {"_xml":{"tag1":"Tag"}}
```



{{% include-headless "chunk/option-parser-template.md" %}}
