---
title: Filterx function reference
linkTitle: Functions
weight: 4800
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

<!-- Function reference, required arguments, options/flags, examples from tests, ... 
sok egyszeru pelda az adott functionnel, a tmp/axosyslog/tests/light/functional_tests/filterx/test_filterx.py temakorei sok mindent lefednek 
-->

## datetime

Cast a value into a datetime variable.

Usage: `datetime(<string or expression to cast as datetime>)`

For example:

```shell
date = datetime("1701350398.123000+01:00")
```
<!-- FIXME syntax for argument, timezone handling, etc. -->

## flatten

Usage: `flatten(dict, separator=".")`

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

Usage: `istype(object, type_str)`
<!-- FIXME include list of valid types -->

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

<!--     $MSG = json();
    $MSG.unnamed = regexp_search("foobarbaz", /(foo)(bar)(baz)/);
    $MSG.named = regexp_search("foobarbaz", /(?<first>foo)(?<second>bar)(?<third>baz)/);
    $MSG.mixed = regexp_search("foobarbaz", /(?<first>foo)(bar)(?<third>baz)/);
    $MSG.force_list = json_array(regexp_search("foobarbaz", /(?<first>foo)(bar)(?<third>baz)/));
    $MSG.force_dict = json(regexp_search("foobarbaz", /(foo)(bar)(baz)/));

    $MSG.no_match_unnamed = regexp_search("foobarbaz", /(almafa)/);
    if (len($MSG.no_match_unnamed) == 0) {
        $MSG.no_match_unnamed_handling = true;
    }; -->

## regexp_subst

<!-- 

#define FILTERX_FUNC_REGEXP_SUBST_FLAG_JIT_NAME "jit"
#define FILTERX_FUNC_REGEXP_SUBST_FLAG_GLOBAL_NAME "global"
#define FILTERX_FUNC_REGEXP_SUBST_FLAG_UTF8_NAME "utf8"
#define FILTERX_FUNC_REGEXP_SUBST_FLAG_IGNORECASE_NAME "ignorecase"
#define FILTERX_FUNC_REGEXP_SUBST_FLAG_NEWLINE_NAME "newline"
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

Usage: `strptime(time_str, format_str_1, ..., format_str_N)`

## unset

Deletes a variable, a name-value pair, or a key in a complex object (like JSON).

<!-- FIXME What happens when trying to unset a hard macro? Error? -->

See also {{% xref "/filterx/_index.md#delete-values" %}}.

## unset_empties

Usage: `unset_empties(object, recursive=true)`

Also unsets inner dicts' and lists' values is recursive is set.

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
