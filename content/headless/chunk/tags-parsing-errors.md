---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{% param "product.abbrev" %}} 4.7 and newer automatically adds the following tags if it encounters errors when parsing syslog messages.

- `message.utf8_sanitized`
- `message.parse_error`
- `syslog.missing_pri`
- `syslog.missing_timestamp`
- `syslog.invalid_hostname`
- `syslog.unexpected_framing`
- `syslog.rfc3164_missing_header`
- `syslog.rfc5424_unquoted_sdata_value`
