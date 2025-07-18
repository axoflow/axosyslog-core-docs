---
title: Key-value pairs
---

Formats a dictionary into a string containing key=value pairs.

Usage: `format_kv(kvs_dict, value_separator="<separator-character>", pair_separator="<separator-string>")`

By default, `format_kv` uses `=` to separate values, and `, ` (comma and space) to separate the pairs:

```shell
filterx {
    ${MESSAGE} = format_kv(<input-dictionary>);
};
```

The `value_separator` option must be a single character, the `pair_separator` can be a string. For example, to use the colon (:) as the value separator and the semicolon (;) as the pair separator, use:

```shell
format_kv(<input-dictionary>, value_separator=":", pair_separator=";")
```
