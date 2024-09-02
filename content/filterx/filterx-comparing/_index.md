---
title: "Comparing values in filterx"
linkTitle: "Comparing values"
weight:  500
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

In {{% param "product.abbrev" %}} you can compare macro values, templates, and variables as numerical and string values. String comparison is alphabetical: it determines if a string is alphabetically greater than or equal to another string. For details on macros and templates, see {{% xref "/chapter-manipulating-messages/customizing-message-format/_index.md" %}}.

Use the following syntax to compare macro values or templates.

```shell
filterx <filter-id>
    {"<macro-or-variable-or-expression>" operator "<macro-or-variable-or-expression>";};
```

## String and numerical comparison

You can use mathematical symbols as operators (like `==, !=, >=`), and based on the type of the arguments {{% param "product.abbrev" %}} automatically determines how to compare them. The logic behind that is similar to JavaScript:

- If both sides of the comparisons are strings, then the comparison is string.
- If one of the arguments is numeric, then the comparison is numeric.
- Literal numbers (numbers not enclosed in quotes) are numeric.
- You can explicitly type-cast an argument into a number.
- The `bytes`, `json`, and `protobuf` types are always compared as strings.
- Currently you can't compare dictionaries and lists.

For example:

- `if (${.apache.httpversion} == 1.0)`

    The right side of the `==` operator is 1.0, which is a floating point literal (double), so the comparison is numeric.

- `if (double(${.apache.httpversion}) == "1.0")`

    The left side is explicitly type cast into double, the right side is string (because of the quotes), so the comparison is numeric.

- `if (${.apache.request} == "/wp-admin/login.php")`

    The left side is not type-cast, so it's a string, the right side is a string, so the comparison is string.

> Note: You can use [string operators](#comparison-operators) if you want to, they are available for compatibility.

## Example: Compare macro values {#example-comparison}

The following expression selects log messages containing a PID (that is, `${PID}` macro is not empty):

```shell
filterx f_pid {
    ${PID};
};
```

(It is equivalent to using the `isset()` function: `isset(${PID});`).

The following expression selects log messages that do not contain a PID. Also, it uses a template as the left argument of the operator and compares the values as strings:

```shell
filterx f_pid {"${HOST}${PID}" == ${HOST}; };
```

This is equivalent to concatenating the `${HOST}` and `${PID}` values into a single string using the `+` operator:

```shell
filterx f_pid { ${HOST} + string(${PID}) == ${HOST}; };
```

The following expression selects log messages that do not contain a PID. Also, it uses a template as the left argument of the operator and compares the values as strings:

```shell
filterx f_pid {"${HOST}${PID}" == ${HOST} };
```

The following example selects messages with priority level higher than 5.

```shell
filterx f_level {
    ${LEVEL_NUM} > 5;
};
```

<!-- FIXME more filterx-specific examples? -->

Make sure to:

- Enclose strings and templates in double-quotes.
- Use the `$` character before macros.

Note that:

- You can use type casting anywhere where you can use templates to apply a type to the result of the template expansion.
- Using comparator operators can be equivalent to using filter functions, but is somewhat slower. For example, using `"${HOST}" == "myhost"` is equivalent to using `host("myhost" type(string))`.
- You can use any macro in the expression, including user-defined macros from parsers and classifications.
- The results of filter functions are boolean values, so they cannot be compared to other values.
- You can use boolean operators to combine comparison expressions.

## Compare the type

To compare the values of operands and verify that they have the same type, use the `===` operator. The following example defines a string variable with the value "5" as string and uses it in different comparisons:

```shell
mystring = "5"; # Type is string
mystring === 5; # false, because the right-side is an integer
mystring === "5"; # true
};
```

To compare only the type, you can use the [`istype` function]({{< relref "/filterx/function-reference.md#istype" >}}).
<!-- FIXME examples -->

## Comparison operators

The following numerical and string comparison operators are available.

| Numerical or string operator | String operator | Meaning               |
| ------------------ | --------------- | --------------------- |
| ==                | eq              | Equals                |
| !=                | ne              | Not equal to          |
| >                 | gt              | Greater than          |
| <                 | lt              | Less than             |
| >=                | ge              | Greater than or equal |
| =<                | le              | Less than or equal    |
| ===               |                 | Equals and has the same type |
