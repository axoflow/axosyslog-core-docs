---
title: FilterX function reference
linkTitle: Functions
weight: 2500
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{< include-headless "chunk/filterx-experimental-banner.md" >}}

This page describes the functions you can use in [FilterX blocks]({{< relref "/filterx/_index.md" >}}).

Functions have arguments that can be either mandatory or optional.

- Mandatory options are always positional, so you need to pass them in the correct order. You cannot set them in the `arg=value` format.
- Optional arguments are always named, like `arg=value`. You can pass optional arguments in any order.

## cache_json_file {#cache-json-file}

Load the contents of an external JSON file in an efficient manner. You can use this function to lookup contextual information. (Basically, this is a FilterX-specific implementation of the [`add-contextual-data() functionality`]({{< relref "/chapter-enrich-data/data-enrichment-add-contextual-data/_index.md" >}}).)

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

Then the following FilterX expression selects only "web" traffic:

```shell
filterx {
  declare known_apps = cache_json_file("/context-info-db.json");
  ${app} = known_apps[${PROGRAM}] ?? "unknown";
  ${app} == "web";  # drop everything that's not a web server log
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
date = datetime("1701350398.123000+01:00");
```

Usually, you use the [strptime](#strptime) FilterX function to create datetime values. Alternatively, you can cast an integer, double, string, or isodate variable into datetime with the `datetime()` FilterX function. Note that:

- When casting from an integer, the integer is the number of microseconds elapsed since the UNIX epoch (00:00:00 UTC on 1 January 1970).
- When casting from a double, the double is the number of seconds elapsed since the UNIX epoch (00:00:00 UTC on 1 January 1970). (The part before the floating points is the seconds, the part after the floating point is the microseconds.)
- When casting from a string, the string (for example, `1701350398.123000+01:00`) is interpreted as: `<the number of seconds elapsed since the UNIX epoch>.<microseconds>+<timezone relative to UTC (GMT +00:00)>`

## endswith

Available in {{< product >}} 4.9 and later.

Returns true if the input string ends with the specified substring. By default, matches are case sensitive. Usage:

```shell
endswith(input-string, substring);
endswith(input-string, [substring_1, substring_2], ignorecase=true);
```

For details, see {{% xref "/filterx/filterx-string-search/_index.md" %}}.

## flatten

Flattens the nested elements of an object using the specified separator, similarly to the [`format-flat-json()` template function]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md#template-function-format-flat-json" >}}). For example, you can use it to flatten nested JSON objects in the output if the receiving application cannot handle nested JSON objects.

Usage: `flatten(dict_or_list, separator=".")`

You can use multi-character separators, for example, `=>`. If you omit the separator, the default dot (`.`) separator is used.

```shell
sample-dict = json({"a": {"b": {"c": "1"}}});
${MESSAGE} = flatten(sample-dict);
```

The value of `${MESSAGE}` will be: `{"a.b.c": "1"}`

## format_csv {#format-csv}

Formats a dictionary or a list into a comma-separated string.

Usage: `format_csv(<input-list-or-dict>, columns=<json-list>, delimiter=<delimiter-character>, default_value=<string>)`

Only the input is mandatory, other arguments are optional. Note that the delimiter must be a single character.

By default, the delimiter is the comma (`delimiter=","`), the `columns` and `default_value` are empty.

If the `columns` option is set, {{< product >}} checks that the number of fields or entries in the input data matches the number of columns. If there are fewer items, it adds the `default_value` to the missing entries.

## format_kv {#format-kv}

Formats a dictionary into a string containing key=value pairs.

Usage: `format_kv(kvs_dict, value_separator="<separator-character>", pair_separator="<separator-string>")`

By default, `format_kv` uses `=` to separate values, and `, ` (comma and space) to separate the pairs:

```shell
filterx {
    ${MESSAGE} = format_kv(<input-dictionary>);
};
```

The `value_separator` option must be a single character, the `pair_separator` can be a string. For example, to use the colon (:) as the value separator and the semicolon (;) as the pair separator, use:

```shell
format_kv(<input-dictionary>, value_separator=":", pair_separator=";")
```

## format_json {#format-json}

Formats any value into a raw JSON string.

Usage: `format_json($data)`

## get_sdata

See {{% xref "/filterx/filterx-sdata/_index.md" %}}.

## has_sdata

See {{% xref "/filterx/filterx-sdata/_index.md" %}}.

## includes

Available in {{< product >}} 4.9 and later.

Returns true if the input string contains the specified substring. By default, matches are case sensitive. Usage:

```shell
includes(input-string, substring);
includes(input-string, [substring_1, substring_2], ignorecase=true);
```

For details, see {{% xref "/filterx/filterx-string-search/_index.md" %}}.

## isodate

Parses a string as a date in ISODATE format: `%Y-%m-%dT%H:%M:%S%z`

## is_sdata_from_enterprise()

See {{% xref "/filterx/filterx-sdata/_index.md" %}}.

## isset

Returns true if the argument exists and its value is not empty or null.

Usage: `isset(<name of a variable, macro, or name-value pair>)`

If you want to assign a value to a variable if it's not set, use the [`=??` operator]({{< relref "/filterx/operator-reference.md#assign-non-null" >}}).

## istype

Returns true if the object (first argument) has the specified type (second argument). The type must be a quoted string. (See [List of type names]({{< relref "/filterx/_index.md#variable-types" >}}).)

Usage: `istype(object, "type_str")`

For example:

```shell
obj = json();
istype(obj, "json_object"); # True

istype(${PID}, "string");
istype(my-local-json-object.mylist, "json_array");
```

If the object doesn't exist, `istype()` returns with an error, causing the FilterX statement to become false, and logs an error message to the `internal()` source of {{< product >}}.

## json {#json}

Cast a value into a JSON object.

Usage: `json(<string or expression to cast to json>)`

For example:

```shell
js_dict = json({"key": "value"});
```

Starting with version 4.9, you can use `{}` without the `json()` keyword as well. For example, the following creates an empty JSON object:

```shell
js_dict = {};
```

## json_array {#json-array}

Cast a value into a JSON array.

Usage: `json_array(<string or expression to cast to json array>)`

For example:

```shell
js_list = json_array(["first_element", "second_element", "third_element"]);
```

Starting with version 4.9, you can use `[]` without the `json_array()` keyword as well. For example, the following creates an empty JSON list:

```shell
js_dict = [];
```

## keys

Returns the top-level keys of a dictionary. This provides a simple way to inspect or iterate over the immediate keys without traversing the structure. The `keys()` function:

- Returns a list of dictionary keys as an array.
- Includes only the top-level keys, ignoring nested structures.
- The resulting array supports immediate indexing for quick key retrieval.
- When called on an empty dictionary, `keys` returns an empty dictionary (`[]`).

For example:

```shell
dict = {"level1-key1":{"level2-key1":{"level3-key1":"value1"}},"level1-key2":{"level2-key2":{"level3-key2":"value2"}}};

# accessing the top level, returns: ["level1-key1", "level1-key2"]
a = keys(dict);

# accessing nested levels directly, returns: ["level2-key1"]
b = keys(dict["level1-key1"]);

# directly index the result of keys() to access specific keys is possible, returns: ["level1-key1"])
c = keys(dict)[0];
```

## len

Returns the number of items in an object as an integer: the length (number of characters) of a string, the number of elements in a list, or the number of keys in an object.

Usage: `len(object)`

## load_vars {#load-vars}

Loads variables from a dict. It's the inverse of [`vars()`](#vars). It loads and declares FilterX-level variables. If a key in the dict begins with the `$` character, it's loaded as an {{< product >}} macro. This function can be used to transfer several variables between FilterX blocks, without having to declare them all as pipeline variables.

## lower

Converts all characters of a string lowercase characters.

Usage: `lower(string)`

## otel_array {#otel-array}

Creates a [dictionary]({{< relref "/filterx/_index.md#json" >}}) represented as an OpenTelemetry array.

## otel_kvlist {#otel-kvlist}

Creates a [dictionary]({{< relref "/filterx/_index.md#json" >}}) represented as an OpenTelemetry key-value list.

## otel_logrecord {#otel-logrecord}

Creates an [OpenTelemetry log record object]({{< relref "/filterx/filterx-otel/_index.md#otel-logrecord-reference" >}}).

## otel_resource {#otel-resource}

Creates an [OpenTelemetry resource object]({{< relref "/filterx/filterx-otel/_index.md#otel-resource-reference" >}}).

## otel_scope {#otel-scope}

Creates an [OpenTelemetry scope object]({{< relref "/filterx/filterx-otel/_index.md#otel-scope-reference" >}}).

## parse_csv {#parse-csv}

Split a comma-separated or similar string.

Usage: `parse_csv(msg_str [columns=json_array, delimiter=string, string_delimiters=json_array, dialect=string, strip_whitespace=boolean, greedy=boolean])`

For details, see {{% xref "/filterx/filterx-parsing/csv/_index.md" %}}.

## parse_kv {#parse-kv}

Split a string consisting of whitespace or comma-separated `key=value` pairs (for example, WELF-formatted messages).

Usage: `parse_kv(msg, value_separator="=", pair_separator=", ", stray_words_key="stray_words")`

The `value_separator` must be a single character. The `pair_separator` can consist of multiple characters.

For details, see {{% xref "/filterx/filterx-parsing/key-value-parser/_index.md" %}}.

## parse_leef {#parse-leef}

Parse a LEEF-formatted string.

Usage: `parse_leef(msg)`

For details, see {{% xref "/filterx/filterx-parsing/leef/_index.md" %}}.

## parse_xml {#parse-xml}

Parse an XML object into a JSON object.

Usage: `parse_xml(msg)`

For details, see {{< relref "/filterx/filterx-parsing/xml/_index.md" >}}

## parse_windows_eventlog_xml {#parse-windows}

Parses a Windows Event Log XML object into a JSON object.

Usage: `parse_xml(msg)`

For details, see {{< relref "/filterx/filterx-parsing/xml/_index.md" >}}

## regexp_search {#regexp-search}

Searches a string and returns the matches of a regular expression as a list or a dictionary. If there are no matches, the result is empty.

{{% alert title="Note" color="info" %}}

- In version 4.9 and earlier, `regexp_search` returned a `dict` or `list` depending on whether named match groups were used in the expression. Starting with version 4.10, `dict` is returned by default. For details, see [`list_mode`](#regexp-search-flags).
- Match group zero is now excluded by default unless it's the only match group. To always include the zero match group in the results, use the [`keep_zero=true`](#regexp-search-flags) flag.

{{% /alert %}}

Usage: `regexp_search("<string-to-search>", <regular-expression>, <optional-flags=flag_value>)`

For example:

```shell
# ${MESSAGE} = "ERROR: Sample error message string"
my-variable = regexp_search(${MESSAGE}, "ERROR");
```

You can also use unnamed match groups (`()`) and named match groups (`(?<first>ERROR)(?<second>message)`).

{{< include-headless "chunk/filterx-regexp-notes.md" >}}

### Options {#regexp-search-flags}

You can use the following optional flags in `regexp_search`:

- `keep_zero`: Always return the zero match group. Available in version 4.10 and later. Default value: `false`
- `list_mode`: Return results as a list. Available in version 4.10 and later. Default value: `false`

     If the result is an existing `dict` or `list` object, the function respects the type of the object, even if `list_mode` is set to true.

### Unnamed match groups

```shell
${MY-LIST} = json(); # Creates an empty JSON object
${MY-LIST}.unnamed = regexp_search("first-word second-part third", /(first-word)(second-part)(third)/);
```

`${MY-LIST}.unnamed` is a list containing: `["first-word second-part third", "first-word", "second-part", "third"],`

### Named match groups

```shell
${MY-LIST} = json(); # Creates an empty JSON object
${MY-LIST}.named = regexp_search("first-word second-part third", /(?<one>first-word)(?<two>second-part)(?<three>third)/);
```

`${MY-LIST}.named` is a dictionary with the names of the match groups as keys, and the corresponding matches as values: `{"0": "first-word second-part third", "one": "first-word", "two": "second-part", "three": "third"},`

### Mixed match groups

If you use mixed (some named, some unnamed) groups in your regular expression, the output is a dictionary, where {{< product >}} automatically assigns a key to the unnamed groups. For example:

```shell
${MY-LIST} = json(); # Creates an empty JSON object
${MY-LIST}.mixed = regexp_search("first-word second-part third", /(?<one>first-word)(second-part)(?<three>third)/);
```

`${MY-LIST}.mixed` is: `{"0": "first-word second-part third", "first": "first-word", "2": "second-part", "three": "third"}`

## regexp_subst {#regexp-subst}

Rewrites a string using regular expressions. This function implements the [`subst` rewrite rule functionality]({{< relref "/chapter-manipulating-messages/modifying-messages/rewrite-replace/_index.md" >}}).

{{< include-headless "wnt/note-rewrite-hard-macros.md" >}}

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

### Options

You can use the following flags with the `regexp_subst` function:

- `global=true`:

    Replace every match of the regular expression, not only the first one.

- `ignorecase=true`:

    Do case insensitive match.

- `jit=true`:

    Enable [just-in-time compilation function for PCRE regular expressions](https://www.pcre.org/current/doc/html/pcre2jit.html).

- `newline=true`: {{< include-headless "chunk/regex-flag-newline.md" >}}

- `utf8=true`: {{< include-headless "chunk/regex-flag-utf8.md" >}}

## set_fields {#set-fields}

Takes a dict and sets multiple fields in it with overrides or defaults (`overrides` and `defaults` are optional parameters).

The `overrides` and `defaults` parameters are also dicts, where:

- the key is the field's name
- the value is either an expression, or a list of expressions.

    If a list is provided, each expression will be evaluated, and the first successful, non-null one is set as the respective field's value. This is similar to chaining [null-coalescing (`??`) operators]({{< relref "/filterx/operator-reference.md#null-coalescing-operator" >}}), but has better performance.

`overrides` are always processed for each field. The `defaults` for a field are only processed isn't set or is empty.

## startswith

Available in {{< product >}} 4.9 and later.

Returns true if the input string begins with the specified substring. By default, matches are case sensitive. Usage:

```shell
startswith(input-string, substring);
startswith(input-string, [substring_1, substring_2], ignorecase=true);
```

For details, see {{% xref "/filterx/filterx-string-search/_index.md" %}}.

## string

Cast a value into a string. Note that currently {{< product >}} evaluates strings and executes [template functions]({{< relref "/filterx/_index.md#template-functions" >}}) and template expressions within the strings. In the future, template evaluation will be moved to a separate FilterX function.

Usage: `string(<string or expression to cast>)`

For example:

```shell
myvariable = string(${LEVEL_NUM});
```

Sometimes you have to explicitly cast values to strings, for example, when you want to concatenate them into a message using the `+` operator.

## strftime

Available in {{< product >}} 4.10 and later.

Format datetime values using the specified format string.

Usage: `strftime("format_string", <value-or-variable-to-format>);`

For example:

```shell
mydate = strptime("2024-04-10T08:09:10Z", "%Y-%m-%dT%H:%M:%S%z");

${MESSAGE} = strftime("%Y-%m-%dT%H-%M-%S %z", my-date);
```

You can use the following format codes in the format string:

`%a`: The locale's abbreviated weekday name.
`%A`: The locale's full weekday name.
`%b`: The locale's abbreviated month name.
`%B`: The locale's full month name.
`%c`: The locale's appropriate date and time representation.
`%C`: The year divided by 100 and truncated to an integer, as a decimal number.
`%d`: The day of the month as a decimal number [01,31].
`%D`: Equivalent to `%m / %d / %y`.
`%e`: The day of the month as a decimal number [1,31]; a single digit is preceded by a space.
`%f`: Fraction of the second (with or without a leading dot). Width specifies precision, `%6f` means microseconds, `%3f` means milliseconds, `%9f` means nanoseconds. `%f` just means microseconds.
`%F`: Equivalent to `%+4Y-%m-%d`.
`%g`: The last 2 digits of the week-based year (see below) as a decimal number [00,99].
`%G`: The week-based year (see below) as a decimal number (for example, 1977).
`%h`: Equivalent to %b.
`%H`: The hour (24-hour clock) as a decimal number [00,23].
`%I`: The hour (12-hour clock) as a decimal number [01,12].
`%j`: The day of the year as a decimal number [001,366].
`%m`: The month as a decimal number [01,12].
`%M`: The minute as a decimal number [00,59].
`%n`: A `<newline>`.
`%p`: The locale's equivalent of either a.m. or p.m.
`%r`: The time in a.m. and p.m. notation.
`%R`: The time in 24-hour notation ( %H : %M ).
`%S`: The second as a decimal number [00,60].
`%t`: A `<tab>`.
`%T`: The time (`%H : %M : %S`).
`%u`: The weekday as a decimal number [1,7], with 1 representing Monday.
`%U`: The week number of the year as a decimal number [00,53]. The first Sunday of January is the first day of week 1; days in the new year before this are in week 0.
`%V`: The week number of the year (Monday as the first day of the week) as a decimal number [01,53]. If the week containing 1 January has four or more days in the new year, then it is considered week 1. Otherwise, it is the last week of the previous year, and the next week is week 1. Both January 4th and the first Thursday of January are always in week 1.
`%w`: The weekday as a decimal number [0,6], with 0 representing Sunday.
`%W`: The week number of the year as a decimal number [00,53]. The first Monday of January is the first day of week 1; days in the new year before this are in week 0.
`%x`: The locale's appropriate date representation.
`%X`: The locale's appropriate time representation.
`%y`: The last two digits of the year as a decimal number [00,99].
`%Y`: The year as a decimal number (for example, 1997).
`%z`: The offset from UTC in the ISO 8601:2000 standard format ( +hhmm or -hhmm ), or by no characters if no timezone is determinable
`%Z`: Same as `%z` , but with the `:` separator (-hh:mm or +hh:mm)

{{% alert title="Note" color="info" %}}
`%Z` currently doesn't respect the datetime's timezone, use `%z` instead.
{{% /alert %}}

## strptime

Creates a `datetime` object from a string, similarly to the [`date-parser()`]({{< relref "/chapter-parsers/date-parser/_index.md" >}}). The first argument is the string containing the date. The second argument is a format string that specifies how to parse the date string. Optionally, you can specify additional format strings that are applied in order if the previous one doesn't match the date string.

Usage: `strptime(time_str, format_str_1, ..., format_str_N)`

For example:

```shell
${MESSAGE} = strptime("2024-04-10T08:09:10Z", "%Y-%m-%dT%H:%M:%S%z");
```

{{% alert title="Note" color="info" %}}

If none of the format strings match, `strptime` returns the null value and logs an error message to the `internal()` source of {{< product >}}. If you want the FilterX block to explicitly return false in such cases, use the [`isset`](#isset) FilterX function on the result of `strptime`.

{{% /alert %}}

You can use the following format codes in the format string:

{{< include-headless "chunk/date-string-format.md" >}}

The [`isodate`](#isodate) FilterX function is a specialized variant of `strptime`, that accepts only a fixed format.

## unset

Deletes a variable, a name-value pair, or a key in a complex object (like JSON), for example: `unset(${<name-value-pair-to-unset>});`

{{< include-headless "chunk/filterx-unset-hard-macros.md" >}}

You can also list multiple values to delete: `unset(${<first-name-value-pair-to-unset>}, ${<second-name-value-pair-to-unset>});`

See also {{% xref "/filterx/_index.md#delete-values" %}}.

## unset_empties {#unset-empties}

Deletes ([unsets](#unset)) the empty fields of an object, for example, a JSON object or list. By default, the object is processed recursively, so the empty values are deleted from inner dicts and lists as well. If you set the `replacement` option, you can also use this function to replace fields of the object to custom values.

Usage: `unset_empties(object, options)`

The `unset_empties()` function has the following options:

- `ignorecase`: Set to `true` to perform case-insensitive matching. Default value: `false`. Available in {{< product >}} 4.9 and later, default changed to `false` in version 4.10.
- `recursive`: Enables recursive processing of nested dictionaries. Default value: `true`
- `replacement`: Replace the target elements with the value of `replacement` instead of removing them. Available in {{< product >}} 4.9 and later.
- `targets`: A list of elements to remove or replace. Default value: `["", null, [], {}]`. Available in {{< product >}} 4.9 and later.

For example, to remove the fields with `-` and `N/A` values, you can use

```shell
unset_empties(input_object, targets=["-", "N/A"], ignorecase=false);
```

## update_metric {#update-metric}

Updates a labeled metric counter, similarly to the [`metrics-probe()` parser]({{< relref "/chapter-parsers/metrics-probe/_index.md" >}}). For details, see {{% xref "/filterx/filterx-metrics/_index.md" %}}.

## upper

Converts all characters of a string uppercase characters.

Usage: `upper(string)`

## vars

Returns the variables (including pipeline variables and name-value pairs) defined in the FilterX block as a JSON object. The names of name-value pairs begins with the `$` character. To exclude name-value pairs, set the `exclude_msg_values=true` flag.

For example:

```shell
filterx {
  ${logmsg_variable} = "foo";
  local_variable = "bar";
  declare pipeline_level_variable = "baz";
  ${MESSAGE} = vars();
};
```

The value of `${MESSAGE}` will be: `{"$logmsg_variable":"foo","pipeline_level_variable":"baz"}`
