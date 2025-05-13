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

- {{% xref "/install/podman-systemd/_index.md" %}}
- {{% xref "/install/debian-ubuntu/_index.md" %}}
- {{% xref "/install/rhel-fedora-almalinux/_index.md" %}}
- {{% xref "/install/docker/_index.md" %}}
- {{% xref "/install/podman/_index.md" %}}
- {{% xref "/install/helm/_index.md" %}}

## Upgrade `syslog-ng` to AxoSyslog

If you’re already using `syslog-ng`, you can upgrade your existing `syslog-ng` deployments to {{< product >}} in a matter of minutes. For details, see {{% xref "/install/upgrade-syslog-ng/_index.md" %}}.

## Forward Windows logs

{{% param "product.companyabbrev" %}} provides a custom OpenTelemetry Collector distribution that you can use to collect logs on Windows hosts and forward them to {{% param "product.name" %}}. For details, see {{% xref "/install/windows/_index.md" %}}.
