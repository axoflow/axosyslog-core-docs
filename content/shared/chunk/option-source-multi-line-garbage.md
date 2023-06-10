---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## multi-line-garbage()

|          |                    |
| -------- | ------------------ |
| Type:    | regular expression |
| Default: | empty string       |

*Description:* Use the `multi-line-garbage()` option when processing multi-line messages that contain unneeded parts between the messages. Specify a string or regular expression that matches the beginning of the unneeded message parts. If the `multi-line-garbage()` option is set, {{% productparam "abbrev" %}} ignores the lines between the line matching the `multi-line-garbage()` and the next line matching `multi-line-prefix()`. See also the `multi-line-prefix()` option.

When receiving multi-line messages from a source when the `multi-line-garbage()` option is set, but no matching line is received between two lines that match `multi-line-prefix()`, {{% productparam "abbrev" %}} will continue to process the incoming lines as a single message until a line matching `multi-line-garbage()` is received.

To use the `multi-line-garbage()` option, set the `multi-line-mode()` option to **prefix-garbage**.

{{% alert title="Warning" color="warning" %}}

If the `multi-line-garbage()` option is set, {{% productparam "abbrev" %}} discards lines between the line matching the `multi-line-garbage()` and the next line matching `multi-line-prefix()`.

{{% /alert %}}

