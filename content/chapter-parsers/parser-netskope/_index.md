---
title: "Netskope parser"
weight: 1500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The Netskope parser can parse Netskope log messages. These messages do not completely comply with the syslog RFCs, making them difficult to parse. The `netskope-parser()` of {{% param "product.abbrev" %}} solves this problem, and can separate these log messages to name-value pairs. For details on using value-pairs in {{% param "product.abbrev" %}} see {{% xref "/chapter-concepts/concepts-value-pairs/_index.md" %}}. The parser can parse messages in the following format:

```shell
   <PRI>{JSON-formatted-log-message}
```

For example:

```shell
   <134>{"count": 1, "supporting_data": {"data_values": ["x.x.x.x", "user@domain.com"], "data_type": "user"}, "organization_unit": "domain/domain/Domain Users/Enterprise Users", "severity_level": 2, "category": null, "timestamp": 1547421943, "_insertion_epoch_timestamp": 1547421943, "ccl": "unknown", "user": "user@domain.com", "audit_log_event": "Login Successful", "ur_normalized": "user@domain.com", "_id": "936289", "type": "admin_audit_logs", "appcategory": null}
```

If you find a message that the `netskope-parser()` cannot properly parse, {{% param "product.contact" %}}, so we can improve the parser.

The {{% param "product.abbrev" %}} application sets the `${PROGRAM}` field to `Netskope`.

By default, the Netskope-specific fields are extracted into name-value pairs prefixed with `.netskope`. For example, the `organization_unit` in the previous message becomes `${.netskope.organization_unit}`. You can change the prefix using the `prefix` option of the parser.


## Declaration:

```shell
   @version: {{% param "product.techversion" %}}
    @include "scl.conf"
    log {
        source { network(flags(no-parse)); };
        parser { netskope-parser(); };
        destination { ... };
    };
```


Note that you have to disable message parsing in the source using the `flags(no-parse)` option for the parser to work.

The `netskope-parser()` is actually a reusable configuration snippet configured to parse Netskope messages. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/netskope/plugin.conf).


{{% include-headless "chunk/option-parser-prefix.md" %}}

By default, `netskope-parser()` uses the `.netskope.` prefix. To modify it, use the following format:

```shell
   parser {
        netskope-parser(prefix("myprefix."));
    };
```

