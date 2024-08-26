---
title: Filterx function reference
linkTitle: Functions
weight: 4800
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## cache_json_file

Load the contents of an external JSON file in an efficient manner. You can use this to lookup contextual information. (Basically, this is a filterx-specific implementation of the [`add-contextual-data() functionality`]({{< relref "/chapter-enrich-data/data-enrichment-add-contextual-data/_index.md" >}}).)

Usage: `cache_json_file("/path/to/file.json")`

For example, if your `context-info-db.json` file contains the following:

```shell
{
  "nginx": "web",
  "httpd": "web",
  "apache": "web",
  "mysql": "db",
  "postgresql": "db"
}
```

Then the following filterx expression selects only "web" traffic:

```shell
filterx {
  declare known_apps = cache_json_file("/context-info-db.json");
  $app = known_apps[$PROGRAM] ?? "unknown";
  $app == "web";  # drop everything that's not a web server log
}
```

{{% alert title="Note" color="info" %}}
{{< product >}} reloads the contents of the JSON file only when the {{< product >}} configuration is reloaded.
{{% /alert %}}

## datetime

Cast a value into a datetime variable.

Usage: `datetime(<string or expression to cast as datetime>)`

For example:

```shell
date = datetime("1701350398.123000+01:00")
```
<!-- FIXME syntax for argument, timezone handling, etc. -->

## flatten

Flattens the nested elements of an object using the specified separator, similarly to the [`format-flat-json()` template function]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md#template-function-format-flat-json" >}}). For example, you can use it to flatten nested JSON objects in the output if the receiving application cannot handle nested JSON objects.

Usage: `flatten(dict, separator=".")`

You can use multi-character separators, for example, `=>`. If you omit the separator, the default dot (`.`) separator is used.

```shell
sample-dict = json({"a": {"b": {"c": "1"}}});
${MESSAGE} = flatten(sample-dict);
```

The value of `${MESSAGE}` will be: `{"a.b.c": "1"}`

## format_csv
<!-- 
#define FILTERX_FUNC_FORMAT_CSV_USAGE "Usage: format_csv({list or dict}, [" \
  FILTERX_FUNC_FORMAT_CSV_ARG_NAME_COLUMNS"={list}," \
  FILTERX_FUNC_FORMAT_CSV_ARG_NAME_DELIMITER"={string literal}," \
  FILTERX_FUNC_FORMAT_CSV_ARG_NAME_DEFAULT_VALUE"={string literal}])" 
  #define FILTERX_FUNC_FORMAT_CSV_ARG_NAME_COLUMNS "columns"
#define FILTERX_FUNC_FORMAT_CSV_ARG_NAME_DELIMITER "delimiter"
#define FILTERX_FUNC_FORMAT_CSV_ARG_NAME_DEFAULT_VALUE "default_value"

  input must be a dict or list

  delimiter must be a string literal, and a single character

  default_value must be a string literal.

  -->

## format_kv

Usage: `format_kv(kvs_dict, value_separator="=", pair_separator=", ")`

<!-- kvs_dict must be a dict 
value_separator must be a string literal, and a single character
pair_separator must be a string literal
-->

## isodate

<!-- FIXME -->

## isset

Returns true if the argument exists and its value is not empty or null.

Usage: `isset(<name of a variable, macro, or name-value pair>)`

## istype

Returns true if the object (first argument) has the specified type (second argument). The type must be a quoted string.

Usage: `istype(object, "type_str")`

For example:

```shell
istype({"key": "value"}, "json_object"); # True
istype(${PID}, "string");
istype(my-local-json-object.mylist, "json_array")
```
<!-- FIXME include list of valid types -->

<!-- FIXME what happens if the object doesn't exist? -->

<!-- istype($olr.body, "otel_kvlist");
istype(otel_kvl.js_arr, "otel_array");
 -->

## json, json_object {#json}

Cast a value into a JSON object.

Usage: `json(<string or expression to cast as json>)`

For example:

```shell
js = json_object({"key": "value"})
```

## json_array {#json-array}

Cast a value into a JSON array.

Usage: `json_array(<string or expression to cast as json array>)`

For example:

```shell
list = json_array(["first_element", "second_element", "third_element"]);
```

## len

Returns the number of items in an object. For example, the length of a string, or the number of elements in a list.

Usage: `len(object)`

<!-- FIXME What does it return for different types? -->

## lower

Converts a string into lowercase characters.

Usage: `lower(string)`

<!-- FIXME Does it work for other types? For example, list? -->

## parse_csv

<!-- 

#define FILTERX_FUNC_PARSE_CSV_ARG_NAME_COLUMNS "columns"
#define FILTERX_FUNC_PARSE_CSV_ARG_NAME_DELIMITER "delimiter"
#define FILTERX_FUNC_PARSE_CSV_ARG_NAME_STRING_DELIMITERS "string_delimiters"
#define FILTERX_FUNC_PARSE_CSV_ARG_NAME_DIALECT "dialect"
#define FILTERX_FUNC_PARSE_CSV_ARG_NAME_STRIP_WHITESPACE "strip_whitespace"
#define FILTERX_FUNC_PARSE_CSV_ARG_NAME_STRIP_WHITESPACES "strip_whitespaces"
#define FILTERX_FUNC_PARSE_CSV_ARG_NAME_GREEDY "greedy"
#define FILTERX_FUNC_PARSE_CSV_USAGE "Usage: parse_csv(msg_str [" \
    FILTERX_FUNC_PARSE_CSV_ARG_NAME_COLUMNS"=json_array, " \
    FILTERX_FUNC_PARSE_CSV_ARG_NAME_DELIMITER"=string, " \
    FILTERX_FUNC_PARSE_CSV_ARG_NAME_STRING_DELIMITERS"=json_array, " \
    FILTERX_FUNC_PARSE_CSV_ARG_NAME_DIALECT"=string, " \
    FILTERX_FUNC_PARSE_CSV_ARG_NAME_STRIP_WHITESPACE"=boolean, " \
    FILTERX_FUNC_PARSE_CSV_ARG_NAME_GREEDY"=boolean])"
#define FILTERX_FUNC_PARSE_ERR_EMPTY_DELIMITER "Either '" \
    FILTERX_FUNC_PARSE_CSV_ARG_NAME_DELIMITER"' or '" \
    FILTERX_FUNC_PARSE_CSV_ARG_NAME_STRING_DELIMITERS"' must be set, and '" \
    FILTERX_FUNC_PARSE_CSV_ARG_NAME_DELIMITER"' cannot be empty if '" \
    FILTERX_FUNC_PARSE_CSV_ARG_NAME_STRING_DELIMITERS"' is unset"

    /Users/feketer/work/axosyslog-core-docs/tmp/axosyslog/modules/csvparser/tests/test_filterx_func_format_csv.c
    for escaping examples

FILTERX_FUNC_PARSE_CSV_ARG_NAME_DIALECT " argument must be one of: [" \
                      "escape-none, " \
                      "escape-backslash, " \
                      "escape-backslash-with-sequences, " \
                      "escape-double-char]";
                       -->

## parse_kv

Separate a string consisting of whitespace or comma-separated `key=value` pairs (for example, WELF-formatted messages).

Usage: `parse_kv(msg, value_separator="=", pair_separator=", ", stray_words_key="stray_words")`

The `value_separator` must be a single-character string. The `pair_separator` must be a string.

For details, see {{% xref "/filterx/filterx-parsing/key-value-parser/_index.md" %}}.

## regexp_search {#regexp-search}

Searches a string and returns the matches of a regular expression as a list or a dictionary. If there are no matches, the list or dictionary is empty.

Usage: `regexp_search("<string-to-search>", <regular-expression>)`

For example:

```shell
# ${MESSAGE} = "ERROR: Sample error message string"
my-variable = regexp_search(${MESSAGE}, "ERROR");
```

You can also use unnamed match groups (`()`) and named match groups (`(?<first>ERROR)(?<second>message)`).

{{< include-headless "chunk/filterx-regexp-notes.md" >}}

### Unnamed match groups

```shell
$MY-LIST = json(); # Creates an empty JSON object
$MY-LIST.unnamed = regexp_search("first-word second-part third", /(first-word)(second-part)(third)/);
```

`$MY-LIST.unnamed` is a list containing: `["first-word second-part third", "first-word", "second-part", "third"],`

### Named match groups

```shell
$MY-LIST = json(); # Creates an empty JSON object
$MY-LIST.named = regexp_search("first-word second-part third", /(?<one>first-word)(?<two>second-part)(?<three>third)/);
```

`$MY-LIST.named` is a dictionary with the names of the match groups as keys, and the corresponding matches as values: `{"0": "first-word second-part third", "one": "first-word", "two": "second-part", "three": "third"},`

### Mixed match groups

If you use mixed (some named, some unnamed) groups, the output is a dictionary, where {{< product >}} automatically assigns a key to the unnamed groups. For example:

```shell
$MY-LIST = json(); # Creates an empty JSON object
$MY-LIST.mixed = regexp_search("first-word second-part third", /(?<one>first-word)(second-part)(?<three>third)/);
```

`$MY-LIST.mixed` is: `{"0": "first-word second-part third", "first": "first-word", "2": "second-part", "three": "third"},`

<!-- 

{
  "msg": {
    "0": "<13>1 2024-08-13T08:00:01+00:00 app-server-nginx nginx - - [meta sequenceId=\"31\"] 109.20.50.187 - - [13/Aug/2024:08:00:01 +0000] \"PUT /index.html HTTP/1.1\" 200 23061 \"-\" \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36\" \"-\"",
    "appname": "nginx",
    "fullyear": "2024",
    "hostname": "app-server-nginx",
    "hour": "08",
    "mday": "13",
    "minute": "00",
    "month": "08",
    "msg": "109.20.50.187 - - [13/Aug/2024:08:00:01 +0000] \"PUT /index.html HTTP/1.1\" 200 23061 \"-\" \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36\" \"-\"",
    "msgid": "-",
    "numoffset": "+00:00",
    "priority": "13",
    "procid": "-",
    "secfrac": "",
    "second": "01",
    "structureddata": "[meta sequenceId=\"31\"]",
    "timestamp": "2024-08-13T08:00:01+00:00",
    "version": "1",
    "nginx": {
      "0": "109.20.50.187 - - [13/Aug/2024:08:00:01 +0000] \"PUT /index.html HTTP/1.1\" 200 23061 \"-\" \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36\" \"-\"",
      "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36",
      "code": "200",
      "host": "-",
      "http_x_forwarded_for": "\"-\"",
      "method": "PUT",
      "path": "/index.html",
      "referer": "-",
      "remote": "109.20.50.187",
      "size": "23061",
      "time": "13/Aug/2024:08:00:01 +0000",
      "user": "-"
    }
  }
}
 -->

## regexp_subst {#regexp-subst}

Rewrites a string using regular expressions. This function implements the [`subst` rewrite rule functionality]({{< relref "/chapter-manipulating-messages/modifying-messages/rewrite-replace/_index.md" >}}).

Usage: `regexp_subst(<input-string>, <pattern-to-find>, <replacement>, flags`

The following example replaces the first `IP` in the text of the message with the `IP-Address` string.

```shell
regexp_subst(${MESSAGE}, "IP", "IP-Address");
```

To replace every occurrence, use the `global=true` flag:

```shell
regexp_subst(${MESSAGE}, "IP", "IP-Address", global=true);
```

{{< include-headless "chunk/filterx-regexp-notes.md" >}}

For a case sensitive search, use the `ignorecase=true` flag.

### Flags

You can use the following flags with the `regexp_subst` function:

- `global=true`:

    Replace every occurrence of the search string.

- `ignorecase=true`:

    Do case insensitive search.

- `jit=true`:

    Enable [just-in-time compilation function for PCRE regular expressions](https://www.pcre.org/current/doc/html/pcre2jit.html).

- `newline=true`: {{< include-headless "chunk/regex-flag-newline.md" >}}

- `utf8=true`: {{< include-headless "chunk/regex-flag-utf8.md" >}}

## string

Cast a value into a string.

Usage: `string(<string or expression to cast>)`

For example:

```shell
myvariable = string(${LEVEL_NUM});
```

Sometimes you have to explicitly cast values to strings, for example, when you want to concatenate them into a message using the `+` operator.

## strptime

Creates a `datetime` object from a string, similarly to the [`date-parser()`]({{< relref "/chapter-parsers/date-parser/_index.md" >}}). The first argument is the string containing the date. The second argument is a format string that specifies how to parse the date string. Optionally, you can specify additional format strings that are applied in order if the previous one doesn't match the date string.

Usage: `strptime(time_str, format_str_1, ..., format_str_N)`

For example:

```shell
${MESSAGE} = strptime("2024-04-10T08:09:10Z", "%Y-%m-%dT%H:%M:%S%z");
```
<!-- 
FIXME what happens if none of the format strings match?
-->

You can use the following elements in the format string:

{{< include-headless "chunk/date-string-format.md" >}}

## unset

Deletes a variable, a name-value pair, or a key in a complex object (like JSON).

{{< include-headless "chunk/filterx-unset-hard-macros.md" >}}

See also {{% xref "/filterx/_index.md#delete-values" %}}.

## unset_empties {#unset-empties}

Deletes ([unsets](#unset)) the empty fields of an object, for example, a JSON object or list. Use the `recursive=true` parameter to delete empty values of inner dicts' and lists' values.

Usage: `unset_empties(object, recursive=true)`

<!-- FIXME add a before/after example, for recursive and non-recursive cases 

            dict = json({"foo": "", "bar": "-", "baz": "N/A", "almafa": null, "kortefa": {"a":{"s":{"d":{}}}}, "szilvafa": [[[]]]});
            defaults_dict = dict;
            explicit_dict = dict;
            unset_empties(defaults_dict);
            unset_empties(explicit_dict, recursive=true);

            list = json_array(["", "-", "N/A", null, {"a":{"s":{"d":{}}}}, [[[]]]]);
            defaults_list = list;
            explicit_list = list;
            unset_empties(defaults_list);
            unset_empties(explicit_list, recursive=true);

            $MSG = json_array([defaults_dict, explicit_dict, defaults_list, explicit_list]);
    """,
    )
    syslog_ng.start(config)

    assert file_true.get_stats()["processed"] == 1
    assert "processed" not in file_false.get_stats()
    assert file_true.read_log() == "[{},{},[],[]]\n"

-->

## upper

Converts a string into uppercase characters.

Usage: `upper(string)`

<!-- FIXME Does it work for other types? For example, list? -->

## vars

Returns the variables (including pipeline variables and name-value pairs) defined in the filterx block as a JSON object.

For example:

```shell
filterx {
  $logmsg_variable = "foo";
  local_variable = "bar";
  declare pipeline_level_variable = "baz";
  ${MESSAGE} = vars();
};
```

The value of `${MESSAGE}` will be: `{"logmsg_variable":"foo","pipeline_level_variable":"baz"}`
