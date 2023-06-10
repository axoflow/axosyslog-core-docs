---
title: "Options of CSV parsers"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{% include-headless "chunk/topic-parser-csv-intro.md" %}}


## columns() {#parser-options}

|           |                                                  |
| --------- | ------------------------------------------------ |
| Synopsis: | columns("PARSER.COLUMN1", "PARSER.COLUMN2", ...) |

*Description:* Specifies the name of the columns to separate messages to. These names will be automatically available as macros. The values of these macros do not include the delimiters.



## delimiters() {#csv-parser-delimiter}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Synopsis:</td>
<td><p>delimiters(chars("&lt;delimiter_characters&gt;")) <em>or `delimiters("&lt;delimiter_characters&gt;")`</em></p>
<p>delimiters(strings("&lt;delimiter_string1&gt;", "&lt;delimiter_string2&gt;", ...)")</p>
<p>delimiters(chars("&lt;delimiter_characters&gt;"), strings("&lt;delimiter_string1&gt;"))</p></td>
</tr>
</tbody>
</table>

*Description:* The delimiter is the character or string that separates the columns in the message. If you specify multiple characters using the `delimiters(chars("\<delimiter_characters\>"))` option, every character will be treated as a delimiter. To separate the columns at the tabulator (tab character), specify `\\t`. For example, to separate the text at every hyphen (-) and colon (:) character, use `delimiters(chars("-:"))`, Note that the delimiters will not be included in the column values.


## String delimiters:

If you have to use a string as a delimiter, list your string delimiters in the `delimiters(strings("\<delimiter_string1\>", "\<delimiter_string2\>", ...)")` format.

By default, {{% param "product.abbrev" %}} uses space as a delimiter. If you want to use only the strings as delimiters, you have to disable the space delimiter, for example: `delimiters(chars(""), strings("\<delimiter_string\>"))`

Otherwise, {{% param "product.abbrev" %}} will use the string delimiters in addition to the default character delimiter, so `delimiters(strings("=="))` actually equals `delimiters(chars(" "), strings("=="))`, and not `delimiters(chars(""), strings("=="))`



## Multiple delimiters:

If you use more than one delimiter, note the following points:

  - {{% param "product.abbrev" %}} will split the message at the nearest possible delimiter. The order of the delimiters in the configuration file does not matter.

  - You can use both string delimiters and character delimiters in a parser.

  - The string delimiters can include characters that are also used as character delimiters.

  - If a string delimiter and a character delimiter both match at the same position of the message, {{% param "product.abbrev" %}} uses the string delimiter.




## dialect() {#csv-parser-dialect}

|           |                                                 |
| --------- | ----------------------------------------------- |
| Synopsis: | escape-none|escape-backslash|escape-double-char |

*Description:* Specifies how to handle escaping in the parsed message. The following values are available. Default value: `escape-none`

```c
   parser p_demo_parser {
        csv-parser(
            prefix(".csv.")
            delimiters(" ")
            dialect(escape-backslash)
            flags(strip-whitespace, greedy)
            columns("column1", "column2", "column3")
        );
    };
```



## flags() {#csv-parser-flags}

|           |                                                                                           |
| --------- | ----------------------------------------------------------------------------------------- |
| Synopsis: | drop-invalid, escape-none, escape-backslash, escape-double-char, greedy, strip-whitespace |

*Description:* Specifies various options for parsing the message. The following flags are available:

  - *drop-invalid*: When the `drop-invalid` option is set, the parser does not process messages that do not match the parser. For example, a message does not match the parser if it has less columns than specified in the parser, or it has more columns but the `greedy` flag is not enabled. Using the `drop-invalid` option practically turns the parser into a special filter, that matches messages that have the predefined number of columns (using the specified delimiters).
    
    {{% alert title="Note" color="info" %}}
Messages dropped as invalid can be processed by a `fallback` log path. For details on the `fallback` option, see {{% xref "/docs/chapter-routing-filters/logpath/reference-logflags/_index.md" %}}.
    {{% /alert %}}

  - *greedy*: The `greedy` option assigns the remainder of the message to the last column, regardless of the delimiter characters set. You can use this option to process messages where the number of columns varies.
    
    
    ## Example: Adding the end of the message to the last column {#example-parser-greedy}
    
    If the `greedy` option is enabled, the syslog-ng application adds the not-yet-parsed part of the message to the last column, ignoring any delimiter characters that may appear in this part of the message.
    
    For example, you receive the following comma-separated message: `example 1, example2, example3`, and you segment it with the following parser:
    
    ```c
        csv-parser(columns("COLUMN1", "COLUMN2", "COLUMN3") delimiters(","));
    ```
    
    The `COLUMN1`, `COLUMN2`, and `COLUMN3` variables will contain the strings `example1`, `example2`, and `example3`, respectively. If the message looks like `example 1, example2, example3, some more information`, then any text appearing after the third comma (that is, `some more information`) is not parsed, and possibly lost if you use only the variables to reconstruct the message (for example, to send it to different columns of an SQL table).
    
    Using the `greedy` flag will assign the remainder of the message to the last column, so that the `COLUMN1`, `COLUMN2`, and `COLUMN3` variables will contain the strings `example1`, `example2`, and `example3, some more information`.
    
    ```c
        csv-parser(columns("COLUMN1", "COLUMN2", "COLUMN3") delimiters(",") flags(greedy));
    ```
    

  - *strip-whitespace*: The `strip-whitespace` flag removes leading and trailing whitespaces from all columns.



## null() {#csv-parser-null}

|           |        |
| --------- | ------ |
| Synopsis: | string |

*Description:* If the value of a column is the value of the `null()` parameter, {{% param "product.abbrev" %}} changes the value of the column to an empty string. For example, if the columns of the message contain the "N/A" string to represent empty values, you can use the `null("N/A")` option to change these values to empty stings.


{{% include-headless "chunk/option-parser-prefix.md" %}}

{{% include-headless "chunk/no-default-prefix.md" %}}

```c
   parser {
        csv-parser(prefix("myprefix."));
    };
```


## quote-pairs() {#csv-parser-quote-pairs}

|           |                                 |
| --------- | ------------------------------- |
| Synopsis: | quote-pairs('\<quote_pairs\>') |

*Description:* List quote-pairs between single quotes. Delimiter characters or strings enclosed between quote characters are ignored. Note that the beginning and ending quote character does not have to be identical, for example, `[}` can also be a quote-pair. For an example of using `quote-pairs()` to parse Apache log files, see [Example: Parsing Apache log files]({{< relref "/docs/chapter-parsers/csv-parser/_index.md" >}}).



{{% include-headless "chunk/option-parser-template.md" %}}

For examples, see [Example: Segmenting hostnames separated with a dash]({{< relref "/docs/chapter-parsers/csv-parser/_index.md" >}}) and [Example: Segmenting a part of a message]({{< relref "/docs/chapter-parsers/csv-parser/_index.md" >}}).

