---
title: "Cisco parser"
weight:  2100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The Cisco parser can parse the log messages of various Cisco devices. The messages of these devices often do not completely comply with the syslog RFCs, making them difficult to parse. The `cisco-parser()` of {{% param "product.abbrev" %}} solves this problem, and can separate these log messages to name-value pairs, extracting also the Cisco-specific values, for example, the mnemonic. For details on using value-pairs in {{% param "product.abbrev" %}} see {{% xref "/docs/chapter-concepts/concepts-value-pairs/_index.md" %}}. The parser can parse variations of the following message format:

```c
   <pri>(sequence: )?(origin-id: )?(timestamp? timezone?: )?%msg
```

For example:

```c
   <189>29: foo: *Apr 29 13:58:40.411: %SYS-5-CONFIG_I: Configured from console by console
    <190>30: foo: *Apr 29 13:58:46.411: %SYS-6-LOGGINGHOST_STARTSTOP: Logging to host 192.168.1.239 stopped - CLI initiated
    <190>31: foo: *Apr 29 13:58:46.411: %SYS-6-LOGGINGHOST_STARTSTOP: Logging to host 192.168.1.239 started - CLI initiated
    <189>32: 0.0.0.0: *Apr 29 13:59:12.491: %SYS-5-CONFIG_I: Configured from console by console
    <189>32: foo: *Apr 29 13:58:46.411: %SYSMGR-STANDBY-3-SHUTDOWN_START: The System Manager has started the shutdown procedure.
```

{{% alert title="Note" color="info" %}}
Not every Cisco log message conforms to this format. If you find a message that the `cisco-parser()` cannot properly parse, {{% param "product.contact" %}}, so we can improve the parser.
{{% /alert %}}

The {{% param "product.abbrev" %}} application normalizes the parsed log messages into the following format:

```c
   ${MESSAGE}=%FAC-SEV-MNEMONIC: message
    ${HOST}=origin-id
```

By default, the Cisco-specific fields are extracted into the following name-value pairs:`${.cisco.facility}`, `${.cisco.severity}`, `${.cisco.mnemonic}`. You can change the prefix using the `prefix` option.


## Declaration:

```c
   @version: {{% param "product.techversion" %}}
    @include "scl.conf"
    log {
        source { udp(flags(no-parse)); };
        parser { cisco-parser(); };
        destination { ... };
    };
```


Note that you have to disable message parsing in the source using the `flags(no-parse)` option for the parser to work.

The `cisco-parser()` is actually a reusable configuration snippet configured to parse Cisco messages. For details on using or writing such configuration snippets, see {{% xref "/docs/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/cisco/plugin.conf).


{{% include-headless "chunk/option-parser-prefix.md" %}}

By default, `cisco-parser()` uses the `.cisco.` prefix. To modify it, use the following format:

```c
   parser {
        cisco-parser(prefix("myprefix."));
    };
```

