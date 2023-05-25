---
title: "kubernetes: Collecting and parsing the Kubernetes CRI (Container Runtime Interface) format"
weight:  1100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `kubernetes()` source collects container logs managed by the Kubelet. The `kubernetes()` source is available in {{% param "product.abbrev" %}} version {{% conditional-text include-if="ose" %}}3.37{{% /conditional-text %}} and later.

By default, it reads the `/var/log/containers` folder and extracts both Kubernetes metadata and the log content.


## Declaration:

```c
   kubernetes(
        base-dir("<pathname>")
    );

```

