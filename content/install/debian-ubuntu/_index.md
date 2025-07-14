---
title: Install AxoSyslog on Debian/Ubuntu
linktitle: Debian/Ubuntu
weight: 200
---

You can install {{< product >}} 4.8 and newer on your Debian-based system from Axoflow's APT repository. {{< product >}} is a drop in replacement for the [`syslog-ng` Debian package](https://packages.debian.org/search?keywords=syslog-ng&searchon=names&suite=stable&section=all), all the {{< product >}} binaries and configuration files are stored at the same place on your system.

The following x86-64 distributions are supported:

| Distribution    | sources.list component |
|-----------------|------------------------|
| Debian 12 (x86-64) | debian-bookworm     |
| Debian 11 (x86-64) | debian-bullseye     |
| Debian Unstable (x86-64) | debian-sid    |
| Debian Testing (x86-64) | debian-testing |
| Ubuntu 25.04 (x86-64) | ubuntu-plucky  |
| Ubuntu 24.10 (x86-64) | ubuntu-oracular  |
| Ubuntu 24.04 (x86-64) | ubuntu-noble     |
| Ubuntu 23.10 (x86-64) | ubuntu-mantic    |
| Ubuntu 23.04 (x86-64) | ubuntu-lunar     |
| Ubuntu 22.04 (x86-64) | ubuntu-jammy     |
| Ubuntu 20.04 (x86-64) | ubuntu-focal     |

{{< include-headless "chunk/package-to-install.md" >}}

Usually, you install the base package `axosyslog`, and the packages of specific modules that you want to use. We also provide `debuginfo` packages for every module, but you only need these in certain troubleshooting scenarios.

## Steps

To install {{< product >}} from the APT repository, complete the following steps.

1. Run the following commands to add the APT repository of your distribution (for example, Ubuntu 24.04) to the APT sources list:

    <!-- FIXME add sample outputs -->

    ```shell
    wget -qO - https://pkg.axoflow.io/axoflow-code-signing-pub.asc | gpg --dearmor > /usr/share/keyrings/axoflow-code-signing-pub.gpg
    ```

    ```shell
    echo "deb [signed-by=/usr/share/keyrings/axoflow-code-signing-pub.gpg] https://pkg.axoflow.io/apt stable ubuntu-noble" | tee --append /etc/apt/sources.list.d/axoflow.list
    ```

    ```shell
    apt update
    ```

    {{% alert title="Note" color="info" %}}
Nightly builds are also available:

```shell
echo "deb [signed-by=/usr/share/keyrings/axoflow-code-signing-pub.gpg] https://pkg.axoflow.io/apt nightly ubuntu-noble" | tee --append /etc/apt/sources.list.d/axoflow.list
```
    {{% /alert %}}

1. Install the {{< product >}} package.

    ```shell
    apt install axosyslog
    ```
