---
title: "Set multiple message fields to specific values"
weight:  1900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `groupset()` rewrite rule allows you to modify the value of multiple message fields at once, for example, to change the value of sensitive fields extracted using patterndb, or received in a JSON format. (If you want to modify the names of message fields, see {{% xref "/chapter-manipulating-messages/modifying-messages/parser-map-value-pairs/_index.md" %}}.)

- The first parameter is the new value of the modified fields. This can be a simple string, a macro, or a template (which can include template functions as well).
- The second parameter (`values()`) specifies the fields to modify. You can explicitly list the macros or fields (a space-separated list with the values enclosed in double-quotes), or use wildcards and glob expressions to select multiple fields.
- Note that `groupset()` does not create new fields, it only modifies existing fields.
- You can refer to the old value of the field using the `$_` macro. This is resolved to the value of the current field, and is available only in `groupset()` rules.
- {{< include-headless "chunk/set-groupset-type-support.md" >}}

## Declaration

```shell
rewrite <name_of_the_rule> {
    groupset("<new-value-of-the-fields>", values("<field-name-or-glob>" ["<another-field-name-or-glob>"]));
};
```

## Example: Using groupset rewrite rules {#rewrite-groupset-examples}

The following examples show how to change the values of multiple fields at the same time.

- Change the value of the `HOST` field to `myhost`.

    ```shell
        groupset ("myhost" values("HOST"))
    
    ```

- Change the value of the `HOST` and `FULLHOST` fields to `myhost`.

    ```shell
        groupset ("myhost" values("HOST" "FULLHOST"))
    
    ```

- Change the value of the `HOST`, `FULLHOST` and fields to lowercase.

    ```shell
        groupset ("$(lowercase "$_")" values("HOST" "FULLHOST"))
    
    ```

- Change the value of each field and macro that begins with `.USER` to `nobody`.

    ```shell
        groupset ("nobody" values(".USER.*"))
    
    ```

- Change the value of each field and macro that begins with `.USER` to its SHA-1 hash (truncated to 6 characters).

    ```shell
        groupset ("$(sha1 --length 6 $_)" values(".USER.*"))
    
    ```
