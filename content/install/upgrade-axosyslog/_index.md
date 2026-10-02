---
title: Upgrade AxoSyslog to a newer version
linktitle: Upgrade AxoSyslog
weight: 1900
description: "Upgrade an existing AxoSyslog installation from packages, container images, or the Helm chart, update the configuration version, and roll back if needed."
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Use this page if you already run {{% param "product.name" %}} and you want to move to a newer release. To replace the `syslog-ng` packages of your distribution with {{% param "product.name" %}}, see {{% xref "/install/upgrade-syslog-ng/_index.md" %}} instead.

An upgrade has two independent parts:

1. Upgrade the {{% param "product.name" %}} binaries: the packages, the container image, or the Helm chart.
1. Update the `@version:` line of your configuration file. This step is optional. Until you do it, {{% param "product.name" %}} keeps the behavior of the declared version. For details, see [Update the configuration version](#config-version).

## Before you upgrade {{% param "product.name" %}} {#before}

1. Check which version you run now. Write it down, so that you can roll back to it if necessary.

    ```shell
    syslog-ng --version
    ```

    The first line of the output shows the version of the binary, for example:

    ```text
    axosyslog 4 (4.10.1)
    Config version: 4.2
    Installer-Version: 4.10.1
    ```

1. Read the changes of every release between your current version and the target version. Don't skip the intermediate releases.

    - In {{% xref "/whats-new/_index.md" %}}, look for deprecated options and for **Breaking change** subsections (for example, in Version 4.16).
    - The [{{% param "product.name" %}} release notes on GitHub](https://github.com/axoflow/axosyslog/releases) list every change of every release, including bugfixes.

1. Back up your configuration and your state files:

    - `/etc/syslog-ng/`: the configuration files, including the files that you include from the main configuration file.
    - `/var/lib/syslog-ng/`: the persist file (`syslog-ng.persist`) and the disk-buffer files. If you store these files in a different location (for example, with the `--persist-file` command-line option, or the `dir()` option of a disk-buffer), back up that location too.

    For example:

    ```shell
    sudo tar -czf axosyslog-backup-$(date +%Y%m%d).tar.gz /etc/syslog-ng /var/lib/syslog-ng
    ```

    For containers, back up the host directories that you mount into the container. For example, with the default [Podman with systemd]({{< relref "/install/podman-systemd/_index.md" >}}) setup, these are `/opt/axosyslog/etc` and `/var/lib/syslog-ng`.

## Upgrade the {{% param "product.name" %}} packages {#packages}

The packages keep your existing configuration file (`/etc/syslog-ng/syslog-ng.conf`). Upgrade the module packages together with the base package: the installed `axosyslog-*` module packages must have the same version as the base package.

1. Upgrade the {{% param "product.name" %}} packages.

    - Debian and Ubuntu:

        1. Update the package lists.

            ```shell
            sudo apt update
            ```

        1. Upgrade every installed {{% param "product.name" %}} package.

            ```shell
            sudo apt install --only-upgrade axosyslog*
            ```

        To upgrade all the packages on the host, run `sudo apt upgrade` instead of the previous step.

    - RHEL, Fedora, and AlmaLinux:

        1. Update the package lists.

            ```shell
            sudo dnf update
            ```

        1. Upgrade every installed {{% param "product.name" %}} package.

            ```shell
            sudo dnf upgrade 'axosyslog*'
            ```

            This command upgrades the base package and every installed module package. To upgrade all the packages on the host, run `sudo dnf upgrade` instead of the previous step.

1. Restart the service to start the new binary.

    ```shell
    sudo systemctl restart syslog-ng
    ```

1. Check that the service runs.

    ```shell
    sudo systemctl status syslog-ng
    ```

    Make sure that the `Active:` line of the output shows `active (running)`.

1. Check the version of the binary.

    ```shell
    syslog-ng --version
    ```

    Make sure that the first line of the output shows the new version.

1. Check the log of {{% param "product.name" %}} for warnings about your configuration file. For example:

    ```shell
    sudo journalctl -u syslog-ng -b | grep -i warning
    ```

    If your configuration declares an older version, you see warnings about compatibility mode and about incompatible changes. {{% param "product.name" %}} works in this state. To resolve the warnings, see [Update the configuration version](#config-version).

## Upgrade containers {#containers}

The {{% param "product.name" %}} container images are available at `ghcr.io/axoflow/axosyslog`. The `latest` tag moves to every new release automatically. For production, pin a specific version, such as `ghcr.io/axoflow/axosyslog:{{% param "product.techversion" %}}`. Then you decide when to upgrade, and you can roll back to a known tag. For the available tags, see the [list of image tags](https://github.com/axoflow/axosyslog-docker/pkgs/container/axosyslog).

### Upgrade a Docker or Podman container {#docker-podman}

If you use Podman, replace `docker` with `podman` in the commands of this section.

1. Pull the new image. Replace `<new-version>` with the version number, such as `{{% param "product.techversion" %}}`.

    ```shell
    docker pull ghcr.io/axoflow/axosyslog:<new-version>
    ```

1. Check your configuration file with the new image. The entrypoint of the image is `/usr/sbin/syslog-ng -F`, so you can add the `--syntax-only` option to the end of the command. Mount the directory that contains your configuration file, so that the check also finds the files that you include from it:

    ```shell
    docker run --rm --volume <path-to-your/config-directory>:/etc/syslog-ng ghcr.io/axoflow/axosyslog:<new-version> --syntax-only
    ```

    If the configuration is valid, the command doesn't print errors. Check the output for warnings about incompatible changes.

1. Stop and remove the running container.

    ```shell
    docker stop <container-name>
    docker rm <container-name>
    ```

1. Start a new container from the new image. Use the same options, port mappings, and volume mounts that you used for the old container, and change only the image tag. For example:

    ```shell
    docker run -d --name <container-name> -p 514:514/udp -p 601:601/tcp --volume <path-to-your/config-directory>:/etc/syslog-ng --volume <path-to-your/persist-directory>:/var/lib/syslog-ng ghcr.io/axoflow/axosyslog:<new-version>
    ```

    Replace the `-p` options with the ports that your old container published. Mount the same `/var/lib/syslog-ng` directory as before. It stores the persist file and the disk-buffer files. For details, see {{% xref "/install/docker/_index.md" %}} and {{% xref "/install/podman/_index.md" %}}.

1. Check the logs of the new container.

    ```shell
    docker logs <container-name>
    ```

    The startup message shows the new version, for example: `syslog-ng starting up; version='{{% param "product.techversion" %}}'`.

### Upgrade a Podman systemd service {#podman-systemd}

The `AXOSYSLOG_IMAGE` environment variable sets the image of the Podman systemd service. The default value in `/etc/containers/systemd/axosyslog.container` is:

```systemd
Environment="AXOSYSLOG_IMAGE=ghcr.io/axoflow/axosyslog:latest"
```

1. Set the new image tag.

    - If you use a pinned version, change the tag in `/etc/containers/systemd/axosyslog.container`. Alternatively, run `sudo systemctl edit axosyslog`, and set the variable in the override file:

        ```systemd
        [Service]
        Environment="AXOSYSLOG_IMAGE=ghcr.io/axoflow/axosyslog:<new-version>"
        ```

    - If you use the `latest` tag, pull the new image. Podman doesn't pull a new `latest` image if one is already available locally.

        ```shell
        sudo podman pull ghcr.io/axoflow/axosyslog:latest
        ```

1. Reload the systemd configuration, and restart the service.

    ```shell
    sudo systemctl daemon-reload
    sudo systemctl restart axosyslog
    ```

1. Check the log of the service.

    ```shell
    journalctl -b -u axosyslog | tail -100
    ```

    The `syslog-ng starting up` message shows the new version. For details, see {{% xref "/install/podman-systemd/_index.md" %}}.

## Upgrade the Helm chart {#helm}

The chart version and the {{% param "product.name" %}} version are different. Every chart version has an `appVersion`, and the chart uses the image with that tag by default. If you set the `image.tag` parameter, the chart uses that image tag, independently of the chart version. For the list of parameters, see {{% xref "/install/helm/helm-chart-parameters.md" %}}.

{{< warning >}}
If you don't set the `collector.config.raw` or `aggregator.config.raw` parameters, the chart generates the configuration file. The generated `@version:` is the major and minor version of the `appVersion` of the chart. A chart upgrade therefore changes the configuration version, and turns on the new default behavior of that release. Read {{% xref "/whats-new/_index.md" %}} before you upgrade the chart.

If you use `config.raw`, you control the `@version:` line of the configuration. The chart doesn't change it.
{{< /warning >}}

1. Update the chart repository.

    ```shell
    helm repo update
    ```

1. List the available chart versions. The `APP VERSION` column shows the {{% param "product.name" %}} version of each chart version.

    ```shell
    helm search repo axosyslog/axosyslog --versions
    ```

1. Upgrade the release. Use your values file, so that you keep your settings. To install a specific chart version, add the `--version <chart-version>` option.

    ```shell
    helm upgrade <release-name> axosyslog/axosyslog -f my-values.yaml
    ```

    The output should be similar to:

    ```text
    Release "<release-name>" has been upgraded. Happy Helming!
    ...
    ```

    The collector DaemonSet and the aggregator StatefulSet use the `RollingUpdate` update strategy, so Kubernetes replaces the pods one by one. For the collector, the `collector.maxUnavailable` parameter sets how many pods can be unavailable during the update (default: `1`).

1. Check that the new pods run.

    ```shell
    kubectl get pods
    ```

1. Check the revision history of the release. You need the revision number to roll back.

    ```shell
    helm history <release-name>
    ```

For details on the chart, see {{% xref "/install/helm/_index.md" %}}.

## Update the configuration version {#config-version}

The `@version:` line of the configuration file declares which version of the configuration syntax and default behavior you use. For example:

```shell
@version: {{% param "product.configversion" %}}
@include "scl.conf"
```

The `@version:` line must be the first line of the main configuration file, before any `@include` statement. If the configuration contains more than one `@version:` line, {{% param "product.name" %}} uses only the first one. For details, see {{% xref "/chapter-configuration-file/configuration-syntax/_index.md" %}}.

{{% param "product.name" %}} handles the declared version as follows:

- If you set `@version: current`, {{% param "product.name" %}} uses the version of the installed binary. This is convenient, but every upgrade can change the behavior of your configuration, without a change in the configuration file.
- If the declared version is older than the version in the `Config version:` line of `syslog-ng --version`, {{% param "product.name" %}} runs in compatibility mode. It keeps the old default behavior, and logs the `Configuration file format is too old, syslog-ng is running in compatibility mode` warning. It also logs a warning for each version-dependent default that your configuration uses.
- If the declared version is newer than the version of the binary, {{% param "product.name" %}} logs a warning, and runs with the newest version that it supports.

To update the configuration version, complete the following steps.

1. Upgrade the binary first. Keep the old `@version:` line for now.
1. Check the configuration, and read the warnings.

    ```shell
    sudo syslog-ng --syntax-only
    ```

    You can also find the warnings in the log of {{% param "product.name" %}} after a restart.

1. Resolve every warning about incompatible changes. For each warning, do one of these: set the option explicitly to keep the old behavior, or accept the new default behavior.
1. Change the `@version:` line to the new version, for example:

    ```shell
    @version: {{% param "product.configversion" %}}
    ```

1. Check the configuration again.

    ```shell
    sudo syslog-ng --syntax-only
    ```

1. Reload the configuration.

    ```shell
    sudo syslog-ng-ctl reload
    ```

    Alternatively, restart the service: `sudo systemctl restart syslog-ng`.

## Roll back an {{% param "product.name" %}} upgrade {#rollback}

If the new version doesn't work as you expect, go back to the version that you wrote down in [Before you upgrade {{% param "product.name" %}}](#before).

If you changed the `@version:` line of the configuration, restore the configuration from your backup. An older binary can't use a newer configuration version. It uses its own newest version instead, so the behavior can change.

### Roll back the packages {#rollback-packages}

- Debian and Ubuntu:

    1. List the available versions of the package.

        ```shell
        apt-cache policy axosyslog
        ```

        You can also run `apt list -a axosyslog`.

    1. Install the previous version. Install the same version of every module package that you use. Replace `<package-version>` with a version from the output of the previous step. For example:

        ```shell
        sudo apt install --allow-downgrades axosyslog=<package-version> axosyslog-core=<package-version> axosyslog-mod-grpc=<package-version>
        ```

- RHEL, Fedora, and AlmaLinux:

    - To go back to the previous available version, run:

        ```shell
        sudo dnf downgrade 'axosyslog*'
        ```

    - To install a specific version:

        1. List the installed {{% param "product.name" %}} packages.

            ```shell
            dnf list --installed 'axosyslog*'
            ```

        1. Install the previous version of every package from the list. Replace `<version>` with the version to roll back to, for example:

            ```shell
            sudo dnf install axosyslog-<version> axosyslog-grpc-<version>
            ```

    - To undo the upgrade transaction, find its ID with `dnf history`, then run:

        ```shell
        sudo dnf history undo <transaction-id>
        ```

After the downgrade, restart the service, and check the version:

```shell
sudo systemctl restart syslog-ng
syslog-ng --version
```

### Roll back containers {#rollback-containers}

Start the container again with the previous image tag. Use the same options and volume mounts as for the new container. For Podman with systemd, set the previous tag in the `AXOSYSLOG_IMAGE` variable, then run `sudo systemctl daemon-reload` and `sudo systemctl restart axosyslog`.

If you used the `latest` tag before the upgrade, `latest` now points to the new release. Use the version-number tag of the old version, for example, `ghcr.io/axoflow/axosyslog:<old-version>`. You wrote down this version in [Before you upgrade {{% param "product.name" %}}](#before).

### Roll back the Helm chart {#rollback-helm}

1. List the revisions of the release.

    ```shell
    helm history <release-name>
    ```

1. Roll back to the revision before the upgrade.

    ```shell
    helm rollback <release-name> <revision>
    ```

## Get help with an upgrade {#help}

If {{% param "product.name" %}} doesn't start after an upgrade or a rollback, keep the backup of `/etc/syslog-ng/` and `/var/lib/syslog-ng/`, and [contact us](/support/_index.md).
