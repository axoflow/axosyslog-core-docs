---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{% param "product.abbrev" %}} 4.7 and newer automatically adds the following tags if it encounters errors when parsing syslog messages.

- `message.utf8_sanitized`
- `message.parse_error`
- `syslog.missing_pri`
- `syslog.missing_timestamp`
- `syslog.invalid_hostname`
- `syslog.unexpected_framing`
- `syslog.rfc3164_missing_header`
- `syslog.rfc5424_unquoted_sdata_value`
