---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
To configure {{% param "product.abbrev" %}}, edit the `syslog-ng.conf` file with any regular text editor application. The location of the configuration file depends on the platform you are running {{% param "product.abbrev" %}}, and how you have installed {{% param "product.abbrev" %}} it.

- **Native packages** of a platform (like the ones downloaded from Linux repositories) typically place the configuration file under the `/etc/syslog-ng/` directory.
- **Containers**: When running {{% param "product.abbrev" %}} in a container, typically you [map an external file to the `/etc/syslog-ng/syslog-ng.conf` file]({{< relref "/install/docker/_index.md#customize-the-configuration" >}}) within the container. Check the mapped volumes of your container, and edit the external file.
- **Kubernetes**: If you're running {{% param "product.abbrev" %}} in Kubernetes and have installed it with helm, usually you configure {{% param "product.abbrev" %}} by editing a `values.yaml` file, and redeploying {{% param "product.abbrev" %}}. Often the `syslog-ng.conf` part is under the `config.raw` section in the `values.yaml` file. For details, see {{% xref "/install/helm/helm-chart-parameters/_index.md" %}}.
