---
title: "Comparing values in FilterX"
linkTitle: "Comparing values"
weight:  500
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{< include-headless "chunk/filterx-experimental-banner.md" >}}

In {{% param "product.abbrev" %}} you can compare macro values, templates, and variables as numerical and string values. String comparison is alphabetical: it determines if a string is alphabetically greater than or equal to another string. For details on macros and templates, see {{% xref "/chapter-manipulating-messages/customizing-message-format/_index.md" %}}.

Use the following syntax to compare macro values or templates.

```shell
filterx {
  "<macro-or-variable-or-expression>" operator "<macro-or-variable-or-expression>";
};
```

## String and numerical comparison

You can use mathematical symbols as operators (like `==, !=, >=`), and based on the type of the arguments {{% param "product.abbrev" %}} automatically determines how to compare them. The logic behind this is similar to JavaScript:

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

    The left side is not type-cast, the right side is a string, so the comparison is string.

{{% alert title="Note" color="info" %}}
You can use [string operators](#comparison-operators) if you want to, they are still available for backwards compatibility.
{{% /alert %}}

## Example: Compare macro values {#example-comparison}

The following expression selects log messages that contain a PID (that is, the `${PID}` macro is not empty):

```shell
filterx {
    ${PID};
};
```

(It is equivalent to using the `isset()` function: `isset(${PID});`).

The following expression selects log messages where the priority level is not `emerg`.

```shell
filterx {${LEVEL} != "emerg"; };
```


The following example selects messages with priority level higher than 5.

```shell
filterx {
    ${LEVEL_NUM} > 5;
};
```

Make sure to:

- Enclose literal strings and templates in double-quotes. For macros and variables do not use quotes.
- Use the `$` character before macros.

Note that you can use:

- type casting anywhere where you can use templates to apply a type to the result of the template expansion.
- any macro in the expression, including user-defined macros from parsers and classifications.
- boolean operators to combine comparison expressions.

## Compare the type (strict equality) {#strict-equality}

To compare the values of operands and verify that they have the same type, use the `===` (strict equality) operator. The following example defines a string variable with the value "5" as string and uses it in different comparisons:

```shell
mystring = "5"; # Type is string
mystring === 5; # false, because the right-side is an integer
mystring === "5"; # true
};
```

To compare only the types of variables and macros, you can use the [`istype` function]({{< relref "/filterx/function-reference.md#istype" >}}).
<!-- FIXME examples -->

## Strict inequality operator

Compares the values of operands and returns `true` if they are different. Also returns `true` if the value of the operands are the same, but their type is different. For example:

```shell
"example" !== "example"; # False, because they are the same and both are strings
"1" !== 1; # True, because one is a string and the other an integer
```

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
| !==               |                 | Not equal to or has different type |

<!-- FIXME add links to the relevant sections, maybe move this table to the top of the page? -->