---
title: Filterx function reference
linkTitle: Functions
weight: 4800
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

<!-- Function reference, required arguments, options/flags, examples from tests, ... 
sok egyszeru pelda az adott functionnel, a tmp/axosyslog/tests/light/functional_tests/filterx/test_filterx.py temakorei sok mindent lefednek 
-->

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

## istype

Usage: `istype(object, type_str)`
<!-- FIXME include list of valid types -->

## len

Usage: `len(object)`

<!-- FIXME mire van ertelmezve es mikor mit ad vissza? -->

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

## regexp_subst

<!-- 

#define FILTERX_FUNC_REGEXP_SUBST_FLAG_JIT_NAME "jit"
#define FILTERX_FUNC_REGEXP_SUBST_FLAG_GLOBAL_NAME "global"
#define FILTERX_FUNC_REGEXP_SUBST_FLAG_UTF8_NAME "utf8"
#define FILTERX_FUNC_REGEXP_SUBST_FLAG_IGNORECASE_NAME "ignorecase"
#define FILTERX_FUNC_REGEXP_SUBST_FLAG_NEWLINE_NAME "newline"
 -->

## strptime

Usage: `strptime(time_str, format_str_1, ..., format_str_N)`

## unset_empties

Usage: `unset_empties(object, recursive=true)`

Also unsets inner dicts' and lists' values is recursive is set.