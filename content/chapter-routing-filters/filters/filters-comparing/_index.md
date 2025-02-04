---
title: "Comparing macro values in filters"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

In {{% param "product.abbrev" %}} you can compare macro values and templates as numerical and string values. String comparison is alphabetical: it determines if a string is alphabetically greater or equal to another string. For details on macros and templates, see {{% xref "/chapter-manipulating-messages/customizing-message-format/_index.md" %}}.

Use the following syntax to compare macro values or templates.

```shell
filter <filter-id>
    {"<macro-or-template>" operator "<value-or-macro-or-template>"};
```

## String and numerical comparison

{{% param "product.abbrev" %}} versions earlier than 4.0 used separate operators for string comparisons (for example, `eq`). In version 4.0 and later, you can simply use the mathematical symbols as operators (like `==, !=, >=`), and {{% param "product.abbrev" %}} automatically determines how to compare the arguments from their type. The logic behind that is similar to JavaScript:

- If both sides of the comparisons are strings, then the comparison is string.
- If one of the arguments is numeric, then the comparison is numeric.
- Literal numbers (numbers not enclosed in quotes) are numeric.
- You can explicitly type-cast an argument into a number.

For example:

- `if ("${.apache.httpversion}" == 1.0)`

    The right side of the == operator is 1.0, which is a floating point literal, so the comparison is numeric.

- `if (double("${.apache.httpversion}") == "1.0")`

    The left side is explicitly type cast into double, the right side is string (because of the quotes), so the comparison is numeric.

- ```if ("${.apache.request}" == "/wp-admin/login.php")```

    The left side is not type-cast, so it's a string, the right side is a string, so the comparison is string.

> Note: You can still use the old string operators if you want to, they are available for backwards compatibility.

## Example: Comparing macro values in filters {#example-comparison}

The following expression selects log messages containing a PID (that is, `${PID}` macro is not empty):

```shell
filter f_pid {"${PID}" != ""};
```

The following expression selects log messages that do not contain a PID. Also, it uses a template as the left argument of the operator and compares the values as strings:

```shell
filter f_pid {"${HOST}${PID}" == "${HOST}"};
```

The following example selects messages with priority level higher than 5.

```shell
filter f_level {"${LEVEL_NUM}" > 5};
```

Make sure to:

- Enclose macros and templates in double-quotes.
- Use the `$` character before macros.

Note that:

- You can use type casting anywhere where you can use templates to apply a type to the result of the template expansion.
- Using comparator operators can be equivalent to using filter functions, but is somewhat slower. For example, using `"${HOST}" == "myhost"` is equivalent to using `host("myhost" type(string))`.
- You can use any macro in the expression, including user-defined macros from parsers and results of pattern database classifications.
- The results of filter functions are boolean values, so they cannot be compared to other values.
- You can use boolean operators to combine comparison expressions.

## Comparison operators

The following numerical and string comparison operators are available.

{{% include-headless "chunk/table-comparison-operators-routing-filters.md" %}}
