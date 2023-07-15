---
title: "Specifying data types in value-pairs"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Prior to version 4.0, {{% param "product.abbrev" %}} handled every data as strings, and allowed you to convert the strings into other types of data that only certain destinations data formats supported. For example, SQL, MongoDB, JSON, or AMQP support data types like numbers or dates. The {{% param "product.abbrev" %}} application allows you to specify the data type in templates (this is also called type-hinting or type-casting). If the destination driver supports data types, {{% param "product.abbrev" %}} converts the incoming data to the specified data type. For example, this allows you to store integer numbers as numbers in MongoDB, instead of strings.

Starting with {{% param "product.abbrev" %}} 4.0, each name-value pair is a (name, type, value) triplet, and several components of {{% param "product.abbrev" %}} have typing support, for example, `json-parser()` and the `$(format-json)` template function. For details, see the [list of supported data types](#data-types).

## Using explicit type-hinting

You can explicitly type-cast a {{% param "product.abbrev" %}} template to a specific type. To use type-hinting, enclose the macro or template containing the data with the type: `<datatype>("<macro>")`, for example: `int("$PID")`. See the [Type-hinting examples](#type-hinting-examples) and the [list of supported data types](#data-types) for details.

{{% alert title="Warning" color="warning" %}}
Hazard of data loss! If {{% param "product.abbrev" %}} cannot convert the data into the specified type, an error occurs, and {{% param "product.abbrev" %}} drops the message by default. To change how {{% param "product.abbrev" %}} handles data-conversion errors, see [Global options]({{< relref "/chapter-global-options/reference-options/_index.md" >}}).
{{% /alert %}}

Not every destination or other component supports data types. For details, see the [list of {{% param "product.abbrev" %}} components that support data types](#data-types-components).

## Type-hinting examples {#type-hinting-examples}

The following example stores the MESSAGE, PID, DATE, and PROGRAM fields of a log message in a MongoDB database. The DATE and PID parts are stored as numbers instead of strings.

```shell
   mongodb(
        value-pairs(pair("date", datetime("$UNIXTIME"))
            pair("pid", int64("$PID"))
            pair("program", "$PROGRAM"))
            pair("message", "$MESSAGE"))
        )
    );
```

The following example formats the same fields into JSON.

```shell
   $(format-json date=datetime($UNIXTIME) pid=int64($PID) program=$PROGRAM message=$MESSAGE)
```

The following example formats the MESSAGE field as a JSON list.

```shell
   $(format-json message=list($MESSAGE))"
```

## Data types in {{% param "product.abbrev" %}} {#data-types}

The {{% param "product.abbrev" %}} application currently supports the following data-types.

- `boolean`: Converts the data to a boolean value. Anything that begins with a `t` or `1` is converted to true, anything that begins with an `f` or `0` is converted to false.
- `datetime`: Use it only with UNIX timestamps, anything else will likely result in an error. This means that currently you can use only the `$UNIXTIME` macro for this purpose.
- `double`: A floating-point number.
- `json`: A JSON snippet. (Available in {{% param "product.abbrev" %}} 4.0 and later.)
- `literal`: The data as a literal string, without adding any quotes or escape characters.
- `list`: The data as a list. For details, see the list manipulation template functions in {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" %}}.
- `null`: An unset value.
- `int` or `int32`: 32-bit integer.
- `int64`: 64-bit integer.
- `string`: The data as a string.

## Components that support data types {#data-types-components}

In {{% param "product.abbrev" %}} 4.0 and later, the following {{% param "product.abbrev" %}} components that support data types. Other components treat every data as strings.

- Comparisons in filter expressions: the previously numeric operators are type-aware. The exact comparison depends on the types associated with the values you compare. For details, see {{% xref "/chapter-routing-filters/filters/filters-comparing/_index.md" %}}.
- `json-parser()` and the `$(format-json)` template function: When using the `json-parser()`, {{% param "product.abbrev" %}} converts all elements of the JSON object to name-value pairs. Any type information originally present in the incoming JSON object is retained, and automatically propagated to other {{% param "product.abbrev" %}} components (for example, a destination) if they support types.
   - Elements without a type are treated as strings.
   - JSON lists (arrays) are converted to {{% param "product.abbrev" %}} lists, so you can manipulate them using the [`$(list-*)` template functions]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md#template-function-list" >}}).

- `set()`, `groupset()`: Where you can use of templates in `set()` and `groupset()`, you can use type-casting, and the type information is properly promoted.
- `db-parser()`: The `db-parser()` rules can associate types with values using the `"type"` attribute, for example:
    ```xml
    <value name="foobar" type="integer">$PID</value>
    ```

    The `integer` is a type-cast that associates `$foobar` with an integer type. `db-parser()`’s internal parsers (for example, `@NUMBER@`) automatically associate type information to the parsed name-value pair.

- `add-contextual-data()`: Name-value pairs that are populated using `add-contextual-data()` propagate type information, similarly to `db-parser()`.
- `map-value-pairs()`: `map-value-pairs()` propagates type information.
- SQL type support: The `sql()` driver supports types, so that columns with specific types are stored as those types.
- Template type support: You can cast templates explicitly to a specific type. Templates also propagate type information from macros, template functions, and values in the template string.
- `python()` typing: All Python components (sources, destinations, parsers, and template functions) support all data types, except `json()`.
- On-disk serialized formats (that is, disk buffer): Version 4.0 and newer are compatible with messages serialized with an earlier version, and the format is compatible for downgrades as well. This means that even if a newer version of {{% param "product.abbrev" %}} serialized a message, older versions and associated tools are able to read it (but drop the type information of course).
