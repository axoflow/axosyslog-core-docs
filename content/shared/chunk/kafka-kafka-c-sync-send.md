---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## sync-send() {#kafka-option-sync-send}

|          |              |
| -------- | ------------ |
| Type:    | true | false |
| Default: | false        |

*Description:* When `sync-send` is set to **true**, {{% productparam "abbrev" %}} sends the message reliably: it sends a message to the Kafka server, then waits for a reply. In case of failure, {{% productparam "abbrev" %}} repeats sending the message, as set in the `retries()` parameter. If sending the message fails for `retries()` times, {{% productparam "abbrev" %}} drops the message.

This method ensures reliable message transfer, but is very slow.

When `sync-send()` is set to **false**, {{% productparam "abbrev" %}} sends messages asynchronously, and receives the response asynchronously. In case of a problem, {{% productparam "abbrev" %}} cannot resend the messages.

This method is fast, but the transfer is not reliable. Several thousands of messages can be lost before {{% productparam "abbrev" %}} recognizes the error.

