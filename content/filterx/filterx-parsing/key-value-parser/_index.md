---
title: "key=value pairs"
weight: 1100
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{< include-headless "chunk/filterx-experimental-banner.md" >}}

The filterx `parse_kv` function can separate a string consisting of whitespace or comma-separated `key=value` pairs (for example, Postfix log messages). You can also specify other separator character instead of the equal sign, for example, colon (`:`) to parse MySQL log messages. The {{% param "product.abbrev" %}} application automatically trims any leading or trailing whitespace characters from the keys and values, and also parses values that contain unquoted whitespace.

{{< include-headless "wnt/n-kv-parser-repeated-keys.md" >}}

{{% alert title="Warning" color="warning" %}}

By default, the parser discards sections of the input string that are not `key=value` pairs, even if they appear between `key=value` pairs that can be parsed. To store such sections, see {{% xref "/filterx/filterx-parsing/key-value-parser/kv-parser-options/_index.md#stray-words-key" %}}.

The names of the keys can contain only the following characters: numbers (0-9), letters (a-z,A-Z), underscore (_), dot (.), hyphen (-). Other special characters are not permitted.
<!-- This is more permissive than the names of filterx variables.  -->

{{% /alert %}}

## Declaration

Usage: `parse_kv(<input-string>, value_separator="=", pair_separator=",", stray_words_key="stray_words")`

The `value_separator` must be a single-character string. The `pair_separator` must be a string.

## Example

In the following example, the source is a Postfix log message consisting of comma-separated `key=value` pairs:

```shell
Jun 20 12:05:12 mail.example.com <info> postfix/qmgr[35789]: EC2AC1947DA: from=<me@example.com>, size=807, nrcpt=1 (queue active)
```

```shell
filterx {
    parse_kv(${MESSAGE});
};
```

You can set the separator character between the key and the value to parse for example, `key:value` pairs, like MySQL logs:

```shell
Mar  7 12:39:25 myhost MysqlClient[20824]: SYSTEM_USER:'oscar', MYSQL_USER:'my_oscar', CONNECTION_ID:23, DB_SERVER:'127.0.0.1', DB:'--', QUERY:'USE test;'
```

```shell
filterx {
    parse_kv(${MESSAGE}, value_separator=":", pair_separator=",");
};
```
