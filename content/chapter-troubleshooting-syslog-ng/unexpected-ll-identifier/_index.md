---
title: "Error: unexpected LL_IDENTIFIER"
linkTitle: "unexpected LL_IDENTIFIER"
weight: 2000
description: >
  A missing module or SCL package makes AxoSyslog fail to start with a syntax error. Find out which package provides the driver you configured.
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{% param "product.name" %}} fails to start, and reports a syntax error that points at
the name of a source, destination, parser, or other configuration object:

```shell
syslog-ng[19147]: Error parsing config, syntax error, unexpected LL_IDENTIFIER, expecting '}' in /etc/syslog-ng/conf.d/auditd.conf:1:19-1:30:
syslog-ng[19147]: 1-----> source s_auditd { linux-audit(); };
syslog-ng[19147]: 1----->                   ^^^^^^^^^^^
```

`LL_IDENTIFIER` means that the parser found a name it doesn't recognize in that
position. There are three common causes.

## The driver name is misspelled

Check the name against the reference documentation. Some drivers have names that are
easy to guess incorrectly, for example, the source that reads the systemd journal is
`systemd-journal()`, not `systemd-journald()`.

## The module that provides the driver isn't installed

{{% param "product.name" %}} is modular: most drivers live in separate packages that you
install only if you need them. If the module isn't installed, its driver name is unknown
to the configuration parser, and you get the same error you'd get for a typo.

Check the {{% xref "/install/debian-ubuntu/_index.md" %}} or the
{{% xref "/install/rhel-fedora-almalinux/_index.md" %}} page for the complete list of
modules and the package that provides each of them. The Prerequisites section of every
driver's page also names the package you need.

To list the modules that are currently loaded, run:

```shell
syslog-ng --version
```

The output contains an `Available-Modules:` line.

## The SCL files aren't installed

Many drivers, like `linux-audit()`, `elasticsearch-http()`, or `telegram()`, aren't
compiled modules but configuration snippets from the {{% param "product.name" %}}
Configuration Library (SCL).

- On Debian and Ubuntu, the SCL files are in the `axosyslog-scl` package. The
  `axosyslog` metapackage depends on it, but if you installed only `axosyslog-core`, you
  have to install it separately:

    ```shell
    sudo apt install axosyslog-scl
    ```

- On RHEL and compatible distributions, the SCL files are part of the `axosyslog` base
  package.

Your configuration must also include the SCL:

```shell
@version: {{% param "product.version" %}}
@include "scl.conf"
```

The default `/etc/syslog-ng/syslog-ng.conf` shipped with the packages already contains
this line. You don't need to include individual SCL files: `scl.conf` loads every
installed SCL plugin, including the Python-based ones from the `axosyslog-mod-python`
(Debian/Ubuntu) or `axosyslog-python` (RHEL) package.

{{% alert title="Note" color="info" %}}
If you replaced the default configuration file, make sure `@include "scl.conf"` is still
present. Without it, none of the SCL-based drivers are available, even if the
`axosyslog-scl` package is installed.
{{% /alert %}}
