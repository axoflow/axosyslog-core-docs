---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## encoding()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* Specifies the character set (encoding, for example, `UTF-8`) of messages using the legacy BSD-syslog protocol. To list the available character sets on a host, execute the `iconv -l` command. For details on how encoding affects the size of the message, see [Message size and encoding]({{< relref "/docs/chapter-concepts/concepts-message-representation/_index.md" >}}).

