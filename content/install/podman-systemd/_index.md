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

Podman version FIXME

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
    <!-- FIXME
    In the unit file: 
    add a sensible default if needed instead of
    User=1003
    Group=1004 
    and fix it also in 
    ExecStartPre = +chown -R syslogng:syslogng $PERSIST_MOUNT $CONFIG_MOUNT $DISKBUF_MOUNT

    
    add a default mount for diskbuffer files instead of
    Environment="DISKBUF_MOUNT=/opt/dskbuf"

    - can we set the image to a latest image?
    Environment="AXOSYSLOG_IMAGE=ghcr.io/axoflow/axosyslog-hibiki:0.1.1"

    - should we delete the axolet refrences?
     -->

1. Edit the unit file as needed for your environment.

    - We recommend using the mount points suggested.
    - Adjust the `CONFIG_MOUNT` option if you only want to manage one configuration file externally.

1. (Optional) Create an `override.conf` file to set custom environment values. This can be useful if you don't want to use `/etc/containers/systemd/axosyslog.container` exclusively.

    ```shell
    mkdir -p /etc/systemd/system/axosyslog.service.d
    cat > /etc/systemd/system/axosyslog.service.d/override.conf <<"A"
    A
    ```

    Later you can edit this file by running `systemctl edit axosyslog`

1. Create the `/etc/syslog-ng/syslog-ng.conf` configuration file.

    For a start, you can use [this configuration file from the syslog-ng repository](https://github.com/syslog-ng/syslog-ng/blob/master/scl/syslog-ng.conf).

    Using this configuration, {{% param "product_name" %}} collects the local system logs and logs received from the network into the `/var/log/messages` and `/var/log/messages-kv.log` files.

    {{< include-code "https://raw.githubusercontent.com/syslog-ng/syslog-ng/master/scl/syslog-ng.conf" "shell" >}}

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
    {{< param "command" >}} exec AxoSyslog syslog-ng-ctl config
    ```

- The traditional method of starting a service at boot (`systemctl enable`) is not supported for container services. To automatically start the {{% param "product.abbrev" %}} service, make sure that the following line is included in the unit file. (It is included in the sample template.)

    ```systemd
    [Install]
    WantedBy=default.target
    ```
