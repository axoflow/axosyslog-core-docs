---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

This feature is part of the {{% param "product.name" %}} Configuration Library (SCL). Install the `axosyslog-scl` package on [Debian/Ubuntu]({{< relref "/install/debian-ubuntu/_index.md" >}}). On [RHEL and compatible distributions]({{< relref "/install/rhel-fedora-almalinux/_index.md" >}}), the SCL files are part of the `axosyslog` base package. Your configuration must also contain `@include "scl.conf"`, which the default configuration file already does. If the SCL files are missing, {{% param "product.name" %}} fails to start with an [`unexpected LL_IDENTIFIER` error]({{< relref "/chapter-troubleshooting-syslog-ng/unexpected-ll-identifier/_index.md" >}}).
