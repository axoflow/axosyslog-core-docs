---
title: Parameters of the AxoSyslog Helm chart
linktitle: Chart parameters
weight: 100
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The following table lists the configurable parameters of the AxoSyslog collector chart and their default values. For details on installing the chart, see {{% xref "/install/helm/_index.md" %}}.

## Collector parameters {#collector}

When you deploy {{% param "product.abbrev" %}} as a collector (which is a DaemonSet), it collects and forwards local logs to a destination. You can use the following parameters to configure the collector. The parameters for specific destinations are shown in subsequent sections.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  collector.enabled  | Deploy AxoSyslog as a collector to collect and forward local logs |  `true`  |
|  collector.config.destinations  | The configurations of destinations that can be configured using chart values: [syslog](#collector-syslog-destination), [opensearch](#collector-opensearch-destination), and [syslogNgOtlp](#collector-syslog-ng-otlp-destination). For destinations and options not available as chart values, you can use the `collector.config.raw` option. |  `""`  |
|  collector.config.raw  | A complete `syslog-ng` configuration. If this parameter is set, all other parameters in the `collector.config` section are ignored. You can use this to set parameters that are not available as chart values. For details on how to create a configuration for `syslog-ng`, see the [AxoSyslog Core documentation](https://axoflow.com/docs/axosyslog-core/). |  `""`  |
|  collector.config.rewrites.set  |  A list of name-value pairs to set for the collected log messages. Uses the [`set` rewrite rule]({{< relref "/chapter-manipulating-messages/modifying-messages/rewrite-set/_index.md" >}}). |  `{}`  |
|  collector.config.sources.kubernetes.enabled  | Collect pod logs using the [`kubernetes()`]({{< relref "/chapter-sources/configuring-sources-kubernetes/_index.md" >}}) source. If disabled, the chart doesn't configure any source. For the list of available sources, see the [Sources chapter]({{< relref "/chapter-sources/_index.md" >}}) |  `true`  |
|  collector.config.sources.kubernetes.prefix  | Set JSON prefix for logs collected from the Kubernetes cluster  |  `""`  |
|  collector.config.sources.kubernetes.keyDelimiter  | Set JSON key delimiter for logs collected from the Kubernetes cluster  |  `""`  |
|  collector.stats.level | Specifies the level of statistics {{% param "product.abbrev" %}} collects about the processed messages. For details, see ({{% xref "/chapter-global-options/reference-options/_index.md#global-option-stats-level" %}}). | `2` |

The following example uses the `collector.config.raw` parameter to configure a custom destination:

```shell
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
            token("your-secret-humio-ingest-token")
          );
        };

        flags(flow-control);
      };

  hostNetworking: true
```

### Syslog destination {#collector-syslog-destination}

Send logs over the network, conforming to RFC3164 using the [`network()`]({{< relref "/chapter-destinations/configuring-destinations-network/_index.md" >}}) destination driver.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  collector.config.destinations.syslog.enabled  | Enables the destination. | `false`  |
|  collector.config.destinations.syslog.address  | The IP address of the destination host. |  `localhost`  |
|  collector.config.destinations.syslog.extraOptionsRaw  | Other options of the [`network()` destination]({{< relref "/chapter-destinations/configuring-destinations-network/_index.md" >}}). |  `"time-reopen(10)"`  |
|  collector.config.destinations.syslog.port  | The port number to send the messages to. |  `12345`  |
|  collector.config.destinations.syslog.template  | A template to format the messages. |  `"$(format-json .*)"`  |
|  collector.config.destinations.syslog.transport  | The transport protocol to use. Possible values: `tcp`, `udp` |  `tcp`  |

For example:

```yaml
collector:
  config:
    destinations:
      syslog:
        enabled: true
        transport: tcp
        address: localhost
        port: 12345
        template: "$(format-json .*)"
```

### OpenSearch destination {#collector-opensearch-destination}

Send logs to OpenSearch over HTTP or HTTPS.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  collector.config.destinations.opensearch.enabled  | Enables the destination. | `false`  |
|  collector.config.destinations.opensearch.address  | The URL of the OpenSearch server. |  `http://my-release-opensearch.default.svc.cluster.local:9200`  |
|  collector.config.destinations.opensearch.index  | Name of the OpenSearch index that stores the messages. |  `"test-axoflow-index"`  |
|  collector.config.destinations.opensearch.user  | The username to use for authentication on the OpenSearch server, if not authenticating with a certificate. |  `"admin"`  |
|  collector.config.destinations.opensearch.password  | The password to use for authentication on the OpenSearch server. |  `"admin"`  |
|  collector.config.destinations.opensearch.template  | A template to format the messages. |  `"$(format-json .*)"`  |
|  collector.config.destinations.opensearch.tls.CADir  | A directory containing a set of trusted CA certificates in PEM format. The name of the files must be the 32-bit hash of the subject's name. {{% param "product.abbrev" %}} verifies the certificate of the server using these CA certificates. |  `"/path/to/CADir/"`  |
|  collector.config.destinations.opensearch.tls.CAFile  | The CA certificate in PEM format to use when verifying the certificate of the server. |  `"/path/to/CAFile.pem"`  |
|  collector.config.destinations.opensearch.tls.Cert  | Name of a file containing an X.509 certificate or a certificate chain in PEM format. AxoSyslog authenticates with this certificate on the server, with the private key set in the `collector.config.destinations.opensearch.tls.Key` field. If the file contains a certificate chain, the file must begin with the certificate of the host, followed by the CA certificate that signed the certificate of the host, and any other signing CAs in order. |  `"/path/to/Cert.pem"`  |
|  collector.config.destinations.opensearch.tls.Key  | Name of a file containing an unencrypted private key in PEM format. AxoSyslog authenticates with this key and the certificate set in the `collector.config.destinations.opensearch.tls.Cert` field. |  `"/path/to/Key.pem"`  |
|  collector.config.destinations.opensearch.tls.peerVerify  | If true, {{% param "product.abbrev" %}} verifies the certificate of the server with the CA certificates set in `collector.config.destinations.opensearch.tls.CAFile` and `collector.config.destinations.opensearch.tls.CADir`. |  `false`  |

For example:

```yaml
collector:
  config:
    destinations:
      opensearch:
        - address: 10.104.232.94
          index: "test-axoflow-index"
          tls:
            CAFile: "/path/to/CAFile.pem"
            CADir: "/path/to/CADir/"
            Cert: "/path/to/Cert.pem"
            Key: "/path/to/Key.pem"
            peerVerify: true
            template: "$(format-json .*)"
```

### syslogNgOtlp destination {#collector-syslogngotlp-destination}

Send logs over to another {{% param "product.abbrev" %}} node using the [`syslog-ng-otlp()`]({{< relref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" >}}) destination driver.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  collector.config.destinations.syslogNgOtlp.enabled  | Enables the destination. | `false`  |
|  collector.config.destinations.syslogNgOtlp.url  | The IP address and port of the destination host. |  `"192.168.77.133:4317"`  |
|  collector.config.destinations.syslogNgOtlp.extraOptionsRaw  | Other options of the [`syslog-ng-otlp()` destinations]({{< relref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" >}}). |  "time-reopen(1) batch-timeout(1000) batch-lines(1000)"  |

### Other collector parameters

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  collector.affinity  | Pod affinity |  `{}`  |
|  collector.annotations  | Additional annotations to apply to the DaemonSet |  `{}`  |
|  collector.extraVolumes  | Additional volumes to mount |  `[]`  |
|  collector.hostAliases  | Add host aliases |  `[]`  |
|  collector.hostNetworking  | Whether to enable host networking |  `false`  |
|  collector.labels  | Additional labels to apply to the DaemonSet |  `{}`  |
|  collector.maxUnavailable  | The maximum number of unavailable pods during a rolling update |  `1`  |
|  collector.nodeSelector  | Node labels for pod assignment |  `{}`  |
|  collector.resources  | Resource requests and limits |  `{}`  |
|  collector.tolerations  | Tolerations for pod assignment |  `[]`  |
|  collector.secretMounts  | Mount additional secrets as volumes |  `[]`  |
|  collector.securityContext  | Security context for the pod |  `{}`  |

## Syslog server parameters {#syslog-server}

When you deploy {{% param "product.abbrev" %}} as a server (which is a StatefulSet), it receives incoming data from the network and routes it to a local or remote destination. collects and forwards local logs to a destination. You can use the following parameters to configure the syslog server. The parameters for specific destinations are shown in subsequent sections.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  syslog.enabled  | Deploy {{% param "product.abbrev" %}} as a collector to collect and forward local logs |  `true`  |
|  syslog.bufferStorage.enabled | Configures a storage using PersistentVolumes to use as disk-buffer. | `false` |
|  syslog.bufferStorage.storageClass | The class of the storage to use, for example, `standard`. | `standard` |
|  syslog.bufferStorage.size | The maximum size of the storage to use as disk-buffer, for example, `10Gi`. | `10Gi` |
|  syslog.logFileStorage.enabled | Configures a storage using PersistentVolumes to store the log files. | `false` |
|  syslog.logFileStorage.storageClass | The class of the storage to use, for example, `standard`. | `standard` |
|  syslog.logFileStorage.size | The maximum size of the storage to use as for log storage, for example, `10Gi`. | `500Gi` |
|  syslog.config.raw  | A complete `syslog-ng` configuration. If this parameter is set, all other parameters in the `syslog.config` section are ignored. You can use this to set parameters that are not available as chart values. For details on how to create a configuration for `syslog-ng`, see the [AxoSyslog Core documentation](https://axoflow.com/docs/axosyslog-core/). |  `""`  |
|  syslog.config.stats.level | Specifies the detail of statistics {{% param "product.abbrev" %}} collects about the processed messages. For details, see {{% xref "/chapter-global-options/reference-options/_index.md#global-option-stats-level" %}}. | `2` |
|  syslog.config.rewrites.set  | A list of name-value pairs to set for the collected log messages. Uses the [`set` rewrite rule]({{< relref "/chapter-manipulating-messages/modifying-messages/rewrite-set/_index.md" >}}). |  `{}`  |
|  syslog.config.sources  | The configurations of the sources that can be configured using chart values: [syslog](#syslog-syslog-source) and [syslogNgOtlp](#syslog-syslog-ng-otlp-source). |  [syslog](#syslog-syslog-source) and [syslogNgOtlp](#syslog-syslog-ng-otlp-source) are enabled by default. See the individual sources for details. For sources not available as chart values, you can use the `collector.config.raw` option.  |
|  syslog.config.destinations  | The configurations of destinations that can be configured using chart values: [file](#syslog-file-destination), [syslog](#syslog-syslog-destination), [opensearch](#syslog-opensearch-destination), and [syslogNgOtlp](#syslog-syslog-ng-otlp-destination).  | The [file](#syslog-file-destination), [syslog](#syslog-syslog-destination), [opensearch](#syslog-opensearch-destination) destinations are enabled by default. For destinations not available as chart values, you can use the `collector.config.raw` option.  |

### Syslog source {#syslog-syslog-source}

You can use the syslog source to receive RFC3164 or RFC5424 formatted syslog messages on the following ports:

- 1514: RFC3164-formatted traffic over TCP and UDP (NodePort 30514)
- 1601: RFC5424-formatted traffic over TCP (NodePort 30601)
- 6514: RFC5424-formatted traffic over TLS (NodePort 30614)

If needed, you can open additional ports using the [`service.extraPorts`](#generic-chart-parameters) option.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  syslog.config.sources.syslog.enabled  | Enable receiving syslog messages. |  `true`  |
|  syslog.config.sources.syslog.max-connections  | Maximum number of parallel connections. |  `1000`  |
|  syslog.config.sources.syslog.log-iw-size  | The initial window size used for [flow-control]({{< relref "/chapter-routing-filters/concepts-flow-control/_index.md" >}}). |  `100000`  |
|  syslog.config.sources.syslog.tls.peerVerify  | Set to `yes` to request a certificate from the peers. In this case, you must also set the CA directory or the CA file. |  `no`  |
|  syslog.config.sources.syslog.tls.CAFile  | A file containing trusted CA certificates. For details, see [TLS options]({{< relref "/chapter-encrypted-transport-tls/tlsoptions/_index.md#ca-file" >}}). |  `""`  |
|  syslog.config.sources.syslog.tls.CADir  | The directory for the trusted CA files. For details, see [TLS options]({{< relref "/chapter-encrypted-transport-tls/tlsoptions/_index.md#ca-dir" >}}). |  `""`  |
|  syslog.config.sources.syslog.tls.Cert  | The certificate file to show to the peer. For details, see [TLS options]({{< relref "/chapter-encrypted-transport-tls/tlsoptions/_index.md#cert-file" >}}). |  `""`  |
|  syslog.config.sources.syslog.tls.Key  | The private key file for the certificate. For details, see [TLS options]({{< relref "/chapter-encrypted-transport-tls/tlsoptions/_index.md#key-file" >}}). |  `""`  |

### syslogNgOtlp source {#syslog-syslog-ng-otlp-source}

Initializes a [`syslog-ng-otlp()`]({{< relref "/chapter-sources/source-syslog-ng-otlp/_index.md" >}}) to receive messages from another {{% param "product.abbrev" %}} node that sends telemetry data using the [`syslog-ng-otlp()`]({{< relref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" >}}) destination driver.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  syslog.config.sources.syslogNgOtlp.enabled  | Enable receiving `syslog-ng-otlp()` messages. |  `true`  |
|  syslog.config.sources.syslogNgOtlp.port  | The port where messages are received. |  `4317`  |
<!--       nodePort: {{ .syslogNgOtlp.port | default 30317 }} https://github.com/axoflow/axosyslog/blob/80c963bb29a055974288c0cd9eea5f2200068242/charts/axosyslog/templates/service.yaml#L41C1-L41C57 itt nem ertem a port vs nodeport beallitast (olyan mintha fixen a 4317-en hallgatoznank, es a port opcioval a nodeport-ot allitanank) -->
<!-- FIXME a values.yaml-ben van extraoptions is, de a templateben nem latom hogy hasznalnank -->

### File destination {#syslog-file-destination}

To write the collected logs into files, configure the [`syslog.logFileStorage`](#syslog-server) and the `syslog.config.destinations.file` options.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  syslog.config.destinations.file.enabled | Enables the file destination. | `true` |
|  syslog.config.destinations.file.path | The path and filename of the log files. Can include macros. For examples, see {{% xref "/chapter-destinations/configuring-destinations-file/_index.md" %}}. | `"/var/log/syslog"` |
|  syslog.config.destinations.file.template | The [template]({{< relref "/chapter-destinations/configuring-destinations-file/reference-destination-file/_index.md#template" >}}) used to format the log messages. Can include macros. | `""` |
|  syslog.config.destinations.file.extraOptionsRaw  | Other options of the [`file()` destination]({{< relref "/chapter-destinations/configuring-destinations-file/_index.md" >}}). If the directories used in `syslog.destinations.file.path` do not exist, set `extraOptionsRaw: "create-dirs(yes)"` |  `"create-dirs(yes)"`  |

For example:

```yaml
syslog:
  enabled: true
  logFileStorage:
    enabled: true
    storageClass: standard
    size: 500Gi
  bufferStorage:
    enabled: false
    storageClass: standard
    size: 10Gi
  config:
    sources:
      syslog:
        enabled: true
    destinations:
      file:
        enabled: true
        path: "/var/log/$HOST/syslog"
        extraOptionsRaw: "create-dirs(yes)"
```

### OpenSearch destination {#syslog-opensearch-destination}

Send logs to [OpenSearch]({{< relref "/chapter-destinations/destination-opensearch/_index.md" >}}) over HTTP or HTTPS.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  syslog.config.destinations.opensearch.enabled  | Enables the destination. | `true` |
|  syslog.config.destinations.opensearch.url  | The URL of the OpenSearch server. | `http://my-release-opensearch.default.svc.cluster.local:9200` |
|  syslog.config.destinations.opensearch.extraOptionsRaw  | Other options of the [`opensearch()` destination]({{< relref "/chapter-destinations/destination-opensearch/_index.md" >}}). |  `"time-reopen(10)"`  |
|  syslog.config.destinations.opensearch.index  | Name of the OpenSearch index that stores the messages. |  `"test-axoflow-index"`  |
|  syslog.config.destinations.opensearch.user  | The username to use for authentication on the OpenSearch server, if not authenticating with a certificate. |  `"admin"`  |
|  syslog.config.destinations.opensearch.password  | The password to use for authentication on the OpenSearch server. |  `"admin"`  |
|  syslog.config.destinations.opensearch.template  | A template to format the messages. |  `"$(format-json --scope rfc5424 --exclude DATE --key ISODATE @timestamp=${ISODATE})"`  |
|  syslog.config.destinations.opensearch.tls.CAFile  | The CA certificate in PEM format to use when verifying the certificate of the server. |  `""`  |
|  syslog.config.destinations.opensearch.tls.CADir  | A directory containing a set of trusted CA certificates in PEM format. The name of the files must be the 32-bit hash of the subject's name. {{% param "product.abbrev" %}} verifies the certificate of the server using these CA certificates. |  `""`  |
|  syslog.config.destinations.opensearch.tls.Cert  | Name of a file containing an X.509 certificate or a certificate chain in PEM format. AxoSyslog authenticates with this certificate on the server, with the private key set in the `syslog.config.destinations.opensearch.tls.Key` field. If the file contains a certificate chain, the file must begin with the certificate of the host, followed by the CA certificate that signed the certificate of the host, and any other signing CAs in order. |  `""`  |
|  syslog.config.destinations.opensearch.tls.Key  | Name of a file containing an unencrypted private key in PEM format. AxoSyslog authenticates with this key and the certificate set in the `syslog.config.destinations.opensearch.tls.Cert` field. |  `""`  |
|  syslog.config.destinations.opensearch.tls.peerVerify  | If true, {{% param "product.abbrev" %}} verifies the certificate of the server with the CA certificates set in `syslog.config.destinations.opensearch.tls.CAFile` and `syslog.config.destinations.opensearch.tls.CADir`. |  `""`  |

For example:

```yaml
syslog:
  enabled: true
  bufferStorage:
    enabled: true
    storageClass: standard
    size: 10Gi
  config:
    sources:
      syslog:
        enabled: true
    destinations:
      opensearch:
        enabled: true
        url: http://my-release-opensearch.default.svc.cluster.local:9200
        index: "test-axoflow-index"
        user: "admin"
        password: "admin"
        #tls:
        #  CAFile: "/path/to/CAFile.pem"
        #  CADir: "/path/to/CADir/"
        #  Cert: "/path/to/Cert.pem"
        #  Key: "/path/to/Key.pem"
        #  peerVerify: false
        extraOptionsRaw: "time-reopen(10)"
```

### Syslog destination {#syslog-syslog-destination}

Send logs over the network, conforming to RFC3164 using the [`network()`]({{< relref "/chapter-destinations/configuring-destinations-network/_index.md" >}}) destination driver.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  syslog.config.destinations.syslog.enabled  | Enables the destination. | `true`  |
|  syslog.config.destinations.syslog.address  | The IP address of the destination host. |  `""`  |
|  syslog.config.destinations.syslog.extraOptionsRaw  | Other options of the [`network()` destination]({{< relref "/chapter-destinations/configuring-destinations-network/_index.md" >}}). |  `"time-reopen(10)"`  |
|  syslog.config.destinations.syslog.port  | The port number to send the messages to. |  `12345`  |
|  syslog.config.destinations.syslog.template  | A template to format the messages. |  `""`  |
|  syslog.config.destinations.syslog.transport  | The transport protocol to use. Possible values: `tcp`, `udp` |  `tcp`  |

For example:

```yaml
syslog:
  enabled: true
  bufferStorage:
    enabled: true
    storageClass: standard
    size: 10Gi
  config:
    sources:
      syslog:
        enabled: true
    destinations:
      syslog:
        enabled: true
        transport: tcp
        address: 192.168.77.133
        port: 12345
        # convert incoming data to JSON
        #template: "$(format-json .*)\n"
        # use standard syslog logfile
        #template: "$ISODATE $HOST $MSGHDR$MSG\n"
        extraOptionsRaw: "time-reopen(10)"
```

### syslogNgOtlp destination {#syslog-syslog-ng-otlp-destination}

Send data using the [`syslog-ng-otlp()`]({{< relref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" >}}) destination driver to another {{% param "product.abbrev" %}} node.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  syslog.config.destinations.syslogNgOtlp.enabled | Enables the destination. | `no` |
|  syslog.config.destinations.syslogNgOtlp.url | The IP address of the destination host. | `""` |
|  syslog.config.destinations.syslogNgOtlp.extraOptionsRaw  | Other options of the [`syslog-ng-otlp()` destination]({{< relref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" >}}). |  `"time-reopen(1) batch-timeout(1000) batch-lines(1000)"`  |

For example:

```yaml
syslog:
  enabled: true
  bufferStorage:
    enabled: true
    storageClass: standard
    size: 10Gi
  config:
    sources:
      syslog:
        enabled: true
    destinations:
      syslogNgOtlp:
        enabled: true
        url: "192.168.77.133:4317"
        extraOptionsRaw: "time-reopen(1) batch-timeout(1000) batch-lines(1000)"
```

## Generic chart parameters

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  image.repository  | The container image repository |  `ghcr.io/axoflow/axosyslog`  |
|  image.pullPolicy  | The container image pull policy |  `IfNotPresent`  |
|  image.tag  | The container image tag |  `{{% param "product.techversion" %}}`   |
|  image.extraArgs  | Custom arguments applied as the value of spec.container.args |  `[]`  |
|  imagePullSecrets  | The names of secrets containing private registry credentials |  `[]`  |
|  nameOverride  | Override the chart name |  `""`  |
|  fullnameOverride  | Override the full chart name |  `""`  |
|  rbac.create  | Create RBAC resources |  `true`  |
|  rbac.extraRules  | Additional RBAC rules |  `[]`  |
|  openShift.enabled  | Set to `true` when deploying on OpenShift |  `false`  |
|  openShift.securityContextConstraints.create  | Create SecurityContextConstraints on OpenShift |  `true`  |
|  openShift.securityContextConstraints.annotations  | Annotations to apply to SecurityContextConstraints |  `{}`  |
|  service.create  | Create a service so the [syslog server]({#syslog-server}) can receive incoming connections. |  `true`  |
|  service.extraports  | Open additional ports for the [syslog server]({#syslog-server}) |  `[]`  |
|  serviceAccount.create  | Whether to create a service account |  `true`  |
|  serviceAccount.annotations  | Annotations to apply to the service account |  `{}`  |
|  namespace  | The Kubernetes namespace to deploy to |  `""`  |
|  podAnnotations  | Additional annotations to apply to the pod |  `{}`  |
|  podSecurityContext  | Security context for the pod |  `{}`  |
|  securityContext  | Security context for the container |  `{}`  |
|  resources  | Resource requests and limits for the collector container. If not set, the values of `collector.resources` are used. |  {}  |
|  nodeSelector  | Node labels for pod assignment |  `{}`  |
|  tolerations  | Tolerations for pod assignment |  `[]`  |
|  affinity  | Pod affinity |  `{}`  |
|  updateStrategy  | Update strategy for the Collector DaemonSet |  `RollingUpdate`  |
|  priorityClassName  | The name of the [PriorityClass](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#priorityclass) the pod belongs to |  `""`  |
|  dnsConfig  | The [DNS configuration of the pod](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config) |  `{}`  |
|  hostAliases  | Additional [entries to the pod's hosts file](https://kubernetes.io/docs/tasks/network/customize-hosts-file-for-pods/#adding-additional-entries-with-hostaliases) |  `[]`  |
|  secretMounts  | Additional secrets to mount for the pod. If not set, the values of `collector.secretMounts` are used. |  `[]`  |
|  extraVolumes  | Additional volumes to mount for the pod. If not set, the values of `collector.extraVolumes` are used. |  `[]`  |
|  terminationGracePeriodSeconds  | How many seconds a [pod with a failing probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes) has before shut down |  `30`  |
