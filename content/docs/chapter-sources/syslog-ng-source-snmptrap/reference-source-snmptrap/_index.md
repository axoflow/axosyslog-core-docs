---
title: "snmptrap() source options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `snmptrap()` driver has the following options. Only the `filename()` option is required, the others are optional.


## filename() {#snmptrap-filename}

|          |      |
| -------- | ---- |
| Type:    | path |
| Default: |      |

*Description:* The log file of `snmptrapd`. The {{% productparam "abbrev" %}} application reads the traps from this file.

{{% include-headless "chunk/para-snmptrap-discards-messages.md" %}}


{{% include-headless "chunk/option-destination-hook.md" %}}

{{% include-headless "chunk/option-persist-name.md" %}}


{{% include-headless "chunk/option-parser-prefix.md" %}}

Default value: `.snmp.` option.



## set-message-macro() {#snmptrap-set-message-macro}

|          |        |
| -------- | ------ |
| Type:    | yes|no |
| Default: | yes    |

*Description:* The `snmptrap()` source automatically parses the traps into name-value pairs, so you can handle the content of the trap as a structured message. Consequently, you might not even need the `${MESSAGE}` part of the log message. If `set-message-macro()` is set to **no**, {{% productparam "abbrev" %}} leaves the `${MESSAGE}` part empty. If `set-message-macro()` is set to **yes**, {{% productparam "abbrev" %}} generates a regular log message from the trap.

