---
title: "Install AxoSyslog"
weight: 500
aliases:
- /chapter-install/syslog-ng-compile-options/
- /chapter-install/compiling-syslog-ng/
- /chapter-install/
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This chapter explains how to install {{% param "product.name" %}} on various platforms.

## Cloud-ready `syslog-ng` images {#images}

{{< include-headless "cloud-ready-images.md" >}}

## Install AxoSyslog

- {{% xref "/install/docker/_index.md" %}}
- {{% xref "/install/podman/_index.md" %}}
- {{% xref "/install/helm/_index.md" %}}

## Other installation methods

- You can install {{% param "product.abbrev" %}} on many platforms using the package manager and official repositories of the platform. For a list of third-party packages available for various Linux, UNIX, and other platforms, see [syslog-ng Open Source Edition installation packages](https://github.com/syslog-ng/syslog-ng/#installation-from-binaries).
- For instructions on compiling syslog-ng Open Source Edition from the source code, see the [GitHub project page](https://github.com/syslog-ng/syslog-ng/#installation-from-source).
