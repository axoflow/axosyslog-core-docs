---
title: "group-lines parser"
weight: 850
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{% param "product.name" %}} version 4.2 and newer.

The `group-lines()` parser correlates multi-line messages received as separate, but subsequent lines into a single log message. {{% param "product.name" %}} first collects the received messages into streams of related messages (based on the `key()` parameter), then grouped into correlation contexts up to `timeout()` seconds long. Multi-line messages are then identified within these contexts.

```shell
  group-lines(
    key("$FILE_NAME")
    multi-line-mode("smart")
    template("$MESSAGE")
    timeout(10)
    line-separator("\n")
  );
```

The parser has the following options.

## key()

|          |                 |
| -------- | --------------- |
| Type:    | template |
| Default: |     |

*Description:* Specifies a template that determines which messages form a single stream. Messages where the template expansion results in the same key are considered part of the same stream. Using the `key()` option, you can extract multi-line messages even if different streams are interleaved in your input.

## line-separator()

|          |                 |
| -------- | --------------- |
| Type:    | string |
| Default: |  `\n`  |

*Description:* In case a multi-line message is found, this string is inserted between the of the new multi-line message. Defaults to the newline character.

{{< include-headless "chunk/option-source-multi-line-garbage.md" >}}

{{< include-headless "chunk/option-source-multi-line-mode.md" >}}

{{< include-headless "chunk/option-source-multi-line-prefix.md" >}}

{{% include-headless "chunk/option-source-multi-line-suffix.md" %}}

{{< include-headless "chunk/option-parser-scope.md" >}}

## template()

|          |                 |
| -------- | --------------- |
| Type:    | template |
| Default: |     |

*Description:*  A template string that specifies what constitutes an line to `group-lines()`. In simple cases this is `${MSG}` or `${RAWMSG}`.
