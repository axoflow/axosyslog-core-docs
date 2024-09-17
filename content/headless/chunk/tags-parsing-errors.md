---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{% param "product.abbrev" %}} 4.7 and newer automatically adds the following tags if it encounters errors when parsing syslog messages.

- `message.utf8_sanitized`: The message is not valid UTF-8.
- `syslog.missing_timestamp`: The message has no timestamp.
- `syslog.invalid_hostname`: The hostname field doesn't seem to be valid, for example, it contains invalid characters.
- `syslog.missing_pri`: The priority (PRI) field is missing from the message.
- `syslog.unexpected_framing`: An octet count was found in front of the message, suggested invalid framing.
- `syslog.rfc3164_missing_header`: The date and the host are missing from an RFC3164-formatted message - practically that's the entire header of RFC3164-formatted messages.
- `syslog.rfc5424_unquoted_sdata_value`: An RFC5424 message contains an incorrectly quoted SDATA field.
- `message.parse_error`: Some other parsing error occurred.
