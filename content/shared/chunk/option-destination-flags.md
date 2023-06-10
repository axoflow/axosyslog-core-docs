---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## flags()

|          |                                |
| -------- | ------------------------------ |
| Type:    | no-multi-line, syslog-protocol |
| Default: | empty set                      |



*Description:* Flags influence the behavior of the destination driver.

  - *no-multi-line*: The `no-multi-line` flag disables line-breaking in the messages: the entire message is converted to a single line.

  - *syslog-protocol*: The `syslog-protocol` flag instructs the driver to format the messages according to the new IETF syslog protocol standard (RFC5424), but without the frame header. If this flag is enabled, macros used for the message have effect only for the text of the message, the message header is formatted to the new standard. Note that this flag is not needed for the `syslog` driver, and that the `syslog` driver automatically adds the frame header to the messages.

