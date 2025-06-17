---
title: FilterX operator reference
linkTitle: Operators
weight: 2000
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->



This page describes the operators you can use in [FilterX blocks]({{< relref "/filterx/_index.md" >}}).

## Arithmetic operators

Available in {{< product >}} 4.12 and later.

The `+` (addition), `-` (substraction), `*` (multiplication), `/` (division), and `%` (modulo) operators allow you to perform arithmetic operations on numeric (integer or double) values. For example:

```sh
if (3 - 3 == 0) { ... }
if (3.0 * 3 == 9.0) { ... }
if (3.0 / 3.0 == 1.0) { ... }
if (4 % 3 == 1) { ... }
```

Note that:

- The `%` operator only accepts integer values.
- If one operand is integer and the other is double, the result will be double.
- The `+` operator can add strings and other types as well, for details, see the [Plus operator]({{< relref "#plus-operator" >}}).
- To increase the value of a variable, see the [Plus equal operator]({{< relref "#plus-equal-operator" >}}).

### Plus operator

{{< include-headless "chunk/filterx-plus-operator.md" >}}

### Plus equal operator

The `+=` operator increases the value of a variable with the value on the right. Exactly how the addition happens depends on the type of the variable.

- For numeric types (`int` and `double`), the result is the sum of the values. For example:

    ```shell
    a = 3;
    a += 4;
    # a is 7

    b = 3.3;
    b += 4.1;
    # b is 7.4
    ```

    Adding a double value to an integer changes the integer into a double:

    ```shell
    c = 3;
    c += 4.1;
    # c is 7.1 and becomes a double
    ```

- For strings (including string values in an object), it concatenates the strings. For example:

    ```shell
    mystring = "axo";
    mystring += "flow";
    # mystring is axoflow
    ```

- For lists, it appends the new values to the list. For example:

    ```shell
    mylist = json_array(["one", "two"]);
    mylist += ["let's", "go"];
    # mylist is ["one", "two", "let's", "go"]
    ```

- For datetime variables, it increments the time. Note that you can add only integer and double values to a datetime, and:

    - When adding an integer, it must be the number of microseconds you want to add. For example:

        ```shell
        d = strptime("2000-01-01T00:00:00Z", "%Y-%m-%dT%H:%M:%S%z");
        d += 3600000000; # 1 hour in microseconds
        # d is "2000-01-01T01:00:00.000+00:00"
        ```

    - When adding a double, the integer part must be the number of seconds you want to add. For example:

        ```shell
        d = strptime("2000-01-01T00:00:00Z", "%Y-%m-%dT%H:%M:%S%z");
        d += 3600.000; # 3600 seconds, 1 hour
        # d is "2000-01-01T01:00:00.000+00:00"
        ```

## Comparison operators

Comparison operators allow you to compare values of macros, variables, and expressions as numbers (`==, <, <=, >=, >, !=`) or as strings
(`eq, lt, le, gt, ge, ne`). You can also check for type equality (`===`) and strict inequality (`!==`). For details and examples, see {{% xref "/filterx/filterx-comparing/_index.md" %}}.

## Boolean operators

The `not`, `or`, `and` operators allow you to combine any number of comparisons and expressions. For details and examples, see {{% xref "/filterx/filterx-boolean/_index.md" %}}.

## Assign if non-null (=??) operator {#assign-non-null}

Available in {{< product >}} 4.10 and later.

Assigns the right operand to the left operand if the right operand is not null. Note that evaluation errors of the right-hand operand will be suppressed.

```shell
left-operand =?? right-operand
```

For example:

```shell
`resource.attributes['service.name'] =?? $PROGRAM;`
```

Using the `=??` operator is equivalent to the following expression, but using `=??` has better performance.

```code
if (isset($PROGRAM) ?? false) {
    resource.attributes['service.name'] = $PROGRAM;
};

## Null coalescing operator

The [null coalescing operator](https://en.wikipedia.org/wiki/Null_coalescing_operator) returns the result of the left operand if it exists and is not null, otherwise it returns the operand on the right.

```shell
left-operand ?? right-operand
```

You can use it to define a default value, or to handle errors in your FilterX statements: if evaluating the left-side operand returns an error, the right-side operand is evaluated instead.

For example, if a key of a JSON object doesn't exist for every message, you can set it to a default value:

```shell
${MESSAGE} = json["BODY"] ?? "Empty message"
```

## List membership operator

{{< include-headless "chunk/filterx-list-membership-operator.md" >}}

## Regexp match (equal tilde) {#regexp}

To check if a value contains a string or matches a regular expression, use the `=~` operator. For example, the following statement is true if the `${MESSAGE}` contains the word `error`:

```shell
${MESSAGE} =~ "error";
```

Use the `!~` operator to check if a literal string or variable doesn't contain an expression. For example, the following statement is true if the `${MESSAGE}` doesn't contain the word `error`:

```shell
${MESSAGE} !~ "error";
```

{{% alert title="Note" color="info" %}}

- If you want to process the matches of a search, use the {{% xref "/filterx/function-reference.md#regexp-search" %}} FilterX function.
- If you want to rewrite or modify the matches of a search, use the {{% xref "/filterx/function-reference.md#regexp-subst" %}} FilterX function.

{{% /alert %}}

{{< include-headless "chunk/filterx-regexp-notes.md" >}}

<!-- FIXME add some more complex regex examples -->

<!-- 
FIXME what is relevant/applicable from /chapter-manipulating-messages/regular-expressions/ ?

Is there a workaround for wildcards/globbing? /chapter-routing-filters/filters/regular-expr/_index.md ?
-->

## Ternary conditional operator

The [ternary conditional operator](https://en.wikipedia.org/wiki/Ternary_conditional_operator) evaluates an expression and returns the first argument if the expression is true, and the second argument if it's false.

Syntax:

```shell
<expression> ? <return-if-true> : <return-if-false>
```

For example, the following example checks the value of the `${LEVEL_NUM}` macro and returns `low` if it's lower than 5, `high` otherwise.

```shell
(${LEVEL_NUM} < 5 ) ? "low" : "high";
```

You can also use it to check if a value is set, and set it to a default value if it isn't, but for this use case we recommend using the [Null coalescing operator](#null-coalescing-operator):

```shell
${HOST} = isset(${HOST}) ? ${HOST} : "default-hostname"
```
