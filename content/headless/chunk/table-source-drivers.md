---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
Source drivers available in syslog-ng

Name

Description

[file()]({{< relref "/docs/chapter-sources/configuring-sources-file/_index.md" >}})

Opens the specified file and reads messages.

[internal()]({{< relref "/docs/chapter-sources/configuring-sources-internal/_index.md" >}})

Messages generated internally in syslog-ng.

[network()]({{< relref "/docs/chapter-sources/configuring-sources-network/_index.md" >}})

Receives messages from remote hosts using the [BSD-syslog protocol]({{< relref "/docs/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/_index.md" >}}) over IPv4 and IPv6. Supports the TCP, UDP,{{% conditional-text include-if="pe" %}}RLTP,{{% /conditional-text %}} and TLS network protocols.

[nodejs()]({{< relref "/docs/chapter-sources/configuring-source-nodejs/_index.md" >}})

Receives JSON messages from nodejs applications.

[mbox()]({{< relref "/docs/chapter-sources/configuring-source-mbox/_index.md" >}})

Read email messages from local mbox files, and convert them to multiline log messages.

[osquery()]({{< relref "/docs/chapter-sources/syslog-ng-source-osquery/_index.md" >}})

Run osquery queries, and convert their results into log messages.

[pacct()]({{< relref "/docs/chapter-sources/source-pacct/_index.md" >}})

Reads messages from the process accounting logs on Linux.

[pipe()]({{< relref "/docs/chapter-sources/source-pipe/_index.md" >}})

Opens the specified named pipe and reads messages.

[program()]({{< relref "/docs/chapter-sources/source-program/_index.md" >}})

Opens the specified application and reads messages from its standard output.

[python()]({{< relref "/docs/chapter-sources/python-source/_index.md" >}}) and [python-fetcher()]({{< relref "/docs/chapter-sources/python-fetcher-source/_index.md" >}})

Receive or fetch messages using a custom source written in Python.

[snmptrap()]({{< relref "/docs/chapter-sources/syslog-ng-source-snmptrap/_index.md" >}})

Read and parse the SNMP traps of the Net-SNMP's snmptrapd application.

[sun-stream(), sun-streams()]({{< relref "/docs/chapter-sources/source-sunstreams/_index.md" >}})

Opens the specified `STREAMS` device on Solaris systems and reads incoming messages.

[syslog()]({{< relref "/docs/chapter-sources/source-syslog/_index.md" >}})

Listens for incoming messages using the new [IETF-standard syslog protocol]({{< relref "/docs/chapter-concepts/concepts-message-structure/concepts-message-ietfsyslog/_index.md" >}}).

[system()]({{< relref "/docs/chapter-sources/source-system/_index.md" >}})

Automatically detects which platform {{% param "product.abbrev" %}} is running on, and collects the native log messages of that platform.

[systemd-journal()]({{< relref "/docs/chapter-sources/configuring-sources-journal/_index.md" >}})

Collects messages directly from the journal of platforms that use systemd.

[systemd-syslog()]({{< relref "/docs/chapter-sources/configuring-sources-systemd-syslog/_index.md" >}})

Collects messages from the journal using a socket on platforms that use systemd.

[unix-dgram()]({{< relref "/docs/chapter-sources/source-unixstream/_index.md" >}})

Opens the specified unix socket in `SOCK_DGRAM` mode and listens for incoming messages.

[unix-stream()]({{< relref "/docs/chapter-sources/source-unixstream/_index.md" >}})

Opens the specified unix socket in `SOCK_STREAM` mode and listens for incoming messages.

[stdin()]({{< relref "/docs/chapter-sources/configuring-sources-stdin/_index.md" >}})

Collects messages from the standard input stream.

[wildcard-file()]({{< relref "/docs/chapter-sources/configuring-sources-wildcard-file/_index.md" >}})

Reads messages from multiple files and directories.
