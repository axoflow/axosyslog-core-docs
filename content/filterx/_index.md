---
title: Filterx
weight: 4800
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{< product >}} 4.9 and later.

{{% alert title="Note" color="info" %}}
Filterx (developed by Axoflow) is a replacement for [`syslog-ng` `filter{}` statements]({{< relref "/chapter-routing-filters/filters/_index.md" >}}) and parsers. It has its own syntax, allowing you to filter, parse, manipulate, and rewrite variables and complex data structures, and also compare them with various operators.

Filterx is a consistent and comprehensive reimplementation of several core features with improved performance, proper typing support, and the ability to handle multi-level typed objects.
{{% /alert %}}

Filterx helps you to route your logs: a message passes the filterx block in a log path only if the filterx block is true for the particular message. If a log statement includes a filterx block, the messages are sent to the destinations only if they pass all filterx blocks of the log path. For example, you can select only the messages originating from a particular host, or create complex filters using operators, functions, and logical expressions.

Like simple filters, filterx blocks consist of a list of filter statements. If a message matches all filter statements, it passes the filter.

The result of filterx statements is always a boolean value, either *true* or *false*:

- True values are: Complex values, non-empty strings, and non-zero numbers.
- False values are:
    - empty strings,
    - the `false` value,
    - the `0` value,
    - statements that result in an error (for example, if a comparison cannot be evaluated because of type error, or a field of a variable referenced in the statement is doesn't exist or is unset).

You can define a filterx statement like this:

```shell
filterx <identifier> {
    <filterx-statement-1>;
    <filterx-statement-2>;
    ...
};
```

Then use it in a log path:

```shell
log {
    source(s1);
    filterx(<identifier>);
    destination(d1);
};
```

You can also define it inline. For details, see {{% xref "/chapter-configuration-file/inline-objects/_index.md" %}}.

For example, the following filterx statement selects the messages that contain the word `deny` and come from the host `example`.

```shell
filterx demo_filterx {
    ${HOST} == "example";
    ${MESSAGE} =~ "deny";
};
log {
    source(s1);
    filter(demo_filterx);
    destination(d1);
};
```

The following example does the same, but defines the filterx block inline.

```shell
log {
    source(s1);
    filterx demo_filterx {
        ${HOST} == "example";
        ${MESSAGE} =~ "deny";
    };
    destination(d1);
};
```

You can use filterx blocks together with other blocks in a log path, for example, use a parser before/after the filterx block if needed.

<!-- FIXME what is mutable/immutable writable/read-only > devs to write a draft  -->

## Filterx statements

A filterx block contains one or more filterx statements. The order of the statements is important, as they are sequentially processed.  If any of the statements is false (or results in an error), {{< product >}} drops the message from that log path.

Filterx statements can be one of the following:

- A comparison, for example, `$HOST == "my-host";`. This statement is true only for messages where the `$HOST` field is `my-host`. Such simple comparison statements can be the equivalents of [traditional filter functions]({{< relref "/chapter-routing-filters/filters/reference-filters/_index.md" >}}).
- A value assignment for a [name-value pair or a local variable](#variable-scope), for example, `$my-field = "bar";`. The left-side variable automatically gets the type of the right-hand expression.
- A conditional statement ( `if (expr) { ... } else { ... };`) that allows you evaluate complex decision trees.
- A declaration of a [pipeline variable](#variable-scope), for example, `declare my-pipeline-variable = "something";`.

{{% alert title="Note" color="info" %}}
- The `true;` and `false;` strings are also valid statements. They can be useful in complex conditional (if/elif/else) statements.
- A name-value pair or a variable in itself is also a statement. For example, `$HOST;`. If the name-value pair or variable is empty or doesn't exist, the statement is false.
{{% /alert %}}

When you assign the value of a variable using another variable (for example, `$MESSAGE = "$HOST"`), {{< product >}} copies the current value of the `$HOST` variable. If a statement later changes the value of the `$HOST` field, the `$MESSAGE` field won't change. For example:

```shell
filterx {
  ${HOST} = "first-hostname";
  ${MESSAGE} = ${HOST}; # The value of $MESSAGE is first-hostname
  ${HOST} = "second-hostname"; # The value of $MESSAGE is still first-hostname
};
```

The same is true for complex objects, like JSON, for example:

```shell
js = json_object({
    "key": "value",
    "second-key": "another-value"
});

${MESSAGE} = js;

js.third_key = "third-value-not-available-in-$MESSAGE";
```

## Data model and scope {#scoping}

Each filterx block can access data from the following elements.

- Macros and name-value pairs of the message being processed (for example, `$PROGRAM`). The names of macros and name-value pairs begin with the `$` character. If you define a new variable in a filterx block and its name begins with the `$` character, it's automatically added to the name-value pairs of the message.
- Local variables. These have a name that doesn't start with a `$` character, for example, `my-local-variable`. Local variables are available only in the filterx block they're defined. <!-- FIXME Are there other restrictions for the variable names? For example, cannot shadow type names? -->
- Pipeline variables. These are simliar to local variables, but must be declared before first use, for example, `declare my-pipeline-variable=5;`

    Pipeline variables are available in the current and all subsequent filterx block.

{{% alert title="Note" color="info" %}}
If you want to pass data between two filterx blocks of a log statement, use pipeline variables. That has better performance than name-value pairs.
{{% /alert %}}

## Variable types

Variables can have the following types:

- `boolean`
- `bytes` (to represent binary data)
- `datetime`
- `dict`
- `double`
- `int`
- `json_object` and `json_array` for JSON or JSON-like objects. The `json` type is an alias for the `json_object` type. <!-- object: {}, array []-->
- `list`
- `protobuf`
- `string`
<!-- - otel... types -->

### Assign values

To assign value to a name-value pair or a variable, use the following syntax:

```shell
<variable-name> = <value-of-the-variable>;
```

Usually you can omit the type, and {{< product >}} automatically assigns the type based on the syntax of the value, for example:

- `mystring = "string-value";`
- `myint = 3;`
- `mydouble = 2.5;`
- `myboolean = true;`

If needed, you can explicitly specify the type of the variable:

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

{{% alert title="Note" color="info" %}}
When assigning values to name-value pairs, you cannot modify [hard macros]({{< relref "/chapter-manipulating-messages/customizing-message-format/macros-hard-vs-soft/_index.md" >}}).
{{% /alert %}}

You can use the traditional [template functions]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}) of {{< product >}} to access and format name-value pairs. Note that you must enclose the template function expression between double-quotes, for example:

```shell
${MESSAGE} = "$(format-json --subkeys values.)";
```

### Delete values

To delete a value without deleting the object (for example, name-value pair), use the `null value`, for example:

```shell
${MY-NV-PAIR} = null;
```

To delete the name-value pair (or a key from an object), use the `unset` function:

```shell
unset(${MY-NV-PAIR});
unset(${MY-JSON}["key-to-delete"]);
```

### Concatenate strings

You can concatenate strings by adding them with the `+` operator. Note that if you want to have spaces between the added elements, you have to add them manually, like in Python, for example:

```shell
${MESSAGE} = ${HOST} + " first part of the message " + " second part of the message" + "\n")
```

### Lists, dicts, and JSON {#json}

The list and dict types are similar to the their [Python counterparts](https://www.geeksforgeeks.org/difference-between-list-and-dictionary-in-python/). However, for performance reasons, {{< product >}} doesn't have abstract list and dict types: when you create a list or a dictionary, you have to specify its type, which can be one of JSON or OTEL. For example:

```shell
list = json_array(); # Create an empty JSON list
list += "first_element"; # Append entries to the list
list += "second_element";
list += "third_element";
${MESSAGE} = list;
```

You can also create the list and assign values in a single step:

```shell
list = json_array(["first_element", "second_element", "third_element"]);
${MESSAGE} = list;
```

Or refer to the elements using an index (starting with `0`):

```shell
list = json_array(); # Create an empty JSON list
list[0] = "first_element"; # Append entries to the list
list[1] = "second_element";
list[2] = "third_element";
${MESSAGE} = list;
```

In all three cases, the value `${MESSAGE}` is the same JSON array: `["first_element", "second_element", "third_element"]`.

You can define JSON objects using the `json_object` type, for example:

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

js2 = json_object({"key": "value"})
```

Naturally, you can assign values from other variables to an object, for example:

```shell
js = json_array(["foo", "bar", "baz"]);
${MESSAGE} = json_object({
    "key": "value",
    "list": list,
});
```

You can access the fields of complex data types by using indexes and the dot notation, for example:

- dot notation: `js.key`
- indexing: `js["key"]`
- or mixed mode if needed: `js.list[1]`

<!-- FIXME more examples for lists/dicts if needed -->

<!--
### Type casting

 FIXME type casting -->

## Operators

Filterx has the following operators.

- Comparison operators: `==, <, <=, >=, >, !=, eq, lt, le, gt, ge, ne`. For details, see {{% xref "/filterx/filterx-comparing/_index.md" %}}.
- Boolean operators `not`, `or`, `and`. For details, see {{% xref "/filterx/filterx-boolean/_index.md" %}}.
- [Dot operator (`.`)](#json) to access fields of an object, like JSON.
- [Indexing operator `[]`](#json) to access fields of an object, like JSON.
- [Plus (`+`) operator](#concatenate-strings) to concatenate strings.
- [Ternary conditional operator]({{< relref "/filterx/operator-reference.md#ternary-conditional-operator" >}}): `?:`
- [Null coalescing operator]({{< relref "/filterx/operator-reference.md#null-coalescing-operator" >}}): `??`
- [Regular expression (regexp) match]({{< relref "/filterx/operator-reference.md#regexp" >}}): `=~` and `!~`.

<!--  +=  -->

<!-- FIXME 
`$MSG = "$(format-json --subkeys values.)";` > needs the double-quote for template eval > should we document that Bazsi?
-->

For details, see {{% xref "/filterx/operator-reference.md" %}}.

## Functions

Filterx has the following built-in functions.

<!-- FIXME definitions/descriptions -->
- [`cache_json_file`]({{< relref "/filterx/function-reference.md#cache_json_file" >}})
- [`datetime`]({{< relref "/filterx/function-reference.md#datetime" >}})
- [`flatten`]({{< relref "/filterx/function-reference.md#flatten" >}})
- [`isodate`]({{< relref "/filterx/function-reference.md#isodate" >}})
- [`isset`]({{< relref "/filterx/function-reference.md#isset" >}})
- [`istype`]({{< relref "/filterx/function-reference.md#istype" >}}): Check the type of an object.
- [`len`]({{< relref "/filterx/function-reference.md#len" >}}): Returns the length of an object.
- [`lower`]({{< relref "/filterx/function-reference.md#lower" >}}): Converts a string into lowercase characters.
- [`json, json_object`]({{< relref "/filterx/function-reference.md#json" >}}): Convert a value into a JSON object.
- [`json_array`]({{< relref "/filterx/function-reference.md#json-array" >}}): Convert a value into a JSON array.
- [`string`]({{< relref "/filterx/function-reference.md#string" >}}): Convert a value into a string.
- [`strptime`]({{< relref "/filterx/function-reference.md#strptime" >}}): Convert a value into datetime.
- [`unset`]({{< relref "/filterx/function-reference.md#unset" >}})
- [`upper`]({{< relref "/filterx/function-reference.md#upper" >}}): Converts a string into uppercase characters.
- [`vars`]({{< relref "/filterx/function-reference.md#vars" >}}): The variables defined in the filterx block.
- "bytes"
- "protobuf"
- "bool"
- "int"
- "double"
- "regexp_search"
<!-- FIXME update list , I found these in the tests/files -->
- parse_kv
- otel_logrecord
- regexp_subst
- flatten
- unset_empties
- format_csv
- #define FILTERX_FUNC_CACHE_JSON_FILE_USAGE "Usage: `cache_json_file("/path/to/file.json")`" > is that public? > igen
- format_kv
- parse_kv

<!-- FIXME add links to the reference page for each function -->

For details, see {{% xref "/filterx/operator-reference.md" %}}.

<!-- 
## Use cases/examples

Add a real-life looking example why that's good > (this plus a short intro can be a blog post as well)
 -->

<!-- ### Handling OTEL

FIXME

-->

<!-- 
## Updating filters to filterx

FIXME examples for rewriting old filters in filterx 

/chapter-routing-filters/filters/reference-filters/ check what is implemented and what isn't (pl rate-limit, source, netmask)

What if I can't update a filter to filterx? Don't worry, while you can't use other blocks within a filterx block, you can use both in a log statement, for example, use a filterx block, then a parser if needed.

Also there is no push to use filterx, you can keep using the traditional blocks if they satisfy your requirements.
-->
<!-- FIXME group-by like contexts and similar don't work yet -->
