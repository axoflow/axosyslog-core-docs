---
title: What's new
weight: 10
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

This page is a changelog that collects the major changes and additions to this documentation. (If you want to know the details about why we have separate documentation for AxoSyslog and how it relates to the `syslog-ng` documentation, read our [syslog-ng documentation and similarities with AxoSyslog Core](https://axoflow.com/axosyslog-core-documentation-syslog-ng/) blog post.)

## Version 4.8 release (2024-07-12)

- [APT repository for Debian and Ubuntu]({{< relref "/install/debian-ubuntu/_index.md" >}}) based systems.
- You can use the [`server-side-encryption()`]({{< relref "/chapter-destinations/destination-s3/_index.md#server-side-encryption" >}}) and [`kms-key()`]({{< relref "/chapter-destinations/destination-s3/_index.md#kms-key" >}}) options to configure encryption for [Amazon S3 destinations]({{< relref "/chapter-destinations/destination-s3/_index.md" >}}).

## Version 4.7 release (2024-04-18)

- {{% xref "/chapter-sources/arr/_index.md" %}} source
- {{% xref "/chapter-sources/jellyfin/_index.md" %}} source
- `channel-args()` option for gRPC-based drivers, like [`opentelemetry()`]({{< relref "/chapter-destinations/opentelemetry/_index.md#channel-args" >}})
- `concurrent-requests()` option for the [`opentelemetry()` source]({{< relref "/chapter-sources/opentelemetry/_index.md#concurrent-requests" >}}) and the [`syslog-ng-otlp()` source]({{< relref "/chapter-sources/source-syslog-ng-otlp/_index.md#concurrent-requests" >}})
- {{% xref "/chapter-destinations/destination-loki/_index.md#tenant-id" %}} option for the Loki destination
- {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md#template-function-tags-head" %}} template function
- {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md#macro-mqtt-topic" %}} macro
- {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md#macro-transport" %}} macro updates

For details, see the [release announcement blog post](https://axoflow.com/axosyslog-release-4-7/).

## Version 4.6 release (2024-02-01)

- [Google BigQuery destination]({{< relref "/chapter-destinations/google-bigquery/_index.md" >}})
- {{% xref "/chapter-parsers/windows-eventlog-xml-parser/_index.md" %}}
- {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md#template-function-tag" %}} template function
- `batch-bytes()`, `compression()` and `workers()` options for the [syslog-ng-otlp()]({{< relref "/chapter-destinations/destination-syslog-ng-otlp/_index.md#compression" >}}) and [opentelemetry()]({{< relref "/chapter-destinations/opentelemetry/_index.md#compression" >}}) destinations

For details, see the [release announcement blog post](https://axoflow.com/axosyslog-release-4-6/).

### New sources

- [New macOS sources]({{< relref "/chapter-sources/darwin/_index.md" >}})
- {{% xref "/chapter-sources/qbittorrent/_index.md" %}}
- {{% xref "/chapter-sources/pihole-ftl/_index.md" %}}

## 2023-10-20 to version 4.5 release (2024-01-05)

- [Google Pub/Sub destination]({{< relref "/chapter-destinations/google-pubsub/_index.md" >}})
- [OpenObserve destination]({{< relref "/chapter-destinations/openobserve/_index.md" >}})
- New `http()` destination options {{% xref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md#templates-in-the-url" %}} and [worker-partition-key()]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md#worker-partition-key" >}})

### Parsers

- New {{% xref "/chapter-parsers/postgresql-csvlog-parser/_index.md" %}} parser
- Columnless mode in [csv-parser]({{< relref "/chapter-parsers/csv-parser/_index.md" >}})

### TLS options

- {{% xref "/chapter-encrypted-transport-tls/tlsoptions/_index.md#ssl-version" %}}
- `ignore-validity-period` option in to {{% xref "/chapter-encrypted-transport-tls/tlsoptions/_index.md#tls-options-ssl-options" %}}

### Manual pages

- `--check-startup` in {{% xref "/app-man-syslog-ng/syslog-ng.8.md" %}}
- [secure-logging]({{< relref "/app-man-syslog-ng/secure-logging.7.md" >}}), [slogencrypt]({{< relref "/app-man-syslog-ng/slogencrypt.1.md" >}}), [slogkey]({{< relref "/app-man-syslog-ng/slogkey.1.md" >}}), and [slogverify]({{< relref "/app-man-syslog-ng/slogverify.1.md" >}}) manual pages.

### Other changes

- New quickstart section {{% xref "/quickstart/opensearch-helm/_index.md" %}}
- Updates in {{% xref "/install/podman/_index.md" %}} and {{% xref "/install/docker/_index.md" %}}
- `close_batch` and `set_transport` methods in the [python source]({{< relref "/chapter-sources/python-source/_index.md" >}})

## 2023-08-18 to 2023-10-20

<!-- Covered till commit 682e774cb35ab5cd2b16da8abeee4e4ae0d0ff4d -->

- [syslog-ng-otlp source]({{< relref "/chapter-sources/source-syslog-ng-otlp/_index.md" >}}) and [syslog-ng-otlp destination]({{< relref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" >}})
- [Loki destination]({{< relref "/chapter-destinations/destination-loki/_index.md" >}})
- [Amazon S3 destination]({{< relref "/chapter-destinations/destination-s3/_index.md" >}})
- [OpenSearch destination]({{< relref "/chapter-destinations/destination-opensearch/_index.md" >}})
- [stdout destination]({{< relref "/chapter-destinations/destination-stdout/_index.md" >}})
- `http` destination options:
    - [ignore-hostname-mismatch ssl-option]({{< relref "/chapter-encrypted-transport-tls/tlsoptions/_index.md#ssl-options" >}})
    - [accept-encoding()]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md#accept-encoding" >}})
    - [accept-redirects()]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md#accept-redirects" >}})
    - [content-compression()]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md#content-compression" >}})
- [Dynamic labeling in the metrics-probe parser]({{< relref "/chapter-parsers/metrics-probe/_index.md#dynamic-labels" >}})

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