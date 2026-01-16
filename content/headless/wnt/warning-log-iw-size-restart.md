---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{% alert title="Warning" color="warning" %}}

If you change the value of `log-iw-size()` and `keep-alive()` is enabled, the change will affect only new connections, the `log-iw-size()` of kept-alive connections will not change. To apply the new `log-iw-size()` value to every connection, [restart the `syslog-ng` service]({{< relref "/quickstart/managing-and-checking-linux/_index.md#restart-axosyslog" >}}). A simple configuration reload is _NOT_ sufficient.

If the source is receiving data using the UDP protocol, always [restart the `syslog-ng` service]({{< relref "/quickstart/managing-and-checking-linux/_index.md#restart-axosyslog" >}}) after changing the value of `log-iw-size()` for the changes to take effect.

{{% /alert %}}
