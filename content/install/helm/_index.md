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

## Install

To install the `axosyslog` chart, complete the following steps.

1. Clone the chart repository.

    ```bash
    helm repo add axosyslog https://axoflow.github.io/axosyslog
    helm repo update
    ```

1. Install the chart. The default settings install two pods into the `default` namespace:

    - A `collector` that act as a [syslog collector](#usecases), and
    - a `syslog` server.

    If need only one of these pods, you can disable it with the `collector.enabled` or the `syslog.enabled` parameter, respectively. For the list of configurable parameters and their default values, see {{% xref "/install/helm/helm-chart-parameters.md" %}}. If you want to use disk-buffers, see also [How to use disk-buffers in containers and Kubernetes]({{< relref "#disk-buffer-container-kubernetes" >}}).

    - Install with the default values:

        ```bash
        helm install --generate-name axosyslog/axosyslog
        ```

    - Install only the collector:

        ```bash
        helm install --generate-name axosyslog/axosyslog --set syslog.enabled=false
        ```

    - Install only the syslog server:

        ```bash
        helm install --generate-name axosyslog/axosyslog --set collector.enabled=false
        ```

    The output should be similar to:

    ```bash
    NAME: axosyslog-1713953907
    LAST DEPLOYED: Wed Apr 24 12:18:28 2024
    NAMESPACE: default
    STATUS: deployed
    REVISION: 1
    TEST SUITE: None
    NOTES:
    1. Watch the axosyslog-1713953907 container start.
      $ kubectl get pods --namespace=default -l app=axosyslog-1713953907 -w
    ```

1. Check that the pods are running.

    ```bash
    kubectl get pods
    ```

    The output should list the pods that are running: two for the default settings, or one if you have disabled the collector or the syslog pod.

    ```bash
    NAME                                   READY   STATUS    RESTARTS   AGE
    axosyslog-1713953907-collector-ddftq   1/1     Running   0          57s
    axosyslog-1713953907-syslog-0          1/1     Running   0          57s
    ```

1. Configure the settings of the pods for your use case.

    1. Create a file called `my-values.yaml`.
    1. Add the configuration needed for your use case. The settings in this file will override the default configuration settings of the chart.
    1. Update your deployment using the `my-values.yaml` file by running:

        ```shell
        helm upgrade <name-of-your-axosyslog-deployment> axosyslog/axosyslog -f my-values.yaml
        ```

        The output should be similar to:

        ```shell
        Release "axosyslog-1713953907" has been upgraded. Happy Helming!
        ...
        ```

        > Tip: You can retrieve the non-default values of a deployment by running `helm get values <name-of-your-axosyslog-deployment>`

1. For the collector use case, configure the destination where the logs are forwarded. For example, the following values file sends the logs in JSON format to the `localhost:514` address via TCP:

    ```yaml
    collector:
      config:
        destinations:
          syslog:
            enabled: true
            transport: tcp
            address: localhost
            port: 514
            template: "$(format-json .*)"
    ```

    For details and other parameters, see {{% xref "/install/helm/helm-chart-parameters.md#collector" %}}.

1. For the syslog server use case, you can send test messages from the pods, for example:

    - From the syslog server pod:

        ```shell
        kubectl exec axosyslog-1714389625-syslog-0 -- loggen -S 127.0.0.1 1514
        ```

        Expected output:

        ```shell
        count=9328, rate = 882.83 msg/sec
        count=9786, rate = 884.20 msg/sec
        count=9800, rate = 27.92 msg/sec
        average rate = 928.58 msg/sec, count=9800, time=10.5538, (average) msg size=256, bandwidth=232.14 kB/sec
        ```

    The generated log messages (like `2024-05-02T10:56:31.000000+00:00 localhost prg00000[1234]: seq: 0000000065, thread: 0000, runid: 1714647391, stamp: 2024-05-02T10:56:31 PADDPADDPADDPADD`) should show up in the configured destinations, for example, in the file destination:

    ```shell
    kubectl exec axosyslog-1714389625-syslog-0 -- less /var/log/syslog
    ```
{{< include-headless "disk-buffer-in-container.md" >}}

## Uninstall

> **Tip**: List all installed releases using `helm list`.

To uninstall a chart release, run:

```bash
helm delete <name-of-the-release-to-delete>
```
