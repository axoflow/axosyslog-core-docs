---
title: "kubernetes() source options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `kubernetes()` source has the following options:


## base-dir() {#source-kubernetes-base-dir}

|          |                         |
| -------- | ----------------------- |
| Type:    | path without filename   |
| Default: | `/var/log/containers` |

*Description:* The path to the directory that contains the log files, for example, **base-dir("/var/log/pods")**.



## cluster-name() {#source-kubernetes-cluster-name}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | k8s    |

*Description:*The name of the Kubernetes cluster.



{{% include-headless "chunk/option-parser-prefix.md" %}}

The `prefix()` option is optional and its default value is `".k8s."`.

