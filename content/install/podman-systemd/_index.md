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

<!-- FIXME tested on CentOS 9 -->

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

    <!-- FIXME URLs are hardcoded, should use a parameter for the url somehow (or a shortcode that returns the absURL of the file in the parameter) -->
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
    sudo mkdir -p /opt/axosyslog/etc/ ; sudo curl -o /opt/axosyslog/etc/syslog-ng.conf https://axoflow.com/docs/axosyslog-core/install/podman-systemd/syslog-ng.conf
    ```

    With the following sample configuration file {{% param "product_name" %}} collects the local system logs and logs received from the network into the `/var/log/messages` file.

    {{< include-code "syslog-ng.conf" "shell" >}}

    You can customize the configuration file according to your needs. For a few pointers, see {{% xref "/quickstart/configure-servers/_index.md" %}} and the rest of this guide.


    <!-- FIXME Add a unitfile mount point /var/logs that points to /opt/axosyslog/var/log 
    > Where do we set the /logs part? -->

1. Run the following commands to reload the systemd configuration and launch the `axosyslog` service. Though the systemctl commands are run as root, the container will run as the specified user if set appropriately in the unit file.

    ```shell
    sudo systemctl daemon-reload
    sudo systemctl stop axosyslog
    sudo systemctl start axosyslog
    ```

    If there aren't any errors, these commands don't have any output.

1. Run the following command to verify that the service was properly started:

    ```shell
    journalctl -b -u axosyslog | tail -100
    ```

    The output should be similar to:

    ```shell
    Feb 12 09:04:40 <your-hostname> systemd[1]: Starting AxoSyslog Container...
    Feb 12 09:04:40 <your-hostname> podman[2783]: 2024-02-12 09:04:40.454665314 -0500 EST m=+0.167732500 system refresh
    Feb 12 09:04:40 <your-hostname> axosyslog[2783]: Trying to pull ghcr.io/axoflow/axosyslog:latest...
    Feb 12 09:04:40 <your-hostname> axosyslog[2783]: Pulling image //ghcr.io/axoflow/axosyslog:latest inside systemd: setting pull timeout to 5m0s
    Feb 12 09:04:41 <your-hostname> axosyslog[2783]: Getting image source signatures
    Feb 12 09:04:41 <your-hostname> axosyslog[2783]: Copying blob sha256:4f4fb700ef54461cfa02571ae0db9a0dc1e0cdb5577484a6d75e68dc38e8acc1
    Feb 12 09:04:41 <your-hostname> axosyslog[2783]: Copying blob sha256:619be1103602d98e1963557998c954c892b3872986c27365e9f651f5bc27cab8
    Feb 12 09:04:41 <your-hostname> axosyslog[2783]: Copying blob sha256:b061f41886afb563aff2a5f731f3286ba54ea6f657ed3e282f5339a12a64c5ef
    Feb 12 09:04:41 <your-hostname> axosyslog[2783]: Copying blob sha256:1b8d965a650c6a05227bd5c549930c9898071e8e7abb26886d4169a99762de0a
    Feb 12 09:04:41 <your-hostname> axosyslog[2783]: Copying blob sha256:b5b0ce6ebef193c4f909379188cfb59443e8a1809816fbb476074908b170b4d1
    Feb 12 09:04:50 <your-hostname> axosyslog[2783]: Copying config sha256:c379d94ef2c5ec348dfb3a93eed9a19aed667c396008db85edc354c8f4f8cb6a
    Feb 12 09:04:50 <your-hostname> axosyslog[2783]: Writing manifest to image destination
    Feb 12 09:04:50 <your-hostname> podman[2783]: 2024-02-12 09:04:50.422390687 -0500 EST m=+10.135457863 container create 477c9f011684f767aae138a0f88602ff30a8c95a46d616bb3b95318ec3a4b79f (image=ghcr.io/axoflow/axosyslog:latest, name=AxoSyslog, org.opencontainers.image.documentation=https://axoflow.com/docs/axosyslog/docs/, org.opencontainers.image.url=https://axoflow.io/, org.opencontainers.image.source=https://github.com/axoflow/axosyslog, org.opencontainers.image.authors=Axoflow, org.opencontainers.image.title=AxoSyslog, org.opencontainers.image.vendor=Axoflow, PODMAN_SYSTEMD_UNIT=axosyslog.service, org.opencontainers.image.description=A cloud-native distribution of syslog-ng by Axoflow, maintainer=axoflow.io, org.opencontainers.image.licenses=GPL-3.0-only)
    Feb 12 09:04:50 <your-hostname> podman[2783]: 2024-02-12 09:04:50.402626446 -0500 EST m=+10.115693622 image pull c379d94ef2c5ec348dfb3a93eed9a19aed667c396008db85edc354c8f4f8cb6a ghcr.io/axoflow/axosyslog:latest
    Feb 12 09:04:50 <your-hostname> podman[2783]: 2024-02-12 09:04:50.489925509 -0500 EST m=+10.202992695 container init 477c9f011684f767aae138a0f88602ff30a8c95a46d616bb3b95318ec3a4b79f (image=ghcr.io/axoflow/axosyslog:latest, name=AxoSyslog, org.opencontainers.image.authors=Axoflow, org.opencontainers.image.licenses=GPL-3.0-only, org.opencontainers.image.vendor=Axoflow, maintainer=axoflow.io, PODMAN_SYSTEMD_UNIT=axosyslog.service, org.opencontainers.image.url=https://axoflow.io/, org.opencontainers.image.documentation=https://axoflow.com/docs/axosyslog/docs/, org.opencontainers.image.title=AxoSyslog, org.opencontainers.image.description=A cloud-native distribution of syslog-ng by Axoflow, org.opencontainers.image.source=https://github.com/axoflow/axosyslog)
    Feb 12 09:04:50 <your-hostname> systemd[1]: Started AxoSyslog Container.
    Feb 12 09:04:50 <your-hostname> podman[2783]: 2024-02-12 09:04:50.500050669 -0500 EST m=+10.213117845 container start 477c9f011684f767aae138a0f88602ff30a8c95a46d616bb3b95318ec3a4b79f (image=ghcr.io/axoflow/axosyslog:latest, name=AxoSyslog, PODMAN_SYSTEMD_UNIT=axosyslog.service, org.opencontainers.image.source=https://github.com/axoflow/axosyslog, org.opencontainers.image.authors=Axoflow, org.opencontainers.image.description=A cloud-native distribution of syslog-ng by Axoflow, org.opencontainers.image.documentation=https://axoflow.com/docs/axosyslog/docs/, org.opencontainers.image.licenses=GPL-3.0-only, org.opencontainers.image.vendor=Axoflow, org.opencontainers.image.title=AxoSyslog, maintainer=axoflow.io, org.opencontainers.image.url=https://axoflow.io/)
    Feb 12 09:04:50 <your-hostname> axosyslog[2783]: 477c9f011684f767aae138a0f88602ff30a8c95a46d616bb3b95318ec3a4b79f
    Feb 12 09:04:50 <your-hostname> AxoSyslog[2821]: [2024-02-12T14:04:50.806054] syslog-ng starting up; version='4.6.0'
    ```

1. Send a test message to the service:

    ```shell
    echo '<5> localhost test: this is a test message' | nc localhost 514
    ```

    <!-- FIXME ncat connection refused, seems that the ports are not open in the container, syslog-ng is not listening on any port (netstat -antp) 
    
    There is a default /etc/syslog-ng/syslog-ng.conf file in the container, and syslog-ng is using that
    -->

    Check that the test message has arrived into the log file:

    ```shell
    less /opt/axosyslog/var/log/messages
    ```

    <!-- FIXME add sample output -->

## Customize the configuration

To customize the configuration, edit the `/etc/syslog-ng/syslog-ng.conf` file on the host, then reload the service.

{{< include-headless "disk-buffer-in-container.md" >}}
<!-- FIXME check and adapt the diskbuffer section, note that the sample unit file uses the persist dir for storing diskbuffers-->

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
