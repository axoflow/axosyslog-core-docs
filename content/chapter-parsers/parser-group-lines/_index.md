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

{{< include-headless "chunk/option-source-internal.md" >}}

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

## sort-key()

|          |          |
| -------- | -------- |
| Type:    | template |
| Default: |          |

*Description:* Sorts the lines of the correlation context before {{% param "product.abbrev" %}} assembles them into a single multi-line message. Use this option when the lines can arrive out of order. Note that specifying several macros or a complex template in `sort-key()` can slow down {{% param "product.abbrev" %}}.

## template()

|          |                 |
| -------- | --------------- |
| Type:    | template |
| Default: |     |

*Description:*  A template string that specifies what constitutes an line to `group-lines()`. In simple cases this is `${MSG}` or `${RAWMSG}`.

## timeout()

|          |                      |
| -------- | -------------------- |
| Type:    | number (seconds)     |
| Default: |                      |

*Description:* Specifies the maximum time to wait for the remaining lines of a multi-line message. If no new line is added to the correlation context during this period, {{% param "product.abbrev" %}} considers the multi-line message complete and forwards it. If a new line is added to the context, the timeout period restarts.
