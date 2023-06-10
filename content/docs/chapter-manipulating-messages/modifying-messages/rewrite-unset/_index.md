---
title: "Unsetting message fields"
weight:  1300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

You can unset macros or fields of the message, including any user-defined macros created using parsers (for details, see {{% xref "/docs/chapter-parsers/_index.md" %}} and {{% xref "/docs/chapter-parsers/chapter-patterndb/_index.md" %}}). Note that the unset operation completely deletes any previous value of the field that you apply it on.

{{% include-headless "wnt/note-rewrite-hard-macros.md" %}}

Use the following syntax:


## Declaration:

```c
   rewrite <name_of_the_rule> {
        unset(value("<field-name>"));
    };
```



## Example: Unsetting a message field {#example-rewrite-unset}

The following example unsets the HOST field of the message.

```c
   rewrite r_rewrite_unset{
        unset(value("HOST"));
    };
```


To unset a group of fields, you can use the **groupunset()** rewrite rule.


## Declaration:

```c
   rewrite <name_of_the_rule> {
        groupunset(values("<expression-for-field-names>"));
    };
```



## Example: Unsetting a group of fields

The following rule clears all SDATA fields:

```c
   rewrite r_rewrite_unset_SDATA{
        groupunset(values(".SDATA.*"));
    };
```

