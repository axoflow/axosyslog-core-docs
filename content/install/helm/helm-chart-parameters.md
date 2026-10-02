---
title: Parameters of the AxoSyslog Helm chart
linktitle: Chart parameters
weight: 100
description: Configurable parameters and default values of the AxoSyslog Helm chart for the collector, aggregator, and metrics exporter.
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The following tables list the configurable parameters of the `axosyslog` Helm chart and their default values. For details on installing the chart, see {{% xref "/install/helm/_index.md" %}}.

The chart has two components that you can enable or disable independently:

- The [collector](#collector) is a DaemonSet that runs on every node, collects the pod logs, and forwards them to a destination. By default, it forwards the logs to the aggregator.
- The [aggregator](#aggregator) is a StatefulSet that receives syslog and `axosyslog-otlp()` messages from the network (including the messages of the collector), and routes them to local or remote destinations.

## Collector parameters {#collector}

When you deploy {{% param "product.abbrev" %}} as a collector (which is a DaemonSet), it collects and forwards local logs to a destination. You can use the following parameters to configure the collector. The parameters for specific destinations are shown in subsequent sections.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  collector.enabled  | Deploy {{% param "product.abbrev" %}} as a collector to collect and forward local logs. |  `true`  |
|  collector.config.destinations  | The configurations of destinations that can be configured using chart values: [syslog](#collector-syslog-destination), [opensearch](#collector-opensearch-destination), and [axosyslogOtlp](#collector-axosyslogotlp-destination). For destinations and options not available as chart values, you can use the `collector.config.raw` option. | The [syslog](#collector-syslog-destination) destination is enabled, and sends the logs to the aggregator. |
|  collector.config.raw  | A complete `syslog-ng` configuration. If this parameter is set, all other parameters in the `collector.config` section are ignored. You can use this to set parameters that are not available as chart values. For details on how to create a configuration for `syslog-ng`, see the [{{% param "product.name" %}} documentation]({{< relref "/_index.md" >}}). |  `""`  |
|  collector.config.rewrites.set  |  A list of name-value pairs to set for the collected log messages. Uses the [`set` rewrite rule]({{< relref "/chapter-manipulating-messages/modifying-messages/rewrite-set/_index.md" >}}). |  `{}`  |
|  collector.config.sources.kubernetes.enabled  | Collect pod logs using the [`kubernetes()`]({{< relref "/chapter-sources/configuring-sources-kubernetes/_index.md" >}}) source. If disabled, the chart doesn't configure any source. For the list of available sources, see the [Sources chapter]({{< relref "/chapter-sources/_index.md" >}}). |  `true`  |
|  collector.config.sources.kubernetes.prefix  | Set JSON prefix for logs collected from the Kubernetes cluster.  |  `""`  |
|  collector.config.sources.kubernetes.keyDelimiter  | Set JSON key delimiter for logs collected from the Kubernetes cluster.  |  `""`  |
|  collector.config.sources.kubernetes.maxContainers  | The maximum number of containers to collect logs from. Sets the `max-containers()` option of the `kubernetes()` source.  |  `""`  |
|  collector.config.stats.level | Specifies the level of statistics {{% param "product.abbrev" %}} collects about the processed messages. For details, see {{% xref "/chapter-global-options/reference-options/_index.md#global-option-stats-level" %}}. | `2` |

The following example uses the `collector.config.raw` parameter to configure a custom destination:

```yaml
collector:
  config:
    raw: |
      @version: {{% param "product.techversion" %}}
      @include "scl.conf"

      log {
        source {
          syslog(port(12345));
        };

        destination {
          logscale(
            token("<YOUR_INGEST_TOKEN>")
          );
        };

        flags(flow-control);
      };

  hostNetworking: true
```

### Collector syslog destination {#collector-syslog-destination}

Send logs over the network, conforming to RFC3164 using the [`network()`]({{< relref "/chapter-destinations/configuring-destinations-network/_index.md" >}}) destination driver. By default, the collector uses this destination to send the logs to the [aggregator](#aggregator) in JSON format.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  collector.config.destinations.syslog.enabled  | Enables the destination. | `true`  |
|  collector.config.destinations.syslog.address  | The IP address or hostname of the destination host. Can include Helm templates. |  `<release-name>-aggregator.<namespace>.svc.cluster.local`  |
|  collector.config.destinations.syslog.extraOptionsRaw  | Other options of the [`network()` destination]({{< relref "/chapter-destinations/configuring-destinations-network/_index.md" >}}). |  `"time-reopen(10)"`  |
|  collector.config.destinations.syslog.port  | The port number to send the messages to. |  `514`  |
|  collector.config.destinations.syslog.template  | A template to format the messages. |  `"$(format-json .*)"`  |
|  collector.config.destinations.syslog.transport  | The transport protocol to use. Possible values: `tcp`, `udp` |  `tcp`  |

For example, to send the logs to a syslog server outside the cluster:

```yaml
collector:
  config:
    destinations:
      syslog:
        enabled: true
        transport: tcp
        address: 192.0.2.10
        port: 514
        template: "$(format-json .*)"
```

### Collector OpenSearch destination {#collector-opensearch-destination}

Send logs to OpenSearch over HTTP or HTTPS.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  collector.config.destinations.opensearch.enabled  | Enables the destination. | `false`  |
|  collector.config.destinations.opensearch.url  | The URL of the OpenSearch server, for example, `http://my-release-opensearch.default.svc.cluster.local:9200`. |  `""`  |
|  collector.config.destinations.opensearch.index  | Name of the OpenSearch index that stores the messages. |  `""`  |
|  collector.config.destinations.opensearch.user  | The username to use for authentication on the OpenSearch server, if not authenticating with a certificate. |  `""`  |
|  collector.config.destinations.opensearch.password  | The password to use for authentication on the OpenSearch server. |  `""`  |
|  collector.config.destinations.opensearch.template  | A template to format the messages. |  `"$(format-json .*)"`  |
|  collector.config.destinations.opensearch.extraOptionsRaw  | Other options of the [`elasticsearch-http()` destination]({{< relref "/chapter-destinations/configuring-destinations-elasticsearch-http/_index.md" >}}). |  `"time-reopen(10)"`  |
|  collector.config.destinations.opensearch.tls.CADir  | A directory containing a set of trusted CA certificates in PEM format. The name of the files must be the 32-bit hash of the subject's name. {{% param "product.abbrev" %}} verifies the certificate of the server using these CA certificates. |  `""`  |
|  collector.config.destinations.opensearch.tls.CAFile  | The CA certificate in PEM format to use when verifying the certificate of the server. |  `""`  |
|  collector.config.destinations.opensearch.tls.Cert  | Name of a file containing an X.509 certificate or a certificate chain in PEM format. {{% param "product.abbrev" %}} authenticates with this certificate on the server, with the private key set in the `collector.config.destinations.opensearch.tls.Key` field. If the file contains a certificate chain, the file must begin with the certificate of the host, followed by the CA certificate that signed the certificate of the host, and any other signing CAs in order. |  `""`  |
|  collector.config.destinations.opensearch.tls.Key  | Name of a file containing an unencrypted private key in PEM format. {{% param "product.abbrev" %}} authenticates with this key and the certificate set in the `collector.config.destinations.opensearch.tls.Cert` field. |  `""`  |
|  collector.config.destinations.opensearch.tls.peerVerify  | If true, {{% param "product.abbrev" %}} verifies the certificate of the server with the CA certificates set in `collector.config.destinations.opensearch.tls.CAFile` and `collector.config.destinations.opensearch.tls.CADir`. |  `false`  |

For example:

```yaml
collector:
  config:
    destinations:
      syslog:
        enabled: false
      opensearch:
        enabled: true
        url: http://my-release-opensearch.default.svc.cluster.local:9200
        index: "test-axoflow-index"
        tls:
          CAFile: "/path/to/CAFile.pem"
          Cert: "/path/to/Cert.pem"
          Key: "/path/to/Key.pem"
          peerVerify: true
```

### Collector axosyslogOtlp destination {#collector-axosyslogotlp-destination}

Send logs to another {{% param "product.abbrev" %}} node using the [`axosyslog-otlp()`]({{< relref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" >}}) destination driver.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  collector.config.destinations.axosyslogOtlp.enabled  | Enables the destination. | `false`  |
|  collector.config.destinations.axosyslogOtlp.url  | The IP address or hostname and the port of the destination host. Can include Helm templates. |  `<release-name>-aggregator.<namespace>.svc.cluster.local:4317`  |
|  collector.config.destinations.axosyslogOtlp.extraOptionsRaw  | Other options of the [`axosyslog-otlp()` destination]({{< relref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" >}}). |  `"time-reopen(1) batch-timeout(1000) batch-lines(1000)"`  |

For example, to send the logs to the aggregator using `axosyslog-otlp()` instead of syslog:

```yaml
collector:
  config:
    destinations:
      syslog:
        enabled: false
      axosyslogOtlp:
        enabled: true
```

### Other collector parameters

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  collector.affinity  | Affinity rules for collector pod scheduling. |  `{}`  |
|  collector.annotations  | Additional annotations for the collector DaemonSet and its pods. |  `{}`  |
|  collector.extraVolumes  | Additional volumes to add to the collector pod. |  `[]`  |
|  collector.extraVolumeMounts  | Additional volume mounts to add to the collector container. |  `[]`  |
|  collector.hostAliases  | Custom entries added to `/etc/hosts` for collector pods. |  `[]`  |
|  collector.hostNetworking  | Use the host network namespace for collector pods. |  `false`  |
|  collector.labels  | Additional labels for the collector DaemonSet and its pods. |  `{}`  |
|  collector.maxUnavailable  | The maximum number of unavailable pods during a rolling update of the DaemonSet. |  `1`  |
|  collector.nodeSelector  | Node selector for collector pod assignment. |  `{}`  |
|  collector.resources  | CPU and memory resource requests and limits for the collector. If not set, the global `resources` value is used. |  `{}`  |
|  collector.secretMounts  | Secrets to mount as files into the collector container. |  `[]`  |
|  collector.securityContext  | Container-level security context for the collector. If not set, the global `securityContext` value is used. |  `{}`  |
|  collector.tolerations  | Tolerations for collector pod scheduling. |  `[]`  |

## Aggregator parameters {#aggregator}

When you deploy {{% param "product.abbrev" %}} as an aggregator (which is a StatefulSet), it receives incoming data from the network and routes it to a local or remote destination. You can use the following parameters to configure the aggregator. The parameters for specific sources and destinations are shown in subsequent sections.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  aggregator.enabled  | Deploy {{% param "product.abbrev" %}} as an aggregator to receive logs from the network. |  `true`  |
|  aggregator.replicaCount  | The number of aggregator replicas. |  `1`  |
|  aggregator.bufferStorage.enabled | Configures a storage using PersistentVolumes to use as disk-buffer. | `false` |
|  aggregator.bufferStorage.storageClass | The class of the storage to use, for example, `standard`. | `standard` |
|  aggregator.bufferStorage.size | The maximum size of the storage to use as disk-buffer, for example, `10Gi`. | `10Gi` |
|  aggregator.logFileStorage.enabled | Configures a storage using PersistentVolumes to store the log files. The volume is mounted to `/var/log`. | `false` |
|  aggregator.logFileStorage.storageClass | The class of the storage to use, for example, `standard`. | `standard` |
|  aggregator.logFileStorage.size | The maximum size of the storage to use for log storage, for example, `50Gi`. | `50Gi` |
|  aggregator.config.raw  | A complete `syslog-ng` configuration. If this parameter is set, all other parameters in the `aggregator.config` section are ignored. You can use this to set parameters that are not available as chart values. For details on how to create a configuration for `syslog-ng`, see the [{{% param "product.name" %}} documentation]({{< relref "/_index.md" >}}). |  `""`  |
|  aggregator.config.stats.level | Specifies the level of statistics {{% param "product.abbrev" %}} collects about the processed messages. For details, see {{% xref "/chapter-global-options/reference-options/_index.md#global-option-stats-level" %}}. | `2` |
|  aggregator.config.rewrites.set  | A list of name-value pairs to set for the received log messages. Uses the [`set` rewrite rule]({{< relref "/chapter-manipulating-messages/modifying-messages/rewrite-set/_index.md" >}}). |  `{}`  |
|  aggregator.config.sources  | The configurations of the sources that can be configured using chart values: [syslog](#aggregator-syslog-source) and [axosyslogOtlp](#aggregator-axosyslogotlp-source). For sources not available as chart values, you can use the `aggregator.config.raw` option. | Both sources are enabled. |
|  aggregator.config.destinations  | The configurations of destinations that can be configured using chart values: [file](#aggregator-file-destination), [syslog](#aggregator-syslog-destination), [opensearch](#aggregator-opensearch-destination), and [axosyslogOtlp](#aggregator-axosyslogotlp-destination). For destinations not available as chart values, you can use the `aggregator.config.raw` option. | The [file](#aggregator-file-destination) destination is enabled. |

### Aggregator syslog source {#aggregator-syslog-source}

You can use the syslog source to receive RFC3164 or RFC5424 formatted syslog messages. The source uses the [`default-network-drivers()`]({{< relref "/chapter-sources/source-default-network-drivers/_index.md" >}}) source driver. The following table shows the ports where the aggregator receives the messages:

| Traffic | Container port | Service port | NodePort |
| ------- | -------------- | ------------ | -------- |
| RFC3164 over UDP | 1514 | 514 | 30514 |
| RFC3164 over TCP | 1514 | 514 | 30514 |
| RFC5424 over TCP | 1601 | 601 | 30601 |
| RFC5424 over TLS (only if `aggregator.config.sources.syslog.tls` is set) | 6514 | 6514 | 30614 |

The NodePorts are used only if `service.type` is `NodePort` or `LoadBalancer`. If needed, you can open additional ports using the [`service.extraPorts`](#generic-chart-parameters) option.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  aggregator.config.sources.syslog.enabled  | Enable receiving syslog messages. |  `true`  |
|  aggregator.config.sources.syslog.rfc3164UdpPort  | The NodePort for RFC3164-formatted messages over UDP. |  `30514`  |
|  aggregator.config.sources.syslog.rfc3164TcpPort  | The NodePort for RFC3164-formatted messages over TCP. |  `30514`  |
|  aggregator.config.sources.syslog.rfc5424TcpPort  | The NodePort for RFC5424-formatted messages over TCP. |  `30601`  |
|  aggregator.config.sources.syslog.rfc5424TlsPort  | The NodePort for RFC5424-formatted messages over TLS. |  `30614`  |
|  aggregator.config.sources.syslog.maxConnections  | Maximum number of parallel connections. |  `1000`  |
|  aggregator.config.sources.syslog.initWindowSize  | The initial window size used for [flow-control]({{< relref "/chapter-routing-filters/concepts-flow-control/_index.md" >}}). |  `100000`  |
|  aggregator.config.sources.syslog.tls.peerVerify  | If `true`, {{% param "product.abbrev" %}} requests a certificate from the peers. In this case, you must also set the CA directory or the CA file. |  `false`  |
|  aggregator.config.sources.syslog.tls.CAFile  | A file containing trusted CA certificates. For details, see [TLS options]({{< relref "/chapter-encrypted-transport-tls/tlsoptions/_index.md#ca-file" >}}). |  `""`  |
|  aggregator.config.sources.syslog.tls.CADir  | The directory for the trusted CA files. For details, see [TLS options]({{< relref "/chapter-encrypted-transport-tls/tlsoptions/_index.md#ca-dir" >}}). |  `""`  |
|  aggregator.config.sources.syslog.tls.Cert  | The certificate file to show to the peer. For details, see [TLS options]({{< relref "/chapter-encrypted-transport-tls/tlsoptions/_index.md#cert-file" >}}). |  `""`  |
|  aggregator.config.sources.syslog.tls.Key  | The private key file for the certificate. For details, see [TLS options]({{< relref "/chapter-encrypted-transport-tls/tlsoptions/_index.md#key-file" >}}). |  `""`  |

### Aggregator axosyslogOtlp source {#aggregator-axosyslogotlp-source}

Initializes an [`axosyslog-otlp()`]({{< relref "/chapter-sources/source-syslog-ng-otlp/_index.md" >}}) source to receive messages from another {{% param "product.abbrev" %}} node that sends telemetry data using the [`axosyslog-otlp()`]({{< relref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" >}}) destination driver. The source receives the messages on port 4317 (container and service port).

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  aggregator.config.sources.axosyslogOtlp.enabled  | Enable receiving `axosyslog-otlp()` messages. |  `true`  |
|  aggregator.config.sources.axosyslogOtlp.port  | The NodePort for `axosyslog-otlp()` messages. Used only if `service.type` is `NodePort` or `LoadBalancer`. |  `30317`  |

### Aggregator file destination {#aggregator-file-destination}

To write the received logs into files, configure the [`aggregator.logFileStorage`](#aggregator) and the `aggregator.config.destinations.file` options.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  aggregator.config.destinations.file.enabled | Enables the file destination. | `true` |
|  aggregator.config.destinations.file.path | The path and filename of the log files. Can include macros. For examples, see {{% xref "/chapter-destinations/configuring-destinations-file/_index.md" %}}. | `"/var/log/syslog"` |
|  aggregator.config.destinations.file.template | The [template]({{< relref "/chapter-destinations/configuring-destinations-file/reference-destination-file/_index.md#template" >}}) used to format the log messages. Can include macros. | `""` |
|  aggregator.config.destinations.file.extraOptionsRaw  | Other options of the [`file()` destination]({{< relref "/chapter-destinations/configuring-destinations-file/_index.md" >}}). If the directories used in `aggregator.config.destinations.file.path` do not exist, set `extraOptionsRaw: "create-dirs(yes)"`. |  `"create-dirs(yes)"`  |

For example:

```yaml
aggregator:
  enabled: true
  logFileStorage:
    enabled: true
    storageClass: standard
    size: 50Gi
  config:
    destinations:
      file:
        enabled: true
        path: "/var/log/$HOST/syslog"
        extraOptionsRaw: "create-dirs(yes)"
```

### Aggregator OpenSearch destination {#aggregator-opensearch-destination}

Send logs to [OpenSearch]({{< relref "/chapter-destinations/destination-opensearch/_index.md" >}}) over HTTP or HTTPS.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  aggregator.config.destinations.opensearch.enabled  | Enables the destination. | `false` |
|  aggregator.config.destinations.opensearch.url  | The URL of the OpenSearch server, for example, `http://my-release-opensearch.default.svc.cluster.local:9200`. | `""` |
|  aggregator.config.destinations.opensearch.extraOptionsRaw  | Other options of the [`elasticsearch-http()` destination]({{< relref "/chapter-destinations/configuring-destinations-elasticsearch-http/_index.md" >}}). |  `"time-reopen(10)"`  |
|  aggregator.config.destinations.opensearch.index  | Name of the OpenSearch index that stores the messages. |  `""`  |
|  aggregator.config.destinations.opensearch.user  | The username to use for authentication on the OpenSearch server, if not authenticating with a certificate. |  `""`  |
|  aggregator.config.destinations.opensearch.password  | The password to use for authentication on the OpenSearch server. |  `""`  |
|  aggregator.config.destinations.opensearch.template  | A template to format the messages, for example, `"$(format-json --scope rfc5424 --exclude DATE --key ISODATE @timestamp=${ISODATE})"`. |  `""`  |
|  aggregator.config.destinations.opensearch.tls.CAFile  | The CA certificate in PEM format to use when verifying the certificate of the server. |  `""`  |
|  aggregator.config.destinations.opensearch.tls.CADir  | A directory containing a set of trusted CA certificates in PEM format. The name of the files must be the 32-bit hash of the subject's name. {{% param "product.abbrev" %}} verifies the certificate of the server using these CA certificates. |  `""`  |
|  aggregator.config.destinations.opensearch.tls.Cert  | Name of a file containing an X.509 certificate or a certificate chain in PEM format. {{% param "product.abbrev" %}} authenticates with this certificate on the server, with the private key set in the `aggregator.config.destinations.opensearch.tls.Key` field. If the file contains a certificate chain, the file must begin with the certificate of the host, followed by the CA certificate that signed the certificate of the host, and any other signing CAs in order. |  `""`  |
|  aggregator.config.destinations.opensearch.tls.Key  | Name of a file containing an unencrypted private key in PEM format. {{% param "product.abbrev" %}} authenticates with this key and the certificate set in the `aggregator.config.destinations.opensearch.tls.Cert` field. |  `""`  |
|  aggregator.config.destinations.opensearch.tls.peerVerify  | If true, {{% param "product.abbrev" %}} verifies the certificate of the server with the CA certificates set in `aggregator.config.destinations.opensearch.tls.CAFile` and `aggregator.config.destinations.opensearch.tls.CADir`. |  `false`  |

For example:

```yaml
aggregator:
  enabled: true
  bufferStorage:
    enabled: true
    storageClass: standard
    size: 10Gi
  config:
    destinations:
      opensearch:
        enabled: true
        url: http://my-release-opensearch.default.svc.cluster.local:9200
        index: "test-axoflow-index"
        user: "<YOUR_USERNAME>"
        password: "<YOUR_PASSWORD>"
        #tls:
        #  CAFile: "/path/to/CAFile.pem"
        #  CADir: "/path/to/CADir/"
        #  Cert: "/path/to/Cert.pem"
        #  Key: "/path/to/Key.pem"
        #  peerVerify: false
        extraOptionsRaw: "time-reopen(10)"
```

### Aggregator syslog destination {#aggregator-syslog-destination}

Send logs over the network, conforming to RFC3164 using the [`network()`]({{< relref "/chapter-destinations/configuring-destinations-network/_index.md" >}}) destination driver.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  aggregator.config.destinations.syslog.enabled  | Enables the destination. | `false`  |
|  aggregator.config.destinations.syslog.address  | The IP address or hostname of the destination host. |  `""`  |
|  aggregator.config.destinations.syslog.extraOptionsRaw  | Other options of the [`network()` destination]({{< relref "/chapter-destinations/configuring-destinations-network/_index.md" >}}). |  `"time-reopen(10)"`  |
|  aggregator.config.destinations.syslog.port  | The port number to send the messages to. |  `""`  |
|  aggregator.config.destinations.syslog.template  | A template to format the messages. |  `""`  |
|  aggregator.config.destinations.syslog.transport  | The transport protocol to use. Possible values: `tcp`, `udp` |  `tcp`  |

For example:

```yaml
aggregator:
  enabled: true
  bufferStorage:
    enabled: true
    storageClass: standard
    size: 10Gi
  config:
    destinations:
      syslog:
        enabled: true
        transport: tcp
        address: 192.0.2.10
        port: 514
        # convert incoming data to JSON
        #template: "$(format-json .*)\n"
        # use standard syslog logfile
        #template: "$ISODATE $HOST $MSGHDR$MSG\n"
        extraOptionsRaw: "time-reopen(10)"
```

### Aggregator axosyslogOtlp destination {#aggregator-axosyslogotlp-destination}

Send data using the [`axosyslog-otlp()`]({{< relref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" >}}) destination driver to another {{% param "product.abbrev" %}} node.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  aggregator.config.destinations.axosyslogOtlp.enabled | Enables the destination. | `false` |
|  aggregator.config.destinations.axosyslogOtlp.url | The IP address or hostname and the port of the destination host. Can include Helm templates. | `""` |
|  aggregator.config.destinations.axosyslogOtlp.extraOptionsRaw  | Other options of the [`axosyslog-otlp()` destination]({{< relref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" >}}). |  `"time-reopen(1) batch-timeout(1000) batch-lines(1000)"`  |

For example:

```yaml
aggregator:
  enabled: true
  bufferStorage:
    enabled: true
    storageClass: standard
    size: 10Gi
  config:
    destinations:
      axosyslogOtlp:
        enabled: true
        url: "192.0.2.10:4317"
        extraOptionsRaw: "time-reopen(1) batch-timeout(1000) batch-lines(1000)"
```

### Other aggregator parameters

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  aggregator.affinity  | Affinity rules for aggregator pod scheduling. |  `{}`  |
|  aggregator.annotations  | Additional annotations for the aggregator StatefulSet and its pods. |  `{}`  |
|  aggregator.extraVolumes  | Additional volumes to add to the aggregator pod. |  `[]`  |
|  aggregator.extraVolumeMounts  | Additional volume mounts to add to the aggregator container. |  `[]`  |
|  aggregator.hostAliases  | Custom entries added to `/etc/hosts` for aggregator pods. |  `[]`  |
|  aggregator.labels  | Additional labels for the aggregator StatefulSet and its pods. |  `{}`  |
|  aggregator.nodeSelector  | Node selector for aggregator pod assignment. |  `{}`  |
|  aggregator.resources  | CPU and memory resource requests and limits for the aggregator. If not set, the global `resources` value is used. |  `{}`  |
|  aggregator.secretMounts  | Secrets to mount as files into the aggregator container. |  `[]`  |
|  aggregator.securityContext  | Container-level security context for the aggregator. If not set, the global `securityContext` value is used. |  `{}`  |
|  aggregator.tolerations  | Tolerations for aggregator pod scheduling. |  `[]`  |

## Metrics parameters {#metrics}

You can deploy [`axosyslog-metrics-exporter`](https://github.com/axoflow/axosyslog-metrics-exporter) as a sidecar container of the collector to expose the metrics of {{% param "product.abbrev" %}} in Prometheus format on port 9577. If you use the Prometheus Operator, you can also deploy a PodMonitor to scrape the metrics.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  metricsExporter.enabled  | Deploy `axosyslog-metrics-exporter` as a sidecar on the collector DaemonSet. |  `false`  |
|  metricsExporter.image.repository  | The image repository of the metrics exporter. |  `ghcr.io/axoflow/axosyslog-metrics-exporter`  |
|  metricsExporter.image.tag  | The image tag of the metrics exporter. |  `latest`  |
|  metricsExporter.image.pullPolicy  | The image pull policy of the metrics exporter. If not set, the default policy of Kubernetes applies. |  `""`  |
|  metricsExporter.resources  | CPU and memory resource requests and limits for the metrics exporter sidecar. |  `{}`  |
|  metricsExporter.securityContext  | Container-level security context for the metrics exporter sidecar. |  `{}`  |
|  podMonitor.enabled  | Deploy a PodMonitor custom resource for the Prometheus Operator. Requires `metricsExporter.enabled`. |  `false`  |
|  podMonitor.labels  | Additional labels for the PodMonitor. |  `{}`  |
|  podMonitor.annotations  | Additional annotations for the PodMonitor. |  `{}`  |

## Generic chart parameters

The following parameters apply to both the collector and the aggregator. Where a component has its own parameter with the same name (for example, `collector.resources` or `aggregator.resources`), the component-level setting overrides the generic one.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  image.repository  | The container image repository. |  `ghcr.io/axoflow/axosyslog`  |
|  image.pullPolicy  | The container image pull policy. |  `IfNotPresent`  |
|  image.tag  | The container image tag. If not set, the `appVersion` of the chart is used. |  `""`   |
|  image.extraArgs  | Additional arguments passed to the `syslog-ng` process. |  `[]`  |
|  imagePullSecrets  | The names of secrets containing private registry credentials. |  `[]`  |
|  nameOverride  | Override the chart name. |  `""`  |
|  fullnameOverride  | Override the fully qualified chart name. |  `""`  |
|  rbac.create  | Create a ClusterRole and a ClusterRoleBinding for the collector. |  `true`  |
|  rbac.extraRules  | Additional RBAC rules to add to the ClusterRole. |  `[]`  |
|  openShift.enabled  | Set to `true` when deploying on OpenShift. |  `false`  |
|  openShift.securityContextConstraints.create  | Create SecurityContextConstraints on OpenShift. |  `true`  |
|  openShift.securityContextConstraints.annotations  | Annotations to apply to SecurityContextConstraints. |  `{}`  |
|  service.create  | Create a service so the [aggregator](#aggregator) can receive incoming connections. |  `true`  |
|  service.type  | The type of the service. Possible values: `NodePort`, `LoadBalancer`, `ClusterIP`, `ExternalName` |  `NodePort`  |
|  service.annotations  | Annotations to apply to the service. |  `{}`  |
|  service.extraPorts  | Additional ports to expose on the service of the [aggregator](#aggregator). |  `[]`  |
|  serviceAccount.create  | Create a service account for the pods. |  `true`  |
|  serviceAccount.annotations  | Annotations to apply to the service account. |  `{}`  |
|  namespace  | The Kubernetes namespace to deploy to. If not set, the namespace of the Helm release is used. |  `""`  |
|  podAnnotations  | Annotations applied to all pods. |  `{}`  |
|  podSecurityContext  | Pod-level security context applied to all pods. |  `{}`  |
|  securityContext  | Default container-level security context for all components. |  `{}`  |
|  resources  | Default CPU and memory resource requests and limits for all components. |  `{}`  |
|  nodeSelector  | Default node selector for all pods. |  `{}`  |
|  tolerations  | Default tolerations for all pods. |  `[]`  |
|  affinity  | Default affinity rules for all pods. |  `{}`  |
|  updateStrategy  | Update strategy for the DaemonSet and the StatefulSet. |  `RollingUpdate`  |
|  priorityClassName  | The [PriorityClass](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#priorityclass) of the pods. |  `""`  |
|  dnsConfig  | The [DNS configuration of the pods](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config). |  `{}`  |
|  hostAliases  | Default [entries to the hosts file of the pods](https://kubernetes.io/docs/tasks/network/customize-hosts-file-for-pods/#adding-additional-entries-with-hostaliases). |  `[]`  |
|  secretMounts  | Default secrets to mount as files. |  `[]`  |
|  extraVolumes  | Default additional volumes for all pods. |  `[]`  |
|  extraVolumeMounts  | Default additional volume mounts for all pods. |  `[]`  |
|  terminationGracePeriodSeconds  | The time in seconds given to the pods to terminate gracefully. |  `30`  |
