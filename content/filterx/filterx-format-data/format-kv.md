---
title: Key-value pairs
---

Formats a dictionary into a string containing key=value pairs.

Usage: `format_kv(kvs_dict, value_separator="<separator-character>", pair_separator="<separator-string>", quote_char="<quote-character>", always_quote=<boolean>)`

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

## Quoting values

By default, {{< product >}} quotes only those values that contain a space, using double quotes (`"`). Any quote character inside such a value is escaped.

- `quote_char`: Available in {{< product >}} 4.28 and later.

    Sets the character used to quote values. Must be a single `"` or `'` character, other characters are rejected at configuration time. Default value: `"`

    For example, to quote values with apostrophes:

    ```shell
    format_kv(<input-dictionary>, quote_char="'")
    # Output: key1=value1, key2='it\'s'
    ```

- `always_quote`: Available in {{< product >}} 4.28 and later.

    If set to `true`, {{< product >}} quotes every value, not only the ones containing a space. Must be a boolean literal. Default value: `false`

    ```shell
    format_kv({"key1":"value1","key2":42}, always_quote=true)
    # Output: key1="value1", key2="42"
    ```
