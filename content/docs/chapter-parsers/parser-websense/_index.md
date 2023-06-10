---
title: "Websense parser"
weight:  3500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The Websense parser can parse the log messages of Websense Content Gateway (Raytheon|Websense, now Forcepoint). These messages do not completely comply with the syslog RFCs, making them difficult to parse. The `websense-parser()` of {{% param "product.abbrev" %}} solves this problem, and can separate these log messages to name-value pairs. For details on using value-pairs in {{% param "product.abbrev" %}} see {{% xref "/docs/chapter-concepts/concepts-value-pairs/_index.md" %}}. The parser can parse messages in the following format:

```c
   <PRI><DATE> <TIMEZONE> <IP-ADDRESS> <NAME=VALUE PAIRS>

```

For example:

```c
   <159>Dec 19 10:48:57 EST 192.168.1.1 vendor=Websense product=Security product_version=7.7.0 action=permitted severity=1 category=153 user=- src_host=192.168.2.1 src_port=62189 dst_host=example.com dst_ip=192.168.3.1 dst_port=443 bytes_out=197 bytes_in=76 http_response=200 http_method=CONNECT http_content_type=- http_user_agent=Mozilla/5.0_(Windows;_U;_Windows_NT_6.1;_enUS;_rv:1.9.2.23)_Gecko/20110920_Firefox/3.6.23 http_proxy_status_code=200 reason=- disposition=1034 policy=- role=8 duration=0 url=https://example.com

```

If you find a message that the `websense-parser()` cannot properly parse, [contact Support](https://www.syslog-ng.com/support/), so we can improve the parser.

The {{% param "product.abbrev" %}} application sets the `${PROGRAM}` field to `Websense`.

By default, the websense-specific fields are extracted into name-value pairs prefixed with `.websense`. For example, the `product_version` in the previous message becomes `${.websense.product_version}`. You can change the prefix using the **prefix** option of the parser.


## Declaration:

```c
   @version: {{% param "product.techversion" %}}
    @include "scl.conf"
    log {
        source { network(flags(no-parse)); };
        parser { websense-parser(); };
        destination { ... };
    };
```


Note that you have to disable message parsing in the source using the **flags(no-parse)** option for the parser to work.

The `websense-parser()` is actually a reusable configuration snippet configured to parse websense messages. For details on using or writing such configuration snippets, see {{% xref "/docs/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/websense/plugin.conf).


{{% include-headless "chunk/option-parser-prefix.md" %}}

By default, `websense-parser()` uses the `.websense.` prefix. To modify it, use the following format:

```c
   parser {
        websense-parser(prefix("myprefix."));
    };
```

