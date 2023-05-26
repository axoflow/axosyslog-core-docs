---
title: "linux-audit() source options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `file()` driver has the following options:


## filename() {#linux-audit-filename}

|          |      |
| -------- | ---- |
| Type:    | path |
| Default: |      |

*Description:* The log file of `linux-audit`. The {{% param "product.abbrev" %}} application reads the Linux audit logs from this file.



## prefix()

|           |          |
| --------- | -------- |
| Synopsis: | prefix() |
| Default:  | .auditd. |

*Description:* Insert a prefix before the name part of the parsed name-value pairs to help further processing. For example:

  - To insert the `my-parsed-data.` prefix, use the `prefix(my-parsed-data.)` option.

  - To refer to a particular data that has a prefix, use the prefix in the name of the macro, for example, `${my-parsed-data.name}`.

  - If you forward the parsed messages using the IETF-syslog protocol, you can insert all the parsed data into the SDATA part of the message using the `prefix(.SDATA.my-parsed-data.)` option.

Names starting with a dot (for example, `.example`) are reserved for use by {{% param "product.abbrev" %}}. Note that if you use an empty prefix (`prefix("")`) or one starting with a dot, {{% param "product.abbrev" %}} might replace the original value of an existing macro (note that only soft macros can be overwritten, see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/macros-hard-vs-soft/_index.md" %}} for details). To avoid such problems, use a prefix when naming the parsed values, for example, `prefix(my-parsed-data.)`

