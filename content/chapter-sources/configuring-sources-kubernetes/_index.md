---
title: "kubernetes: Collect and parse the Kubernetes CRI (Container Runtime Interface) format"
weight:  1350
driver: "kubernetes()"
short_description: "Collect and parse messages in the Kubernetes CRI (Container Runtime Interface) format"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `kubernetes()` source collects container logs managed by the Kubelet. It reads plain-text and JSON-formatted container logs (as described in the [Container Runtime Interface (CRI) design proposal](https://github.com/kubernetes/design-proposals-archive/blob/main/node/kubelet-cri-logging.md)), for example, from the `/var/log/containers` or `/var/log/pods` files, and enriches them with various metadata retrieved from the Kubernetes API.

The `kubernetes()` source is available in {{% param "product.abbrev" %}} version 3.37 and later.

By default, it reads the `/var/log/containers` folder and extracts:

- the log content, and
- Kubernetes metadata, for example, namespace, pod, and container information.

The Kubernetes-related metadata is available in name-value pairs with the `.k8s.` prefix. The following table shows the retrieved metadata and their source:

| `syslog-ng` name-value pair | source |
|---------------------------|--------|
| `.k8s.namespace_name` | Container log file name.|
| `.k8s.pod_name` | Container log file name.|
| `.k8s.pod_uuid` | Container log file name or python kubernetes.client.CoreV1Api.|
| `.k8s.container_name` | Container log file name or python kubernetes.client.CoreV1Api.|
| `.k8s.container_id` | Container log file name.|
| `.k8s.container_image` | python kubernetes.client.CoreV1Api.|
| `.k8s.container_hash` | python kubernetes.client.CoreV1Api.|
| `.k8s.docker_id` | python kubernetes.client.CoreV1Api.|
| `.k8s.labels.*` | python kubernetes.client.CoreV1Api.|
| `.k8s.annotations.*` | python kubernetes.client.CoreV1Api.|

## Declaration

```shell
   kubernetes(
        base-dir("<pathname>")
    );
```
