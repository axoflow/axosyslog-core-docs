---
title: "Specifying data types in value-pairs"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

By default, {{% param "product.abbrev" %}} handles every data as strings. However, certain destinations and data formats (for example, SQL, MongoDB, JSON{{% conditional-text include-if="ose" %}}, AMQP{{% /conditional-text %}}) support other types of data as well, for example, numbers or dates. The {{% param "product.abbrev" %}} application allows you to specify the data type in templates (this is also called type-hinting). If the destination driver supports data types, it converts the incoming data to the specified data type. For example, this allows you to store integer numbers as numbers in MongoDB, instead of strings.

{{% alert title="Warning" color="warning" %}}

Hazard of data loss\! If {{% param "product.abbrev" %}} cannot convert the data into the specified type, an error occurs, and {{% param "product.abbrev" %}} drops the message by default. To change how {{% param "product.abbrev" %}} handles data-conversion errors, see [Global options]({{< relref "/docs/chapter-global-options/reference-options/_index.md" >}}).

{{% /alert %}}

To use type-hinting, enclose the macro or template containing the data with the type: `\<datatype\>("\<macro\>")`, for example: `int("$PID")`.

Currently the `mongodb()` destination and the `format-json` and `format-flat-json()` template functions support data types.


## Example: Using type-hinting

The following example stores the MESSAGE, PID, DATE, and PROGRAM fields of a log message in a MongoDB database. The DATE and PID parts are stored as numbers instead of strings.

```c
   mongodb(
        value-pairs(pair("date", datetime("$UNIXTIME"))
            pair("pid", int64("$PID"))
            pair("program", "$PROGRAM"))
            pair("message", "$MESSAGE"))
        )
    );

```

The following example formats the same fields into JSON.

```c
   $(format-json date=datetime($UNIXTIME) pid=int64($PID) program=$PROGRAM message=$MESSAGE)

```

The following example formats the MESSAGE field as a JSON list.

```c
   $(format-json message=list($MESSAGE))"

```


The {{% param "product.abbrev" %}} application currently supports the following data-types.

  - `boolean`: Converts the data to a boolean value. Anything that begins with a `t` or `1` is converted to true, anything that begins with an `f` or `0` is converted to false.

  - `datetime`: Use it only with UNIX timestamps, anything else will likely result in an error. This means that currently you can use only the `$UNIXTIME` macro for this purpose.

  - `double`: A floating-point number.

  - `literal`: The data as a literal string, without adding any quotes or escape characters.

  - `list`: The data as a list. For details, see the list manipulation template functions in {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" %}}.

  - `int` or `int32`: 32-bit integer.

  - `int64`: 64-bit integer.

  - `string`: The data as a string.
