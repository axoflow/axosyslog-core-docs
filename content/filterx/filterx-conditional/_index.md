---
title: Conditional statements
weight: 525
---

A conditional statement ( `if (expr) { ... } elif (expr) {} else { ... };`) allows you to evaluate complex decision trees. For example:

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

Starting with version 4.10, you can also use switch-case expressions. Switch-case expressions allow you to better organize the code instead of using multiple `if`, `elif`, `else` blocks. Using switch-case expressions also improves performance.

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

Note that:

- Cases with literal string targets are stored in a map, and the lookup is started with them.
- Case targets can contain any expressions, and they are evaluated in order.
- Literal string and default target duplications are checked and will cause init failure. Non-literal expression targets are not checked, and only the first matching case will be executed.
