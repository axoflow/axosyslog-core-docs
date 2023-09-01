---
title: "kubernetes: Collecting and parsing the Kubernetes CRI (Container Runtime Interface) format"
weight:  1350
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `kubernetes()` source collects container logs managed by the Kubelet. The `kubernetes()` source is available in {{% param "product.abbrev" %}} version 3.37 and later. The source supports both [plain-text](https://github.com/kubernetes/design-proposals-archive/blob/main/node/kubelet-cri-logging.md) and JSON log formats.

By default, it reads the `/var/log/containers` folder and extracts:

- the log content, and
- Kubernetes metadata, for example, namespace, pod, and container information.

The Kubernetes-related metadata is available in name-value pairs with the `.k8s.` prefix:

- `.k8s.pod_uuid`
- `.k8s.labels.<label_name>`
- `.k8s.annotations.<annotation_name>`
- `.k8s.namespace_name`
- `.k8s.pod_name`
- `.k8s.container_name`
- `.k8s.container_image`
- `.k8s.container_hash`
- `.k8s.docker_id`

## Declaration

```shell
   kubernetes(
        base-dir("<pathname>")
    );
```
