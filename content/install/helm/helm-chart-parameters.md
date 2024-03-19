---
title: Parameters of the AxoSyslog collector Helm chart
linktitle: Chart parameters
weight: 100
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The following table lists the configurable parameters of the AxoSyslog chart and their default values. For details on installing the chart, see {{% xref "/install/helm/_index.md" %}}.

## Collector parameters

When deploying AxoSyslog as a collector to collect and forward local logs, you can use these following parameters. The parameters for specific destinations are shown in subsequent sections.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  collector.enabled  | Deploy AxoSyslog as a collector to collect and forward local logs |  true  |
|  collector.config.raw  | A complete `syslog-ng` configuration. If this parameter is set, all other parameters in the `collector.config` section are ignored. For details on how to create a configuration for `syslog-ng`, see the [AxoSyslog Core documentation](https://axoflow.com/docs/axosyslog-core/). |  ""  |
|  collector.config.sources.kubernetes.enabled  | Collect pod logs using the [`kubernetes()`]({{< relref "/chapter-sources/configuring-sources-kubernetes/_index.md" >}}) source. If disabled, the chart doesn't configure any source. For the list of available sources, see the [Sources chapter]({{< relref "/chapter-sources/_index.md" >}}) |  true  |
|  collector.config.sources.kubernetes.prefix  | Set JSON prefix for logs collected from the Kubernetes cluster  |  ""  |
|  collector.config.sources.kubernetes.keyDelimiter  | Set JSON key delimiter for logs collected from the Kubernetes cluster  |  ""  |
|  collector.config.rewrites.set  | A list of name-value pairs to set for the collected log messages. |  {}  |
|  collector.config.destinations  | The configurations of destinations that can be configured using chart values: [syslog](#syslog-destination), [opensearch](#opensearch-destination), and [syslogNgOtlp](#syslog-ng-otlp-destination)  |  ""  |

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

### Syslog destination

Send logs over the network, conforming to RFC3164 using the `network()` destination driver.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  collector.config.destinations.syslog.enabled  | Enables the destination. | false  |
|  collector.config.destinations.syslog.address  | The IP address of the destination host. |  ""  |
|  collector.config.destinations.syslog.transport  | The transport protocol to use. Possible values: `tcp`, `udp` |  ""  |
|  collector.config.destinations.syslog.port  | The port number to send the messages to. |  ""  |
|  collector.config.destinations.syslog.template  | A template to format the messages. |  ""  |
|  collector.config.destinations.syslog.extraOptionsRaw  | Other options of the [`network()`]({{< relref "/chapter-destinations/configuring-destinations-network/_index.md" >}}). |  "time-reopen(10)"  |

For example:

```yaml
collector:
  config:
    destinations:
      syslog:
        enabled: yes
        transport: tcp
        address: localhost
        port: 12345
        template: "$(format-json .*)"
```

### OpenSearch destination

Send logs to OpenSearch over HTTP or HTTPS.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  collector.config.destinations.opensearch.enabled  | Enables the destination. | false  |
|  collector.config.destinations.opensearch.address  | The URL of the OpenSearch server. |  ""  |
|  collector.config.destinations.opensearch.index  | Name of the OpenSearch index that stores the messages. |  ""  |
|  collector.config.destinations.opensearch.user  | The username to use for authentication on the OpenSearch server, if not authenticating with a certificate. |  ""  |
|  collector.config.destinations.opensearch.password  | The password to use for authentication on the OpenSearch server. |  ""  |
|  collector.config.destinations.opensearch.tls.CAFile  | The CA certificate in PEM format to use when verifying the certificate of the server. |  ""  |
|  collector.config.destinations.opensearch.tls.CADir  | A directory containing a set of trusted CA certificates in PEM format. The name of the files must be the 32-bit hash of the subject's name. AxoSyslog collector verifies the certificate of the server using these CA certificates. |  ""  |
|  collector.config.destinations.opensearch.tls.Cert  | Name of a file containing an X.509 certificate or a certificate chain in PEM format. AxoSyslog collector authenticates with this certificate on the server, with the private key set in the `collector.config.destinations.opensearch.tls.Key` field. If the file contains a certificate chain, the file must begin with the certificate of the host, followed by the CA certificate that signed the certificate of the host, and any other signing CAs in order. |  ""  |
|  collector.config.destinations.opensearch.tls.Key  | Name of a file containing an unencrypted private key in PEM format. AxoSyslog collector authenticates with this key and the certificate set in the `collector.config.destinations.opensearch.tls.Cert` field. |  ""  |
|  collector.config.destinations.opensearch.tls.peerVerify  | If true, AxoSyslog collector verifies the certificate of the server with the CA certificates set in `collector.config.destinations.opensearch.tls.CAFile` and `collector.config.destinations.opensearch.tls.CADir`. |  ""  |
|  collector.config.destinations.opensearch.template  | A template to format the messages. |  ""  |
|  collector.config.destinations.syslog.extraOptionsRaw  | Other options of the [`network()`]({{< relref "/chapter-destinations/destination-opensearch/_index.md" >}}). |  "time-reopen(10)"  |

For example:

```yaml
collector:
  config:
    destinations:
      opensearch:
          address: 10.104.232.94
          index: "test-axoflow-index"
          tls:
            CAFile: "/path/to/CAFile.pem"
            CADir: "/path/to/CADir/"
            Cert: "/path/to/Cert.pem"
            Key: "/path/to/Key.pem"
            peerVerify: true
            template: "$(format-json .*)"
```

### syslogNgOtlp destination

Send logs over to another {{% param "product.abbrev" %}} node using the `syslog-ng-otlp()` destination driver.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  collector.config.destinations.syslogNgOtlp.enabled  | Enables the destination. | false  |
|  collector.config.destinations.syslogNgOtlp.url  | The IP address of the destination host. |  ""  |
|  collector.config.destinations.syslogNgOtlp.extraOptionsRaw  | Other options of the [`network()`]({{< relref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" >}}). |  "time-reopen(10)"  |

### Other collector parameters

|  collector.labels  | Additional labels to apply to the DaemonSet |  {}  |
|  collector.annotations  | Additional annotations to apply to the DaemonSet |  {}  |
|  collector.affinity  | Pod affinity |  {}  |
|  collector.nodeSelector  | Node labels for pod assignment |  {}  |
|  collector.resources  | Resource requests and limits |  {}  |
|  collector.tolerations  | Tolerations for pod assignment |  []  |
|  collector.hostAliases  | Add host aliases |  []  |
|  collector.secretMounts  | Mount additional secrets as volumes |  []  |
|  collector.extraVolumes  | Additional volumes to mount |  []  |
|  collector.securityContext  | Security context for the pod |  {}  |
|  collector.maxUnavailable  | The maximum number of unavailable pods during a rolling update |  1  |
|  collector.hostNetworking  | Whether to enable host networking |  false  |

## Generic parameters

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  image.repository  | The container image repository |  ghcr.io/axoflow/axosyslog  |
|  image.pullPolicy  | The container image pull policy |  IfNotPresent  |
|  image.tag  | The container image tag |  {{% param "product.techversion" %}}   |
|  image.extraArgs  | Custom arguments applied as the value of spec.container.args |  []  |
|  imagePullSecrets  | The names of secrets containing private registry credentials |  []  |
|  nameOverride  | Override the chart name |  ""  |
|  fullnameOverride  | Override the full chart name |  ""  |
|  metricsExporter.enabled  | Deploy the AxoSyslog DaemonSet with the `axosyslog-metrics-exporter` sidecar | false |
|  metricsExporter.image.repository  | The container image repository for the sidecar | ghcr.io/axoflow/axosyslog-metrics-exporter |
|  metricsExporter.image.tag  | The container image tag for the sidecar | latest |
|  metricsExporter.image.pullPolicy  | The container image pull policy for the sidecar |  Use the k8s default behavior  |
|  metricsExporter.resources | Resource requests and limits for the sidecar container | {} |
|  metricsExporter.securityContext | The SecurityContext for the sidecar | {} |
|  podMonitor.enabled | Deploy the PodMonitor CR for Prometheus Operator (requires metricsExporter.enabled) | false |
|  podMonitor.labels | Labels to set in the PodMonitor CR | {} |
|  podMonitor.annotations | Annotations to set in the PodMonitor CR | {} |
|  rbac.create  | Whether to create RBAC resources |  false  |
|  rbac.extraRules  | Additional RBAC rules |  []  |
|  openShift.enabled  | Whether to deploy on OpenShift |  false  |
|  openShift.securityContextConstraints.create  | Whether to create SecurityContextConstraints on OpenShift |  true  |
|  openShift.securityContextConstraints.annotations  | Annotations to apply to SecurityContextConstraints |  {}  |
|  service.create  | Create a service to accept incoming connections |  true  |
|  service.extraPorts  | The protocol (for example, TCP) and port number to open as NodePort |  []  |
|  serviceAccount.create  | Whether to create a service account |  false  |
|  serviceAccount.annotations  | Annotations to apply to the service account |  {}  |
|  namespace  | The Kubernetes namespace to deploy to |  ""  |
|  podAnnotations  | Additional annotations to apply to the pod |  {}  |
|  podSecurityContext  | Security context for the pod |  {}  |
|  securityContext  | Security context for the container |  {}  |
|  resources  | Resource requests and limits for the container. If not set, the values of daemonset.resources are used. |  {}  |
|  nodeSelector  | Node labels for pod assignment |  {}  |
|  tolerations  | Tolerations for pod assignment |  []  |
|  affinity  | Pod affinity |  {}  |
|  updateStrategy  | Update strategy for the DaemonSet |  RollingUpdate  |
|  priorityClassName  | The name of the [PriorityClass](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#priorityclass) the pod belongs to |  ""  |
|  dnsConfig  | The [DNS configuration of the pod](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config) |  {}  |
|  hostAliases  | Additional [entries to the pod's hosts file](https://kubernetes.io/docs/tasks/network/customize-hosts-file-for-pods/#adding-additional-entries-with-hostaliases) |  []  |
|  secretMounts  | Additional secrets to mount for the pod. If not set, the values of daemonset.secretMounts are used. |  []  |
|  extraVolumes  | Additional volumes to mount for the pod. If not set, the values of daemonset.extraVolumes are used. |  []  |
|  terminationGracePeriodSeconds  | How many seconds a [pod with a failing probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes) has before shut down |  30  |
