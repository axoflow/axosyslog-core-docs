---
title: Install AxoSyslog with Podman and systemd
linktitle: Podman with systemd
weight: 100
command: podman
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

This page shows you how to run {{% param "product.abbrev" %}} as a systemd service using {{< param "command" >}}.

{{< include-headless "cloud-ready-images.md" >}}

## Prerequisites

Podman version 4.6.1.

## Install {{% param "product.abbrev" %}} as a systemd service

1. Make sure that there is no `axosyslog.service` unit file on the system. Run the following commands:

    ```shell
    sudo rm /etc/systemd/system/axosyslog.service
    ```

    Expected output:

    ```shell
    rm: cannot remove '/etc/systemd/system/axosyslog.service': No such file or directory
    ```

    ```shell
    sudo systemctl cat axosyslog.service
    ```

    Expected output:

    ```shell
    No files found for axosyslog.service.
    ```

1. Create a systemd unit file called `/etc/containers/systemd/axosyslog.container` based on the following template:

    ```shell
    sudo curl -o /etc/containers/systemd/axosyslog.container https://axoflow.com/docs/axosyslog-core/install/podman-systemd/axosyslog.service
    ```

    {{< include-code "axosyslog.service" "systemd" >}}

1. Edit the unit file as needed for your environment.

    - We recommend using the mount points suggested.

1. (Optional) Create an `override.conf` file to set custom environment values. This can be useful if you don't want to modify `/etc/containers/systemd/axosyslog.container`. Run:

    ```shell
    systemctl edit axosyslog
    ```

    Later you can edit this file by running the previous command again.

1. Create the `/opt/axosyslog/etc/syslog-ng.conf` configuration file based on the following template.

    ```shell
    sudo curl -o /opt/axosyslog/etc/syslog-ng.conf https://axoflow.com/docs/axosyslog-core/install/podman-systemd/syslog-ng.conf
    ```

    With the following sample configuration file {{% param "product_name" %}} collects the local system logs and logs received from the network into the `/var/log/messages` file.

    ```shell
    log { 
        source { default-network-drivers(); };
        destination { file("/logs/messages"); };
    };
    ```

    You can customize the configuration file according to your needs. For a few pointers, see {{% xref "/quickstart/configure-servers/_index.md" %}} and the rest of this guide.


    <!-- FIXME Add a unitfile mount point /logs that points /opt/axosyslog/var/log -->

1. Run the following commands to reload the systemd configuration and launch the `axosyslog` service. Though the systemctl commands are run as root, the container will run as the specified user if set appropriately in the unit file.

    ```shell
    sudo systemctl daemon-reload
    sudo systemctl stop axosyslog
    sudo systemctl start axosyslog
    ```

1. Run the following command to verify that the service was properly started:

    ```shell
    journalctl -b -u axosyslog | tail -100
    ```

    <!-- FIXME add sample good output -->

1. Send a test message to the service:

    ```shell
    echo '<5> localhost test: this is a test message' | nc localhost 514
    ```

    Check that the test message has arrived into the log file:

    ```shell
    less /opt/axosyslog/var/log/messages
    ```

    <!-- FIXME add sample output -->

## Customize the configuration

To customize the configuration, edit the `/etc/syslog-ng/syslog-ng.conf` file on the host, then reload the service.

{{< include-headless "disk-buffer-in-container.md" >}}
<!-- FIXME check and adapt the diskbuffer section -->

## Managing the {{% param "product.abbrev" %}} systemd service

- You can reload `syslog-ng` running in the container via systemctl. The following command reloads the `syslog-ng.conf` file, without stopping/starting `syslog-ng` itself.

    ```shell
    sudo systemctl reload axosyslog
    ```

- You can access `syslog-ng-ctl` from the host, for example by running:

    ```shell
    {{< param "command" >}} exec -ti AxoSyslog syslog-ng-ctl show-license-info
    ```

- The traditional method of starting a service at boot (`systemctl enable`) is not supported for container services. To automatically start the {{% param "product.abbrev" %}} service, make sure that the following line is included in the unit file. (It is included in the sample template.)

    ```systemd
    [Install]
    WantedBy=default.target
    ```
