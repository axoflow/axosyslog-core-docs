---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
**Source drivers available in `syslog-ng`**

| Name     | Description                |
|--------------|------------------------|
| [file()]({{< relref "/chapter-sources/configuring-sources-file/_index.md" >}}) | Opens the specified file and reads messages. |
| [internal()]({{< relref "/chapter-sources/configuring-sources-internal/_index.md" >}}) | Messages generated internally in `syslog-ng`. |
| [kubernetes()]({{< relref "/chapter-sources/configuring-sources-kubernetes/_index.md" >}}) | Collects container logs managed by the Kubelet. |
| [mbox()]({{< relref "/chapter-sources/configuring-source-mbox/_index.md" >}}) | Read email messages from local mbox files, and convert them to multiline log messages. |
| [network()]({{< relref "/chapter-sources/configuring-sources-network/_index.md" >}}) | Receives messages from remote hosts using the [BSD-syslog protocol]({{< relref "/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/_index.md" >}}) over IPv4 and IPv6. Supports the TCP, UDP, and TLS network protocols. |
| [nodejs()]({{< relref "/chapter-sources/configuring-source-nodejs/_index.md" >}}) | Receives JSON messages from nodejs applications. |
| [osquery()]({{< relref "/chapter-sources/syslog-ng-source-osquery/_index.md" >}}) | Run osquery queries, and convert their results into log messages. |
| [pacct()]({{< relref "/chapter-sources/source-pacct/_index.md" >}}) | Reads messages from the process accounting logs on Linux. |
| [pipe()]({{< relref "/chapter-sources/source-pipe/_index.md" >}}) | Opens the specified named pipe and reads messages. |
| [program()]({{< relref "/chapter-sources/source-program/_index.md" >}}) | Opens the specified application and reads messages from its standard output. |
| [python()]({{< relref "/chapter-sources/python-source/_index.md" >}}) and [python-fetcher()]({{< relref "/chapter-sources/python-fetcher-source/_index.md" >}}) | Receive or fetch messages using a custom source written in Python. |
| [snmptrap()]({{< relref "/chapter-sources/syslog-ng-source-snmptrap/_index.md" >}}) | Read and parse the SNMP traps of the Net-SNMP's snmptrapd application. |
| [sun-stream(), sun-streams()]({{< relref "/chapter-sources/source-sunstreams/_index.md" >}}) | Opens the specified `STREAMS` device on Solaris systems and reads incoming messages. |
| [syslog()]({{< relref "/chapter-sources/source-syslog/_index.md" >}}) | Listens for incoming messages using the new [IETF-standard syslog protocol]({{< relref "/chapter-concepts/concepts-message-structure/concepts-message-ietfsyslog/_index.md" >}}). |
| [system()]({{< relref "/chapter-sources/source-system/_index.md" >}}) | Automatically detects which platform {{% param "product.abbrev" %}} is running on, and collects the native log messages of that platform. |
| [systemd-journal()]({{< relref "/chapter-sources/configuring-sources-journal/_index.md" >}}) | Collects messages directly from the journal of platforms that use systemd. |
| [systemd-syslog()]({{< relref "/chapter-sources/configuring-sources-systemd-syslog/_index.md" >}}) | Collects messages from the journal using a socket on platforms that use systemd. |
| [unix-dgram()]({{< relref "/chapter-sources/source-unixstream/_index.md" >}}) | Opens the specified unix socket in `SOCK_DGRAM` mode and listens for incoming messages. |
| [unix-stream()]({{< relref "/chapter-sources/source-unixstream/_index.md" >}}) | Opens the specified unix socket in `SOCK_STREAM` mode and listens for incoming messages. |
| [stdin()]({{< relref "/chapter-sources/configuring-sources-stdin/_index.md" >}}) | Collects messages from the standard input stream. |
| [wildcard-file()]({{< relref "/chapter-sources/configuring-sources-wildcard-file/_index.md" >}}) | Reads messages from multiple files and directories. |
