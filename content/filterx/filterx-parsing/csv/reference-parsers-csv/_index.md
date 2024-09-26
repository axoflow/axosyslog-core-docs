---
title: "Options of CSV parsers"
weight:  100
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The `parse_csv` FilterX function has the following options.

## columns

|           |                                                  |
| --------- | ------------------------------------------------ |
| Synopsis: | `columns=["1st","2nd","3rd"]` |
| Default value: | N/A |

*Description:* Specifies the names of the columns in a JSON array.

- If the `columns` option is set, `parse_csv` returns a dictionary with the column names (as keys) and the parsed values.
- If the [`columns`]({{< relref "/filterx/filterx-parsing/csv/reference-parsers-csv/_index.md#columns" >}}) option isn't set, `parse_csv` returns a list.

## delimiter

|           |                                                  |
| --------- | ------------------------------------------------ |
| Synopsis: | `delimiter="<string-with-delimiter-characters>"` |
| Default value: | `,` |

*Description:* The delimiter is the character that separates the columns in the input string. If you specify multiple characters, every character will be treated as a delimiter. Note that the delimiters aren't included in the column values. For example:

- To separate the text at every hyphen (-) and colon (:) character, use `delimiter="-:"`.
- To separate the columns at the tabulator (tab character), specify `delimiter="\\t"`.
- To use strings instead of characters as delimiters, see [`string_delimiters`](#string-delimiters).

{{< include-headless "chunk/csv-parser-multiple-delimiters.md" >}}

## dialect

|           |                                                 |
| --------- | ----------------------------------------------- |
| Synopsis: | `dialect="<dialect-name>"` |
| Default value: | `escape-none` |

*Description:* Specifies how to handle escaping in the parsed strings.

The following values are available.

{{< include-headless "chunk/option-csv-parser-dialect-escaping.md" >}}

## greedy

|           |                                                                                           |
| --------- | ----------------------------------------------------------------------------------------- |
| Synopsis: | `greedy=true` |
| Default value: | `false` |

If the `greedy` option is enabled, {{% param "product.name" %}} adds the not-yet-parsed part of the message to the last column, ignoring any delimiters that may appear in this part of the message. You can use this option to process messages where the number of columns varies.

For example, you receive the following comma-separated message: `example 1, example2, example3`, and you segment it with the following parser:

```shell
my-parsed-values = parse_csv(${MESSAGE}, columns=["COLUMN1", "COLUMN2", "COLUMN3"], delimiter=",");
```

The `COLUMN1`, `COLUMN2`, and `COLUMN3` variables will contain the strings `example1`, `example2`, and `example3`, respectively. If the message looks like `example 1, example2, example3, some more information`, then any text appearing after the third comma (that is, `some more information`) is not parsed, and possibly lost if you use only the parsed columns to reconstruct the message (for example, if you send the columns to different columns of an database).

Using the `greedy=true` flag will assign the remainder of the message to the last column, so that the `COLUMN1`, `COLUMN2`, and `COLUMN3` variables will contain the strings `example1`, `example2`, and `example3, some more information`.

```shell
my-parsed-values = parse_csv(${MESSAGE}, columns=["COLUMN1", "COLUMN2", "COLUMN3"], delimiters=[","], greedy=true);
```

## strip_whitespace {#strip-whitespace}

|           |                                                                                           |
| --------- | ----------------------------------------------------------------------------------------- |
| Synopsis: | `strip_whitespace=true` |
| Default value: | `false` |

*Description:* Remove leading and trailing whitespaces from all columns. The `strip_whitespaces` option is an alias for `strip_whitespace`.

## string_delimiters {#string-delimiters}

|           |                                                  |
| --------- | ------------------------------------------------ |
| Synopsis: | `string_delimiters=json_array(["first-string","2nd-string"])` |

*Description:* If you have to use a string as a delimiter, list your string delimiters as a JSON array in the `string_delimiters=["<delimiter_string1>", "<delimiter_string2>", ...]` option.

By default, the `parse_csv` FilterX function uses the comma as a delimiter. If you want to use only strings as delimiters, you have to disable the space delimiter, for example: `delimiter="", string_delimiters=["<delimiter_string>"])`

Otherwise, {{% param "product.abbrev" %}} will use the string delimiters in addition to the default character delimiter, so `string_delimiters=["=="]` actually equals `delimiters=",", string_delimiters=["=="]`, and not `delimiters="", string_delimiters=["=="]`

{{< include-headless "chunk/csv-parser-multiple-delimiters.md" >}}
