---
title: "Options of date-parser() parsers"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `date-parser()` parser has the following options.


## format()

|           |                |
| --------- | -------------- |
| Synopsis: | format(string) |
| Default:  |                |

*Description:* Specifies the format how {{% param "product.abbrev" %}} should parse the date. You can use the following format elements:

{{< include-headless "chunk/date-string-format.md" >}}

{{% include-headless "chunk/example-date-parser.md" %}}

{{% include-headless "chunk/option-parser-template.md" %}}


## flags()

|          |                |
| -------- | -------------- |
| Type:    | guess-timezone |
| Default: | empty string   |

*guess-timezone*: Attempt to guess the timezone of the message if this information is not available in the message. Works when the incoming message stream is close to real time, and the timezone information is missing from the timestamp. For example:

```shell
   date-parser(flags(guess-timezone));
```



## time-stamp()

|           |               |
| --------- | ------------- |
| Synopsis: | `stamp` or `recvd` |
| Default:  | stamp         |

*Description:* Determines if the parsed date values are treated as sent or received date. If you use `time-stamp(stamp)`, {{% param "product.abbrev" %}} adds the parsed date to the S_ macros (corresponding to the sent date). If you use `time-stamp(recvd)`, {{% param "product.abbrev" %}} adds the parsed date to the R_ macros (corresponding to the received date).



## time-zone()

|           |                   |
| --------- | ----------------- |
| Synopsis: | time-zone(string) |
| Default:  |                   |

*Description:* If this option is set, {{% param "product.abbrev" %}} assumes that the parsed timestamp refers to the specified timezone. The timezone set in the `time-zone()` option overrides any timezone information parsed from the timestamp.

{{% include-headless "chunk/para-timezone-format.md" %}}

## value()

|           |                   |
| --------- | ----------------- |
| Synopsis: | string |
| Default:  |                   |

Available in {{% param "product.abbrev" %}} 4.1 and later.

*Description:* Instruct `date-parser()` to store the resulting timestamp in a name-value pair specified in `value()`, instead of changing the timestamp value of the LogMessage.
