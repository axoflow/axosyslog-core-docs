---
title: "Options of the XML parsers"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The XML parser has the following options.


## drop-invalid {#xml-parser-drop-invalid}

|            |                |
| ---------- | -------------- |
| Synopsis:  | drop-invalid() |
| Format:    | yes|no         |
| Default:   | no             |
| Mandatory: | no             |

*Description:* If set, messages with an invalid XML will be dropped entirely.



## exclude-tags {#xml-parser-exclude-tags}

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

```c
   parser xml_parser {
        xml(
            template("$MSG")
            exclude-tags("tag1", "tag2", "inner*")
        );
    };
```

From this XML input:

```c
   <tag1>Text1</tag1><tag2>Text2</tag2><tag3>Text3<innertag>TextInner</innertag></tag3>

```

The following output is generated:

```c
   {"_xml":{"tag3":"Text3"}}

```




{{% include-headless "chunk/option-parser-prefix.md" %}}

The `prefix()` option is optional and its default value is `".xml"`.



## strip-whitespaces {#xml-parser-strip-whitespaces}

|            |                     |
| ---------- | ------------------- |
| Synopsis:  | strip-whitespaces() |
| Format:    | yes|no              |
| Default:   | no                  |
| Mandatory: | no                  |

*Description:* Strip the whitespaces from the XML text nodes before adding them to the message.


## Example: Using strip-whitespaces

```c
   parser xml_parser {
        xml(
            template("$MSG")
            strip-whitespaces(yes)
        );
    };
```

From this XML input:

```c
   <tag1> Tag </tag1>

```

The following output is generated:

```c
   {"_xml":{"tag1":"Tag"}}

```



{{% include-headless "chunk/option-parser-template.md" %}}
