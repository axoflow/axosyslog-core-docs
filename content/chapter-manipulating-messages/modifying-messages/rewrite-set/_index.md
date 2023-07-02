---
title: "Setting message fields to specific values"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To set a field of the message to a specific value, you have to:

  - define the string to include in the message, and

  - select the field where it should be included.

You can set the value of available macros, for example, HOST, MESSAGE, PROGRAM, or any user-defined macros created using parsers (for details, see {{% xref "/chapter-parsers/_index.md" %}} and {{% xref "/chapter-parsers/chapter-patterndb/_index.md" %}}). Note that the rewrite operation completely replaces any previous value of that field.

{{< include-headless "wnt/note-rewrite-hard-macros.md" >}}

Use the following syntax:


## Declaration:

```shell
   rewrite <name_of_the_rule> {
        set("<string to include>", value(<field name>));
    };
```



## Example: Setting message fields to a particular value {#example-rewrite-set}

The following example sets the HOST field of the message to `myhost`.

```shell
   rewrite r_rewrite_set{
        set("myhost", value("HOST"));
    };
```

The following example appends the "suffix" string to the MESSAGE field:

```shell
   rewrite r_rewrite_set{
        set("$MESSAGE suffix", value("MESSAGE"));
    };
```

For details on rewriting SDATA fields, see {{% xref "/chapter-manipulating-messages/modifying-messages/custom-sdata-fields/_index.md" %}}.


You can also use the following options in rewrite rules that use the `set()` operator.

```shell
   rewrite <name_of_the_rule> {
        set("<string to include>", value(<field name>), on-error("fallback-to-string");
    };
```

{{% alert title="Note" color="info" %}}
The `severity` and `facility` fields can only be set by the `set-severity()` rewrite functions. For more information, see {{% xref "/chapter-manipulating-messages/modifying-messages/rewrite-set-severity/_index.md" %}}.
{{% /alert %}}
