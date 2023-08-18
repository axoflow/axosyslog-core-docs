---
title: What's new
weight: 10
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

This page is a changelog that collects the major changes and additions to this documentation. (If you want to know the details about why we have separate documentation for AxoSyslog, our syslog-ng distribution and how it relates to the syslog-ng documentation, read our [syslog-ng documentation and similarities with AxoSyslog Core](https://axoflow.com/axosyslog-core-documentation-syslog-ng/) blog post.)

## 2023-07-07 to 2023-08-18

<!-- Covered till commit 3dfacaf1cc0a15aeed2b007e62df0dbcd7730b1a 
Date:   Fri Aug 18 13:43:08 2023 +0200 -->
### OpenTelemetry

- [OpenTelemetry source]({{< relref "/chapter-sources/opentelemetry/_index.md" >}})
- [OpenTelemetry destination]({{< relref "/chapter-destinations/opentelemetry/_index.md" >}})
- [OpenTelemetry parser]({{< relref "/chapter-parsers/opentelemetry/_index.md" >}})

### New sources and related changes

- [Hypr Audit Trail and Hypr App Audit Trail]({{< relref "/chapter-sources/hypr-audit-trail/_index.md" >}})
- [OpenTelemetry]({{< relref "/chapter-sources/opentelemetry/_index.md" >}})
- [`match-boot` and `matches` options of the `syslog-journal()` source]({{< relref "/chapter-sources/configuring-sources-journal/reference-source-journal/#match-boot" >}})

### New destinations and related changes

- [Falcon LogScale]({{< relref "/chapter-destinations/crowdstrike-falcon/_index.md" >}})
- [OpenTelemetry]({{< relref "/chapter-destinations/opentelemetry/_index.md" >}})
- [Splunk HEC]({{< relref "/chapter-destinations/syslog-ng-with-splunk/_index.md" >}})
- [`dbdi-driver-dir()`]({{< relref "/chapter-destinations/configuring-destinations-sql/reference-destination-sql/#sql-option-dbdi-driver-dir" >}}) and [`quote-char()`]({{< relref "/chapter-destinations/configuring-destinations-sql/reference-destination-sql/#sql-option-quote-char" >}}) options of the `sql()` destination
- [`bulk-mode()`, `bulk-bypass-validation()`, and `bulk-unordered()`]({{< relref "/chapter-destinations/configuring-destinations-mongodb/reference-destination-mongodb/#mongodb-option-bulk-mode" >}}) and [`write-concern()`]({{< relref "/chapter-destinations/configuring-destinations-mongodb/reference-destination-mongodb/#mongodb-option-write-concern" >}}) options of the `mongodb()` destination

### New parsers and related changes

- [group-lines]({{< relref "/chapter-parsers/parser-group-lines/_index.md" >}})
- [Count the messages that pass through the log path (metrics-probe)]({{< relref "/chapter-parsers/metrics-probe/_index.md" >}})
- [OpenTelemetry]({{< relref "/chapter-parsers/opentelemetry/_index.md" >}})
- [RFC5424 structured data (SDATA) parser]({{< relref "/chapter-parsers/sdata-parser/_index.md" >}})
- [`sdata-prefix` option for the `syslog-parser`]({{< relref "/chapter-parsers/parser-syslog/parser-syslog-options/#sdata-prefix" >}})
- [`escape-backslash-with-sequences` option for the `csv-parser`]({{< relref "/chapter-parsers/csv-parser/reference-parsers-csv/#csv-parser-dialect" >}})

### Other changes

- [Typing support (Specifying data types in value-pairs)]({{< relref "/chapter-concepts/concepts-value-pairs/specifying-data-types/_index.md" >}})
- [Nonsequential message processing for improved performance]({{< relref "/chapter-nonsequential-processing/_index.md" >}})
- [An overview of writing Python modules for syslog-ng]({{< relref "/writing-python-modules/_index.md" >}})
- [New syslog-ng-ctl commands]({{< relref "/app-man-syslog-ng/syslog-ng-ctl.1/_index.md" >}})
- [Configuration identifier]({{< relref "/chapter-configuration-file/configuration-identifier/_index.md" >}})
- [Named log paths]({{< relref "/chapter-routing-filters/logpath/_index.md" >}})
- [format-date template function]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/#template-function-format-date" >}})
- TLS improvements: [OCSP stapling verification]({{< relref "/chapter-encrypted-transport-tls/tlsoptions/#tls-options-ocsp-stapling-verify" >}}) and [SSL_CONF_cmd]({{< relref "/chapter-encrypted-transport-tls/tlsoptions/#tls-options-openssl-conf-cmds" >}}) support
- [RAWMSG_SIZE macro]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-macros/#macro-rawmsg-size" >}})
- [`lower` and `upper` transformations for the rekey `value-pairs()` option]({{< relref "chapter-concepts/concepts-value-pairs/option-value-pairs/#rekey" >}})

### New global options

- [log-level]({{< relref "/chapter-global-options/reference-options/#global-options-log-level" >}})
- [stats]({{< relref "/chapter-global-options/reference-options/#global-option-stats" >}})