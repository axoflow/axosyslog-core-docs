---
title: "FilterX use cases and examples"
linkTitle: "Examples"
description: "Common FilterX tasks: set, delete, and rename message fields, conditional rewrites, and an iptables parser written in FilterX."
weight: 400
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## Common tasks

The following list shows you some common tasks that you can solve with FilterX:

- To set message fields (like macros or SDATA fields) or replace message parts: you can [assign values]({{< relref "/filterx/filterx-language/_index.md#assign-values" >}}) to change parts of the message, or use one of the [FilterX functions]({{< relref "/filterx/function-reference.md" >}}) to rewrite existing values.

    {{< include-headless "wnt/note-rewrite-hard-macros.md" >}}

- To delete or unset message fields, see [Delete values]({{< relref "/filterx/filterx-language/_index.md#delete-values" >}}).
- To rename a message field, assign the value of the old field to the new one, then unset the old field. For example:

    ```shell
    $my_new_field = $mike_old_field;
    unset($mike_old_field);
    ```

- To use conditional rewrites, you can either:
    - embed the FilterX block in an [if-else block]({{< relref "/chapter-routing-filters/logpath/concepts-if-else-conditional-expressions/_index.md" >}}), or
    - use [value comparison in the FilterX block]({{< relref "/filterx/filterx-comparing/_index.md" >}}) to select the appropriate messages. For example, to rewrite only messages of the NGINX application, you can:

        ```shell
        ${PROGRAM} == "nginx";
        # <your rewrite expression>
        ```

## Create an iptables parser {#create-an-iptables-parser}

The following example shows you how to reimplement the {{% xref "/chapter-parsers/parser-iptables/_index.md" %}} in a FilterX block. The following is a sample iptables log message (with line-breaks added for readability):

```shell
Dec 08 12:00:00 hostname.example kernel: custom-prefix:IN=eth0 OUT=
MAC=11:22:33:44:55:66:aa:bb:cc:dd:ee:ff:08:00 SRC=192.0.2.2 DST=192.168.0.1 LEN=40 TOS=0x00
PREC=0x00 TTL=232 ID=12345 PROTO=TCP SPT=54321 DPT=22 WINDOW=1023 RES=0x00 SYN URGP=0
```

This is a normal RFC3164-formatted message logged by the kernel (where iptables logging messages originate from), and contains space-separated key-value pairs.

1. First, create some filter statements to select iptables messages only:

    ```shell
    block filterx parse_iptables() {
        ${FACILITY} == "kern"; # Filter on the kernel facility
        ${PROGRAM} == "kernel"; # Sender application is the kernel
        ${MESSAGE} =~ "PROTO="; # The PROTO key appears in all iptables messages
    }
    ```

1. To make the parsed data available under macros beginning with `${.iptables}`, like in the case of the original `iptables-parser()`, create the `${.iptables}` JSON object.

    ```shell
    block filterx parse_iptables() {
        ${FACILITY} == "kern"; # Filter on the kernel facility
        ${PROGRAM} == "kernel"; # Sender application is the kernel
        ${MESSAGE} =~ "PROTO="; # The PROTO key appears in all iptables messages

        ${.iptables} = json(); # Create an empty JSON object
    }
    ```

1. Add a key=value parser to parse the content of the messages into the `${.iptables}` JSON object. The key=value pairs are space-separated, while equal signs (=) separates the values from the keys.

    ```shell
    block filterx parse_iptables() {
        ${FACILITY} == "kern"; # Filter on the kernel facility
        ${PROGRAM} == "kernel"; # Sender application is the kernel
        ${MESSAGE} =~ "PROTO="; # The PROTO key appears in all iptables messages

        ${.iptables} = json(); # Create an empty JSON object

        ${.iptables} = parse_kv(${MESSAGE}, value_separator="=", pair_separator=" ");
    }
    ```

    <!-- FIXME show json from sample message
    -->

For other examples on parsing messages, see the [Parsing firewall logs with FilterX](https://axoflow.com/blog/parsing-firewall-logs-with-filterx) blog post.
