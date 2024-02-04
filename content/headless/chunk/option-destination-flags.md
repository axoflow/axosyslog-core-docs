---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## flags()

|          |                                |
| -------- | ------------------------------ |
| Type:    | `ignore-errors`, `no-multi-line`, `no-seqnum-all`, `seqnum-all`, `syslog-protocol`, `threaded` |
| Default: | empty set                      |

*Description:* Flags influence the behavior of the destination driver.

- `ignore-errors`: <!-- FIXME -->
- `no-multi-line`: The `no-multi-line` flag disables line-breaking in the messages: the entire message is converted to a single line.
- `no-seqnum-all`: <!-- FIXME -->
- `seqnum-all`: Available in {{% param "product.abbrev" %}} version 4.6 and later. By default, {{% param "product.abbrev" %}} follows the logic of the RFC5424 `meta.sequenceId` structured data element: it adds a sequence number to local messages, forwarded messages retain their original sequenceId.

    The `seqnum-all` flag adds a sequence number to every message sent to the destination, not just local messages. This also changes the behavior of the `${SEQNUM}` macro. For example:

    ```shell
    destination { syslog("127.0.0.1" port(2001) flags(seqnum-all)); };
    ```

    The output messages have increasing sequence numbers:

    ```shell
    <13>1 2023-12-09T21:51:30+00:00 localhost sdff - - [meta sequenceId="1"] f sdf fsd
    <13>1 2023-12-09T21:51:32+00:00 localhost sdff - - [meta sequenceId="2"] f sdf fsd
    <13>1 2023-12-09T21:51:32+00:00 localhost sdff - - [meta sequenceId="3"] f sdf fsd
    <13>1 2023-12-09T21:51:32+00:00 localhost sdff - - [meta sequenceId="4"] f sdf fsd
    <13>1 2023-12-09T21:51:32+00:00 localhost sdff - - [meta sequenceId="5"] f sdf fsd
    ```

- `syslog-protocol`: The `syslog-protocol` flag instructs the driver to format the messages according to the new IETF syslog protocol standard (RFC5424), but without the frame header. If this flag is enabled, macros used for the message have effect only for the text of the message, the message header is formatted to the new standard. Note that this flag is not needed for the `syslog` driver, and that the `syslog` driver automatically adds the frame header to the messages.
- `threaded`: <!-- FIXME -->
