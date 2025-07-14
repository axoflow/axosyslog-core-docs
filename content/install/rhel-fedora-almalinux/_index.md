---
title: Install AxoSyslog on RHEL/Fedora/AlmaLinux
linktitle: RHEL/Fedora
weight: 250
---

You can install {{< product >}} 4.8 and newer on your RPM-based system from Axoflow's RPM repository. {{< product >}} is a drop in replacement for the `syslog-ng` RPM package, all the {{< product >}} binaries and configuration files are stored at the same place on your system.

The following distributions are supported:

- Red Hat Enterprise Linux (RHEL) 9 x86-64 / AlmaLinux 9 x86-64
- Red Hat Enterprise Linux (RHEL) 8 x86-64 / AlmaLinux 8 x86-64
- Fedora 42 x86-64
- Fedora 41 x86-64
- Fedora 40 x86-64
- Fedora 39 x86-64

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

    - Fedora:

        ```shell
        sudo dnf install epel-release
        ```

1. Add the {{< product >}} repository of your distribution:

    <!-- Codeblocks are un-indented on purpose -->
    {{< tabpane text=true right=true >}}
        {{% tab header="Distribution:" disabled=true /%}}
        {{% tab header="RHEL / AlmaLinux 9" lang="almalinux" %}}
```shell
sudo tee /etc/yum.repos.d/axosyslog.repo <<< '[axosyslog]
name=AxoSyslog
baseurl=https://pkg.axoflow.io/rpm/stable/almalinux-9/$basearch
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://pkg.axoflow.io/axoflow-code-signing-pub.asc' > /dev/null
```
        {{% /tab %}}
        {{% tab header="RHEL / AlmaLinux 8" lang="almalinux" %}}
```shell
sudo tee /etc/yum.repos.d/axosyslog.repo <<< '[axosyslog]
name=AxoSyslog
baseurl=https://pkg.axoflow.io/rpm/stable/almalinux-8/$basearch
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://pkg.axoflow.io/axoflow-code-signing-pub.asc' > /dev/null
```
        {{% /tab %}}
        {{% tab header="Fedora 41" lang="fedora" %}}
```shell
sudo tee /etc/yum.repos.d/axosyslog.repo <<< '[axosyslog]
name=AxoSyslog
baseurl=https://pkg.axoflow.io/rpm/stable/fedora-41/$basearch
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://pkg.axoflow.io/axoflow-code-signing-pub.asc' > /dev/null
```
        {{% /tab %}}
        {{% tab header="Fedora 40" lang="fedora" %}}
```shell
sudo tee /etc/yum.repos.d/axosyslog.repo <<< '[axosyslog]
name=AxoSyslog
baseurl=https://pkg.axoflow.io/rpm/stable/fedora-40/$basearch
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://pkg.axoflow.io/axoflow-code-signing-pub.asc' > /dev/null
```
        {{% /tab %}}
        {{% tab header="Fedora 39" lang="fedora" %}}
```shell
sudo tee /etc/yum.repos.d/axosyslog.repo <<< '[axosyslog]
name=AxoSyslog
baseurl=https://pkg.axoflow.io/rpm/stable/fedora-39/$basearch
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://pkg.axoflow.io/axoflow-code-signing-pub.asc' > /dev/null
```
        {{% /tab %}}
        {{< /tabpane >}}

1. Update the packages list.

    ```shell
    sudo yum update -y
    ```

    Expected output:

    ```shell
    AxoSyslog                                                                                                           544  B/s | 488  B     00:00    
    AxoSyslog                                                                                                           5.2 kB/s | 3.2 kB     00:00    
    Importing GPG key 0x5F25E107:
    Userid     : "Axoflow Code Signing Key <support@axoflow.com>"
    Fingerprint: 365A 4340 FA76 89B4 78ED 617C 3605 FFAD 5F25 E107
    From       : https://pkg.axoflow.io/axoflow-code-signing-pub.asc
    AxoSyslog                                                                                                            68 kB/s |  56 kB     00:00    
    Extra Packages for Enterprise Linux 9 - x86_64                                                                      8.2 MB/s |  23 MB     00:02    
    Extra Packages for Enterprise Linux 9 openh264 (From Cisco) - x86_64                                                1.1 kB/s | 2.5 kB     00:02    
    Dependencies resolved.
    Nothing to do.
    Complete!
    ```

1. Install {{< product >}}.

    - To install {{< product >}} with every available module, run:

        ```shell
        sudo yum install axosyslog-*
        ```

    - To install only the base package, run:

        ```shell
        sudo yum install axosyslog
        ```

        Then install other packages for the modules you want to use as needed. For example, to use the gRPC-based destinations (like [loki()]({{< relref "/chapter-destinations/destination-loki/_index.md" >}}) or [opentelemetry()]({{< relref "/chapter-destinations/opentelemetry/_index.md" >}})), install the `axosyslog-grpc-*` package. For HTTP-based destinations like [elasticsearch-http()]({{< relref "/chapter-destinations/configuring-destinations-elasticsearch-http/_index.md" >}}) or [sumologic-http()]({{< relref "/chapter-destinations/destination-sumologic-intro/_index.md" >}}), you need the `axosyslog-http-*` package.

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
