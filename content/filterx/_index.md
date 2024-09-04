---
title: Filterx
weight: 4800
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{< include-headless "chunk/filterx-experimental-banner.md" >}}

{{% alert title="Note" color="info" %}}
Filterx (developed by Axoflow) is a replacement for [`syslog-ng` `filter{}` statements]({{< relref "/chapter-routing-filters/filters/_index.md" >}}), [parsers]({{< relref "/chapter-parsers/_index.md" >}}), and [rewrite rules]({{< relref "/chapter-manipulating-messages/modifying-messages/_index.md" >}}). It has its own syntax, allowing you to filter, parse, manipulate, and rewrite variables and complex data structures, and also compare them with various operators.

Filterx is a consistent and comprehensive reimplementation of several core features with improved performance, proper typing support, and the ability to handle multi-level typed objects.
{{% /alert %}}

Filterx helps you to route your logs: a message passes the filterx block in a log path only if the filterx block is true for the particular message. If a log statement includes a filterx block, the messages are sent to the destinations only if they pass all filterx blocks of the log path. For example, you can select only the messages originating from a particular host, or create complex filters using operators, functions, and logical expressions.

Filterx blocks consist of a list of filterx statements, the result of every statement is either *true* or *false*. If a message matches all filterx statements, it passes the filterx block to the next element of the log path, for example, the destination.

- True values are: Complex values, non-empty strings, and non-zero numbers.
- False values are:
    - empty strings,
    - the `false` value,
    - the `0` value,
    - statements that result in an error (for example, if a comparison cannot be evaluated because of type error, or a field of a variable referenced in the statement is doesn't exist or is unset).

## Define a filterx block

You can define a filterx statement like this:

```shell
block filterx() <identifier> {
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
block filterx() demo_filterx {
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
    filterx {
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

- A comparison, for example, `${HOST} == "my-host";`. This statement is true only for messages where the `${HOST}` field is `my-host`. Such simple comparison statements can be the equivalents of [traditional filter functions]({{< relref "/chapter-routing-filters/filters/reference-filters/_index.md" >}}).
- A value assignment for a [name-value pair or a local variable](#variable-scope), for example, `$my-field = "bar";`. The left-side variable automatically gets the type of the right-hand expression. Assigning the false value to a variable (`$my-field = false;`) is a valid statement that doesn't automatically cause the filterx block to return as false.
- A conditional statement ( `if (expr) { ... } else { ... };`) that allows you evaluate complex decision trees.
- A declaration of a [pipeline variable](#variable-scope), for example, `declare my-pipeline-variable = "something";`.

{{% alert title="Note" color="info" %}}

- The `true;` and `false;` literals are also valid as statements. They can be useful in complex conditional (if/elif/else) statements.
- A name-value pair or a variable in itself is also a statement. For example, `${HOST};`. If the name-value pair or variable is empty or doesn't exist, the statement is false.

{{% /alert %}}

When you assign the value of a variable using another variable (for example, `${MESSAGE} = "${HOST}"`), {{< product >}} copies the current value of the `${HOST}` variable. If a statement later changes the value of the `${HOST}` field, the `${MESSAGE}` field won't change. For example:

```shell
filterx {
  ${HOST} = "first-hostname";
  ${MESSAGE} = ${HOST}; # The value of ${MESSAGE} is first-hostname
  ${HOST} = "second-hostname"; # The value of ${MESSAGE} is still first-hostname
};
```

The same is true for complex objects, like JSON, for example:

```shell
js = json_object({
    "key": "value",
    "second-key": "another-value"
});

${MESSAGE} = js;

js.third_key = "third-value-not-available-in-MESSAGE";
```

## Data model and scope {#scoping}

Each filterx block can access data from the following elements.

- Macros and name-value pairs of the message being processed (for example, `$PROGRAM`). The names of macros and name-value pairs begin with the `$` character. If you define a new variable in a filterx block and its name begins with the `$` character, it's automatically added to the name-value pairs of the message.

    {{% alert title="Note" color="info" %}}
Using curly braces around macro names is not mandatory, and the `"$MESSAGE"` and `"${MESSAGE}"` formats are equivalent. However, using the `"${MESSAGE}"` format is required if the name contains special characters, like a hyphen (`-`) or a dot (`.`), so it's best to always use curly braces.

Names are case-sensitive, so `"$message"` and `"$MESSAGE"` are not the same.
    {{% /alert %}}

- Local variables. These have a name that doesn't start with a `$` character, for example, `my-local-variable`. Local variables are available only in the filterx block they're defined.
- Pipeline variables. These are similar to local variables, but must be declared before first use, for example, `declare my-pipeline-variable=5;`

    Pipeline variables are available in the current and all subsequent filterx block. They're global in the sense that you can access them from multiple filterx blocks, but note that they're still attached to the particular message that is processed, it's value isn't preserved between messages.

{{% alert title="Note" color="info" %}}
If you want to pass data between two filterx blocks of a log statement, use pipeline variables. That has better performance than name-value pairs.
{{% /alert %}}

## Variable names

Filterx variable names have more restrictions than generic name-value pair names. They:

- can contain alphanumeric characters and the underscore character (`_`), but **cannot** contain hyphens,
- cannot begin with numbers,
- can begin with underscore.

{{% alert title="Note" color="info" %}}

Although you can re-use type names and function names as variable names, that's not recommended and should be avoided.

{{% /alert %}}

## Variable types

Variables can have the following types. All of these types have a matching function that can be used to type cast something into the specific type.

- `boolean`
- `bytes` (to represent binary data)
- [`datetime`]({{< relref "/filterx/function-reference.md#datetime" >}})
- `dict`
- `double`
- `int`
- [`json, json_object`]({{< relref "/filterx/function-reference.md#json" >}}) and [`json_array`]({{< relref "/filterx/function-reference.md#json-array" >}}) for JSON or JSON-like objects. The `json` type is an alias for the `json_object` type.
- `list`
- `otel_array`
- `otel_kvlist`
- `otel_logrecord` <!-- FIXME links to otel types -->
- `otel_resource`
- `otel_scope`
- `protobuf`
- [`string`]({{< relref "/filterx/function-reference.md#string" >}}): Converts a value into a string.

## Assign values

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

However, note that template functions cannot access the local and pipeline variables created in filterx blocks.

## Delete values

To delete a value without deleting the object (for example, name-value pair), use the `null value`, for example:

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

## Concatenate strings

You can concatenate strings by adding them with the `+` operator. Note that if you want to have spaces between the added elements, you have to add them manually, like in Python, for example:

```shell
${MESSAGE} = ${HOST} + " first part of the message," + " second part of the message" + "\n";
```

## Lists, dicts, and JSON {#json}

The list and dict types are similar to the their [Python counterparts](https://www.geeksforgeeks.org/difference-between-list-and-dictionary-in-python/). However, for performance reasons, {{< product >}} doesn't have abstract list and dict types: when you create a list or a dictionary, you have to specify its type, which can be one of JSON or OTEL. For example:

```shell
list = json_array(); # Create an empty JSON list
#list = otel_array(); # Create an OTEL list
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

When referring to the field of a name-value pair (which begins with the `$` character), place the dot or the square bracket outside the curly bracket surrounding the name of the name-value pair, for example: `${MY-LIST}[2]` or `${MY-OBJECT}.mykey`. If the name of the key contains characters that are not permitted in filterx variable names, for example, a hyphen (`-`), use the bracketed syntax and enclose it in double quotes: `${MY-LIST}["my-key-name"]`.

<!-- FIXME more examples for lists/dicts if needed -->

<!--
### Type casting

 FIXME type casting

  -->

## Operators

Filterx has the following operators.

- Comparison operators: `==, <, <=, >=, >, !=, eq, lt, le, gt, ge, ne`. For details, see {{% xref "/filterx/filterx-comparing/_index.md" %}}.
- Boolean operators `not`, `or`, `and`. For details, see {{% xref "/filterx/filterx-boolean/_index.md" %}}.
- [Dot operator (`.`)](#json) to access fields of an object, like JSON.
- [Indexing operator `[]`](#json) to access fields of an object, like JSON.
- [Plus (`+`) operator](#concatenate-strings) to concatenate strings.
- [Plus equal (`+=`) operator]({{< relref "/filterx/operator-reference.md#plus-equal-operator" >}}) to concatenate strings.
- [Ternary conditional operator]({{< relref "/filterx/operator-reference.md#ternary-conditional-operator" >}}): `?:`
- [Null coalescing operator]({{< relref "/filterx/operator-reference.md#null-coalescing-operator" >}}): `??`
- [Regular expression (regexp) match]({{< relref "/filterx/operator-reference.md#regexp" >}}): `=~` and `!~`.

For details, see {{% xref "/filterx/operator-reference.md" %}}.

## Functions

Filterx has the following built-in functions.

- [`cache_json_file`]({{< relref "/filterx/function-reference.md#cache-json-file" >}}): Loads an external JSON file to lookup contextual information.
- [`flatten`]({{< relref "/filterx/function-reference.md#flatten" >}}): Flattens the nested elements of an object.
- [`format_csv`]({{< relref "/filterx/function-reference.md#format-csv" >}}): Formats a dictionary or a list into a comma-separated string.
- [`format_kv`]({{< relref "/filterx/function-reference.md#format-kv" >}}): Formats a dictionary into key=value pairs.
- [`isodate`]({{< relref "/filterx/function-reference.md#isodate" >}})
- [`isset`]({{< relref "/filterx/function-reference.md#isset" >}}): Checks that argument exists and its value is not empty or null.
- [`istype`]({{< relref "/filterx/function-reference.md#istype" >}}): Checks the type of an object.
- [`len`]({{< relref "/filterx/function-reference.md#len" >}}): Returns the length of an object.
- [`lower`]({{< relref "/filterx/function-reference.md#lower" >}}): Converts a string into lowercase characters.
- [`parse_csv`]({{< relref "/filterx/filterx-parsing/csv/_index.md" >}}): Separates a string consisting of whitespace or comma-separated `key=value` pairs.
- [`parse_kv`]({{< relref "/filterx/filterx-parsing/key-value-parser/_index.md" >}}): Separates a string consisting of whitespace or comma-separated `key=value` pairs.
<!-- - [`parse_xml`](FIXME): Parses an XML object into a JSON object. -->
- [`regexp_search`]({{< relref "/filterx/function-reference.md#regexp-search" >}}): Searches a string using regular expressions.
- [`regexp_subst`]({{< relref "/filterx/function-reference.md#regexp-subst" >}}): Rewrites a string using regular expressions.
- [`strptime`]({{< relref "/filterx/function-reference.md#strptime" >}}): Converts a value into datetime.
- [`unset`]({{< relref "/filterx/function-reference.md#unset" >}}): Deletes a name-value pair, or a field from an object.
- [`unset_empties`]({{< relref "/filterx/function-reference.md#unset-empties" >}}): Deletes empty fields from an object.
- [`upper`]({{< relref "/filterx/function-reference.md#upper" >}}): Converts a string into uppercase characters.
- [`vars`]({{< relref "/filterx/function-reference.md#vars" >}}): The variables defined in the filterx block.

For details, see {{% xref "/filterx/function-reference.md" %}}.

## Use cases and examples

The following list shows you some common tasks that you can solve with filterx:

- To set message fields (like macros or SDATA fields) or replace message parts: you can [assign values](#assign-values) to change parts of the message, or use the {{% xref "/filterx/function-reference.md" %}} function to rewrite existing values.

    {{< include-headless "wnt/note-rewrite-hard-macros.md" >}}

- To delete or unset message fields, see [Delete values](#delete-values).
- To rename a message field, assign the value of the old field to the new, then unset the old field. For example:

    ```shell
    $my_new_field = $mike_old_field;
    unset($mike_old_field);
    ```

- To use conditional rewrites, you can either:
    - embed the filterx block in an [if-else block]({{< relref "/chapter-routing-filters/logpath/concepts-if-else-conditional-expressions/_index.md" >}}), or
    - use [value comparison in the filterx block]({{< relref "/filterx/filterx-comparing/_index.md" >}}) to select the appropriate messages. For example, to rewrite only messages of the NGINX application, you can:

        ```shell
        ${PROGRAM} == "nginx";
        # <your rewrite expression>
        ```

### Create an iptables parser

The following example shows you how to reimplement the {{% xref "/chapter-parsers/parser-iptables/_index.md" %}} in a filterx block. The following is a sample iptables log message (with line-breaks added for readability):

```shell
Dec 08 12:00:00 hostname.example kernel: custom-prefix:IN=eth0 OUT=
MAC=11:22:33:44:55:66:aa:bb:cc:dd:ee:ff:08:00 SRC=192.0.2.2 DST=192.168.0.1 LEN=40 TOS=0x00
PREC=0x00 TTL=232 ID=12345 PROTO=TCP SPT=54321 DPT=22 WINDOW=1023 RES=0x00 SYN URGP=0
```

This is a normal RFC3164-formatted log message which comes from the kernel (where iptables logging messages originate), and contains space-separated key-value pairs.

1. First, create some filter statements to select only iptables messages:

    ```shell
    block filterx() parse_iptables {
        ${FACILITY} == "kern"; # Filter on the kernel facility
        ${PROGRAM} == "kernel"; # Sender application is the kernel
        ${MESSAGE} =~ "PROTO="; # The PROTO key appears in all iptables messages
    }
    ```

1. To make the parsed data available under macros beginning with `${.iptables}`, like in the case of the original `iptables-parser()`, create the `${.iptables}` JSON object.

    ```shell
    block filterx() parse_iptables {
        ${FACILITY} == "kern"; # Filter on the kernel facility
        ${PROGRAM} == "kernel"; # Sender application is the kernel
        ${MESSAGE} =~ "PROTO="; # The PROTO key appears in all iptables messages

        ${.iptables} = json(); # Create an empty JSON object
    }
    ```

1. Add a key=value parser to parse the content of the messages into the `${.iptables}` JSON object. The key=value pairs are space-separated, while equal signs (=) separates the values from the keys.

    ```shell
    block filterx() parse_iptables {
        ${FACILITY} == "kern"; # Filter on the kernel facility
        ${PROGRAM} == "kernel"; # Sender application is the kernel
        ${MESSAGE} =~ "PROTO="; # The PROTO key appears in all iptables messages

        ${.iptables} = json(); # Create an empty JSON object

        ${.iptables} = parse_kv(${MESSAGE}, value_separator="=", pair_separator=" ");
    }
    ```

    <!-- FIXME show json from sample message
    -->

## Update filters and rewrites to filterx

The following sections show you how you can change your existing filters and rewrite rules to filterx statements. Note that:

- Many examples in the filterx documentation were adapted from the existing filter, parser, and rewrite examples to show how you can achieve the same functionality with fiterx.
- Don't worry if you can't update something to filterx. While you can't use other blocks within a filterx block, you can use both in a log statement, for example, you can use a filterx block, then a parser if needed.
- There is no push to use filterx. You can keep using the traditional blocks if they satisfy your requirements.

### Update filters to filterx

This section shows you how to update your existing `filter` expressions to `filterx`.

Filter functions: You can replace most filter functions with a simple value comparison with the appropriate macro, for example:

- `facility(user)` with `${FACILITY} == "user"`
- `host("example-host")` with `${HOST} == "example-host"`
- `level(warning)` with `${LEVEL} == "warning"`

    If you want to check for a range of levels, use numerical comparison with the `${LEVEL_NUM}` macro instead. For a list of numerical level values, see {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md#macro-level-num" %}}.

- `message("example")` with `${MESSAGE} =~ "example"` (see the [equal tilde operator]({{< relref "/filterx/operator-reference.md#regexp" >}}) for details)
- `program(nginx)` with `${PROGRAM} == "nginx"`
- `source(my-source)` with `${SOURCE} == "my-source"`

You can [compare values]({{< relref "/filterx/filterx-comparing/_index.md" >}}) and use [boolean operators]({{< relref "/filterx/filterx-boolean/_index.md" >}}) similarly to filters.

Since all filterx statements must match a message to pass the filterx block, often you can change complex boolean filter expressions into multiple, more simple filterx statements. For example, consider the following filter statement:

```shell
filter demo_filter { host("example1") and program("nginx"); };
```

The following is the same filterx statement:

```shell
filterx demo_filterx { ${HOST} == "example1" and ${PROGRAM} == "nginx"; };
```

which is equivalent with:

```shell
filterx demo_filterx {
    ${HOST} == "example1";
    ${PROGRAM} == "nginx";
};
```

```shell
filter demo_filter { not host("example1") and not host("example2"); };
```

The following filter functions have no equivalents in filterx yet:

- The `[filter()` filter function]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-filter/_index.md" >}}). You can't call a filterx block from another filterx block, but you can [access name-value pairs and pass variables](#scoping) from multiple filterx blocks.
- [`netmask()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-netmask/_index.md" >}}) and [`netmask6()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-netmask6/_index.md" >}})
- [`inlist()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-inlist/_index.md" >}})
- [`rate-limit()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-rate-limit/_index.md" >}})
- [`tags()`]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-tags/_index.md" >}})

<!-- Update rewrite rules


Replacing message parts (rewrite(subst)) > regexp_subst {#regexp-subst})

Setting message fields to specific values > [assign values](#assign-values)

set-severity(), set-facility() set-pri() rewrite functions > no equivalent

Setting match variables with the set-matches() rewrite rule
    > I don't even get what this does

Unsetting message fields
    > [delete values](#delete-values)

Renaming message fields
    > see use cases

Creating custom SDATA fields
    > see use cases / assign values

Setting multiple message fields to specific values
    > no equivalent

map-value-pairs: Rename value-pairs to normalize logs
    > Does the simple rename cover that, or no equivalent?

Conditional rewrites
    > see use cases

Rewrite the timezone of a message
    > ?

Anonymizing credit card numbers
    > no equivalent, but can be replicated using some regexp_subst expressions, see the scl for details tmp/axosyslog/scl/rewrite/cc-mask.conf

add/delete tags: do we need here a round-trip here like this, or is it working without that?: 
    temp-tags = json-array($TAGS);
    temp-tags += "new-tag";
    $TAGS = format_csv(temp-tags);

    - How can you delete an element with a specific value from a list (not by index)
        like this in python:
            thislist = ["apple", "banana", "cherry"]
            thislist.remove("banana")
 -->

<!-- FIXME group-by like contexts and similar don't work yet -->
