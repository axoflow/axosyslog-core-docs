---
title: "Conditional statements in FilterX"
linkTitle: "Conditional statements"
description: "Build decision trees in FilterX with if, elif, and else statements, or with switch-case expressions that also support integer ranges."
weight: 700
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

FilterX has two kinds of conditional statements: `if`, `elif`, and `else` statements, and `switch`-`case` statements. The conditions can use any FilterX expression, for example, [comparisons]({{< relref "/filterx/filterx-comparing/_index.md" >}}) and [boolean operators]({{< relref "/filterx/filterx-boolean/_index.md" >}}). A condition is true if its value is [truthy]({{< relref "/filterx/filterx-language/_index.md#truthy-falsy" >}}).

To do the same outside FilterX, see {{% xref "/chapter-manipulating-messages/modifying-messages/conditional-rewrite/_index.md" %}}.

## if, elif, and else statements {#if-elif-else}

A conditional statement ( `if (expr) { ... } elif (expr) {} else { ... };`) allows you to evaluate complex decision trees. For example:

```shell
if (${PRI} == "alert") {
  event.severity = 1;
} elif (${PRI} == "critical") {
  event.severity = 2;
} elif (${PRI} == "error") {
  event.severity = 3;
} elif (${PRI} == "warning") {
  event.severity = 4;
} elif (${PRI} == "notice") {
  event.severity = 5;
} elif (${PRI} == "information") {
  event.severity = 6;
} else {
  event.severity = 7;
};
```

## switch-case statements {#switch}

Available in {{< product >}} 4.10 and later.

Switch-case statements select one of several cases based on the value of an expression. Use them instead of a long chain of `if` and `elif` blocks that compare the same value: the code is easier to read, and it's also faster.

Usage:

```shell
switch (<expression-or-variable>) {
  case "literal-string1":
    ...
    break;
  case "literal-string2":
    ...
    break;
  case <expression>:
    ...
    break;
  default:
    ...
    break;
};
```

For example:

```shell
switch ($MESSAGE) {
  case "foobar":
    $MESSAGE = "literal-case";
    break;
  case any_expression:
    $MESSAGE = "variable-case";
    break;
  default:
    $MESSAGE = "default";
    break;
};
```

### Ranges in case targets {#switch-ranges}

Available in {{< product >}} 4.26 and later.

If the value of the `switch` expression is an integer, you can use ranges as case targets, for example:

```shell
switch (${values.int}) {
  case 1..4:
    result = "within range";
    break;
  case 5:
    result = "exact value";
    break;
  default:
    result = "default";
    break;
};
```

### How FilterX selects the case {#switch-matching}

- FilterX checks the literal string targets first. It finds them directly, without checking them one by one, so these cases are the fastest.
- FilterX evaluates the other targets in their order in the configuration, and executes the first matching case.
- If none of the cases match, FilterX executes the `default` case. If there's no `default` case, FilterX executes no case.
- Two cases with the same literal string target, or two `default` cases, are a configuration error. FilterX doesn't check the duplicates of other targets.

### The break statement in switch-case {#break}

FilterX executes the statements of the matching case until the next `break` statement, or the end of the `switch` block. Without a `break` statement at the end of a case, the execution continues with the next case, the same way as in C.

In version 4.30 and later:

- `break` leaves the innermost `switch` block that contains it, also from a nested block of the case, for example, from an `if` block. In earlier versions, `break` left only the innermost block.
- A `break` statement outside a `switch` block is a configuration error (`break statement not within a switch`).

For example, the following `break` leaves the `switch` block, so FilterX doesn't set `$MESSAGE` to `default`:

```shell
switch ($PROGRAM) {
  case "sshd":
    if ($MESSAGE =~ "Failed password") {
      $MESSAGE = "ssh-login-failure";
      break;
    };
  default:
    $MESSAGE = "default";
    break;
};
```

If an `sshd` message doesn't match the `if` condition, the execution continues with the `default` case, because the `sshd` case has no `break` statement at its end.

## How conditional statements affect the message {#message-flow}

Like every FilterX statement, a conditional statement is either truthy or falsy, and if a statement is falsy, {{< product >}} drops the message from the log path. For details, see [Truthy and falsy values]({{< relref "/filterx/filterx-language/_index.md#truthy-falsy" >}}).

- If the condition of an `if` statement is false, and there's no `else` block, the statement is truthy, so the message continues.
- If the condition is true, or there's an `else` block, the statement has the value of the block that FilterX executed. For example, if the last statement of the executed block is falsy, {{< product >}} drops the message.
- If {{< product >}} can't evaluate the condition, for example, because it refers to a dictionary key that doesn't exist, the statement fails, and {{< product >}} drops the message. To avoid it, check the field with [`isset()`]({{< relref "/filterx/function-reference.md#isset" >}}) first, or use the [`??` operator]({{< relref "/filterx/operator-reference.md#null-coalescing-operator" >}}).
- If none of the cases of a `switch` statement match, and there's no `default` case, the statement is truthy, so the message continues.
