---
title: FilterX
weight: 4800
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->



{{% alert title="Note" color="info" %}}
FilterX (developed by Axoflow) is a replacement for [`syslog-ng` filters]({{< relref "/chapter-routing-filters/filters/_index.md" >}}), [parsers]({{< relref "/chapter-parsers/_index.md" >}}), and [rewrite rules]({{< relref "/chapter-manipulating-messages/modifying-messages/_index.md" >}}). It has its own syntax, allowing you to filter, parse, manipulate, and rewrite variables and complex data structures, and also compare them with various operators.

FilterX is a consistent and comprehensive reimplementation of several core features with improved performance, proper typing support, and the ability to handle multi-level typed objects.
{{% /alert %}}

FilterX helps you to route, parse, and modify your logs: a message passes through the FilterX block in a log path only if all the FilterX statements evaluate to true for the particular message. If a log statement includes multiple FilterX blocks, the messages are sent to the destinations only if they pass all FilterX blocks of the log path. For example, you can select only the messages originating from a particular host, or create complex filters using operators, functions, and logical expressions.

FilterX blocks consist of a list of FilterX statements, each statement evaluates either to *truthy* or *falsy*. If a message matches all FilterX statements, it passes through the FilterX block to the next element of the log path, for example, the destination.

- Truthy values are:
    - Complex values (for example, a datetime object),
    - non-empty lists and objects,
    - non-empty strings,
    - non-zero numbers,
    - the `true` boolean object.
- Falsy values are:
    - empty strings,
    - the `false` value,
    - the `0` value,
    - `null`,

Statements that result in an error (for example, if a comparison cannot be evaluated because of type error, or a field or a dictionary referenced in the statement doesn't exist or is unset) are also treated as falsy.
<!-- FIXME write more about error handling in a separate section -->

## Define a filterx block

You can define `filterx` blocks inline in your log statements. (If you want to reuse `filterx` blocks, {{% xref "/filterx/reuse-filterx-block.md" %}}.)

For example, the following FilterX statement selects the messages that contain the word `deny` and come from the host `example`.

```shell
log {
    source(s1);
    filterx {
        ${HOST} == "example";
        ${MESSAGE} =~ "deny";
    };
    destination(d1);
};
```

You can use `filterx` blocks together with other blocks in a log path, for example, use a parser before/after the `filterx` block if needed.

<!-- FIXME what is mutable/immutable writable/read-only > devs to write a draft  -->

## FilterX statements

A FilterX block contains one or more FilterX statements. The order of the statements is important, as they are processed sequentially. If any of the statements is falsy (or results in an error), {{< product >}} drops the message from that log path.

FilterX statements can be one of the following:

- A comparison, for example, `${HOST} == "my-host";`. This statement is true only for messages where the value of the `${HOST}` field is `my-host`. Such simple comparison statements can be the equivalents of [traditional filter functions]({{< relref "/chapter-routing-filters/filters/reference-filters/_index.md" >}}).
- A value assignment for a [name-value pair or a local variable](#variable-scope), for example, `${my-field} = "bar";`. The left-side variable automatically gets the type of the right-hand expression. Assigning the false value to a variable (`${my-field} = false;`) is a valid statement that doesn't automatically cause the FilterX block to return as false.
- Existence of a variable of field. For example, the `${HOST};` expression is true only if the `${HOST}` macro exists and isn't empty.
- A conditional statement ( `if (expr) { ... } elif (expr) {} else { ... };`) which allows you to evaluate complex decision trees. Starting with version 4.10, you can also use switch-case expressions.
- A declaration of a [pipeline variable](#variable-scope), for example, `declare my_pipeline_variable = "something";`.
- A FilterX action. This can be one of the following:

    - `drop;`: Intentionally drop the message. This means that the message was successfully processed, but discarded. Processing the dropped message stops at the `drop` statement, subsequent sections or other branches of the FilterX block won't process the message. For example, you can use this to discard unneeded messages, like debug logs. Available in {{< product >}} 4.9 and later.
    - `done;`: Return truthy and don't execute the rest of the FilterX block, returns with true. This is an early return that you can use to avoid unnecessary processing, for example, when the message matches an early classification in the block. Available in {{< product >}} 4.9 and later.

{{% alert title="Note" color="info" %}}

- The `true;` and `false;` literals are also valid as statements. They can be useful in complex conditional (if/elif/else) statements.
- A name-value pair or a variable in itself is also a statement. For example, `${HOST};`. If the name-value pair or variable is empty or doesn't exist, the statement is considered falsy.

{{% /alert %}}

When you assign the value of a variable using another variable (for example, `${MESSAGE} = ${HOST};`), {{< product >}} copies the current value of the `${HOST}` variable. If a statement later changes the value of the `${HOST}` field, the `${MESSAGE}` field won't change. For example:

```shell
filterx {
  ${HOST} = "first-hostname";
  ${MESSAGE} = ${HOST}; # The value of ${MESSAGE} is first-hostname
  ${HOST} = "second-hostname"; # The value of ${MESSAGE} is still first-hostname
};
```

The same is true for complex objects, like JSON, for example:

```shell
js = json({
    "key": "value",
    "second-key": "another-value"
});

${MESSAGE} = js;

js.third_key = "third-value-not-available-in-MESSAGE";
```

You can use [FilterX operators](#operators) and [functions](#functions).

## Data model and scope {#scoping}

Each FilterX block can access data from the following elements.

- Macros and name-value pairs of the message being processed (for example, `$PROGRAM`). The names of macros and name-value pairs begin with the `$` character. If you define a new variable in a FilterX block and its name begins with the `$` character, it's automatically added to the name-value pairs of the message.

    {{% alert title="Note" color="info" %}}
Using curly braces around macro names is not mandatory, and the `"$MESSAGE"` and `"${MESSAGE}"` formats are equivalent. If the name contains only alphanumeric characters and the underscore character, you don't need the curly braces. If it contains any other characters (like a hyphen (`-`) or a dot (`.`)), you need to add the curly braces, therefore it's best to always use curly braces.

Names are case-sensitive, so `"$message"` and `"$MESSAGE"` are not the same.
    {{% /alert %}}

- Local variables. These have a name that doesn't start with a `$` character, for example, `my_local_variable`. Local variables are available only in the FilterX block they're defined.
- Pipeline variables. These are similar to local variables, but must be declared before first use, for example, `declare my_pipeline_variable=5;`

    Pipeline variables are available in the current and all subsequent FilterX block. They're global in the sense that you can access them from multiple FilterX blocks, but note that they're still attached to the particular message that is processed, so the values of pipeline variables aren't preserved between messages.

    If you don't need to pass the variable to another FilterX block, use local variables, as pipeline variables have a slight performance overhead.

{{% alert title="Note" color="info" %}}
- If you want to pass data between two FilterX blocks of a log statement, use pipeline variables. That has better performance than name-value pairs.
- Local and pipeline variables aren't available in destination templates. For details, see [FilterX variables in destinations](#variables-in-destinations).
{{% /alert %}}

## Variable names

FilterX variable names have more restrictions than generic name-value pair names. They:

- can contain alphanumeric characters and the underscore character (`_`), but **cannot** contain hyphens,
- cannot begin with numbers,
- can begin with underscore.

{{% alert title="Note" color="info" %}}

Although you can re-use type names and function names as variable names, that's not considered good practice and should be avoided.

{{% /alert %}}

## Variable types

Variables can have the following types. All of these types have a matching function that can be used to type cast something into the specific type.

- `boolean`
- `bytes` (to represent binary data)
- [`datetime`]({{< relref "/filterx/function-reference.md#datetime" >}})
- `dict`
- `double`
- `int`
- [`json`]({{< relref "/filterx/function-reference.md#json" >}}) and [`json_array`]({{< relref "/filterx/function-reference.md#json-array" >}}) for JSON or JSON-like objects.
- `list`
- [`metrics_labels`]({{< relref "/filterx/filterx-metrics/_index.md#metrics-labels" >}})
- `null`
- `otel_array`
- `otel_kvlist`
- [`otel_logrecord`]({{< relref "/filterx/function-reference.md#otel-logrecord" >}})
- [`otel_resource`]({{< relref "/filterx/function-reference.md#otel-resource" >}})
- [`otel_scope`]({{< relref "/filterx/function-reference.md#otel-scope" >}})
- `protobuf`
- `string`

## Assign values

To assign value to a name-value pair or a variable, use the following syntax:

```shell
<variable-name> = <value-of-the-variable>;
```

In most cases you can omit the type, and {{< product >}} automatically assigns the type based on the syntax of the value, for example:

- `mystring = "string-value";`
- `myint = 3;`
- `mydouble = 2.5;`
- `myboolean = true;`

When needed, you can explicitly specify the type of the variable, and {{< product >}} attempts to convert the value to the specified type:
<!-- FIXME mention which conversions are not possible -->

```shell
<variable-name> = <variable-type>(<value-of-the-variable>);
```

For example:

```shell
filterx {
  ${MESSAGE} = string("Example string message");
};
```

You can also assign the value of other name-value pairs, for example:

```shell
filterx {
  ${MESSAGE} = ${HOST};
};
```

When processing RFC5424-formatted (IETF-syslog) messages, you can modify the SDATA part of the message as well. The following example sets the sequenceId:

```shell
filterx {
  ${.SDATA.meta.sequenceId} = 55555;
};
```

{{% alert title="Note" color="info" %}}
When assigning values to name-value pairs, you cannot modify [hard macros]({{< relref "/chapter-manipulating-messages/customizing-message-format/macros-hard-vs-soft/_index.md" >}}).
{{% /alert %}}

### Template functions

You can use the traditional [template functions]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}) of {{< product >}} to access and format name-value pairs. For that you must enclose the template function expression between double-quotes, for example:

```shell
${MESSAGE} = "$(format-json --subkeys values.)";
```

However, note that template functions cannot access the local and pipeline variables created in FilterX blocks.

## Delete values

To delete a value without deleting the object itself (for example, name-value pair), use the `null value`, for example:

```shell
${MY-NV-PAIR-KEY} = null;
```

To delete the name-value pair (or a key from an object), use the `unset` function:

```shell
unset(${MY-NV-PAIR-KEY});
unset(${MY-JSON}["key-to-delete"]);
```

To unset every empty field of an object, use the [`unset-empties`]({{< relref "/filterx/function-reference.md#unset-empties" >}}) function:

{{< include-headless "chunk/filterx-unset-hard-macros.md" >}}

## Add two values

{{< include-headless "chunk/filterx-plus-operator.md" >}}

For other arithmetic operators, see {{% xref "/filterx/operator-reference.md#arithmetic-operators" %}}.

## Complex types: lists, dicts, and JSON {#json}

The list and dict types are similar to their [Python counterparts](https://www.geeksforgeeks.org/difference-between-list-and-dictionary-in-python/). FilterX uses JSON to represent generic dictionary and list types, but you can create other, specific dictionary and list types as well (currently for OTEL, for example, `otel_kvlist`, or `otel_array`). All supported dictionary and list types are compatible with each other, and you can convert them to and from each other, copy values between them (retaining the type), and so on.

For example:

```shell
my_list = []; # Creates an empty list (which defaults to a JSON list)
my_array = {}; # Creates an empty dictionary (which defaults to a JSON object)

my_list2 = json_array(); # Creates an empty JSON list
my_array2 = json(); # Creates an empty JSON object.
```

You can add elements to lists and dictionaries like this:

```shell
list = json_array(); # Create an empty JSON list
#list = otel_array(); # Create an OTEL list
list += ["first_element"]; # Append entries to the list
list += ["second_element"];
list += ["third_element"];
${MESSAGE} = list;
```

You can also create the list and assign values in a single step:

```shell
list = json_array(["first_element", "second_element", "third_element"]);
${MESSAGE} = list;
```

You can refer to the elements using an index (starting with `0`):

```shell
list = json_array(); # Create an empty JSON list
list[0] = "first_element"; # Append entries to the list
list[1] = "second_element";
list[2] = "third_element";
${MESSAGE} = list;
```

In all three cases, the value of `${MESSAGE}` is the same JSON array: `["first_element", "second_element", "third_element"]`.

You can define JSON objects using the `json()` type, for example:

```shell
js1 = json();
js1 += {
    "body": "mystring",
    "time_unix_nano": 123456789,
    "attributes": {
        "int": 42,
        "flag": true
        }
    };

js2 = json({"key": "value"})
```

Naturally, you can assign values from other variables to an object, for example:

```shell
js = json_array(["foo", "bar", "baz"]);
${MESSAGE} = json({
    "key": "value",
    "list": list
});
```

or

```shell
js = json({
    "key": ${MY-NAME-VALUE-PAIR},
    "key-from-expression": isset(${HOST}) ? ${HOST} : "default-hostname",
    "list": list
});
```

Within a FilterX block, you can access the fields of complex data types by using indexes and the dot notation, for example:

- dot notation: `js.key`
- indexing: `js["key"]`
- or mixed mode if needed: `js.list[1]`

When referring to the field of a name-value pair (which begins with the `$` character), place the dot or the square bracket outside the curly bracket surrounding the name of the name-value pair, for example: `${MY-LIST}[2]` or `${MY-OBJECT}.mykey`. If the name of the key contains characters that are not permitted in FilterX variable names, for example, a hyphen (`-`), use the bracketed syntax and enclose the key in double quotes: `${MY-LIST}["my-key-name"]`.

You can add two lists or two dicts using the {{% xref "/filterx/operator-reference.md#plus-operator" %}}.

### List membership

{{< include-headless "chunk/filterx-list-membership-operator.md" >}}

<!--
### Type casting

 FIXME type casting

  -->

## Operators

FilterX has the following operators.

- [Arithmetic operators]({{< relref "/filterx/operator-reference.md#arithmetic-operators" >}}).
- [Assign a value to a variable if the value is non-null (`=??`)]({{< relref "/filterx/operator-reference.md#assign-non-null" >}}).
- [Boolean operators]({{< relref "/filterx/filterx-boolean/_index.md" >}}): `not`, `or`, `and`.
- [Comparison operators]({{< relref "/filterx/filterx-comparing/_index.md" >}}): `==`, `<`, `<=`, `>=`, `>`, `!=`, `===`, `!==`, `eq`, `lt`, `le`, `gt`, `ge`, `ne`.
- [Conditional operators]({{< relref "/filterx/filterx-conditional/_index.md" >}}).
- [Dot operator (`.`)](#json) to access fields of an object, like JSON.
- [Indexing operator `[]`](#json) to access fields of an object, like JSON.
- [List membership operator (`in`)]({{< relref "/filterx/operator-reference.md#list-membership-operator" >}}): checks if a value is present in a list.
- [Plus (`+`) operator]({{< relref "/filterx/operator-reference.md#plus-operator" >}}) to add values and concatenate strings.
- [Plus equal (`+=`) operator]({{< relref "/filterx/operator-reference.md#plus-equal-operator" >}}) to add the right operand to the left.
- [Ternary conditional operator]({{< relref "/filterx/operator-reference.md#ternary-conditional-operator" >}}): `?:`.
- [Null coalescing operator]({{< relref "/filterx/operator-reference.md#null-coalescing-operator" >}}): `??`.
- [Regular expression (regexp) match]({{< relref "/filterx/operator-reference.md#regexp" >}}): `=~` and `!~`.

<!-- FIXME update with the new operators -->

For details, see {{% xref "/filterx/operator-reference.md" %}}.

## Functions

FilterX has the following built-in functions.

- [`cache_json_file`]({{< relref "/filterx/function-reference.md#cache-json-file" >}}): Loads an external JSON file to lookup contextual information.
- [`endswith`]({{< relref "/filterx/filterx-string-search/_index.md" >}}): Checks if a string ends with the specified value.
- [`dedup_metrics_labels`]({{< relref "/filterx/filterx-metrics/_index.md#metrics-labels" >}}): Deduplicate `metrics_labels` objects.
- [`flatten`]({{< relref "/filterx/function-reference.md#flatten" >}}): Flattens the nested elements of an object.
- [`format_cef`]({{< relref "/filterx/filterx-format-data/format-cef" >}}): Formats a dictionary into Common Event Format (CEF).
- [`format_csv`]({{< relref "/filterx/filterx-format-data/format-csv.md" >}}): Formats a dictionary or a list into a comma-separated string.
- [`format_json`]({{< relref "/filterx/filterx-format-data/format-json" >}}): Dumps a JSON object into a string.
- [`format_kv`]({{< relref "/filterx/filterx-format-data/format-kv" >}}): Formats a dictionary into key=value pairs.
- [`format_leef`]({{< relref "/filterx/filterx-format-data/format-leef" >}}): Formats a dictionary into Log Event Extended Format (LEEF).
- [`format_windows_eventlog_xml`]({{< relref "/filterx/filterx-format-data/format-windows-eventlog-xml.md" >}}) Formats a dictionary into Windows Event Logs XML.
- [`format_xml`]({{< relref "/filterx/filterx-format-data/format-xml" >}}): Formats a dictionary into XML.
- [`get_sdata`]({{< relref "/filterx/filterx-sdata/_index.md" >}}): Returns the SDATA part of an RFC5424-formatted syslog message as a JSON object.
- [`has_sdata`]({{< relref "/filterx/filterx-sdata/_index.md" >}}): Checks if a string ends with the specified value.
- [`includes`]({{< relref "/filterx/filterx-string-search/_index.md" >}}): Checks if a string contains a specific substring.
- [`isodate`]({{< relref "/filterx/function-reference.md#isodate" >}}): Parses a string as a date in ISODATE format.
- [`is_sdata_from_enterprise`]({{< relref "/filterx/filterx-sdata/_index.md" >}}): Checks if the message contains the specified organization ID.
- [`isset`]({{< relref "/filterx/function-reference.md#isset" >}}): Checks that argument exists and its value is not empty or null.
- [`istype`]({{< relref "/filterx/function-reference.md#istype" >}}): Checks the type of an object.
- [`keys`]({{< relref "/filterx/function-reference.md#keys" >}}): Returns the top-level keys of a dictionary.
- [`len`]({{< relref "/filterx/function-reference.md#len" >}}): Returns the length of an object.
- [`metrics_labels`]({{< relref "/filterx/filterx-metrics/_index.md#metrics-labels" >}}): Convert key-values to metric labels directly.
- [`load_vars`]({{< relref "/filterx/function-reference.md#load-vars" >}}): Load variables from a dictionary.
- [`lower`]({{< relref "/filterx/function-reference.md#lower" >}}): Converts a string into lowercase characters.
- [`parse_csv`]({{< relref "/filterx/filterx-parsing/csv/_index.md" >}}): Parses a comma-separated or similar string.
- [`parse_kv`]({{< relref "/filterx/filterx-parsing/key-value-parser/_index.md" >}}): Parses a string consisting of whitespace or comma-separated `key=value` pairs.
- [`parse_leef`]({{< relref "/filterx/filterx-parsing/leef/_index.md" >}}): Parses LEEF-formatted string.
- [`parse_xml`]({{< relref "/filterx/filterx-parsing/xml/_index.md" >}}): Parses an XML object into a JSON object.
- [`parse_windows_eventlog_xml`]({{< relref "/filterx/filterx-parsing/windows-eventlog/_index.md" >}}): Parses a Windows Event Log XML object into a JSON object.
- [`regexp_search`]({{< relref "/filterx/function-reference.md#regexp-search" >}}): Searches a string using regular expressions.
- [`regexp_subst`]({{< relref "/filterx/function-reference.md#regexp-subst" >}}): Rewrites a string using regular expressions.
- [`set_fields`]({{< relref "/filterx/function-reference.md#set-fields" >}}): Set multiple fields of a dict with overrides or defaults.
- [`set_pri`]({{< relref "/filterx/function-reference.md#set-pri" >}}): Set the priority value of the message.
- [`set_timestamp`]({{< relref "/filterx/function-reference.md#set-timestamp" >}}): Set the timestamp of the message.
- [`startswith`]({{< relref "/filterx/filterx-string-search/_index.md" >}}): Checks if a string begins with the specified value.
- [`strcasecmp`]({{< relref "/filterx/function-reference.md#strcasecmp" >}}): Case insensitive string comparison.
- [`strftime`]({{< relref "/filterx/function-reference.md#strftime" >}}): Format datetime values.
- [`strptime`]({{< relref "/filterx/function-reference.md#strptime" >}}): Converts a string containing a date/time value, using a specified format string.
- [`unset`]({{< relref "/filterx/function-reference.md#unset" >}}): Deletes a name-value pair, or a field from an object.
- [`unset_empties`]({{< relref "/filterx/function-reference.md#unset-empties" >}}): Deletes empty fields from an object.
- [`update_metric`]({{< relref "/filterx/filterx-metrics/_index.md" >}}): Updates a labeled metric counter.
- [`upper`]({{< relref "/filterx/function-reference.md#upper" >}}): Converts a string into uppercase characters.
- [`vars`]({{< relref "/filterx/function-reference.md#vars" >}}): Lists the variables defined in the FilterX block.

For details, see {{% xref "/filterx/function-reference.md" %}}.

## Use cases and examples

The following list shows you some common tasks that you can solve with FilterX:

- To set message fields (like macros or SDATA fields) or replace message parts: you can [assign values](#assign-values) to change parts of the message, or use one of the [FilterX functions]({{< relref "/filterx/function-reference.md" >}}) to rewrite existing values.

    {{< include-headless "wnt/note-rewrite-hard-macros.md" >}}

- To delete or unset message fields, see [Delete values](#delete-values).
- To rename a message field, assign the value of the old field to the new one, then unset the old field. For example:

    ```shell
    $my_new_field = $mike_old_field;
    unset($mike_old_field);
    ```

- To use conditional rewrites, you can either:
    - embed the FilterX block in an [if-else block]({{< relref "/chapter-routing-filters/logpath/concepts-if-else-conditional-expressions/_index.md" >}}), or
    - use [value comparison in the FilterX block]({{< relref "/filterx/filterx-comparing/_index.md" >}}) to select the appropriate messages. For example, to rewrite only messages of the NGINX application, you can:

        ```shell
        ${PROGRAM} == "nginx";
        # <your rewrite expression>
        ```

### Create an iptables parser

The following example shows you how to reimplement the {{% xref "/chapter-parsers/parser-iptables/_index.md" %}} in a FilterX block. The following is a sample iptables log message (with line-breaks added for readability):

```shell
Dec 08 12:00:00 hostname.example kernel: custom-prefix:IN=eth0 OUT=
MAC=11:22:33:44:55:66:aa:bb:cc:dd:ee:ff:08:00 SRC=192.0.2.2 DST=192.168.0.1 LEN=40 TOS=0x00
PREC=0x00 TTL=232 ID=12345 PROTO=TCP SPT=54321 DPT=22 WINDOW=1023 RES=0x00 SYN URGP=0
```

This is a normal RFC3164-formatted message logged by the kernel (where iptables logging messages originate from), and contains space-separated key-value pairs.

1. First, create some filter statements to select iptables messages only:

    ```shell
    block filterx parse_iptables() {
        ${FACILITY} == "kern"; # Filter on the kernel facility
        ${PROGRAM} == "kernel"; # Sender application is the kernel
        ${MESSAGE} =~ "PROTO="; # The PROTO key appears in all iptables messages
    }
    ```

1. To make the parsed data available under macros beginning with `${.iptables}`, like in the case of the original `iptables-parser()`, create the `${.iptables}` JSON object.

    ```shell
    block filterx parse_iptables() {
        ${FACILITY} == "kern"; # Filter on the kernel facility
        ${PROGRAM} == "kernel"; # Sender application is the kernel
        ${MESSAGE} =~ "PROTO="; # The PROTO key appears in all iptables messages

        ${.iptables} = json(); # Create an empty JSON object
    }
    ```

1. Add a key=value parser to parse the content of the messages into the `${.iptables}` JSON object. The key=value pairs are space-separated, while equal signs (=) separates the values from the keys.

    ```shell
    block filterx parse_iptables() {
        ${FACILITY} == "kern"; # Filter on the kernel facility
        ${PROGRAM} == "kernel"; # Sender application is the kernel
        ${MESSAGE} =~ "PROTO="; # The PROTO key appears in all iptables messages

        ${.iptables} = json(); # Create an empty JSON object

        ${.iptables} = parse_kv(${MESSAGE}, value_separator="=", pair_separator=" ");
    }
    ```

    <!-- FIXME show json from sample message
    -->

For other examples on parsing messages, see the [Parsing firewall logs with FilterX](https://axoflow.com/blog/parsing-firewall-logs-with-filterx) blog post.

## FilterX variables in destinations {#variables-in-destinations}

If you're modifying messages using FilterX (for example, you extract a value from the message and add it to another field of the message), note the following points:

- Macros and name-value pairs (variables with names beginning with the `$` character) are included in the outgoing message in case the template of the destination includes them. For example, if you change the value of the `${MESSAGE}` macro, it's automatically sent to the destination if the destination template includes this macro.
- Local and pipeline variables are not included in the message, you must assign their value to a macro or name-value pair that's included in the destination template to send them to the destination.
- When sending data to `opentelemetry()` destinations, if you're modifying messages received via the `opentelemetry()` source, then you must explicitly update the original (raw) data structures in your FilterX block, otherwise the changes won't be included in the outgoing message. For details, see {{% xref "/filterx/filterx-otel/_index.md#modify-otel" %}}.

<!-- 
- underscores vs hyphens in filterx? everywhere else we use mainly hyphens (parse_kv vs parse-kv) > only underscores work for now
- make flags (like ignorecase) of regexp_subst available for regexp_search
- Aliases for options that are the same but have different names in filterx reimplementations? 
    - csv-parser: delimiters vs parse_csv: delimiter
- inconsistency in parse_csv: string_delimiters vs delimiter

Rewrite rules had some functions to change some hard macros:
    Setting severity with the set-severity() rewrite function
    Setting the facility field with the set-facility() rewrite function
    Setting the priority of a message with the set-pri() rewrite function

- Rewrite the timezone of a message > most nem lehet

- netmask() or netmask6() filter function
- inlist() filter function (or a generic way to check if a list/json-array contains a value in an element)
- rate-limit()
- tags() filtere function
-->
