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

## flatten

Flattens the nested elements of an object using the specified separator, similarly to the [`format-flat-json()` template function]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md#template-function-format-flat-json" >}}). For example, you can use it to flatten nested JSON objects in the output if the receiving application cannot handle nested JSON objects.

Usage: `flatten(dict, separator=".")`

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

## isodate

Parses a string as a date in ISODATE format: `%Y-%m-%dT%H:%M:%S%z`

## isset

Returns true if the argument exists and its value is not empty or null.

Usage: `isset(<name of a variable, macro, or name-value pair>)`

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
js = json({"key": "value"});
```

## json_array {#json-array}

Cast a value into a JSON array.

Usage: `json_array(<string or expression to cast to json array>)`

For example:

```shell
list = json_array(["first_element", "second_element", "third_element"]);
```

## len

Returns the number of items in an object as an integer: the length (number of characters) of a string, the number of elements in a list, or the number of keys in an object.

Usage: `len(object)`

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

## string

Cast a value into a string. Note that currently {{< product >}} evaluates strings and executes [template functions]({{< relref "/filterx/_index.md#template-functions" >}}) and template expressions within the strings. In the future, template evaluation will be moved to a separate FilterX function.

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

Converts all characters of a string uppercase characters.

Usage: `upper(string)`

## vars

Returns the variables (including pipeline variables and name-value pairs) defined in the FilterX block as a JSON object.

For example:

```shell
filterx {
  ${logmsg_variable} = "foo";
  local_variable = "bar";
  declare pipeline_level_variable = "baz";
  ${MESSAGE} = vars();
};
```

The value of `${MESSAGE}` will be: `{"logmsg_variable":"foo","pipeline_level_variable":"baz"}`
