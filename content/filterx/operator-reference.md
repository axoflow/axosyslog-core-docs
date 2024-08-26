---
title: Filterx operator reference
linkTitle: Operators
weight: 4800
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

<!-- Operator reference, required arguments, options/flags, examples from tests, ... -->

## Comparison operators

Comparison operators allow you to compare values of macros, variables, and expressions as numbers (`==, <, <=, >=, >, !=`) and strings
(`eq, lt, le, gt, ge, ne`). You can also check for type equality (`===`). For details and examples, see {{% xref "/filterx/filterx-comparing/_index.md" %}}.

## Boolean operators

The `not`, `or`, `and` operators allow you to combine comparisons and expressions. For details and examples, see {{% xref "/filterx/filterx-boolean/_index.md" %}}.

## Null coalescing operator

The [null coalescing operator](https://en.wikipedia.org/wiki/Null_coalescing_operator) returns the result of the left operand if it exists and is not null, otherwise it returns the right-most operand.

```shell
left-operand ?? right-operand
```

You can use it to define a default value, or to handle errors in your filterx statements: if evaluating the left-side operand returns an error, the right-side operand is evaluated instead.

For example, if a key of a JSON object doesn't exist for every message, you can set it to a default value:

```shell
${MESSAGE} = json.["BODY"] ?? "Empty message"
```

## Regexp match {#regexp}

To check if a value contains a string or a regular expression, use the `=~` operator. For example, the following statement is true if the `${MESSAGE}` contains the word `error`:

```shell
${MESSAGE} =~ "error";
```

Use the `!~` operator to check if a value doesn't contain an expression. For example, the following statement is true if the `${MESSAGE}` doesn't contain the word `error`:

```shell
${MESSAGE} !~ "error";
```

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
<expression>?<return-if-true>:<return-if-false>
```

For example, the following example checks the value of the `${LEVEL_NUM}` macro and returns `low` if it's lower than 5, `high` otherwise.

```shell
(${LEVEL_NUM} < 5 )?"low":"high";
```

You can also use it to check if a value is set, and set it to a default value if it doesn't:

```shell
${HOST} = isset(${HOST})?${HOST}:"default-hostname"
```
