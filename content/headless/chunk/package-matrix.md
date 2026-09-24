---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The following table lists the {{% param "product.name" %}} modules, the configuration objects each provides, and the package to install.

| Module | Provides | Package |
|--------|----------|---------|
| Base | `file()`, `network()`, `syslog()`, `tcp()`, `udp()`, `unix-stream()`, `unix-dgram()`, `pipe()`, `program()`, `stdin()`, `stdout()`, `usertty()`, `wildcard-file()`, `pseudofile()`, `system()`, `systemd-journal()`, `systemd-syslog()`, `internal()`, `csv-parser()`, `db-parser()`, `json-parser()`, `kv-parser()`, `linux-audit-parser()`, `date-parser()`, `regexp-parser()`, `tags-parser()`, `syslog-parser()`, `sdata-parser()`, `group-lines()`, `grouping-by()`, `app-parser()`, `metrics-probe()`, `disk-buffer()`, `rate-limit()`, and most template functions | {{< if deb >}}`axosyslog-core`{{< /if >}}{{< if rpm >}}`axosyslog`{{< /if >}} |
| Configuration Library (SCL) | `linux-audit()`, `default-network-drivers()`, `mbox()`, `nodejs()`, `osquery()`, `pacct()`, `snmptrap()`, `jellyfin()`, `pihole-ftl()`, `qbittorrent()`, `radarr()` and the other `*arr()` sources, `collectd()`, `graylog2()`, `loggly()`, `logmatic()`, `syslog-ng()`, `ewmm()`, the application adapters (`apache-accesslog-parser()`, `cisco-parser()`, `panos-parser()`, `sudo-parser()`, and so on), and every HTTP-based destination | {{< if deb >}}`axosyslog-scl`{{< /if >}}{{< if rpm >}}Part of the `axosyslog` base package{{< /if >}} |
| gRPC | `opentelemetry()`, `axosyslog-otlp()` (formerly `syslog-ng-otlp()`), `loki()`, `bigquery()`, `clickhouse()`, `google-pubsub-grpc()`, the `otel_*()` and `protobuf_message()` FilterX functions | {{< if deb >}}`axosyslog-mod-grpc`{{< /if >}}{{< if rpm >}}`axosyslog-grpc`{{< /if >}} |
| HTTP | `http()`, `azure-auth-header()`, and all SCL destinations built on HTTP: `elasticsearch-http()`, `elasticsearch-datastream()`, `opensearch()`, `openobserve-log()`, `logscale()`, `splunk-hec-event()`, `splunk-hec-raw()`, `sumologic-http()`, `slack()`, `discord()`, `telegram()`, `azure-monitor()`, `google-pubsub()` | {{< if deb >}}`axosyslog-mod-http`{{< /if >}}{{< if rpm >}}`axosyslog-http`{{< /if >}} |
| Python | `python()` source, destination, parser and template function, `python-fetcher()`, `python-http-header()`, and the Python-based SCL drivers `kubernetes()`, `kubernetes-metadata-parser()`, `s3()`, `webhook()`, `webhook-json()`, `hypr-app-audit-trail()` | {{< if deb >}}`axosyslog-mod-python`{{< /if >}}{{< if rpm >}}`axosyslog-python`{{< /if >}} |
| Cloud authentication | `cloud-auth()`, used by `azure-monitor()` and `google-pubsub()` | {{< if deb >}}`axosyslog-mod-cloud-auth`{{< /if >}}{{< if rpm >}}`axosyslog-cloud-auth`{{< /if >}} |
| Kafka | `kafka-c()` and the `kafka()` SCL destination | {{< if deb >}}`axosyslog-mod-rdkafka`{{< /if >}}{{< if rpm >}}`axosyslog-kafka`{{< /if >}} |
| MQTT | `mqtt()` source and destination | {{< if deb >}}`axosyslog-mod-mqtt`{{< /if >}}{{< if rpm >}}`axosyslog-mqtt`{{< /if >}} |
| AMQP | `amqp()` | {{< if deb >}}`axosyslog-mod-amqp`{{< /if >}}{{< if rpm >}}`axosyslog-amqp`{{< /if >}} |
| MongoDB | `mongodb()` | {{< if deb >}}`axosyslog-mod-mongodb`{{< /if >}}{{< if rpm >}}`axosyslog-mongodb`{{< /if >}} |
| SQL | `sql()` | {{< if deb >}}`axosyslog-mod-sql`{{< /if >}}{{< if rpm >}}`axosyslog-sql`{{< /if >}} |
| Redis | `redis()` | {{< if deb >}}`axosyslog-mod-redis`{{< /if >}}{{< if rpm >}}`axosyslog-redis`{{< /if >}} |
| Riemann | `riemann()` | {{< if deb >}}`axosyslog-mod-riemann`{{< /if >}}{{< if rpm >}}`axosyslog-riemann`{{< /if >}} |
| SMTP | `smtp()` | {{< if deb >}}`axosyslog-mod-smtp`{{< /if >}}{{< if rpm >}}`axosyslog-smtp`{{< /if >}} |
| SNMP | `snmp()`, `snmptrapd-parser()`, and the `snmptrap()` SCL source | {{< if deb >}}`axosyslog-mod-snmp`{{< /if >}}{{< if rpm >}}`axosyslog-afsnmp`{{< /if >}} |
| GeoIP2 | `geoip2()` parser and the `$(geoip2)` template function | {{< if deb >}}`axosyslog-mod-geoip2`{{< /if >}}{{< if rpm >}}`axosyslog-geoip`{{< /if >}} |
| Java | `java()`. Only the HDFS Java module is shipped, the Java implementations of the Elasticsearch and HTTP destinations aren't. | {{< if deb >}}`axosyslog-mod-java`, `axosyslog-mod-java-common-lib`{{< /if >}}{{< if rpm >}}`axosyslog-java`{{< /if >}} |
| HDFS | `hdfs()` | {{< if deb >}}`axosyslog-mod-hdfs` (also requires `axosyslog-mod-java` and `axosyslog-mod-java-common-lib`){{< /if >}}{{< if rpm >}}`axosyslog-java`{{< /if >}} |
| Secure logging | `$(slog)` template function and the `slog*` command-line tools | {{< if deb >}}`axosyslog-mod-slog`{{< /if >}}{{< if rpm >}}`axosyslog-slog`{{< /if >}} |
| eBPF | `ebpf()` | {{< if deb >}}`axosyslog-mod-bpf`{{< /if >}}{{< if rpm >}}`axosyslog-bpf`{{< /if >}} |
| XML parser | `xml()`, `windows-eventlog-xml-parser()`, and the `parse_xml()`, `format_xml()`, `parse_windows_eventlog_xml()`, `format_windows_eventlog_xml()` FilterX functions | {{< if deb >}}`axosyslog-mod-xml-parser`{{< /if >}}{{< if rpm >}}Part of the `axosyslog` base package{{< /if >}} |
| STOMP | `stomp()` | {{< if deb >}}`axosyslog-mod-stomp`{{< /if >}}{{< if rpm >}}Part of the `axosyslog` base package{{< /if >}} |
| Graphite | `$(graphite-output)` template function and the `graphite()` SCL destination | {{< if deb >}}`axosyslog-mod-graphite`{{< /if >}}{{< if rpm >}}Part of the `axosyslog` base package{{< /if >}} |
| add-contextual-data | `add-contextual-data()` | {{< if deb >}}`axosyslog-mod-add-contextual-data`{{< /if >}}{{< if rpm >}}Part of the `axosyslog` base package{{< /if >}} |
| map-value-pairs | `map-value-pairs()` | {{< if deb >}}`axosyslog-mod-map-value-pairs`{{< /if >}}{{< if rpm >}}Part of the `axosyslog` base package{{< /if >}} |
| getent | `$(getent)` template function | {{< if deb >}}`axosyslog-mod-getent`{{< /if >}}{{< if rpm >}}Part of the `axosyslog` base package{{< /if >}} |
| stardate | `$(stardate)` template function | {{< if deb >}}`axosyslog-mod-stardate`{{< /if >}}{{< if rpm >}}Part of the `axosyslog` base package{{< /if >}} |
| Examples | `example-msg-generator()`, `example-random-generator()`, `random-choice-generator()`, `example-destination()` | {{< if deb >}}`axosyslog-mod-examples`{{< /if >}}{{< if rpm >}}Part of the `axosyslog` base package{{< /if >}} |
| Apache Arrow Flight | `arrow-flight()` | {{< if deb >}}`axosyslog-mod-arrow-flight`{{< /if >}}{{< if rpm >}}Not available{{< /if >}} |

{{< if deb >}}
The `axosyslog` metapackage installs `axosyslog-core`, `axosyslog-scl`, and recommends every optional module, so `apt install axosyslog` gives you a working setup with the common modules.
{{< /if >}}
{{< if rpm >}}
Note that the RPM package names differ from the Debian package names: they don't have the `mod-` part, and some of them use a different name (for example, the GeoIP2 module is `axosyslog-geoip`, and the Kafka module is `axosyslog-kafka`).
{{< /if >}}

{{% param "product.name" %}} supports the `sun-streams()`, `darwin-oslog()`, `darwin-oslog-stream()`, and `openbsd()` drivers only on Solaris, macOS, and OpenBSD respectively. The Debian/Ubuntu and RHEL packages don't include them.
