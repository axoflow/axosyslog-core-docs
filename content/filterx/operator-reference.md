---
title: Filterx operator reference
linkTitle: Operators
weight: 4800
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

<!-- Operator reference, required arguments, options/flags, examples from tests, ... -->

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
