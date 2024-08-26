---
title: "Options of key=value parsers"
weight:  100
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The `parse_kv` filterx function has the following options.

## pair_separator

Specifies the character or string that separates the key-value pairs from each other. Default value: `,` .

For example, to parse `key1=value1;key2=value2` pairs, use:

```shell
${MESSAGE} = parse_kv("key1=value1;key2=value2", pair_separator=";");
```

## stray_words_key {#stray-words-key}

Specifies the key where {{% param "product.abbrev" %}} stores any stray words that appear before or between the parsed key-value pairs. If multiple stray words appear in a message, then {{% param "product.abbrev" %}} stores them as a comma-separated list. Default value:`N/A`

For example, consider the following message:

```shell
VSYS=public; Slot=5/1; protocol=17; source-ip=10.116.214.221; source-port=50989; destination-ip=172.16.236.16; destination-port=162;time=2016/02/18 16:00:07; interzone-emtn_s1_vpn-enodeb_om; inbound; policy=370;
```

This is a list of key-value pairs, where the value separator is `=` and the pair separator is `;`. However, before the last key-value pair (`policy=370`), there are two stray words: `interzone-emtn_s1_vpn-enodeb_om;` and `inbound;`. If you want to store or process these, specify a key to store them, for example:

```shell
${MESSAGE} = "VSYS=public; Slot=5/1; protocol=17; source-ip=10.116.214.221; source-port=50989; destination-ip=172.16.236.16; destination-port=162;time=2016/02/18 16:00:07; interzone-emtn_s1_vpn-enodeb_om; inbound; policy=370;";
${PARSED_MESSAGE} = json();
${PARSED_MESSAGE} = parse_kv(${MESSAGE}, stray_words_key="stray_words");
```

The value of `${PARSED_MESSAGE}.stray_words` for this message will be: `["interzone-emtn_s1_vpn-enodeb_om", "inbound"]`

## value_separator

Specifies the character that separates the keys from the values. Default value: `=`.

For example, to parse `key:value` pairs, use:

```shell
${MESSAGE} = parse_kv("key1:value1;key2:value2", value_separator=":");
```
