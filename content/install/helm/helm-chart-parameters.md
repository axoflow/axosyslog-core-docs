---
title: Parameters of the AxoSyslog collector Helm chart
linktitle: Chart parameters
weight: 100
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The following table lists the configurable parameters of the AxoSyslog collector chart and their default values. For details on installing the chart, see {{% xref "/install/helm/_index.md" %}}.

## Parameters for `syslog-ng` configuration

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  config.raw  | A complete `syslog-ng` configuration. If this parameter is set, all other parameters in the *config* section are ignored. For details on how to create a configuration for `syslog-ng`, see the [AxoSyslog Core documentation](https://axoflow.com/docs/axosyslog-core/). |  ""  |
|  config.version  | The version string specifies [the `syslog-ng` version the configuration corresponds to]({{< relref "/chapter-configuration-file/configuration-syntax/_index.md" >}}). |  ""  |
|  config.sources.kubernetes.enabled  | Collect pod logs using the [`kubernetes()`]({{< relref "/chapter-sources/configuring-sources-kubernetes/_index.md" >}}) source. If disabled, the chart doesn't configure any source. For the list of available sources, see the ({{< relref "/chapter-sources/_index.md" >}}) |  true  |

The following example uses the `config.raw` parameter to configure a custom destination:

```shell
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

daemonset:
  hostNetworking: true
```

### Network destination

Send logs over the network, conforming to RFC3164 using the `network()` destination.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  config.destination.network.address  | The IP address of the destination host. |  ""  |
|  config.destination.network.transport  | The transport protocol to use. Possible values: `tcp`, `udp` |  ""  |
|  config.destination.network.port  | The port number to send the messages to. |  ""  |
|  config.destination.network.template  | A template to format the messages. |  ""  |

For example:

```yaml
config:
  destinations:
    network:
      - transport: tcp
        address: localhost
        port: 12345
        template: "$(format-json .*)"
```

### OpenSearch destination

Send logs to OpenSearch over HTTP or HTTPS.

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|  config.destination.opensearch.address  | The IP address of the OpenSearch server. |  ""  |
|  config.destination.opensearch.index  | Name of the OpenSearch index that stores the messages. |  ""  |
|  config.destination.opensearch.user  | The username to use for authentication on the OpenSearch server, if not authenticating with a certificate. |  ""  |
|  config.destination.opensearch.password  | The password to use for authentication on the OpenSearch server. |  ""  |
|  config.destination.opensearch.tls.CAFile  | The CA certificate in PEM format to use when verifying the certificate of the server. |  ""  |
|  config.destination.opensearch.tls.CADir  | A directory containing a set of trusted CA certificates in PEM format. The name of the files must be the 32-bit hash of the subject's name. AxoSyslog collector verifies the certificate of the server using these CA certificates. |  ""  |
|  config.destination.opensearch.tls.Cert  | Name of a file containing an X.509 certificate or a certificate chain in PEM format. AxoSyslog collector authenticates with this certificate on the server, with the private key set in the `config.destination.opensearch.tls.Key` field. If the file contains a certificate chain, the file must begin with the certificate of the host, followed by the CA certificate that signed the certificate of the host, and any other signing CAs in order. |  ""  |
|  config.destination.opensearch.tls.Key  | Name of a file containing an unencrypted private key in PEM format. AxoSyslog collector authenticates with this key and the certificate set in the `config.destination.opensearch.tls.Cert` field. |  ""  |
|  config.destination.opensearch.tls.peerVerify  | If true, AxoSyslog collector verifies the certificate of the server with the CA certificates set in `config.destination.opensearch.tls.CAFile` and `config.destination.opensearch.tls.CADir`. |  ""  |
|  config.destination.opensearch.template  | A template to format the messages. |  ""  |

For example:

```yaml
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
|  daemonset.enabled  | Deploy AxoSyslog as a DaemonSet |  true  |
|  daemonset.labels  | Additional labels to apply to the DaemonSet |  {}  |
|  daemonset.annotations  | Additional annotations to apply to the DaemonSet |  {}  |
|  daemonset.affinity  | Pod affinity |  {}  |
|  daemonset.nodeSelector  | Node labels for pod assignment |  {}  |
|  daemonset.resources  | Resource requests and limits |  {}  |
|  daemonset.tolerations  | Tolerations for pod assignment |  []  |
|  daemonset.hostAliases  | Add host aliases |  []  |
|  daemonset.secretMounts  | Mount additional secrets as volumes |  []  |
|  daemonset.extraVolumes  | Additional volumes to mount |  []  |
|  daemonset.securityContext  | Security context for the pod |  {}  |
|  daemonset.maxUnavailable  | The maximum number of unavailable pods during a rolling update |  1  |
|  daemonset.hostNetworking  | Whether to enable host networking |  false  |
|  rbac.create  | Whether to create RBAC resources |  false  |
|  rbac.extraRules  | Additional RBAC rules |  []  |
|  openShift.enabled  | Whether to deploy on OpenShift |  false  |
|  openShift.securityContextConstraints.create  | Whether to create SecurityContextConstraints on OpenShift |  true  |
|  openShift.securityContextConstraints.annotations  | Annotations to apply to SecurityContextConstraints |  {}  |
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
|  kubernetes.enabled  | Enable kubernetes log collection  |  true  |
|  kubernetes.prefix  | Set JSON prefix for logs collected from the k8s cluster  |  ""  |
|  kubernetes.keyDelimiter  | Set JSON key delimiter for logs collected from the k8s cluster  |  ""  |
|  priorityClassName  | The name of the [PriorityClass](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#priorityclass) the pod belongs to |  ""  |
|  dnsConfig  | The [DNS configuration of the pod](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config) |  {}  |
|  hostAliases  | Additional [entries to the pod's hosts file](https://kubernetes.io/docs/tasks/network/customize-hosts-file-for-pods/#adding-additional-entries-with-hostaliases) |  []  |
|  secretMounts  | Additional secrets to mount for the pod. If not set, the values of daemonset.secretMounts are used. |  []  |
|  extraVolumes  | Additional volumes to mount for the pod. If not set, the values of daemonset.extraVolumes are used. |  []  |
|  terminationGracePeriodSeconds  | How many seconds a [pod with a failing probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes) has before shut down |  30  |
