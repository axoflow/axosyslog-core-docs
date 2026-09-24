---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

On [Debian/Ubuntu]({{< relref "/install/debian-ubuntu/_index.md" >}}), this feature is available in a separate module: install the `{{1}}` package. On [RHEL and compatible distributions]({{< relref "/install/rhel-fedora-almalinux/_index.md" >}}), it's part of the `axosyslog` base package. If the module isn't installed, {{% param "product.name" %}} fails to start with an [`unexpected LL_IDENTIFIER` error]({{< relref "/chapter-troubleshooting-syslog-ng/unexpected-ll-identifier/_index.md" >}}).
