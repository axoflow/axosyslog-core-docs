---
title: "UNIX credentials and other metadata"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with {{% param "product.abbrev" %}} 3.6, the `unix-stream()` and `unix-dgram()` sources automatically extract the available UNIX credentials and other metainformation from the received log messages. The {{% param "product.abbrev" %}} application can extract the following information on Linux and FreeBSD platforms (examples show the value of the macro for the `su - myuser` command). Similar information is available for the [systemd-journal]({{< relref "/docs/chapter-sources/configuring-sources-journal/_index.md" >}}) source.

<table>
<caption>UNIX credentials available via UNIX domain sockets</caption>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Macro</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>`${.unix.cmdline}`</td>
<td>The name (without the path) and command-line options of the executable belonging to the PID that sent the message. For example, `su - myuser`</td>
</tr>
<tr class="even">
<td>`${.unix.exe}`</td>
<td>The path of the executable belonging to the PID that sent the message. For example, `/usr/bin/su`</td>
</tr>
<tr class="odd">
<td>`${.unix.gid}`</td>
<td>The group ID (GID) corresponding to the UID of the application that sent the log message. Note that this is the ID number of the group, not its human-readable name. For example, `0`</td>
</tr>
<tr class="even">
<td>`${.unix.pid}`</td>
<td><p>The process ID (PID) of the application that sent the log message. For example, `774`.</p>
<p>Note that on every UNIX platforms, if the `system()` source uses sockets, it will overwrite the PID macro with the value of `${.unix.pid}`, if it is available.</p></td>
</tr>
<tr class="odd">
<td>`${.unix.uid}`</td>
<td>The user ID (UID) of the application that sent the log message. Note that this is the ID number of the user, not its human-readable name. For example, `0`</td>
</tr>
</tbody>
</table>
