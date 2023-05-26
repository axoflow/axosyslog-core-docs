---
title: "Comparing macro values in filters"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with {{% param "product.abbrev" %}} version 3.2, it is also possible to compare macro values and templates as numerical and string values. String comparison is alphabetical: it determines if a string is alphabetically greater or equal to another string. Use the following syntax to compare macro values or templates. For details on macros and templates, see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/_index.md" %}}.

```c
   filter <filter-id>
            {"<macro-or-template>" operator "<value-or-macro-or-template>"};
```


## Example: Comparing macro values in filters {#example-comparison}

The following expression selects log messages containing a PID (that is, `${PID}` macro is not empty):

```c
   filter f_pid {"${PID}" !=""};
```

The following expression selects log messages that do not contain a PID. Also, it uses a template as the left argument of the operator and compares the values as strings:

```c
   filter f_pid {"${HOST}${PID}" eq "${HOST}"};
```

The following example selects messages with priority level higher than 5.

```c
   filter f_level {"${LEVEL_NUM}" > "5"};
```


Note that:

  - The macro or template must be enclosed in double-quotes.

  - The `$` character must be used before macros.

  - Using comparator operators can be equivalent to using filter functions, but is somewhat slower. For example, using `"${HOST}" eq "myhost"` is equivalent to using `host("myhost" type(string))`.

  - You can use any macro in the expression, including user-defined macros from parsers and results of pattern database classifications.

  - The results of filter functions are boolean values, so they cannot be compared to other values.

  - You can use boolean operators to combine comparison expressions.

The following operators are available:

{{% include-headless "chunk/table-comparison-operators-routing-filters.md" %}}
