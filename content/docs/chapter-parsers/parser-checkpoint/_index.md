---
title: "Check Point Log Exporter parser"
weight:  3900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The Check Point Log Exporter parser can parse Check Point log messages. These messages do not completely comply with the syslog RFCs, making them difficult to parse. The `checkpoint-parser()` of {{% param "product.abbrev" %}} solves this problem, and can separate these log messages to name-value pairs. For details on using value-pairs in {{% param "product.abbrev" %}} see {{% xref "/docs/chapter-concepts/concepts-value-pairs/_index.md" %}}. The parser can parse messages in the following formats:

```c
   <PRI><VERSION> <YYYY-MM-DD> <HH-MM-SS> <PROGRAM> <PID> <MSGID> - [key1:value1; key2:value2; ... ]

```

For example:

```c
   <134>1 2018-03-21 17:25:25 MDS-72 CheckPoint 13752 - [action:"Update"; flags:"150784"; ifdir:"inbound"; logid:"160571424"; loguid:"{0x5ab27965,0x0,0x5b20a8c0,0x7d5707b6}";]

```

Splunk format:

```c
   time=1557767758|hostname=r80test|product=Firewall|layer_name=Network|layer_uuid=c0264a80-1832-4fce-8a90-d0849dc4ba33|match_id=1|parent_rule=0|rule_action=Accept|rule_uid=4420bdc0-19f3-4a3e-8954-03b742cd3aee|action=Accept|ifdir=inbound|ifname=eth0|logid=0|loguid={0x5cd9a64e,0x0,0x5060a8c0,0xc0000001}|origin=192.168.96.80|originsicname=cn\=cp_mgmt,o\=r80test..ymydp2|sequencenum=1|time=1557767758|version=5|dst=192.168.96.80|inzone=Internal|outzone=Local|proto=6|s_port=63945|service=443|service_id=https|src=192.168.96.27|

```

If you find a message that the `checkpoint-parser()` cannot properly parse, [contact Support](https://www.syslog-ng.com/support/), so we can improve the parser.

By default, the Check Point-specific fields are extracted into name-value pairs prefixed with **.checkpoint**. For example, the **action** in the previous message becomes **${.checkpoint.action}**. You can change the prefix using the `prefix` option of the parser.


## Declaration:

```c
   @version: {{% param "product.techversion" %}}
    @include "scl.conf"
    log {
        source { network(flags(no-parse)); };
        parser { checkpoint-parser(); };
        destination { ... };
    };
```


Note that the parser expects that the entire incorrectly formatted syslog message (starting with its `\<PRI\>` value) is in `$MSG`, which you can achieve by using **flags(no-parse)** on the input driver.

The `checkpoint-parser()` is actually a reusable configuration snippet configured to parse Check Point messages. For details on using or writing such configuration snippets, see {{% xref "/docs/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/checkpoint/plugin.conf).


{{% include-headless "chunk/option-parser-prefix.md" %}}

By default, `checkpoint-parser()` uses the `.checkpoint.` prefix. To modify it, use the following format:

```c
   parser {
        checkpoint-parser(prefix("myprefix."));
    };
```

