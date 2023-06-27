---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## template()

|          |                                                    |
| -------- | -------------------------------------------------- |
| Type:    | string                                             |
| Default: | A format conforming to the default logfile format. |

*Description:* Specifies a template defining the logformat to be used in the destination. Macros are described in {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" %}}. Please note that for network destinations it might not be appropriate to change the template as it changes the on-wire format of the syslog protocol which might not be tolerated by stock syslog receivers (like `syslogd` or `syslog-ng` itself). For network destinations make sure the receiver can cope with the custom format defined.

