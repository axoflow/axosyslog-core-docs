---
title: "map-value-pairs: Rename value-pairs to normalize logs"
weight:  2100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `map-value-pairs()` parser allows you to map existing name-value pairs to a different set of name-value pairs. You can rename them in bulk, making it easy to use for log normalization tasks (for example, when you parse information from different log messages, and want to convert them into a uniform naming scheme). You can use the [normal value-pairs expressions]({{< relref "/chapter-concepts/concepts-value-pairs/_index.md" >}}), similarly to value-pairs based destinations. Using `map-value-pairs()` retains type data if available.

Available in {{% param "product.abbrev" %}} version 3.10 and later.

## Declaration:

```shell
   parser parser_name {
        map-value-pairs(
            <list-of-value-pairs-options>
        );
    };
```

## Example: Map name-value pairs

The following example creates a new name-value pair called `username`, adds the hashed value of the `.apache.username` to this new name-value pair, then adds the `webserver` prefix to the name of every name-value pair of the message that starts with `.apache`

```shell
   parser p_remap_name_values {
        map-value-pairs(
            pair("username", "'($sha1 $.apache.username)")
            key('.apache.*' rekey(add-prefix("webserver")))
        );
    };
```
