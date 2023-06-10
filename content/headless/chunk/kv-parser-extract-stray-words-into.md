---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## extract-stray-words-into()

|           |                                                 |
| --------- | ----------------------------------------------- |
| Synopsis: | extract-stray-words-into("\<name-value-pair\>") |

*Description:* Specifies the name-value pair where {{% param "product.abbrev" %}} stores any stray words that appear before or between the parsed key-value pairs (mainly when the [`pair-separator()`]({{< relref "/docs/chapter-parsers/key-value-parser/kv-parser-options/_index.md" >}}) option is also set). If multiple stray words appear in a message, then {{% param "product.abbrev" %}} stores them as a comma-separated list. Note that the `prefix()` option does not affect the name-value pair storing the stray words. Default value:**N/A**


## Example: Extracting stray words in key-value pairs {#example-extract-stray-words}

For example, consider the following message:

```c
   VSYS=public; Slot=5/1; protocol=17; source-ip=10.116.214.221; source-port=50989; destination-ip=172.16.236.16; destination-port=162;time=2016/02/18 16:00:07; interzone-emtn_s1_vpn-enodeb_om; inbound; policy=370;

```

This is a list of key-value pairs, where the value separator is **=** and the pair separator is **;**. However, before the last key-value pair (**policy=370**), there are two stray words: **interzone-emtn_s1_vpn-enodeb_om inbound**. If you want to store or process these, specify a name-value pair to store them in the `extract-stray-words-into()` option, for example, **extract-stray-words-into("my-stray-words")**. The value of `${my-stray-words}` for this message will be **interzone-emtn_s1_vpn-enodeb_om, inbound**


