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

Usage: `parse_kv(msg, value_separator="=", pair_separator=", ", stray_words_key="stray_words")`

key-value format (such as WELF) support

<!--
value_separator must be a string literal, and a single character
pair_separator must be a string literal
-->

## regexp_search

Searches a string and returns the matches of a regular expression.

Usage: `regexp_search("<string-to-search>", <regular-expression>)`

For example:

```shell
# ${MESSAGE} = "ERROR: Sample error message string"
my-variable = regexp_search(${MESSAGE}, "ERROR");
```

You can also use unnamed match groups (`()`) and named match groups (`(?<first>ERROR)(?<second>message)`).

Note that like the `awk` tool, {{< product >}} always returns the first argument as the 0. capturing group.
<!-- FIXME example and how to unset $0 -->

<!--     
    $MSG = json();
    $MSG.unnamed = regexp_search("foobarbaz", /(foo)(bar)(baz)/);
    $MSG.named = regexp_search("foobarbaz", /(?<first>foo)(?<second>bar)(?<third>baz)/);
    $MSG.mixed = regexp_search("foobarbaz", /(?<first>foo)(bar)(?<third>baz)/);
    $MSG.force_list = json_array(regexp_search("foobarbaz", /(?<first>foo)(bar)(?<third>baz)/));
    $MSG.force_dict = json(regexp_search("foobarbaz", /(foo)(bar)(baz)/));

    $MSG.no_match_unnamed = regexp_search("foobarbaz", /(almafa)/);
    if (len($MSG.no_match_unnamed) == 0) {
        $MSG.no_match_unnamed_handling = true;
    }; -->

<!-- FIXME link to slashtrings and similar -->
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

## regexp_subst

<!-- 

#define FILTERX_FUNC_REGEXP_SUBST_FLAG_JIT_NAME "jit"
#define FILTERX_FUNC_REGEXP_SUBST_FLAG_GLOBAL_NAME "global"
#define FILTERX_FUNC_REGEXP_SUBST_FLAG_UTF8_NAME "utf8"
#define FILTERX_FUNC_REGEXP_SUBST_FLAG_IGNORECASE_NAME "ignorecase"
#define FILTERX_FUNC_REGEXP_SUBST_FLAG_NEWLINE_NAME "newline"


$MSG = json();
$MSG.single = regexp_subst("foobarbaz","o","");
$MSG.empty_string = regexp_subst("","a","!");
$MSG.empty_pattern = regexp_subst("foobarbaz","","!");
$MSG.zero_length_match = regexp_subst("foobarbaz","u*","!");
$MSG.orgrp = regexp_subst("foobarbaz", "(fo|az)", "!");
$MSG.single_global = regexp_subst("foobarbaz","o","", global=true);
$MSG.empty_string_global = regexp_subst("","a","!", global=true);
$MSG.empty_pattern_global = regexp_subst("foobarbaz","","!", global=true);
$MSG.zero_length_match_global = regexp_subst("foobarbaz","u*","!", global=true);
$MSG.orgrp_global = regexp_subst("foobarbaz", "(fo|az)", "!", global=true);
$MSG.ignore_case_control = regexp_subst("FoObArBaz", "(o|a)", "!", global=true);
$MSG.ignore_case = regexp_subst("FoObArBaz", "(o|a)", "!", ignorecase=true, global=true);
    """,
    )
    syslog_ng.start(config)

    assert file_true.get_stats()["processed"] == 1
    assert "processed" not in file_false.get_stats()
    exp = (
        r"""{"single":"fobarbaz","""
        r""""empty_string":"","""
        r""""empty_pattern":"!foobarbaz!","""
        r""""zero_length_match":"!foobarbaz!","""
        r""""orgrp":"!obarbaz","""
        r""""single_global":"fbarbaz","""
        r""""empty_string_global":"","""
        r""""empty_pattern_global":"!f!o!o!b!a!r!b!a!z!","""
        r""""zero_length_match_global":"!f!o!o!b!a!r!b!a!z!","""
        r""""orgrp_global":"!obarb!","""
        r""""ignore_case_control":"F!ObArB!z","""
        r""""ignore_case":"F!!b!rB!z"}""" + "\n"
 -->

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
${MESSSAGE} = strptime("2024-04-10T08:09:10Z", "%Y-%m-%dT%H:%M:%S%z");
```
<!-- 
FIXME what happens if none of the format strings match?
-->

You can use the following elements in the format string:

{{< include-headless "chunk/date-string-format.md" >}}

## unset

Deletes a variable, a name-value pair, or a key in a complex object (like JSON).

<!-- FIXME What happens when trying to unset a hard macro? Error? -->

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
