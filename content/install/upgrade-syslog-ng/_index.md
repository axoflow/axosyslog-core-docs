---
title: Upgrade syslog-ng to AxoSyslog
linktitle: Upgrade syslog-ng
weight: 2000
---

If you’re already using `syslog-ng`, you can upgrade your existing `syslog-ng` deployments to {{< product >}} in a matter of minutes, by simply installing {{< product >}} on the host.

We assume that you’ve installed `syslog-ng` from the repositories of your distribution. To upgrade to {{< product >}}, complete the following steps.

1. Check that the syslog-ng service is running:

    ```shell
    sudo systemctl syslog-ng status
    ```

    The output will look something like:

    ```shell
    syslog-ng.service - System Logger Daemon
     Loaded: loaded (/usr/lib/systemd/system/syslog-ng.service; enabled; preset>
     Active: active (running) since Thu 2025-02-27 17:04:28 CET; 11s ago
       Docs: man:syslog-ng(8)
   Main PID: 254 (syslog-ng)
      Tasks: 2 (limit: 9594)
     Memory: 19.6M (peak: 20.8M)
        CPU: 215ms
     CGroup: /system.slice/syslog-ng.service
             └─254 "[rosetta]" /usr/sbin/syslog-ng /usr/sbin/syslog-ng -F
    ```

1. Check the version of `syslog-ng` you have by running:

    ```shell
    syslog-ng --version
    ```

    The output will start with something like:

    ```shell
    syslog-ng 4 (4.8.1)
    Config version: 4.2
    Installer-Version: 4.8.1
    ```

1. Add the {{< product >}} repository for your distribution and install {{< product >}}. For details, see the installation sections:

    - {{% xref "/install/debian-ubuntu/_index.md" %}}
    - {{% xref "/install/rhel-fedora-almalinux/_index.md" %}}

    The installation replaces the `syslog-ng` packages with {{< product >}} packages, but provides the same binaries (for example, `/usr/sbin/syslog-ng`). It will keep using the existing configuration files (`/etc/syslog-ng/syslog-ng.conf`), certificates, and so on.

1. Check that the `syslog-ng` service is still running:

    ```shell
    sudo systemctl syslog-ng status
    ```

    The output should be identical to the earlier result:

    ```shell
    syslog-ng.service - System Logger Daemon
     Loaded: loaded (/usr/lib/systemd/system/syslog-ng.service; enabled; preset>
     Active: active (running) since Thu 2025-02-27 17:07:41 CET; 42s ago
       Docs: man:syslog-ng(8)
   Main PID: 1936 (syslog-ng)
      Tasks: 2 (limit: 9594)
     Memory: 79.9M (peak: 83.1M)
        CPU: 462ms
     CGroup: /system.slice/syslog-ng.service
             └─1936 "[rosetta]" /usr/sbin/syslog-ng /usr/sbin/syslog-ng -F
    ```

1. Check the version of `syslog-ng` you have by running:

    ```shell
    syslog-ng --version
    ```

    You’ll see that now you’re running {{< product >}}:

    ```shell
    axosyslog 4 (4.10.1)
    Config version: 4.2
    Installer-Version: 4.10.1
    ```

In case you run into any issues, [contact us]({{< relref "/support/_index.md" >}}).
