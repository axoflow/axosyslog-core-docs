---
title: Collect OpenBSD kernel log messages
linktitle: openbsd() for OpenBSD
weight: 2200
driver: "openbsd()"
short_description: "Collect kernel log messages on OpenBSD systems"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The `openbsd()` source driver collects kernel log messages on OpenBSD systems. The driver reads messages from the `/dev/klog` kernel log device using the `LIOCSFD` ioctl, which is the OpenBSD-native mechanism that the system's default `syslogd` use. Messages collected through this source are tagged with the `local+openbsd` transport.

On OpenBSD platforms the [`system()` source]({{< relref "/chapter-sources/source-system/_index.md" >}}) automatically uses `openbsd()` to read kernel messages, so usually you don't need to configure it directly. Use `openbsd()` explicitly only if you want to bypass `system()` and route OpenBSD kernel messages through a custom log path.

## Example: Reading OpenBSD kernel logs

```shell
source s_openbsd_kernel {
    openbsd();
};

log {
    source(s_openbsd_kernel);
    destination { file("/var/log/kernel.log"); };
};
```

## Options

The `openbsd()` source supports a minimal set of options. It doesn't accept message-format or socket-tuning options because the kernel log device delivers locally framed messages with no hostname or transport metadata to negotiate.

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-source-internal.md" %}}

{{% include-headless "chunk/option-persist-name.md" %}}
