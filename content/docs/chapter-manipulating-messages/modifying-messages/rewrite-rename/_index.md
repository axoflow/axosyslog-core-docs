---
title: "Renaming message fields"
weight:  1500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

If you want to change the name of a field of a message, you can use `rename()` rewrite rules. This can be also achieved via using `set()` and `unset()` but those require extra conditions and two operation instead of one.

The `rename()` rewrite rule uses positional arguments and they are both required. It supports condition rewrite. For more information, see {{% xref "/docs/chapter-manipulating-messages/modifying-messages/conditional-rewrite/_index.md" %}}.


## Declaration

```c
   rewrite r_rewrite_rename {
        rename("<string1>" "<string2>");
    };

```



## Example usage for the rename() rewrite function

The following example renames the `.app.name` into `.container` if the `.app.name` exists. Otherwise, it does nothing.

```c
   rewrite r_rewrite_rename {
        rename(".app.name" ".container");
    };

```

