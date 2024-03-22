---
title: Install AxoSyslog with Helm
linktitle: Helm
weight: 200
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

AxoSyslog provides [Helm charts for `syslog-ng`](https://github.com/axoflow/axosyslog-charts/). You can use these charts to install [cloud-ready `syslog-ng` images]({{< relref "/install/_index.md#images" >}}) created and maintained by [Axoflow](https://axoflow.com).

## Prerequisites

You must have [Helm 3.0 or newer](https://helm.sh) installed to use these charts. Refer to the [official Helm documentation](https://helm.sh/docs/intro/install/) for details.

## Syslog collector and syslog server use cases {#usecases}

The chart provides parameters that make it easy to deploy {{% param "product.abbrev" %}} for the following use cases:

- As a [collector]({{< relref "/install/helm/helm-chart-parameters.md#collector" >}}), to collect local logs using the [`kubernetes()`](https://axoflow.com/docs/axosyslog-core/chapter-sources/configuring-sources-kubernetes/) source, and forward them to another syslog server, to an `opensearch()` node, or to another {{% param "product.abbrev" %}} node.
- As a [syslog server]({{< relref "/install/helm/helm-chart-parameters.md#syslog-server" >}}):
    - to receive RFC3164 and RFC5424 formatted syslog messages from any sender, or `syslog-ng-otlp` messages from another {{% param "product.abbrev" %}} node, and then
    - store them locally, or forward them to remote destinations.

These two use cases are independent from each other and can be configured separately. For other use cases, for example, to use other sources and destinations, you can use the `config.raw` parameter of the collector or the server. For the list of configurable parameters and their default values, see {{% xref "/install/helm/helm-chart-parameters.md" %}}.

<!-- FIXME add new features

Separate sections for the collector and syslog usecases, maybe with separate parameter tables?
mark clearly which one is the server usecase

-->

## Install

<!-- FIXME update repo
Collapse steps into single command where possible -->
To install the `axosyslog` charts, complete the following steps.

1. Clone the chart repository.

    ```bash
    helm repo add axosyslog https://axoflow.github.io/axosyslog-charts
    helm repo update
    ```

1. Install the chart. The following command installs `axosyslog` as a [syslog collector](#usecases) into the `default` namespace.

    For the list of configurable parameters and their default values, see {{% xref "/install/helm/helm-chart-parameters.md" %}}. If you want to use disk-buffers, see also [How to use disk-buffers in containers and Kubernetes]({{< relref "#disk-buffer-container-kubernetes" >}}).

    ```bash
    helm install --generate-name axosyslog/axosyslog
    ```

    ```bash
    NAME: axosyslog-1683469360
    LAST DEPLOYED: Sun May  7 16:22:40 2023
    NAMESPACE: default
    STATUS: deployed
    REVISION: 1
    TEST SUITE: None
    NOTES:
    1. Watch the axosyslog-1683469360 container start.
      $ kubectl get pods --namespace=default -l app=axosyslog-1683469360 -w
    ```

1. Check that the pod is running.

    ```bash
    kubectl get pods
    ```

    The output should look like:

    ```bash
    NAME                                   READY   STATUS    RESTARTS   AGE
    axosyslog-1683469360-tptfb   1/1     Running   0          28s
    ```

{{< include-headless "disk-buffer-in-container.md" >}}

## Uninstall

> **Tip**: List all installed releases using `helm list`.

To uninstall a chart release, run:

```bash
helm delete <name-of-the-release-to-delete>
```
