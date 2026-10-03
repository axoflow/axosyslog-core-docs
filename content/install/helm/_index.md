---
title: Install AxoSyslog with Helm
linktitle: Helm
weight: 300
description: Install AxoSyslog on Kubernetes with the Helm chart, as a collector, an aggregator, or both.
---

<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{% param "product.name" %}} provides a [Helm chart](https://github.com/axoflow/axosyslog/tree/main/charts/axosyslog). You can use this chart to install [cloud-ready `syslog-ng` images]({{< relref "/install/_index.md#images" >}}) created and maintained by [Axoflow](https://axoflow.com).

## Prerequisites for the Helm chart {#prerequisites}

To use this chart, you need:

- A Kubernetes cluster that runs Kubernetes 1.22 or newer.
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/), configured to access your cluster.
- [Helm 3.0 or newer](https://helm.sh). For details, see the [official Helm documentation](https://helm.sh/docs/intro/install/).

## Collector and aggregator use cases {#usecases}

The chart has parameters for the following use cases:

- As a [collector]({{< relref "/install/helm/helm-chart-parameters.md#collector" >}}): The collector uses the [`kubernetes()`]({{< relref "/chapter-sources/configuring-sources-kubernetes/_index.md" >}}) source to collect the local logs. It sends the logs to the aggregator, to a syslog server, to an OpenSearch node, or to a different {{% param "product.abbrev" %}} node.
- As an [aggregator]({{< relref "/install/helm/helm-chart-parameters.md#aggregator" >}}): The aggregator receives RFC3164 and RFC5424 syslog messages from all senders, and `axosyslog-otlp()` messages from other {{% param "product.abbrev" %}} nodes. It stores the messages locally, or sends them to remote destinations.

By default, the collector sends the logs to the aggregator. You can configure and deploy the two components independently. To use other sources and destinations, use the `config.raw` parameter of the collector or the aggregator. For the list of parameters and their default values, see {{% xref "/install/helm/helm-chart-parameters.md" %}}.

## Install the Helm chart {#install}

To install the `axosyslog` chart, complete the following steps.

1. Add the chart repository.

    ```shell
    helm repo add axosyslog https://axoflow.github.io/axosyslog
    helm repo update
    ```

1. Install the chart. The default settings install the following into the `default` namespace:

    - A `collector` DaemonSet. It collects the pod logs on each node, and sends them to the aggregator.
    - An `aggregator` StatefulSet. It receives syslog and `axosyslog-otlp()` messages, and writes them to a file.

    To install only one component, disable the other component: set `collector.enabled=false` or `aggregator.enabled=false`. For the list of parameters and their default values, see {{% xref "/install/helm/helm-chart-parameters.md" %}}. If you use disk-buffers, also read [How to use disk-buffers in containers and Kubernetes](#disk-buffer-container-kubernetes).

    - Install with the default values:

        ```shell
        helm install --generate-name axosyslog/axosyslog
        ```

    - Install only the collector:

        ```shell
        helm install --generate-name axosyslog/axosyslog --set aggregator.enabled=false
        ```

    - Install only the aggregator:

        ```shell
        helm install --generate-name axosyslog/axosyslog --set collector.enabled=false
        ```

    The output should be similar to:

    ```text
    NAME: axosyslog-1713953907
    LAST DEPLOYED: Wed Apr 24 12:18:28 2024
    NAMESPACE: default
    STATUS: deployed
    REVISION: 1
    TEST SUITE: None
    NOTES:
    1. Watch the axosyslog-1713953907 containers start.
      $ kubectl get pods --namespace=default -l app.kubernetes.io/instance=axosyslog-1713953907,app.kubernetes.io/name=axosyslog -w
    ```

    The `NAME` field shows the name of the release. In the following commands, replace `<release-name>` with this name.

1. Check that the pods are running.

    ```shell
    kubectl get pods
    ```

    The output should list the pods that are running: a collector pod on every node and an aggregator pod for the default settings. For example, on a single-node cluster:

    ```text
    NAME                                   READY   STATUS    RESTARTS   AGE
    axosyslog-1713953907-collector-ddftq   1/1     Running   0          57s
    axosyslog-1713953907-aggregator-0      1/1     Running   0          57s
    ```

1. Configure the settings of the pods for your use case.

    1. Create a file called `my-values.yaml`.
    1. Add the configuration needed for your use case. The settings in this file override the default configuration settings of the chart.
    1. Update your deployment using the `my-values.yaml` file by running:

        ```shell
        helm upgrade <release-name> axosyslog/axosyslog -f my-values.yaml
        ```

        The output should be similar to:

        ```text
        Release "axosyslog-1713953907" has been upgraded. Happy Helming!
        ...
        ```

        {{% alert title="Tip" color="info" %}}
To list the non-default values of a release, run `helm get values <release-name>`.
        {{% /alert %}}

## Send the collector logs to another destination {#collector-destination}

By default, the collector sends the logs in JSON format to the aggregator over TCP. To send the logs to a different destination, configure the destination in your values file, then run `helm upgrade`. For example, the following values file sends the logs in JSON format to the `192.0.2.10:514` address over TCP:

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

For details and other parameters, see {{% xref "/install/helm/helm-chart-parameters.md#collector" %}}.

## Send test messages to the aggregator {#test-aggregator}

To make sure that the aggregator receives messages, send test messages from the aggregator pod.

1. Run `loggen` in the aggregator pod:

    ```shell
    kubectl exec <release-name>-aggregator-0 -- loggen -S 127.0.0.1 1514
    ```

    Expected output:

    ```text
    count=9328, rate = 882.83 msg/sec
    count=9786, rate = 884.20 msg/sec
    count=9800, rate = 27.92 msg/sec
    average rate = 928.58 msg/sec, count=9800, time=10.5538, (average) msg size=256, bandwidth=232.14 kB/sec
    ```

1. Check the configured destinations for the generated messages. For example, with the default file destination:

    ```shell
    kubectl exec <release-name>-aggregator-0 -- tail -n 5 /var/log/syslog
    ```

    The generated messages look like this:

    ```text
    2024-05-02T10:56:31.000000+00:00 localhost prg00000[1234]: seq: 0000000065, thread: 0000, runid: 1714647391, stamp: 2024-05-02T10:56:31 PADDPADDPADDPADD
    ```

{{< include-headless "disk-buffer-in-container.md" >}}

## Upgrade the Helm chart {#upgrade}

To upgrade the chart to a newer version, and to roll back an upgrade, see {{% xref "/install/upgrade-axosyslog/_index.md#helm" %}}.

## Uninstall the Helm chart {#uninstall}

{{% alert title="Tip" color="info" %}}
To list the installed releases, run `helm list`.
{{% /alert %}}

To uninstall a release of the chart, run:

```shell
helm uninstall <release-name>
```
