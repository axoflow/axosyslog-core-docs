---
title: Install AxoSyslog on RHEL/Fedora/AlmaLinux
linktitle: RHEL/Fedora
weight: 250
---

You can install {{< product >}} 4.8 and newer on your RPM-based system from Axoflow's RPM repository. {{< product >}} is a drop in replacement for the `syslog-ng` RPM package, all the {{< product >}} binaries and configuration files are stored at the same place on your system.

The following x86-64 distributions are supported:

- Red Hat Enterprise Linux (RHEL) 9 / AlmaLinux 9
- Red Hat Enterprise Linux (RHEL) 8 / AlmaLinux 8
- Fedora 41
- Fedora 40
- Fedora 39

(The packages for AlmaLinux probably work for Rocky Linux as well, but we haven't tested it.)

{{< include-headless "chunk/package-to-install.md" >}}

Usually, you install the base package `axosyslog-<version-number>.<distro>.x86_64.rpm`, and the packages of specific modules that you want to use. We also provide `debuginfo` packages for every module, but you only need these in certain troubleshooting scenarios.

## Steps

To install {{< product >}} on RedHat Enterprise Linux 9 or AlmaLinux 9, complete the following steps. The instructions for AlmaLinux probably work for Rocky Linux 9 as well, but we haven't tested it.

1. Run the following commands to [enable the EPEL repositories](https://docs.fedoraproject.org/en-US/epel/#_el9) for your distribution. This is needed to install some dependencies of {{< product >}}. (For RHEL 8 and compatible distributions, use [these instructions](https://docs.fedoraproject.org/en-US/epel/#_el8).)

    - RHEL 9:

        ```shell
        sudo subscription-manager repos --enable codeready-builder-for-rhel-9-$(arch)-rpms
        sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm
        ```

    - AlmaLinux 9:

        ```shell
        sudo dnf install epel-release
        sudo dnf config-manager --set-enabled crb
        ```

1. Add the {{< product >}} repository:

    ```shell
    sudo tee /etc/yum.repos.d/axosyslog.repo <<< '[axosyslog]
    name=AxoSyslog
    baseurl=https://pkg.axoflow.io/rpm/stable/fedora-$releasever/$basearch
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://pkg.axoflow.io/axoflow-code-signing-pub.asc' > /dev/null
    ```

1. Update the packages list.

    ```shell
    sudo yum update -y
    ```

    <!-- FIXME 
    AlmaLinux 9 - CRB                               2.3 MB/s | 2.9 MB     00:01    
    AxoSyslog                                        21 kB/s |  27 kB     00:01    
    Errors during downloading metadata for repository 'axosyslog':
    - Status code: 404 for https://pkg.axoflow.io/rpm/stable/fedora-9/aarch64/repodata/repomd.xml (IP: 104.21.48.1)
    Error: Failed to download metadata for repo 'axosyslog': Cannot download repomd.xml: Cannot download repodata/repomd.xml: All mirrors were tried -->

1. Install {{< product >}}:

    ```shell
    sudo yum install ./axosyslog-*
    ```

    Install other packages for the modules you want to use as needed. For example, to use the gRPC-based destinations (like [loki()]({{< relref "/chapter-destinations/destination-loki/_index.md" >}}) or [opentelemetry()]({{< relref "/chapter-destinations/opentelemetry/_index.md" >}})), install the `axosyslog-grpc-*` package. For HTTP-based destinations like [elasticsearch-http()]({{< relref "/chapter-destinations/configuring-destinations-elasticsearch-http/_index.md" >}}) or [sumologic-http()]({{< relref "/chapter-destinations/destination-sumologic-intro/_index.md" >}}), you need the `axosyslog-http-*` package.

1. Enable `syslog-ng`.

    ```shell
    sudo systemctl enable syslog-ng
    sudo systemctl start syslog-ng
    ```

1. (Optional) If you don't want to run other log collectors on the host, you can delete the existing one (which is rsyslog by default):

    ```shell
    sudo yum remove rsyslog.x86_64
    ```

{{< include-headless "chunk/install-help.md" >}}

## Install AxoSyslog on Fedora

<!-- FIXME check if we can merge this to the above procedure, or update to use the repo -->

1. Download the release tarball for your distribution, for example, on Fedora 40:

    ```shell
    wget https://github.com/axoflow/axosyslog/releases/download/axosyslog-{{% param "product.techversion" %}}/rpm-fedora-40.tar.gz
    tar -xvzf rpm-fedora-40.tar.gz
    cd rpm-fedora-40/
    ```

1. Install AxoSyslog:

    ```shell
    sudo yum install ./axosyslog-{{% param "product.techversion" %}}.2*
    ```

    Install other packages for the modules you want to use as needed. For example, to use the gRPC-based destinations (like [loki()](https://axoflow.com/docs/axosyslog-core/chapter-destinations/destination-loki/) or [opentelemetry()](https://axoflow.com/docs/axosyslog-core/chapter-destinations/opentelemetry/)), install the `axosyslog-grpc-*` package. For HTTP-based destinations like [elasticsearch-http()](https://axoflow.com/docs/axosyslog-core/chapter-destinations/configuring-destinations-elasticsearch-http/) or [sumologic-http()](https://axoflow.com/docs/axosyslog-core/chapter-destinations/destination-sumologic-intro/), you need the `axosyslog-http-*` package.

1. Enable `syslog-ng`.

    ```shell
    sudo systemctl enable syslog-ng
    sudo systemctl start syslog-ng
    ```

1. (Optional) If you don't want to run other log collectors on the host, you can delete the existing one (which is rsyslog by default):

    ```shell
    sudo yum remove rsyslog.x86_64
    ```

{{< include-headless "chunk/install-help.md" >}}
