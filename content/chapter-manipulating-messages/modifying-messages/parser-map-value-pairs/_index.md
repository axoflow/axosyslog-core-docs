---
title: "map-value-pairs: Rename value-pairs to normalize logs"
weight:  2100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `map-value-pairs()` parser allows you to map existing name-value pairs to a different set of name-value pairs. You can rename them in bulk, making it easy to use for log normalization tasks (for example, when you parse information from different log messages, and want to convert them into a uniform naming scheme). You can use the [normal value-pairs expressions]({{< relref "/chapter-concepts/concepts-value-pairs/_index.md" >}}), similarly to value-pairs based destinations. Using `map-value-pairs()` retains type data if available.

Available in {{% param "product.abbrev" %}} version 3.10 and later.

## Declaration

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

## Options

The `map-value-pairs()` parser accepts the [`value-pairs()` options]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md" >}}) listed below. Note that `map-value-pairs()` takes these options directly, without wrapping them into a `value-pairs()` block.

## cast()

|                  |             |
| ---------------- | ----------- |
| Accepted values: | `yes`, `no` |
| Default:         | `no`        |

*Description:* If set to `yes`, {{% param "product.abbrev" %}} converts every mapped value to string, discarding the type information of the name-value pairs. By default, `map-value-pairs()` retains the type of the values.

## exclude()

*Description:* Excludes the name-value pairs matching the specified glob patterns from the mapping. For details, see [`exclude()`]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md#exclude" >}}).

## include-bytes()

|                  |             |
| ---------------- | ----------- |
| Accepted values: | `yes`, `no` |
| Default:         | `no`        |

*Description:* If set to `yes`, {{% param "product.abbrev" %}} also maps the name-value pairs that have the `bytes` or `protobuf` type. By default, these are skipped.

## key()

*Description:* Selects the name-value pairs to map, using glob patterns. You can combine it with `rekey()` to rename the selected name-value pairs. For details, see [`key()`]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md#key" >}}).

## pair()

*Description:* Adds a new name-value pair with the specified name and value. The value can be a template or a template function. For details, see [`pair()`]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md#pair" >}}).

## rekey()

*Description:* Renames the selected name-value pairs, for example, by adding or replacing a prefix, changing the case of the names, or removing levels from the names. For details, see [`rekey()`]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md#rekey" >}}).

## scope()

*Description:* Selects a predefined group of name-value pairs to map, for example, `nv-pairs` or `all-nv-pairs`. For details, see [`scope()`]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md#scope" >}}).
